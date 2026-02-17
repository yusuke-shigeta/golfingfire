// MDXで使える部品の「型（ルール）」を読み込む
import type { MDXComponents } from 'mdx/types'

// Next.jsがMDXを表示する時に必ず呼び出す関数。
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // h1をオシャンにする設定
    h1: ({ children }) => <h1 className="text-4xl font-bold text-blue-600">{children}</h1>,
    ...components,
  }
}

/**
 * 「普通のコンポーネント（components/）」と
 * 「MDX用コンポーネント（mdx-components.tsx）」の違いは、
 * 「明示的に呼ぶか、自動で呼ばれるか」
 * という使い勝手の違いにあります。
 */