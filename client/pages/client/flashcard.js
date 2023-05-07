import styles from "../../styles/Home.module.css";
import modules from "../../styles/Lesson.module.css";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import AddCardModal from "./addCardModal";
import { Modal } from "antd";

export default function Flashcard() {
  const router = useRouter();

  const [cards, setCards] = useState([
    { question: "Question 1", answer: "Answer 1" },
    { question: "Question 2", answer: "Answer 2" },
    { question: "Question 3", answer: "Answer 3" },
    { question: "Question 4", answer: "Answer 4" },
    { question: "Question 5", answer: "Answer 5" },
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);
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
          <div
            style={{ cursor: "pointer" }}
            className={
              router.pathname === "/client/flashcard"
                ? modules.box3
                : modules.box3
            }
            onClick={() => setIsModalOpen(true)}
          >
            Create Flashcard
          </div>

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
        </div>
      </div>
      <AddCardModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      ></AddCardModal>
    </main>
  );
}
