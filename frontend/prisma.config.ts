import { defineConfig } from '@prisma/config';

export default defineConfig({
  datasource: {
    // ここで環境変数を指定します
    url: process.env.DATABASE_URL,
  },
});