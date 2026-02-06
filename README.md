# golfingfire

自分に最適なゴルフクラブを探せるWebアプリ

## バージョン

```
"next": "16.1.6",
"react": "19.2.3",
"@prisma/adapter-pg": "^7.3.0",
"@prisma/client": "^7.3.0",
```

## 環境構築

- nodeインストール
  - 既にインストールされてたので次へ。
- プロジェクト作成
  - `npx create-next-app@latest frontend`
  - オプション
    - TypeScript?: Yes （ミスを教えてくれるので初心者こそ必須！）
    - ESLint?: Yes （書き方のルールを守らせてくれます）
    - Tailwind CSS?: Yes （デザインがめちゃくちゃ楽になります）
    - src/ directory?: Yes （中身が整理されて見やすくなります）
    - App Router?: Yes （最新のNext.jsの書き方です）
    - Import alias?: Yes （そのままEnterでOK）
- 起動
  - `cd frontend`
    - `npm run dev`

## チュートリアル

最新のスコア一覧を作ろう

このステップでは、**「データの表示」と「コンポーネント化」**を体験します。

- Frontend
  - メイン画面を書き換える
    - `frontend/app/page.tsx`を書き換えてみる
  - ページを増やす
    - src/app/ フォルダの中に、新しく `about` という「フォルダ」を作ってください。
    - その `about` フォルダの中に、`page.tsx` というファイルを作ってください。
  - Aboutページの中身を書こう
    - `src/app/about/page.tsx`に、自己紹介的な中身を書く
  - トップページからAboutへリンクを貼る
  - `src/app/page.tsx` の好きな場所（例えば h1 の下など）に、リンクを差し込む。
  - スコア投稿フォームを作る
    - `src/app/page.tsx`を書き換える
  - ヘッダーを共通化する
    - `src/app/layout.tsx`を編集する
- Backend（DBなし）
  - APIの出口を作る
    - `src/app/api/scores/route.ts` というファイルを新規作成してください。 （api フォルダと scores フォルダを順番に作る必要があります）
  - フロントエンドからAPIを呼び出す
    - src/app/page.tsxを書き換える
- Backend（DBあり）
  - Docker Desktopを起動する
  - docker-compose.yml を作成する
  - データベースを起動する！
    - docker compose up -d
  - Prisma（プリズマ）を導入する
    - コマンドは `cd frontend`で。
  - スキーマ（設計図）を書く
    - `prisma/schema.prisma`
  - 設計図をDBに反映させる（マイグレーション）
    - `cd frontend`
    - `npx prisma migrate dev --name init`
  - DBの中身を覗いてみる（Prisma Studio）
    - コマンド
      - `cd frontend`
      - `npx prisma studio`
    - オッケーそう
  - Prismaを通じてDocker上のDBを読み書きする
    - src/lib/prisma.tsを作成
  - API（Route Handler）を書き換える
    - `src/app/api/scores/route.ts`を書き換える
  - 動作確認
    - ダメ
      - `npx prisma generate`
        - 公式アダプター使わないとダメっぽい

## これまでやってきたこと

### 登場人物

#### PostgreSQL

データを保管する場所（DB）

巨大な倉庫

#### Prisma

DBを操作するための「指示書」

倉庫の管理ソフト

#### Next.js (API)

ブラウザとDBを繋ぐ「窓口」

注文を受ける店員

## 各ファイルの役割

### DB関連

- `.env`（住所録・秘密のメモ）
  - 役割
    - データベースがどこにあるか（URL）を書いておく場所。
  - 中身
    - `DATABASE_URL="postgresql://..."`
  - ポイント
    - プログラムの中に直接パスワードを書くと危ないので、この別ファイルに切り出す。
    - git管理しないこと。
- `prisma/schema.prisma`（設計図）
  - 役割
    - 「データベースにどんなテーブルを作るか」を定義する、すべての源。
  - 中身
    - データの項目（`id`, `name`, `score`など）や、使用するデータベースの中身が書いてある。
  - ポイント
    - ここを書き換えて、`npx prisma generate` をすることで、プログラム側で使う「道具」が更新される。
- `lib/prisma.ts`（DBへの専用テーブル）
  - 役割
    - アプリからDBへ接続するための「窓口（インスタンス）」を一つだけ作る場所。
  - 中身
    - 窓口の設定が書いてある。
  - ポイント
    - 接続をあちこちにバラバラに作るとDBがパンクしてしまうので、ここで「使い回せる一つのトンネル」として定義し、アプリ全体で共有する。
- `app/api/scores/route.ts`（裏側の受付窓口）
  - 役割
    - ブラウザからのリクエスト（データの保存など）を実際に受け取る場所。
  - 中身
    - `export async function POST()`のような関数があり、届いたデータをprismaを使ってDBに保存する処理が書いてある。
  - ポイント
    - ユーザーが直接DBに触るのは危険なので、この「受付窓口」が中立ちをして安全にデータを扱う。

#### 全体の流れ

「設計図をもとにトンネルを通って受付が倉庫にデータを出し入れしている」

## Front

以下のコードに日本語訳をつけて。
