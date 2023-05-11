import modules from "../../styles/Lesson.module.css";
import mode from "../../styles/flashcard.module.css";
import React, { useState, useEffect } from "react";
import client from "../../utils/client";
import { notification } from "antd";
import router from "next/router";

export default function Card() {
  /* View flashcards */
  const [flashcards, setFlashCards] = useState([]);

  useEffect(() => {
    const getFlashCards = async () => {
      try {
        const response = await client.get("flashcards");
        setFlashCards(response[0]);
      } catch (error) {
        notification.error({ message: "Bạn chưa đăng nhập" });
        router.push("../auth/login");
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
      
      <div>
        <button className={modules.button} onClick={handlePreviousID}>
          {"<"}
        </button>
        <span className="ID-number">
          {currentID + 1} / {flashcards.length}
        </span>
        <button className={modules.button} onClick={handleNextID}>
          {">"}
        </button>
      </div>
    </main>
  );
}
