import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Ranking from "@/models/Ranking";

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    await Ranking.findByIdAndDelete(params.id);
    return NextResponse.json({
      message: "Entrada do ranking deletada com sucesso",
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Erro ao deletar entrada do ranking" },
      { status: 500 }
    );
  }
}
