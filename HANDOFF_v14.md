# 引き継ぎ書 v14

**作成日**: 2026-09-04
**対象プロジェクト**: kuros-corporate-site
**本セッションのテーマ**: 本番環境で画像が表示されない問題(`INVALID_IMAGE_OPTIMIZE_REQUEST` / 400)の調査・修正・検証

---

## 1. 発生していた問題

本番環境(Vercel)で画像が表示されず、Next.jsの画像最適化エンドポイント(`/_next/image`)が **400 `INVALID_IMAGE_OPTIMIZE_REQUEST`** を返していた。

## 2. 根本原因

Payloadの `Media` コレクション(`src/collections/Media.ts`)が、アップロードファイルを **ローカルディスク(`public/media/`)に保存する設定**(`upload.staticDir`)のままだったこと。これがVercelの実行環境と根本的に相性が悪かった。

原因は大きく2つ重なっていた:

1. **`.gitignore` による除外**
   `public/media/` は(Payloadのデフォルトテンプレートにより)`.gitignore` で除外されていた。そのため、ローカルで管理画面からアップロードした画像ファイルの実体は一度もGitにコミットされず、Vercelへのデプロイにも一切含まれていなかった。

2. **Vercelのサーバーレス実行環境の制約**
   仮に `public/media/` をコミットしてビルドに含めても、Vercelのサーバーレス関数は実行時ファイルシステムが読み取り専用・エフェメラル(関数インスタンスをまたいで消える)。そのため、本番の管理画面から新規アップロードしても保存内容は永続化されず、同じ問題が再発する構造だった。

### 実際に起きていたリクエストの流れ
1. Payloadの `Media` ドキュメントの `url` は `/api/media/file/<filename>` という相対パス
2. Next.jsの `<Image>` がこのパスを `localPatterns`(`next.config.ts`)経由でローカル画像として最適化しようとする
3. `/api/media/file/<filename>` はPayloadのAPIルートで、ディスク(`public/media`)からファイルを読んで返す実装
4. 本番にはそのファイルが存在しない → 画像を返せない → Next.jsの最適化エンドポイントが `400 INVALID_IMAGE_OPTIMIZE_REQUEST` を返す

---

## 3. 対応内容(技術詳細)

### 3.1 依存パッケージの追加
```bash
pnpm add @payloadcms/storage-vercel-blob@3.88.0
```
Payload公式のVercel Blobストレージアダプター。バージョンは既存の `payload` / `@payloadcms/*` 系と同じ `3.88.0` に固定。

### 3.2 `src/plugins/index.ts` にプラグインを追加
```ts
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'

export const plugins: Plugin[] = [
  vercelBlobStorage({
    collections: {
      media: true,
    },
    token: process.env.BLOB_READ_WRITE_TOKEN,
  }),
  // ...既存のプラグイン
]
```
- `token` が未設定の場合、プラグインは**自動的に無効化**され、`Media.ts` の `upload.staticDir` によるローカルディスク保存にフォールバックする仕様。そのためローカル開発環境(`BLOB_READ_WRITE_TOKEN` 未設定)は今まで通り動作し、`Media.ts` 自体には変更不要だった。
- プラグインが有効な場合、`disableLocalStorage: true` が自動的に付与され、ローカルディスクへの書き込みは行われなくなる。
- デフォルトでは、クライアントに見えるURLは直接のBlob URLではなく **Payloadの `/api/media/file/<filename>` プロキシルートのまま**(Payloadのアクセス制御を維持するため)。内部的にこのルートのハンドラがVercel Blobからファイルを取得して返す仕組みに切り替わる。そのため既存の `next.config.ts` の `localPatterns`(`/api/media/file/**`)はそのまま機能する。

### 3.3 `next.config.ts` の変更
`images.remotePatterns` にBlobストレージのドメインを追加(直接外部公開URLを使うケースへの保険。現状のデフォルト動作では未使用だが、将来 `disablePayloadAccessControl` 等で直URLを使う場合に備えて追加):
```ts
{
  hostname: '*.public.blob.vercel-storage.com',
  protocol: 'https',
},
```

### 3.4 `.env.example` の更新
`BLOB_READ_WRITE_TOKEN` の説明とプレースホルダーを追記。

### 3.5 既存メディアファイルの移行
Payloadの `url` フィールドはDBに保存されず、**読み取り時にファイル名から動的計算**される。そのため、既存の66件のMediaドキュメント(うち実ファイルは64件、リサイズ画像含む)についても、**同じファイル名でVercel Blobにアップロードすれば自動的にURLが解決される**(DB側の追加移行作業は不要)。

- 一時的な移行スクリプト(`scripts/migrate-media-to-blob.ts`)を作成し、`public/media/` 配下の全64ファイルを `@vercel/blob` の `put()` でアップロード(`addRandomSuffix: false` でファイル名を完全一致させた)
- **64/64件、アップロード成功**
- 移行完了後、このスクリプトと開発専用の依存パッケージ `@vercel/blob`(devDependencies)は削除済み(本番コードには不要な一時的ツールだったため)

### 3.6 コミット・デプロイ
- コミット: `0742b43` "Use Vercel Blob storage for Media uploads"
- `git push origin main`
- `vercel deploy --prod` で本番へ反映(`https://kuros-corporate-site.vercel.app`)

---

## 4. 次回セッションで気をつけるべき点

### 4.1 `BLOB_READ_WRITE_TOKEN` はCLI経由で自動取得できない
Vercelダッシュボードでこのトークンは **"Sensitive"(機密)指定**されており、以下のいずれの方法でも値を取得できない:
- `vercel env pull` → `[SENSITIVE]` のプレースホルダーが書き込まれるだけ
- `vercel env run -- <command>` → 「Secret values cannot be pulled」エラーで実行自体が失敗

これはVercelの意図的なセキュリティ機構であり、回避を試みるべきではない。**ユーザー本人がVercelダッシュボード(Storage → Blob → 対象ストア → `.env.local` タブ)から値をコピーし、ローカルの `.env` に手動で追記する必要がある**。

### 4.2 Vercel CLIのローカル認証について
本セッションで初めてこのマシンから `vercel login`(デバイス認証・ブラウザ経由)→ `vercel link` を実施し、プロジェクト `kuros-works1/kuros-corporate-site` にリンク済み。`.vercel/` ディレクトリ(プロジェクトID等)と `.env.local` / `.env.production.local`(OIDCトークン等)が生成されているが、いずれも `.gitignore` の `.vercel` および `.env*` パターンで除外済み・コミット対象外であることを確認済み。次回セッションでは再ログイン不要な可能性が高い(ローカルのVercel CLI認証情報が有効な限り)。

### 4.3 `pnpm` 実行時の注意
このリポジトリは `pnpm-workspace.yaml` 等の都合で `pnpm add`/`pnpm remove` 実行時に `--ignore-workspace` フラグが必要(単独リポジトリとして扱うため)。

### 4.4 `Media.ts.bak` について
`src/collections/Media.ts` と並んで `src/collections/Media.ts.bak` という未使用ファイルがGit管理下に存在する(今回のセッションでは触れていない、既存の残留ファイル)。将来的に整理してよいか要確認。

---

## 5. 現状(このセッション終了時点)

- **画像非表示問題は解決済み。**
- curlによるAPIレベルの確認: `/_next/image` 最適化エンドポイント、`/api/media/file/...` プロキシルートともに200・正常な画像バイナリを返すことを確認済み。
- Playwright(ヘッドレスブラウザ)による実ブラウザレベルの確認: `/` `/vision` `/about` `/contact` `/privacy-policy` `/works` の全ページで、壊れた `<img>` 要素が0件であることを確認済み。Visionページのヒーロー画像、Worksページの実績スクリーンショット画像を含め、目視でも正常表示をスクリーンショットで確認済み。
- 追加の対応は現時点で不要。
