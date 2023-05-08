import modules from "../../styles/Lesson.module.css";

import axios from "axios";
import React, { useState, useEffect } from "react";

export default function Card() {
  const [flipped, setFlipped] = useState(false);

  const handleClick = () => {
    setFlipped(!flipped);
  };

  const [flashcards, setflashcards] = useState([]);
  const [lessonTitle, setLessonTitle] = useState("");

  // Lấy Bearer token từ header của request
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get(`http://localhost:8000/api/flashcards`);
      /*, {
        headers: {
          Authorization: `Bearer ${yourBearerTokenHere}`, //cần thay yourBearertoken
        },}
      */
      setflashcards(result.data);
      if (result.data.length > 0) {
        setLessonTitle(result.data[0].title); // Lấy title đầu tiên
      }
    };
    fetchData();
  }, []);

  const [currentID, setCurrentID] = useState(0);

  function handlePreviousID() {
    if (currentID > 0) {
      setCurrentID(currentID - 1);
    }
  }

  function handleNextID() {
    if (currentID < flashcards.length - 1) {
      setCurrentID(currentID + 1);
    }
  }

  return (
    <main>
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
