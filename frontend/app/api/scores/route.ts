import { NextResponse } from "next/server";

// 本来はDBから取得しますが、今はメモリ上の変数に保存します
let scores = [
  { id: 1, course: "Fire Country Club", score: 72 },
];

// データを取得する (GET)
export async function GET() {
  return NextResponse.json(scores);
}

// データを保存する (POST)
export async function POST(request: Request) {
  const body = await request.json();
  const newScore = {
    id: Date.now(),
    course: body.course,
    score: body.score || 0,
  };
  
  scores = [newScore, ...scores];
  return NextResponse.json(newScore);
}