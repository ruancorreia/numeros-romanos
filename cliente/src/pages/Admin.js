import { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";

const AdminContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-bottom: 30px;
`;

const Input = styled.input`
  padding: 10px;
  font-size: 16px;
`;

const TextArea = styled.textarea`
  padding: 10px;
  font-size: 16px;
  min-height: 100px;
`;

const Button = styled.button`
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

const QuestionList = styled.ul`
  list-style: none;
  padding: 0;
`;

const QuestionItem = styled.li`
  background: #f9f9f9;
  padding: 15px;
  margin-bottom: 10px;
  border-radius: 5px;
  display: flex;
  justify-content: space-between;
`;

function Admin() {
  const [questions, setQuestions] = useState([]);
  const [newQuestion, setNewQuestion] = useState({
    question: "",
    options: ["", "", "", ""],
    correctAnswer: "",
  });
  const [loading, setLoading] = useState(true);
  const [authToken, setAuthToken] = useState("");

  useEffect(() => {
    const token = prompt("Digite o token de administração:");
    if (token) {
      setAuthToken(token);
      fetchQuestions(token);
    }
  }, []);

  const fetchQuestions = async (token) => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/admin/questions",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setQuestions(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Erro ao carregar perguntas:", error);
      alert("Acesso não autorizado");
      window.location.href = "/";
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewQuestion((prev) => ({ ...prev, [name]: value }));
  };

  const handleOptionChange = (index, value) => {
    const newOptions = [...newQuestion.options];
    newOptions[index] = value;
    setNewQuestion((prev) => ({ ...prev, options: newOptions }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "http://localhost:5000/api/admin/questions",
        newQuestion,
        {
          headers: { Authorization: `Bearer ${authToken}` },
        }
      );
      setNewQuestion({
        question: "",
        options: ["", "", "", ""],
        correctAnswer: "",
      });
      fetchQuestions(authToken);
    } catch (error) {
      console.error("Erro ao adicionar pergunta:", error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Tem certeza que deseja remover esta pergunta?")) {
      try {
        await axios.delete(`http://localhost:5000/api/admin/questions/${id}`, {
          headers: { Authorization: `Bearer ${authToken}` },
        });
        fetchQuestions(authToken);
      } catch (error) {
        console.error("Erro ao remover pergunta:", error);
      }
    }
  };

  if (loading) return <div>Carregando...</div>;

  return (
    <AdminContainer>
      <h1>Painel Administrativo</h1>

      <h2>Adicionar Nova Pergunta</h2>
      <Form onSubmit={handleSubmit}>
        <Input
          type="text"
          name="question"
          placeholder="Pergunta"
          value={newQuestion.question}
          onChange={handleInputChange}
          required
        />

        {newQuestion.options.map((option, index) => (
          <Input
            key={index}
            type="text"
            placeholder={`Opção ${index + 1}`}
            value={option}
            onChange={(e) => handleOptionChange(index, e.target.value)}
            required
          />
        ))}

        <Input
          type="text"
          name="correctAnswer"
          placeholder="Resposta Correta"
          value={newQuestion.correctAnswer}
          onChange={handleInputChange}
          required
        />

        <Button type="submit">Adicionar Pergunta</Button>
      </Form>

      <h2>Lista de Perguntas ({questions.length})</h2>
      <QuestionList>
        {questions.map((q) => (
          <QuestionItem key={q._id}>
            <div>
              <h3>{q.question}</h3>
              <p>Opções: {q.options.join(", ")}</p>
              <p>Resposta correta: {q.correctAnswer}</p>
            </div>
            <button onClick={() => handleDelete(q._id)}>Remover</button>
          </QuestionItem>
        ))}
      </QuestionList>
    </AdminContainer>
  );
}

export default Admin;
