import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Question from "@/models/Question";

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    await Question.findByIdAndDelete(params.id);
    return NextResponse.json({ message: "Pergunta deletada com sucesso" });
  } catch (error) {
    return NextResponse.json(
      { error: "Erro ao deletar pergunta" },
      { status: 500 }
    );
  }
}
