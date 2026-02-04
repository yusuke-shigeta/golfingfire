# golfingfire

自分に最適なゴルフクラブを探せるWebアプリ

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
    - コマンドは cd frontendで。
  - スキーマ（設計図）を書く
    - `prisma/schema.prisma`
  - 設計図をDBに反映させる（マイグレーション）
    - cd frontend
    - `npx prisma migrate dev --name init`
  - DBの中身を覗いてみる（Prisma Studio）
    - コマンド
      - cd frontend
      - npx prisma studio
    - オッケーそう
  - Prismaを通じてDocker上のDBを読み書きする
    - src/lib/prisma.tsを作成
  - API（Route Handler）を書き換える
    - src/app/api/scores/route.tsを書き換える
  - 動作確認
    - ダメ
      - npx prisma generate
        - 公式アダプター使わないとダメっぽい
