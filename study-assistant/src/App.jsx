import { useState } from "react";
import "./App.css";

function App() {
  const [notes, setNotes] = useState("");
  const [mode, setMode] = useState("flashcards");
  const [flashcards, setFlashcards] = useState([]);
  const [loading, setLoading] = useState(false);
  const [flashcardLoading, setFlashcardLoading] = useState(false);
  const [quizLoading, setQuizLoading] = useState(false);
  //const [error, setError] = useState("");
  const [flashcardError, setFlashcardError] = useState("");
  const [quizError, setQuizError] = useState("");
  const [currentCard, setCurrentCard] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
 // states for quiz
  const [quiz, setQuiz] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [quizFinished, setQuizFinished] = useState(false);
  // state for wrong answer
  const [wrongAnswers, setWrongAnswers] = useState([]);
  const [answerSubmitted, setAnswerSubmitted] = useState(false);

  const [view, setView] = useState("home"); // "home" | "flashcards" | "quiz"

    const handleGoFlashcards = () => {
      setView("flashcards");
      generateFlashcards();
      setNotes("");   // to empty text area
    };

    const handleGoQuiz = () => {
      setView("quiz");
      generateQuizFromNotes();
      setNotes("");   // to empty text area
    };

    const goHome = () => setView("home");

  const generateFlashcards = async () => {
   // empty input  ko handle
    if (!notes.trim()) {
    setFlashcardError("Please enter some notes or a topic.");
    return;
  }

  setFlashcardLoading(true);
  setFlashcardError("");
  try {
    const response = await fetch("https://study-assistant-grpj.onrender.com/api/flashcards", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        topic: notes,
      }),
    });
  
    if (!response.ok) {
      throw new Error("Failed to generate flashcards");
    }

    const data = await response.json();
    
    if (!data || data.length === 0) {
      throw new Error("No flashcards were generated.");
    }

    if (!data.success) {
      throw new Error(data.message);
    }

    setFlashcards(data.flashcards);
    setCurrentCard(0);
    setShowAnswer(false);

  } catch (error) {
    setFlashcardError(error.message);
  }
 finally {
    setFlashcardLoading(false);
  }
};

  const generateQuizFromNotes = async () => {
     if (!notes.trim()) {
    setQuizError("Please enter some notes or a topic.");
    return;
  }

 setQuizLoading(true);
  setQuizError("");

  try {
    const response = await fetch("https://study-assistant-grpj.onrender.com/api/quiz", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ notes }),
    });

     if (!response.ok) {
      throw new Error("Failed to generate quiz");
    }

    const data = await response.json();

    setQuiz(data);
    setCurrentQuestion(0);
    setScore(0);
    setSelectedAnswer("");
    setQuizFinished(false);
    setMode("quiz");
    
  } catch (err) {
  setQuizError(error.message);
} finally {
  setQuizLoading(false);
}
};

return (
  <div className="app">
    {view === "home" && (
      <>
        <h1 className="app-title">AI Study Assistant</h1>
        <p className="app-subtitle">Turn your Notes into flashcards or a quiz.</p>

        <textarea
          className="notes-input"
          placeholder="Paste your notes or enter a topic..."
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />

        {!notes.trim() && (
          <p className="hint-text">
            Paste your Notes or type a topic above, then pick Flashcards or Quiz to get started.
          </p>
        )}

        <div className="mode-select">
          <button
            className="btn btn-primary mode-btn"
            onClick={handleGoFlashcards}
            disabled={!notes.trim()}
          >
             Flashcards
          </button>
          <button
            className="btn btn-primary mode-btn"
            onClick={handleGoQuiz}
            disabled={!notes.trim()}
          >
            📝 Quiz
          </button>
        </div>
        
      </>
    )}

    {/* ---------------------for flashcards------------------------------------- */}
    {view === "flashcards" && (
      <div className="panel flashcard-panel">

        {flashcardLoading && <p className="status-text">Generating flashcards...</p>}

        {flashcardError && <p className="error-message">{flashcardError}</p>}

        {!flashcardLoading && flashcards.length === 0 && !flashcardError && (
          <p className="status-text status-text--empty">
            No flashcards yet. Enter your notes or topic and click on Generate Flashcards.
          </p>
        )}

        {flashcards.length > 0 && (
          <div className="flashcard-section">
            <h2 className="panel-title">Flashcards</h2>

            <div className={`flashcard-card ${showAnswer ? "is-flipped" : ""}`}>
              {!showAnswer ? (
                <>
                  <h3 className="flashcard-card__label">Question</h3>
                  <p className="flashcard-card__text">{flashcards[currentCard].question}</p>
                </>
              ) : (
                <>
                  <h3 className="flashcard-card__label">Answer</h3>
                  <p className="flashcard-card__text">{flashcards[currentCard].answer}</p>
                </>
              )}
            </div>

            <button className="btn btn-outline flip-btn" onClick={() => setShowAnswer(!showAnswer)}>
              {showAnswer ? "Show Question" : "Flip the Card (Show Answer)"}
            </button>

            <div className="flashcard-nav">
              <button
                className="btn btn-ghost"
                disabled={currentCard === 0}
                onClick={() => {
                  setCurrentCard(currentCard - 1);
                  setShowAnswer(false);
                }}
              >
                Previous
              </button>

              <span className="flashcard-counter">
                {currentCard + 1} / {flashcards.length}
              </span>

              <button
                className="btn btn-ghost"
                disabled={currentCard === flashcards.length - 1}
                onClick={() => {
                  setCurrentCard(currentCard + 1);
                  setShowAnswer(false);
                }}
              >
                Next
              </button>
            </div>
          </div>
        )}
        <br/><br/>
         <button className="btn btn-ghost back-btn" onClick={goHome}>← Back</button>
      </div>
    )}

    {/* ------------------- for quiz ------------------------------------- */}
    {view === "quiz" && (
      <div className="panel quiz-panel">

        {quizLoading && <p className="status-text">Generating Quiz...</p>}

        {quizError && <p className="error-message">{quizError}</p>}

        {!quizLoading && quiz.length === 0 && !quizError && (
          <p className="status-text status-text--empty">
            No Quiz yet. Enter your notes or topic and click on Generate Quiz.
          </p>
        )}

        {quiz.length > 0 && !quizFinished && (
          <div className="quiz-active">
            <h2 className="panel-title">Quiz</h2>
            <h3 className="quiz-progress">Question {currentQuestion + 1} / {quiz.length}</h3>
            <p className="quiz-question">{quiz[currentQuestion].question}</p>

            <div className="quiz-options">
              {quiz[currentQuestion].options.map((option) => {
                const isCorrectAnswer = option === quiz[currentQuestion].answer;
                const isPickedAnswer = option === selectedAnswer;

                let stateClass = "";
                if (answerSubmitted && isCorrectAnswer) stateClass = "is-correct";
                else if (answerSubmitted && isPickedAnswer && !isCorrectAnswer) stateClass = "is-wrong";
                else if (!answerSubmitted && isPickedAnswer) stateClass = "is-selected";

                return (
                  <button
                    key={option}
                    className={`quiz-option ${stateClass}`}
                    onClick={() => setSelectedAnswer(option)}
                    disabled={answerSubmitted}
                  >
                    {option}
                  </button>
                );
              })}
            </div>

            <button
              className="btn btn-primary submit-btn"
              disabled={!selectedAnswer || answerSubmitted}
              onClick={() => {
                const currentQuiz = quiz[currentQuestion];
                setAnswerSubmitted(true);
                if (selectedAnswer === currentQuiz.answer) {
                  setScore(score + 1);
                } else {
                  setWrongAnswers((prev) => [...prev, currentQuiz]);
                }
              }}
            >
              Submit Answer
            </button>

            {answerSubmitted && (
              <div className={`quiz-feedback ${selectedAnswer === quiz[currentQuestion].answer ? "is-correct" : "is-wrong"}`}>
                {selectedAnswer === quiz[currentQuestion].answer ? (
                  <p className="quiz-feedback__text">✅ Correct!</p>
                ) : (
                  <p className="quiz-feedback__text">
                    ❌ Oops.. Wrong! Correct answer is: {quiz[currentQuestion].answer}
                  </p>
                )}

                <button
                  className="btn btn-primary"
                  onClick={() => {
                    if (currentQuestion === quiz.length - 1) {
                      setQuizFinished(true);
                    } else {
                      setCurrentQuestion(currentQuestion + 1);
                      setSelectedAnswer("");
                      setAnswerSubmitted(false);
                    }
                  }}
                >
                  {currentQuestion === quiz.length - 1 ? "Finish Quiz" : "Next Question"}
                </button>
              </div>
            )}
          </div>
        )}

        {quizFinished && (
          <div className="quiz-score">
            <h2 className="panel-title">Quiz Finished 🎉</h2>
            <p className="quiz-score__number">Score: {score} / {quiz.length}</p>
            <p className="quiz-score__meta">Total Wrong Answers: {wrongAnswers.length}</p>
            <button className="btn btn-ghost back-btn" onClick={goHome}>← Back to Home</button>
          </div>
        )}
        <br/> <br/>
        <button className="btn btn-ghost back-btn" onClick={goHome}>← Back</button>
      </div>
    )}
  </div>
);


}

export default App;