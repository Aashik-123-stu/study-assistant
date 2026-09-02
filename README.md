# Study Assistant

Paste your notes or a topic, and get AI-generated flashcards or a quiz —
flip through cards, take the quiz, and see which questions you got wrong.

# Project Demo

[Watch the Live Demo Video]  (https://drive.google.com/file/d/1_WAwSao92Kx07jRWgShYbVz52HaRPoxt/view?usp=drivesdk)

# Features

- Generate interactive flashcards from notes or topics
- Flip flashcards to view answers
- Navigate between flashcards
- Generate multiple-choice quizzes
- Select and submit answers
- Track quiz score
- Review incorrect answers
- Loading and error states
- Empty input validation
- Responsive design for mobile and desktop
- Structured JSON output from the AI model

# Tech Stack

## Frontend
- React
- JavaScript
- CSS

## Backend
- Node.js
- Express.js
- CORS

## AI
- Google Gemini API
- `@google/genai`

# Project Structure

study-assistant/
│
├── client/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── App.css
│   │   └── ...
│   └── package.json
│
├── server/
│   ├── server.js
│   ├── generateFlashcards.js
│   ├── generateQuiz.js
│   ├── .env
│   └── package.json
│
├── .gitignore
└── README.md

# Flashcards

The user can enter notes or a topic and generate AI-powered flashcards.

Each flashcard contains:
Question
Answer

## Users can:
Flip the card
Move to the previous card
Move to the next card

# Quiz

The quiz mode generates multiple-choice questions from the provided notes or topic.

## Users can:
Select an answer
Submit the answer
See whether the answer is correct
View the correct answer when incorrect
Continue to the next question
See their final score

# AI Integration

The backend uses the Google Gemini API through the @google/genai SDK.

The AI is instructed to return structured JSON data so that the frontend can reliably parse and display the generated flashcards and quiz questions.

The Gemini API key is stored securely in the backend .env file and is never exposed to the React frontend.

# Error Handling

The application handles common failure cases such as:

Empty notes/topic
AI/API errors
Loading state while generating content
Empty flashcard or quiz state
Preventing multiple requests while content is being generated

# How it works

User enters notes/topic
        ↓
Selects Flashcards or Quiz
        ↓
Generate Study Material
        ↓
React sends request to Express backend
        ↓
Backend sends prompt to Gemini API
        ↓
Gemini returns structured JSON
        ↓
Backend sends data to React
        ↓
Interactive Flashcards / Quiz is displayed

# Installation and Setup

1. Clone the repository
git clone <YOUR_GITHUB_REPOSITORY_URL>
cd study-assistant

2. Install frontend dependencies
cd client
npm install

3. Install backend dependencies (Open in another terminal)
cd server
npm install

4. Add Gemini API Key (Create a .env file inside the server folder)
GEMINI_API_KEY=your_gemini_api_key

(Do not commit the .env file to GitHub.)

5. Start the backend (Inside the server folder)
node app.js

6. Start the frontend (Inside the client folder)
npm run dev


# Future Improvements
User authentication
Saving study sessions
Difficulty selection
Number of questions/cards selection
Progress tracking
Persistent quiz history

# Author
Aashik Ali
