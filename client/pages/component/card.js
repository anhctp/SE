import modules from "../../styles/Lesson.module.css";
import mode from "../../styles/flashcard.module.css";
import React, { useState, useEffect } from "react";
import client from "../../utils/client";
<<<<<<< HEAD
=======
import { notification } from "antd";
import router from "next/router";
>>>>>>> 977da106c498ea1f8ec431795f08efc6929439f2

export default function Card() {
  /* View flashcards */
  const [flashcards, setFlashCards] = useState([]);

  useEffect(() => {
<<<<<<< HEAD
    const fetchData = async () => {
      const result = await client.get("flashcards")
      console.log(result)
      /*, {
        headers: {
          Authorization: `Bearer ${yourBearerTokenHere}`, //cần thay yourBearertoken
        },}
      */
      setflashcards(result.data);
      if (result.data.length > 0) {
        setLessonTitle(result.data[0].title); // Lấy title đầu tiên
=======
    const getFlashCards = async () => {
      try {
        const response = await client.get("flashcards");
        setFlashCards(response[0]);
      } catch (error) {
        notification.error({ message: "Bạn chưa đăng nhập" });
        router.push("../auth/login");
>>>>>>> 977da106c498ea1f8ec431795f08efc6929439f2
      }
    };
    getFlashCards();
  }, []);

  const [currentID, setCurrentID] = useState(0);
  function handlePreviousID() {
    if (currentID > 0) {
      setCurrentID(currentID - 1);
    }
  }

  function handleNextID() {
    if (currentID < flashcards.length - 1 && flashcards.length > 1) {
      setCurrentID(currentID + 1);
    }
  }

  return (
    <main>
      {flashcards.length > 0 && (
        <div className={mode.flashcard}>
          <div className={mode.front}>
            <p>{flashcards[currentID].front}</p>
          </div>
          <div className={mode.back}>
            <p>{flashcards[currentID].back}</p>
          </div>
        </div>
      )}

      <span className={modules.ID_number}>
        <button className={modules.button} onClick={handlePreviousID}>
          <div style={{ fontSize: "18px" }}>{"<"}</div>
        </button>

        <div style={{ margin: "0 10px", fontSize: "18px" }}>
          {currentID + 1} / {flashcards.length}
        </div>

        <button className={modules.button} onClick={handleNextID}>
          <div style={{ fontSize: "18px" }}>{">"}</div>
        </button>
      </span>
    </main>
  );
}
