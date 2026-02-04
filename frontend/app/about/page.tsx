import Link from 'next/link'; // これがページ遷移に必要！

export default function AboutPage() {
  return (
    <main className="p-10">
      <h1 className="text-3xl font-bold mb-4">About golfingfire</h1>
      <p className="text-gray-700 mb-6">
        このアプリは、ゴルフへの情熱を燃やすプレイヤーのために作られました。
      </p>
      
      {/* トップページへ戻るリンク */}
      <Link href="/" className="text-blue-500 underline hover:text-blue-700">
        トップに戻る
      </Link>
    </main>
  );
}