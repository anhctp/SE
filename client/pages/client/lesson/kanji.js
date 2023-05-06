import styles from "../../../styles/Home.module.css";
import modules from "../../../styles/Lesson.module.css";
import {useState} from "react";
import Sidebar from "../../component/sidebar";

export default function Kanji() {

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
        <Sidebar/>

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
