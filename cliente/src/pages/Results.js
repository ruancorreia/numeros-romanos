import { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";

const ResultsContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

const RankingTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;

  th,
  td {
    padding: 12px;
    text-align: left;
    border-bottom: 1px solid #ddd;
  }

  th {
    background-color: #4caf50;
    color: white;
  }

  tr:nth-child(even) {
    background-color: #f2f2f2;
  }

  tr:hover {
    background-color: #ddd;
  }
`;

function Results() {
  const [ranking, setRanking] = useState([]);
  const [userResult, setUserResult] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const userId = localStorage.getItem("userId");

        // Obter ranking geral
        const rankingResponse = await axios.get(
          "http://localhost:5000/api/quiz/ranking"
        );
        setRanking(rankingResponse.data);

        // Obter resultado do usuário atual
        if (userId) {
          const userResponse = await axios.get(
            `http://localhost:5000/api/quiz/results/${userId}`
          );
          setUserResult(userResponse.data);
        }

        setLoading(false);
      } catch (error) {
        console.error("Erro ao carregar resultados:", error);
      }
    };

    fetchResults();
  }, []);

  if (loading) return <div>Carregando resultados...</div>;

  return (
    <ResultsContainer>
      <h1>Resultados do Quiz</h1>

      {userResult && (
        <div>
          <h2>Seu Resultado</h2>
          <p>
            Você acertou {userResult.score} de {userResult.total} perguntas!
          </p>
        </div>
      )}

      <h2>Ranking</h2>
      <RankingTable>
        <thead>
          <tr>
            <th>Posição</th>
            <th>Nome</th>
            <th>Pontuação</th>
          </tr>
        </thead>
        <tbody>
          {ranking.map((user, index) => (
            <tr key={user._id}>
              <td>{index + 1}</td>
              <td>{user.username}</td>
              <td>{user.score}</td>
            </tr>
          ))}
        </tbody>
      </RankingTable>
    </ResultsContainer>
  );
}

export default Results;
