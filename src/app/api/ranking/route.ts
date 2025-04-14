import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Ranking from "@/models/Ranking";

export async function GET() {
  try {
    await connectDB();
    const ranking = await Ranking.find().sort({ score: -1, createdAt: 1 });
    return NextResponse.json(ranking);
  } catch (error) {
    return NextResponse.json(
      { error: "Erro ao buscar ranking" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    await connectDB();
    const ranking = await Ranking.create(body);
    return NextResponse.json(ranking);
  } catch (error) {
    return NextResponse.json(
      { error: "Erro ao criar ranking" },
      { status: 500 }
    );
  }
}
