@AGENTS.md

# ローカル作業のルール

## 秘密情報
- `.env`、`.env.local`、`.env.*` などの環境変数ファイルは開かない。Read ツールでも Bash（`cat`・`grep`・`head`・`less`・`source` など）でも開かない。
- 環境変数の名前や値を知りたいときは、ユーザーに聞く。

## データベース
- pnpm dev（next dev）の接続先は .env.local → .env の順で決まる。2026-10-08 時点で、.env.local はローカルの Postgres.app の kuros_dev（練習用DB）を向いている。.env は本番 Supabase を向いているが、.env.local に上書きされる
- .env.local の向き先を kuros_prod_copy（本番データの控え）に切り替えることがある。本番 Supabase には向けない
- vercel env pull は実行しない。.env.local を上書きして、開発用のトークンが消えるおそれがある。必要なときは、先に西野さんへ確認する
- pnpm test（vitest・playwright）は dotenv/config で .env（本番のトークン）を読み、本番のSupabaseとBlobに繋がる可能性があるため、確認できるまで実行しない
- seed スクリプトは実行しない。本番の管理画面の Seed ボタンも押さない
- pnpm dev の起動中に drizzle がスキーマ変更の確認プロンプトを出したら、答えずに止める。出たプロンプトの内容をそのままユーザーに報告して、判断を任せる
- ローカルの .env.local は、開発用のBlobストア（kuros-corporate-site-blob-dev）につながっている。ローカルからの画像のアップロードや削除は、本番のBlobに影響しない

# 環境構成と運用

## 環境構成
- 本番: DB は Supabase（Transaction pooler 6543）、画像は本番用 Vercel Blob
- Preview: DB は Neon（プロジェクト kuros-corporate-preview、Singapore）、画像は開発用 Vercel Blob
- ローカル: DB は Postgres の kuros_dev、画像は開発用 Vercel Blob（詳しくは上の「データベース」を参照）
- Preview とローカルは同じ開発用 Blob を使う。ローカルでの画像のアップロードや削除は、Preview の表示に影響することがある
- Vercel の環境変数は DATABASE_URL が Production 用と Preview 用で別々の行になっている。Vercel の環境変数はリポジトリの外にあり、Claude Code からは見えない
- DB の接続設定は src/payload.config.ts で process.env.DATABASE_URL を参照している（VERCEL_ENV での分岐はない）

## 運用ルール
- マイグレーションは導入していない
- コレクションを変えたら、Preview 用の Neon にもテーブルを反映する（PR チェックリストに入れる）
- 2026-10-13 時点で、travel LP のスキーマは、Supabase 本番にも Neon にもまだ反映していない。push や PR の前に、反映方法をユーザーと決めること
- Preview では Seed を入れない。問い合わせフォームも送信しない（仮ルール）
- 本番 DB、Neon、Vercel の環境変数には Claude Code から触れない
