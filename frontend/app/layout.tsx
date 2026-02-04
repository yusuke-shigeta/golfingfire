import Link from "next/link";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body>
        {/* --- ここから共通ヘッダー --- */}
        <header className="bg-green-700 text-white p-4 shadow-lg flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold hover:text-orange-400 transition">
            ⛳️ golfingfire
          </Link>
          <nav className="space-x-4">
            <Link href="/" className="hover:underline">Home</Link>
            <Link href="/about" className="hover:underline">About</Link>
          </nav>
        </header>
        {/* --- ここまで共通ヘッダー --- */}

        {children}
      </body>
    </html>
  );
}