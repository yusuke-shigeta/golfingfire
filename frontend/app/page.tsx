"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function Home() {
  const [courseName, setCourseName] = useState("");
  const [scores, setScores] = useState<any[]>([]);

  // --- A. APIからデータを読み込む (GET) ---
  useEffect(() => {
    const fetchScores = async () => {
      const res = await fetch("/api/scores");
      const data = await res.json();
      setScores(data);
    };
    fetchScores();
  }, []);

  // --- B. APIにデータを送る (POST) ---
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!courseName) return;

    const res = await fetch("/api/scores", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ course: courseName, score: 72 }),
    });

    if (res.ok) {
      const newScore = await res.json();
      setScores([newScore, ...scores]); // 画面に反映
      setCourseName("");
    }
  };

  return (
    <main className="p-10 bg-slate-50 min-h-screen">
      <h1 className="text-4xl font-bold text-orange-600 mb-4">🔥 golfingfire</h1>
      <Link href="/about" className="text-blue-500 underline block mb-8">Aboutページへ</Link>

      {/* --- 入力フォーム --- */}
      <form onSubmit={handleSubmit} className="mb-10 p-6 bg-white rounded-xl shadow-md">
        <h2 className="text-lg font-bold mb-4">新スコア登録</h2>
        <div className="flex gap-2">
          <input
            type="text"
            value={courseName}
            onChange={(e) => setCourseName(e.target.value)}
            placeholder="ゴルフ場名を入力..."
            className="border p-2 flex-grow rounded text-black"
          />
          <button type="submit" className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 transition">
            追加
          </button>
        </div>
      </form>

      {/* --- スコア一覧 --- */}
      <div className="grid gap-4">
        <h2 className="text-xl font-semibold">最新のスコア</h2>
        {scores.map((s) => (
          <div key={s.id} className="p-4 bg-white shadow rounded-lg border-l-4 border-green-500">
            <p className="font-bold text-lg text-black">{s.course}</p>
            <p className="text-2xl font-mono text-blue-600">Score: {s.score}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
