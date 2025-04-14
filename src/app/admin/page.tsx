"use client";

import { useState, useEffect } from "react";
import axios from "axios";

interface Question {
  _id: string;
  question: string;
  options: string[];
  correctAnswer: string;
}

interface RankingEntry {
  _id: string;
  name: string;
  score: number;
}

export default function Admin() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [ranking, setRanking] = useState<RankingEntry[]>([]);
  const [newQuestion, setNewQuestion] = useState({
    question: "",
    options: ["", "", "", ""],
    correctAnswer: "",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [questionsRes, rankingRes] = await Promise.all([
        axios.get("/api/questions"),
        axios.get("/api/ranking"),
      ]);
      setQuestions(questionsRes.data);
      setRanking(rankingRes.data);
      setLoading(false);
    } catch (error) {
      console.error("Erro ao carregar dados:", error);
      setLoading(false);
    }
  };

  const handleAddQuestion = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post("/api/questions", newQuestion);
      setNewQuestion({
        question: "",
        options: ["", "", "", ""],
        correctAnswer: "",
      });
      fetchData();
    } catch (error) {
      console.error("Erro ao adicionar pergunta:", error);
    }
  };

  const handleDeleteQuestion = async (id: string) => {
    try {
      await axios.delete(`/api/questions/${id}`);
      fetchData();
    } catch (error) {
      console.error("Erro ao deletar pergunta:", error);
    }
  };

  const handleDeleteRanking = async (id: string) => {
    try {
      await axios.delete(`/api/ranking/${id}`);
      fetchData();
    } catch (error) {
      console.error("Erro ao deletar ranking:", error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-2xl">Carregando...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8 text-primary">
          Painel Administrativo
        </h1>

        {/* Adicionar Nova Pergunta */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-xl font-bold mb-4">Adicionar Nova Pergunta</h2>
          <form onSubmit={handleAddQuestion} className="space-y-4">
            <div>
              <label className="block text-gray-700 mb-2">Pergunta</label>
              <input
                type="text"
                value={newQuestion.question}
                onChange={(e) =>
                  setNewQuestion({ ...newQuestion, question: e.target.value })
                }
                className="w-full p-2 border rounded"
                required
              />
            </div>
            {newQuestion.options.map((option, index) => (
              <div key={index}>
                <label className="block text-gray-700 mb-2">
                  Opção {index + 1}
                </label>
                <input
                  type="text"
                  value={option}
                  onChange={(e) => {
                    const newOptions = [...newQuestion.options];
                    newOptions[index] = e.target.value;
                    setNewQuestion({ ...newQuestion, options: newOptions });
                  }}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
            ))}
            <div>
              <label className="block text-gray-700 mb-2">
                Resposta Correta
              </label>
              <select
                value={newQuestion.correctAnswer}
                onChange={(e) =>
                  setNewQuestion({
                    ...newQuestion,
                    correctAnswer: e.target.value,
                  })
                }
                className="w-full p-2 border rounded"
                required
              >
                <option value="">Selecione a resposta correta</option>
                {newQuestion.options.map((option, index) => (
                  <option key={index} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
            <button
              type="submit"
              className="bg-primary text-white py-2 px-4 rounded hover:bg-primary-dark"
            >
              Adicionar Pergunta
            </button>
          </form>
        </div>

        {/* Lista de Perguntas */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-xl font-bold mb-4">Perguntas</h2>
          <div className="space-y-4">
            {questions.map((question) => (
              <div
                key={question._id}
                className="border p-4 rounded flex justify-between items-center"
              >
                <div>
                  <p className="font-semibold">{question.question}</p>
                  <p className="text-sm text-gray-500">
                    Resposta correta: {question.correctAnswer}
                  </p>
                </div>
                <button
                  onClick={() => handleDeleteQuestion(question._id)}
                  className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600"
                >
                  Deletar
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Ranking */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4">Ranking</h2>
          <div className="space-y-4">
            {ranking.map((entry) => (
              <div
                key={entry._id}
                className="border p-4 rounded flex justify-between items-center"
              >
                <div>
                  <p className="font-semibold">{entry.name}</p>
                  <p className="text-sm text-gray-500">{entry.score} pontos</p>
                </div>
                <button
                  onClick={() => handleDeleteRanking(entry._id)}
                  className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600"
                >
                  Deletar
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
