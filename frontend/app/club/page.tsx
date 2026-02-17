import { getAllClub } from "@/lib/mdx";
import Link from "next/link";

export default async function ReviewListPage() {
  const reviews = await getAllClub();

  return (
    <main className="p-10 bg-slate-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-8 text-black">クラブレビュー一覧</h1>
      <div className="grid gap-4 md:grid-cols-2">
        {reviews.map((review: any) => (
          <Link key={review.slug} href={`/club/${review.slug}`}>
            <div className="p-6 bg-white shadow rounded-xl hover:shadow-lg transition">
              <p className="text-sm text-green-600 font-bold">{review.brand}</p>
              <h2 className="text-xl font-bold text-black">{review.title}</h2>
              <p className="text-gray-400 text-sm">{review.date}</p>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}