import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
  max-width: 400px;
  margin: 0 auto;
`;

const Input = styled.input`
  padding: 10px;
  font-size: 16px;
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

function Home() {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/quiz/register",
        { username }
      );
      localStorage.setItem("userId", response.data.userId);
      navigate("/quiz");
    } catch (error) {
      console.error("Erro ao registrar usuário:", error);
    }
  };

  return (
    <div>
      <h1>Quiz de Algarismos Romanos</h1>
      <p>
        Teste seu conhecimento sobre números romanos com este quiz de 30
        perguntas!
      </p>

      <Form onSubmit={handleSubmit}>
        <Input
          type="text"
          placeholder="Digite seu nome"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <Button type="submit">Iniciar Quiz</Button>
      </Form>
    </div>
  );
}

export default Home;
