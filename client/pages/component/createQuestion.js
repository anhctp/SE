import modules from "../../styles/Lesson.module.css";

import axios from "axios";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function Create() {
  const router = useRouter();
  const { id, question_id } = router.query; //vd: ủrl là /api/lesson/1 thì router.query=1

  const [questions, setQuestions] = useState([]);
  const [lessonTitle, setLessonTitle] = useState("");

  const [currentID, setCurrentID] = useState(0);
  function handlePreviousID() {
    if (currentID > 0) {
      setCurrentID(currentID - 1);
    }
  }

  function handleNextID() {
    if (currentID < questions.length - 1) {
      setCurrentID(currentID + 1);
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get(
        `http://localhost:8000/api/lesson/${id}/question/${question_id}`
      );
      setQuestions(result.data);
      if (result.data.length > 0) {
        setLessonTitle(result.data[0].title); // Lấy title đầu tiên
      }
    };

    fetchData();
  }, [id, question_id]);

  return (
    <div>
      <div className={modules.box3}>
        Lesson {id}: {lessonTitle}
      </div>
      <div className={modules.boxQuestion}>
        Question: {questions[currentID]?.question}
      </div>
      <p className={modules.p}>Choose the correct answer:</p>
      <div className={modules.boxMCQ}>
        <div className={modules.boxAnswer}>
          A: {questions[currentID]?.t_ans}
        </div>
        <div className={modules.boxAnswer}>
          B: {questions[currentID]?.t_ans}
        </div>
      </div>
      <div className={modules.boxMCQ}>
        <div className={modules.boxAnswer}>
          C: {questions[currentID]?.t_ans}
        </div>
        <div className={modules.boxAnswer}>
          D: {questions[currentID]?.t_ans}
        </div>
      </div>

      <div>
        <button className={modules.button} onClick={handlePreviousID}>
          {"<"}
        </button>
        <span className="ID-number">
          {currentID + 1} / {questions.length}
        </span>
        <button className={modules.button} onClick={handleNextID}>
          {">"}
        </button>
      </div>
    </div>
  );
}
