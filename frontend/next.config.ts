import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const nextConfig: NextConfig = {
  // ページとして認識する拡張子を指定
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
};

const withMDX = createMDX({
  // 必要に応じてプラグインを追加
});

// MDX設定で元の設定をラップしてエクスポート
export default withMDX(nextConfig);