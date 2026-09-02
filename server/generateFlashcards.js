import { GoogleGenAI, Type } from "@google/genai";
import "dotenv/config";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY
});

async function generateFlashcards(topic) {

  const response = await ai.models.generateContent({
    model: "gemini-3.5-flash-lite",

    contents: `
      You are an expert tutor creating study flashcards.
          Topic / notes:
          """
          ${topic}
          """
          Create exactly 5 flashcards that test real understanding of this material — not just definition recall.

          Guidelines:
          - Mix question types: include at least one "why" or "how" question, one comparison or application question, and one that tests a common misconception or edge case.
          - Avoid yes/no questions and questions answerable with a single word.
          - Each answer should be 1-3 sentences — enough to actually explain the concept, not just name it.
          - Base every question strictly on the topic/notes provided. Do not introduce outside facts.
          - Vary difficulty slightly across the 5 cards: 2 foundational, 2 intermediate, 1 that pushes deeper understanding.

          Return ONLY valid JSON, with no markdown formatting, no code fences, and no text before or after it, in exactly this shape:

          [
            { "question": "string", "answer": "string" },
            { "question": "string", "answer": "string" },
            { "question": "string", "answer": "string" },
            { "question": "string", "answer": "string" },
            { "question": "string", "answer": "string" }
          ]
          `,

    config: {
      responseMimeType: "application/json",

      responseSchema: {
        type: Type.ARRAY,

        items: {
          type: Type.OBJECT,

          properties: {
            question: {
              type: Type.STRING
            },

            answer: {
              type: Type.STRING
            }
          },

          required: ["question", "answer"]
        }
      }
    }
  });

  return JSON.parse(response.text);
}

export { generateFlashcards };