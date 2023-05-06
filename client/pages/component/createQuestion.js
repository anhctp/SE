import React, { useState } from "react";

export default function Create() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flashcards, setFlashcards] = useState([
    { id: 1, question: "What is the capital of France?", answer: "Paris" },
    {
      id: 2,
      question: "What is the largest country in the world?",
      answer: "Russia",
    },
    { id: 3, question: "What is the currency of Japan?", answer: "Yen" },
  ]);

  const currentFlashcard = flashcards[currentIndex];
  const totalPages = flashcards.length;

  const handlePrevClick = () => {
    const newIndex = currentIndex === 0 ? totalPages - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const handleNextClick = () => {
    const newIndex = currentIndex === totalPages - 1 ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  return (
    <div>
      <h1>Question</h1>
      <div>
        <p>{currentFlashcard.question}</p>
        <h2>Answer:</h2>
        <p>{currentFlashcard.answer}</p>
      </div>
      <div>
        <button onClick={handlePrevClick}>Previous</button>
        <span>
          {currentIndex + 1} / {totalPages}
        </span>
        <button onClick={handleNextClick}>Next</button>
      </div>
    </div>
  );
}
