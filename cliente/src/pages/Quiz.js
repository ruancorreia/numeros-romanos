import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";

const QuizContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

const QuestionCard = styled.div`
  background: #f9f9f9;
  padding: 20px;
  margin-bottom: 20px;
  border-radius: 8px;
`;

const OptionButton = styled.button`
  display: block;
  width: 100%;
  padding: 10px;
  margin: 5px 0;
  text-align: left;
  background: ${(props) => (props.selected ? "#4CAF50" : "#fff")};
  color: ${(props) => (props.selected ? "white" : "#333")};
  border: 1px solid #ddd;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background: ${(props) => (props.selected ? "#45a049" : "#f0f0f0")};
  }
`;

const Navigation = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
`;

const SubmitButton = styled.button`
  padding: 10px 20px;
  background-color: #4caf50;
  color: white;
  border: none;
  cursor: pointer;
  font-size: 16px;

  &:hover {
    background-color: #45a049;
  }
`;

function Quiz() {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/quiz/questions"
        );
        setQuestions(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Erro ao carregar perguntas:", error);
      }
    };

    fetchQuestions();
  }, []);

  const handleAnswerSelect = (questionId, answer) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: answer,
    }));
  };

  const handleNext = () => {
    setCurrentQuestion((prev) => Math.min(prev + 1, questions.length - 1));
  };

  const handlePrev = () => {
    setCurrentQuestion((prev) => Math.max(prev - 1, 0));
  };

  const handleSubmit = async () => {
    const userId = localStorage.getItem("userId");
    try {
      await axios.post("http://localhost:5000/api/quiz/submit", {
        userId,
        answers,
      });
      navigate("/results");
    } catch (error) {
      console.error("Erro ao submeter respostas:", error);
    }
  };

  if (loading) return <div>Carregando perguntas...</div>;
  if (questions.length === 0) return <div>Nenhuma pergunta encontrada.</div>;

  const question = questions[currentQuestion];

  return (
    <QuizContainer>
      <h2>
        Pergunta {currentQuestion + 1} de {questions.length}
      </h2>

      <QuestionCard>
        <h3>{question.question}</h3>
        {question.options.map((option, index) => (
          <OptionButton
            key={index}
            selected={answers[question._id] === option}
            onClick={() => handleAnswerSelect(question._id, option)}
          >
            {option}
          </OptionButton>
        ))}
      </QuestionCard>

      <Navigation>
        <button onClick={handlePrev} disabled={currentQuestion === 0}>
          Anterior
        </button>

        {currentQuestion < questions.length - 1 ? (
          <button onClick={handleNext}>Próxima</button>
        ) : (
          <SubmitButton onClick={handleSubmit}>Finalizar Quiz</SubmitButton>
        )}
      </Navigation>
    </QuizContainer>
  );
}

export default Quiz;
