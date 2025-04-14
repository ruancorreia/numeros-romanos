const express = require("express");
const router = express.Router();
const Quiz = require("../models/Quiz");
const auth = require("../middleware/auth");

// Middleware de autenticação (simplificado)
router.use(auth);

// Adicionar nova pergunta
router.post("/questions", async (req, res) => {
  const { question, options, correctAnswer } = req.body;

  try {
    const quiz = new Quiz({ question, options, correctAnswer });
    await quiz.save();
    res.status(201).json(quiz);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Remover pergunta
router.delete("/questions/:id", async (req, res) => {
  try {
    await Quiz.findByIdAndDelete(req.params.id);
    res.json({ message: "Pergunta removida com sucesso" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Listar todas as perguntas (com respostas corretas)
router.get("/questions", async (req, res) => {
  try {
    const questions = await Quiz.find({});
    res.json(questions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
