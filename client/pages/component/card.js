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

  //DELETE
  const handleDelete = async () => {
    try {
      const response = await client.delete(
        `http://localhost:8000/api/flashcard/${currentID + 1}`
      );

      if (response.success) {
        setDeleted(true);
        response[currentID] = null;
        setFlashCards(response[currentID]);
        // Reload the page after the update
        window.location.reload();
        notification.success({
          message: "Delete",
        });
      }
    } catch (error) {
      notification.error({ message: error });
    }
  };

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

      <button className={modules.buttonSubmit} onClick={handleDelete}>
        Delete
      </button>
    </main>
  );
}
