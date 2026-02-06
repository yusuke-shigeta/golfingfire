"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function Home() {
  const [courseName, setCourseName] = useState("");
  const [score, setScore] = useState(90);
  const [scores, setScores] = useState<any[]>([]);

  useEffect(() => {
    const fetchScores = async () => {
      const res = await fetch("/api/scores");
      const data = await res.json();
      setScores(data);
    };
    fetchScores();
  }, []);

  // 2026/02/05 以下から日本語訳勉強start！！
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!courseName) return;

    const res = await fetch("/api/scores", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ course: courseName, score: score }),
    });

    if (res.ok) {
      const newScore = await res.json();
      setScores([newScore, ...scores]);
      setCourseName("");
      setScore(90);
    }
  };

  return (
    <main className="p-10 bg-slate-50 min-h-screen">
      <h1 className="text-4xl font-bold text-orange-600 mb-4">🔥 golfingfire</h1>
      <Link href="/about" className="text-blue-500 underline block mb-8">Aboutページへ</Link>

      <form onSubmit={handleSubmit} className="mb-10 p-6 bg-white rounded-xl shadow-md">
        <h2 className="text-lg font-bold mb-4">新スコア登録</h2>
        <div className="flex flex-col gap-4"> {/* レイアウトを整えるため縦並びに */}
          <input
            type="text"
            value={courseName}
            onChange={(e) => setCourseName(e.target.value)}
            placeholder="ゴルフ場名を入力..."
            className="border p-2 rounded text-black"
          />
          <div className="flex gap-2 items-center">
            <label className="text-black font-bold">スコア:</label>
            <input
              type="number"
              value={score}
              onChange={(e) => setScore(Number(e.target.value))}
              className="border p-2 w-24 rounded text-black"
            />
            <button type="submit" className="bg-orange-500 text-white px-6 py-2 rounded font-bold hover:bg-orange-600 transition flex-grow">
              保存
            </button>
          </div>
        </div>
      </form>

      <div className="grid gap-4">
        <h2 className="text-xl font-semibold">最新のスコア一覧</h2>
        {scores.map((s) => (
          <div key={s.id} className="p-4 bg-white shadow rounded-lg border-l-4 border-green-500 flex justify-between items-center">
            <div>
              <p className="font-bold text-lg text-black">{s.course}</p>
              <p className="text-sm text-gray-400">{new Date(s.createdAt).toLocaleDateString()}</p>
            </div>
            <p className="text-3xl font-mono font-bold text-blue-600">{s.score}</p>
          </div>
        ))}
      </div>
    </main>
  );
}