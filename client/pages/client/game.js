import styles from "../../styles/Home.module.css";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";

export default function Game() {
  const router = useRouter();

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
    <main>
      <div className={styles.containerCol}>
        <div className={styles.column1}>
          <Link href="/client/lesson" className={styles.button2}>
            <div className={styles.japper}>Japper</div>
          </Link>

          <Link
            href="/client/lesson"
            className={
              router.pathname === "/client/lesson"
                ? styles.activeButton1
                : styles.button1
            }
          >
            <div className={styles.lesson}>Lesson</div>
          </Link>
          <Link
            href="/client/game"
            className={
              router.pathname === "/client/game"
                ? styles.activeButton1
                : styles.button1
            }
          >
            <div className={styles.lesson}>Game</div>
          </Link>
          <Link
            href="/client/flashcard"
            className={
              router.pathname === "/client/flashcard"
                ? styles.activeButton1
                : styles.button1
            }
          >
            <div className={styles.lesson}>Flashcard</div>
          </Link>
          <Link
            href="/client/account"
            className={
              router.pathname === "/client/account"
                ? styles.activeButton1
                : styles.button1
            }
          >
            <div className={styles.lesson}>Account</div>
          </Link>
        </div>

        <div className={styles.column2}>
          <div>
            <h1>Game</h1>
            <div>
              <h2>Question:</h2>
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
        </div>
      </div>
    </main>
  );
}
