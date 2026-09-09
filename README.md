# Kuro's Works コーポレートサイト

Kuro's Works の公式コーポレートサイトです。
本サイトはポートフォリオであると同時に、技術実績そのものの証明として構築されています。

**BUILT ON GIT.**
すべての構造・変更履歴をコードとして残し、diffでレビューできる状態を保つ——それが本サイトを貫く思想です。

- 本番サイト：https://kuros-works.com

---

## プロジェクト概要

本サイトは Payload CMS をヘッドレスCMSとして採用し、Next.js + Supabase(PostgreSQL) + Vercel の構成で構築しています。
コンテンツ（About / Vision / Works / Contact など）はすべて Payload CMS の管理画面から編集可能で、その実データは Supabase 上の PostgreSQL に永続化されます。

コーポレートサイトとしての情報発信に加えて、「バージョン管理された状態で機能を拡張し続けられるか」という技術的な検証の場でもあります。

---

## 技術スタック

| 分類 | 技術 |
|---|---|
| CMS | Payload CMS 3.88.0 |
| フロントエンド | Next.js / React 19 |
| データベース | Supabase (PostgreSQL, 東京リージョン) |
| ホスティング | Vercel |
| メディアストレージ | Vercel Blob (`@payloadcms/storage-vercel-blob`) |
| パッケージマネージャ | pnpm |

---

## なぜ Payload CMS か

日本ではまだ採用事例の少ないPayload CMSだが、ポテンシャルは大きいと考えている。

多くのCMSは、後から機能を拡張しようとするとプラグインを追加する形になる。プラグインは便利な反面、品質のばらつき・競合・アップデートでの破損リスクを抱え続けることになり、拡張すればするほど管理が煩雑になっていく。

Payload CMSは違う。コレクション定義・スキーマ・Globalsの設定が、すべてコードとして残る。機能拡張は「プラグインを探して入れる」のではなく「コードを書き足す」形で行われるため、変更はGitの差分としてそのまま追跡できる。何がいつ、なぜ変わったのかが常にレビュー可能な状態にある。

| | Git管理 | 機能拡張の方法 | 拡張時のコスト |
|---|---|---|---|
| WordPress | 不可（DB中心） | プラグイン追加 | 高（競合・破損リスク） |
| 一般的なノーコードCMS | 不可〜限定的 | 管理画面上での設定 | 中〜高 |
| **Payload CMS** | **可** | **コードとしてコレクション定義** | **低** |

CMS上の変更が「見えない設定」ではなく「差分として追跡できる資産」になる——これが本サイトでPayload CMSを選んだ理由であり、「BUILT ON GIT.」という思想の技術的な裏付けでもある。

---

## セットアップ手順

```bash
# 依存関係のインストール
pnpm install

# 環境変数の設定
cp .env.example .env
# .env に以下を設定
#   DATABASE_URL         Supabase の Transaction pooler 接続文字列
#   PAYLOAD_SECRET        Payload の秘密鍵
#   BLOB_READ_WRITE_TOKEN Vercel Blob のトークン

# 開発サーバーの起動
pnpm dev
```

`DATABASE_URL` は Supabase の **Transaction pooler**（ポート `6543`）を使用してください。Direct connection（ポート `5432`）はサーバーレス環境との相性上、非推奨です。

---

## 技術記事

本プロジェクトの構築過程で得られた技術的な知見は、記事として順次公開予定です。

- 技術選定の基準はひとつです。「Gitでバージョン管理ができるか」。それだけです。
  - Qiita: https://qiita.com/kuros-works/items/b792be1d4130d0dd903c
  - Zenn: https://zenn.dev/kuros_works/articles/33df3fcae05388
- Payload CMSを使う時、ほとんどの人が遭遇する難所の回避ポイント
  - Qiita: https://qiita.com/kuros-works/items/228e3096e3ed09222cc7
  - Zenn: https://zenn.dev/kuros_works/articles/8b4c2b018ccda4
  - Payload CMS 拡張ログ #1 — SMTPを使わず、n8n × Slackで通知を一元管理する
  - Qiita: https://qiita.com/kuros-works/items/1ac744267bf4ca7827f3
  - Zenn: https://zenn.dev/kuros_works/articles/7cafbd6b9b35ea

---

## ライセンス

本リポジトリのコードは Kuro's Works の技術実績公開を目的としています。ご利用に関するお問い合わせは下記まで。

**Kuro's Works**
代表者：西野大
Email：info@kuros-works.com
