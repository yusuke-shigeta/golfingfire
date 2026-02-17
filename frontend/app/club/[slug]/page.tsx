// app/club-reviews/[slug]/page.tsx
import { getClubBySlug } from "@/lib/mdx";
import { compileMDX } from "next-mdx-remote/rsc";

export default async function ReviewDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  // 1. URLからslug（ファイル名）を取得
  const { slug } = await params;

  // 2. ファイルを読み込む
  const { meta, content } = await getClubBySlug(slug);

  // 3. MDXを解析してReactコンポーネントに変換
  const { content: MDXContent } = await compileMDX({
    source: content,
    options: { parseFrontmatter: true },
    // ここでMDX内で使いたい自作コンポーネントを登録できます
    components: {
      h1: (props) => <h1 {...props} className="text-3xl font-bold my-4 text-black" />,
      p: (props) => <p {...props} className="text-gray-700 leading-7 mb-4" />,
    },
  });

  return (
    <article className="max-w-3xl mx-auto p-10 min-h-screen bg-white">
      {/* メタデータの表示 */}
      <header className="mb-8 border-b pb-8">
        <span className="text-green-600 font-bold uppercase tracking-wider">{meta.brand}</span>
        <h1 className="text-4xl font-extrabold text-black mt-2">{meta.title}</h1>
        <div className="flex items-center mt-4">
          <span className="text-yellow-500 text-xl">★ {meta.score}</span>
          <span className="ml-4 text-gray-400 text-sm">{meta.date}</span>
        </div>
      </header>

      {/* MDX本文の表示 */}
      <div className="mdx-content">
        {MDXContent}
      </div>
    </article>
  );
}