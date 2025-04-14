"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";

interface Question {
  _id: string;
  question: string;
  options: string[];
  correctAnswer: string;
}

function QuizContent() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const searchParams = useSearchParams();
  const name = searchParams.get("name");

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get("/api/questions");
        setQuestions(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Erro ao carregar perguntas:", error);
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  const handleAnswer = async (selectedAnswer: string) => {
    const isCorrect =
      questions[currentQuestion].correctAnswer === selectedAnswer;

    if (isCorrect) {
      setScore(score + 1);
    }

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowScore(true);
      try {
        await axios.post("/api/ranking", {
          name,
          score,
        });
      } catch (error) {
        console.error("Erro ao salvar pontuação:", error);
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-2xl">Carregando...</div>
      </div>
    );
  }

  if (showScore) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md w-96 text-center">
          <h2 className="text-2xl font-bold mb-4">Quiz Finalizado!</h2>
          <p className="text-xl mb-4">
            Sua pontuação: {score} de {questions.length}
          </p>
          <button
            onClick={() => router.push("/ranking")}
            className="bg-primary text-white py-2 px-4 rounded-md hover:bg-primary-dark transition-colors"
          >
            Ver Ranking
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <div className="mb-4">
          <span className="text-gray-600">
            Pergunta {currentQuestion + 1} de {questions.length}
          </span>
        </div>
        <h2 className="text-xl font-bold mb-4">
          {questions[currentQuestion]?.question}
        </h2>
        <div className="space-y-2">
          {questions[currentQuestion]?.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswer(option)}
              className="w-full text-left p-3 border rounded-md hover:bg-gray-50 transition-colors"
            >
              {option}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Quiz() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
          <div className="text-2xl">Carregando...</div>
        </div>
      }
    >
      <QuizContent />
    </Suspense>
  );
}
