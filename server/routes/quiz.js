const express = require("express");
const router = express.Router();
const Quiz = require("../models/Quiz");
const User = require("../models/User");

// Obter todas as perguntas
router.get("/questions", async (req, res) => {
  try {
    const questions = await Quiz.find({}, "-correctAnswer");
    res.json(questions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Registrar novo usuário
router.post("/register", async (req, res) => {
  const { username } = req.body;

  try {
    const user = new User({ username, score: 0 });
    await user.save();
    res.json({ userId: user._id });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Submeter respostas e calcular pontuação
router.post("/submit", async (req, res) => {
  const { userId, answers } = req.body;

  try {
    // Obter todas as perguntas com respostas corretas
    const questions = await Quiz.find({});

    // Calcular pontuação
    let score = 0;
    questions.forEach((question) => {
      if (answers[question._id] === question.correctAnswer) {
        score++;
      }
    });

    // Atualizar usuário
    const user = await User.findByIdAndUpdate(
      userId,
      { score, completedAt: new Date() },
      { new: true }
    );

    res.json({ score, total: questions.length });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Obter ranking
router.get("/ranking", async (req, res) => {
  try {
    const ranking = await User.find({ score: { $gt: 0 } })
      .sort({ score: -1, completedAt: 1 })
      .limit(10);
    res.json(ranking);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
