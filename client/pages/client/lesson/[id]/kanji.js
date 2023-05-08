import styles from "../../../../styles/Home.module.css";
import modules from "../../../../styles/Lesson.module.css";
import Sidebar from "../../../component/sidebar";

import axios from "axios";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function Kanji() {
  const [kanjis, setKanjis] = useState([]);
  const [lessonTitle, setLessonTitle] = useState("");

  const router = useRouter();
  const { id } = router.query; //vd: ủrl là /api/lesson/1 thì router.query=1

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get(
        `http://localhost:8000/api/lesson/${id}/kanji`
      );
      setKanjis(result.data);
      if (result.data.length > 0) {
        setLessonTitle(result.data[0].title); // Lấy title đầu tiên
      }
    };

    fetchData();
  }, [id]);

  const [currentID, setCurrentID] = useState(0);

  function handlePreviousID() {
    if (currentID > 0) {
      setCurrentID(currentID - 1);
    }
  }

  function handleNextID() {
    if (currentID < kanjis.length - 1) {
      setCurrentID(currentID + 1);
    }
  }

  return (
    <main>
      <div className={styles.containerCol}>
        <Sidebar />

        <div className={styles.column2}>
          <div className={modules.box3}>
            Lesson {id}: {lessonTitle}
          </div>

          <div className={modules.box4}>
            <div className={modules.box5L}>{kanjis[currentID]?.kanji}</div>
            <div className={modules.box5R}>
              <p>Kun: {kanjis[currentID]?.kunyomi}</p>
              <p>On: {kanjis[currentID]?.onyomi}</p>
              <p>Word: {kanjis[currentID]?.word}</p>
            </div>
          </div>

          <div>
            <button className={modules.button} onClick={handlePreviousID}>
              {"<"}
            </button>
            <span className="ID-number">
              {currentID + 1} / {kanjis.length}
            </span>
            <button className={modules.button} onClick={handleNextID}>
              {">"}
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
