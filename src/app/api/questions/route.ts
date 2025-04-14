import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Question from "@/models/Question";

export async function GET() {
  try {
    await connectDB();
    const questions = await Question.find().sort({ createdAt: -1 });
    return NextResponse.json(questions);
  } catch (error) {
    return NextResponse.json(
      { error: "Erro ao buscar perguntas" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    await connectDB();
    const question = await Question.create(body);
    return NextResponse.json(question);
  } catch (error) {
    return NextResponse.json(
      { error: "Erro ao criar pergunta" },
      { status: 500 }
    );
  }
}
