"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

interface RankingEntry {
  _id: string;
  name: string;
  score: number;
  createdAt: string;
}

export default function Ranking() {
  const [ranking, setRanking] = useState<RankingEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchRanking = async () => {
      try {
        const response = await axios.get("/api/ranking");
        setRanking(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Erro ao carregar ranking:", error);
        setLoading(false);
      }
    };

    fetchRanking();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-2xl">Carregando...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white p-8 rounded-lg shadow-md">
          <h1 className="text-3xl font-bold text-center mb-8 text-primary">
            Ranking
          </h1>
          <div className="space-y-4">
            {ranking.map((entry, index) => (
              <div
                key={entry._id}
                className="flex items-center justify-between p-4 border rounded-md"
              >
                <div className="flex items-center">
                  <span className="text-2xl font-bold mr-4">{index + 1}º</span>
                  <div>
                    <p className="font-semibold">{entry.name}</p>
                    <p className="text-sm text-gray-500">
                      {new Date(entry.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <span className="text-xl font-bold">{entry.score} pontos</span>
              </div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <button
              onClick={() => router.push("/")}
              className="bg-primary text-white py-2 px-4 rounded-md hover:bg-primary-dark transition-colors"
            >
              Voltar ao Início
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
