import modules from "../../styles/Lesson.module.css";
import { useState } from "react";

export default function Card() {
  const [cards, setCards] = useState([
    { question: "Question 1", answer: "Answer 1" },
    { question: "Question 2", answer: "Answer 2" },
    { question: "Question 3", answer: "Answer 3" },
    { question: "Question 4", answer: "Answer 4" },
    { question: "Question 5", answer: "Answer 5" },
  ]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);

  const handleClick = () => {
    setFlipped(!flipped);
  };

  const handleNextCard = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === cards.length - 1 ? 0 : prevIndex + 1
    );
    setFlipped(false);
  };

  const handlePrevCard = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? cards.length - 1 : prevIndex - 1
    );
    setFlipped(false);
  };

  return (
    <main>
      <div
        className={`${modules.flashcard} ${flipped ? modules.hover : ""}`}
        onClick={handleClick}
      >
        <div className={modules.front}>
          <p>This is the front of the card.</p>
        </div>
        <div className={modules.back}>
          <p>This is the back of the card.</p>
        </div>
      </div>

      <div>
        <button className={modules.button} onClick={handlePrevCard}>
          {"<"}
        </button>
        <span className="page-number">
          {currentIndex + 1} / {cards.length}
        </span>
        <button className={modules.button} onClick={handleNextCard}>
          {">"}
        </button>
      </div>
    </main>
  );
}
