import { client, MODEL } from "./config.js";

export async function generateQuiz(notes) {
  const response = await client.models.generateContent({
    model: MODEL,
    contents: `
Create 5 multiple-choice quiz questions from these notes.

Return ONLY valid JSON in this format:
[
  {
    "question": "Question here",
    "options": ["A", "B", "C", "D"],
    "answer": "A"
  }
]

Notes:
${notes}
`,
  });

  const text = response.text.trim();

  const cleanText = text
  .replace(/^```json\s*/, "")
  .replace(/^```\s*/, "")
  .replace(/```$/, "")
  .trim();

return JSON.parse(cleanText);
}