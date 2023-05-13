import modules from "../../styles/Lesson.module.css";
import mode from "../../styles/flashcard.module.css";
import React, { useState, useEffect } from "react";
import client from "../../utils/client";
import { Modal, notification } from "antd";
import router from "next/router";
import AddCardModal from "../../pages/client/addCardModal";

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
    if (currentID < flashcards.length && flashcards.length > 1) {
      setCurrentID(currentID + 1);
    }
  }

  //DELETE
  const [deleted, setDeleted] = useState(false);

  const handleDelete = async () => {
    try {
      await client.delete(
        `http://localhost:8000/api/flashcard/${flashcards[currentID].id}`
      );
      setDeleted(true);
      window.location.reload();
      notification.success({
        message: "Delete",
      });
    } catch (error) {
      notification.error({ message: error });
    }
  };

  if (deleted) {
    return null;
  }

  //create
  const [isModalOpen, setIsModalOpen] = useState(false);

  //edit
  const [isEditing, setIsEditing] = useState(false);
  const [front, setFront] = useState("");
  const [back, setBack] = useState("");

  const handleEdit = () => {
    setIsEditing(true);
    setFront(flashcards[currentID].front);
    setBack(flashcards[currentID].back);
  };

  const handleSave = async () => {
    setIsEditing(false);
    try {
      const response = await client.put(
        `http://localhost:8000/api/flashcard/${flashcards[currentID].id}`,
        {
          front,
          back,
        }
      );
      window.location.reload();
      notification.success({ message: "Updated" });
    } catch (error) {
      notification.error({ message: error });
    }
  };

  if (flashcards.length === 0 || currentID + 1 > flashcards.length) {
    return (
      <main>
        <div
          className={mode.flashcard}
          style={{
            border: "black 1px solid",
            display: "flex",
            alignItems: "center",
          }}
        >
          <button
            className={modules.buttonSubmit}
            onClick={() => setIsModalOpen(true)}
          >
            {"+"}
          </button>
        </div>

        <AddCardModal
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
        ></AddCardModal>

        <span className={modules.ID_number} style={{width:'206px'}}>
          <button className={modules.button} onClick={handlePreviousID}>
            <div style={{ fontSize: "18px" }}>{"<"}</div>
          </button>

          <div style={{ margin: "0 10px", fontSize: "18px" }}>
            {currentID + 1} / {flashcards.length + 1}
          </div>

          <button className={modules.button} onClick={handleNextID}>
            <div style={{ fontSize: "18px" }}>{">"}</div>
          </button>
        </span>
      </main>
    );
  } else {
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

        <AddCardModal
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
        ></AddCardModal>

        <span className={modules.ID_number}>
          <button className={modules.buttonSubmit} onClick={handleDelete}>
            Delete
          </button>

          <button className={modules.button} onClick={handlePreviousID}>
            <div style={{ fontSize: "18px" }}>{"<"}</div>
          </button>

          <div style={{ margin: "0 10px", fontSize: "18px" }}>
            {currentID + 1} / {flashcards.length + 1}
          </div>

          <button className={modules.button} onClick={handleNextID}>
            <div style={{ fontSize: "18px" }}>{">"}</div>
          </button>

          <button className={modules.buttonSubmit} onClick={handleEdit}>
            Edit
          </button>
        </span>
        {isEditing && (
          <div>
            <input
              className={mode.input}
              type="text"
              value={front}
              onChange={(e) => setFront(e.target.value)}
            />
            <input
              className={mode.input}
              type="text"
              value={back}
              onChange={(e) => setBack(e.target.value)}
            />
            <div style={{ display: "flex", width: "300px", margin: "auto" }}>
              <button className={modules.buttonSubmit} onClick={handleSave}>
                Save
              </button>
              <button
                className={modules.buttonSubmit}
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </main>
    );
  }
}
