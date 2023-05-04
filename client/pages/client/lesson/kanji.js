import styles from "../../../styles/Home.module.css";
import modules from "../../../styles/Lesson.module.css";
import Link from "next/link";
import { useRouter } from "next/router";
import {useState} from "react";

export default function Kanji() {
  const router = useRouter();

  const [cards, setCards] = useState([
    { question: "Question 1", answer: "Answer 1" },
    { question: "Question 2", answer: "Answer 2" },
    { question: "Question 3", answer: "Answer 3" },
    { question: "Question 4", answer: "Answer 4" },
    { question: "Question 5", answer: "Answer 5" },
  ]);
  const [currentPage, setCurrentPage] = useState(0);

  function handlePreviousPage() {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  }

  function handleNextPage() {
    if (currentPage < cards.length - 1) {
      setCurrentPage(currentPage + 1);
    }
  }

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
              router.pathname === "/client/lesson/kanji"
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
          <div className={modules.box3}>Kanji</div>

          <div className={modules.box4}></div>
          
          <div>
            <button className={modules.button} onClick={handlePreviousPage}>{"<"}</button>
            <span className="page-number">
              {currentPage + 1} / {cards.length}
            </span>
            <button className={modules.button} onClick={handleNextPage}>{">"}</button>
          </div>
        </div>
      </div>
    </main>
  );
}
