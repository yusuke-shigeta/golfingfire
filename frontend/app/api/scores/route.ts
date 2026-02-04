import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma"; // さっき作ったファイルをインポート

// DBから全スコアを取得する (GET)
export async function GET() {
  const scores = await prisma.score.findMany({
    orderBy: { createdAt: "desc" }, // 新しい順に並べる
  });
  return NextResponse.json(scores);
}

// DBに新しいスコアを保存する (POST)
export async function POST(request: Request) {
  const body = await request.json();
  
  // prisma.score.create でDBに挿入！
  const newScore = await prisma.score.create({
    data: {
      course: body.course,
      score: Number(body.score) || 0, // 数字として保存
      player: "Yusuke", // とりあえず固定
    },
  });

  return NextResponse.json(newScore);
}