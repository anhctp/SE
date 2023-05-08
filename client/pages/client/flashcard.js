import styles from "../../styles/Home.module.css";
import modules from "../../styles/Lesson.module.css";
import Link from "next/link";
import { useRouter } from "next/router";
<<<<<<< HEAD
import Sidebar from "../component/sidebar";
import Card from "../component/card";
=======
import { useState } from "react";
import AddCardModal from "./addCardModal";
import { Modal } from "antd";
>>>>>>> f79664eeeff1dd636056a66f31f99dfb669a694e

export default function Flashcard() {
  const router = useRouter();

<<<<<<< HEAD
=======
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

>>>>>>> f79664eeeff1dd636056a66f31f99dfb669a694e
  return (
    <main>
      <div className={styles.containerCol}>
        <Sidebar />

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
<<<<<<< HEAD
          </Link>
          
          <Card/>
=======
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
>>>>>>> f79664eeeff1dd636056a66f31f99dfb669a694e
        </div>
      </div>
      <AddCardModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      ></AddCardModal>
    </main>
  );
}
