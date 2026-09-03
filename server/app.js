import express from "express";
import cors from "cors";
import { generateFlashcards } from "./generateFlashcards.js";
import { generateQuiz } from "./generateQuiz.js";

const app = express();

app.use(cors());
app.use(express.json());

app.post("/api/flashcards", async (req, res) => {
  try {
    const { topic } = req.body;

    const flashcards = await generateFlashcards(topic);

    res.json({
      success: true,
      flashcards: flashcards
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to generate flashcards"
    });
  }
});

app.post("/api/quiz", async (req, res) => {
  try {
    const { notes } = req.body;

    const quiz = await generateQuiz(notes);

    res.json(quiz);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to generate quiz" });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});