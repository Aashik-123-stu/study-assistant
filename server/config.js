import { GoogleGenAI } from "@google/genai";
import "dotenv/config";

const API_KEY = process.env.GEMINI_API_KEY;

export const client = new GoogleGenAI({
  apiKey: API_KEY
});

export const MODEL = "gemini-3.5-flash-lite";