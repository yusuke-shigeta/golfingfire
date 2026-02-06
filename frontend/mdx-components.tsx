import type { MDXComponents } from 'mdx/types'

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // 例: h1を少しオシャレにする設定
    h1: ({ children }) => <h1 className="text-4xl font-bold text-blue-600">{children}</h1>,
    ...components,
  }
}