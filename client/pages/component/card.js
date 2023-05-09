import modules from "../../styles/Lesson.module.css";
import mode from "../../styles/flashcard.module.css";
import axios from "axios";
import React, { useState, useEffect } from "react";
import cookie from "cookie";

export default function Card() {
  /* View flashcards */
  const [flashcards, setflashcards] = useState([]);

  // Truy cập thông tin người dùng từ Cookie
  useEffect(() => {
    const fetchData = async () => {
      // Make a request to retrieve the CSRF token
      await axios.get("http://localhost:8000/sanctum/csrf-cookie", {
        withCredentials: true, // Send cookies in cross-origin requests
      });

      // Get the CSRF token from the cookie
      const token = cookie.parse(document.cookie)["XSRF-TOKEN"];

      // Set the Authorization header with the bearer token
      if (token) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      }

      const result = await axios
        .get(`http://localhost:8000/api/flashcards`)
        .catch((error) => {
          if (error.response.status === 401 || error.response.status === 419) {
            //Redirect the user to the login page
            window.location.href = "../../../../auth/login";
          }
        });
      setflashcards(result.data);
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

  /* Update, Delete flashcard */
  const [isEditing, setIsEditing] = useState(false);
  const [front, setFront] = useState("");
  const [back, setBack] = useState("");

  const handleUpdate = () => {
    // handle save here
    setIsEditing(false);
  };

  const handleSave = async () => {
    setIsEditing(false);
    // Make a request to retrieve the CSRF token
    await axios.get("http://localhost:8000/sanctum/csrf-cookie", {
      withCredentials: true, // Send cookies in cross-origin requests
    });

    // Get the CSRF token from the cookie
    const token = cookie.parse(document.cookie)["XSRF-TOKEN"];

    // Set the Authorization header with the bearer token
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
    try {
      const response = await axios.put(
        `http://localhost:8000/api/flashcard/${currentID}`,
        {
          front,
          back,
        }
      );
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  //DELETE
  const [deleted, setDeleted] = useState(false);

  const handleDelete = async () => {
    setIsEditing(false);
    // Make a request to retrieve the CSRF token
    await axios.get("http://localhost:8000/sanctum/csrf-cookie", {
      withCredentials: true, // Send cookies in cross-origin requests
    });

    // Get the CSRF token from the cookie
    const token = cookie.parse(document.cookie)["XSRF-TOKEN"];

    // Set the Authorization header with the bearer token
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }

    const response = await axios.delete(
      `http://localhost:8000/api/flashcard/${currentID}`
    );

    if (response.success) {
      setDeleted(true);
    } else {
      console.error(response.error);
    }
  };

  if (deleted) {
    return null;
  }

  return (
    <main>
      {flashcards.map((flashcard) => (
        <div className={mode.flashcard} onClick={handleClick}>
          <div className={mode.front}>
            <p>{flashcard.front}</p>
          </div>
          <div className={mode.back}>
            <p>{flashcard.back}</p>
          </div>
        </div>
      ))}

      {!isEditing && (
        <button className={modules.buttonSubmit} onClick={handleUpdate}>
          Update
        </button>
      )}
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
          <button className={modules.buttonSubmit} onClick={handleSave}>
            Save
          </button>
        </div>
      )}

      <button className={modules.buttonSubmit} onClick={handleDelete}>
        Delete
      </button>

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
