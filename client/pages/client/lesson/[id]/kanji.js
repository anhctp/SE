import styles from "../../../../styles/Home.module.css";
import modules from "../../../../styles/Lesson.module.css";
import Sidebar from "../../../component/sidebar";
import Head from 'next/head';
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
      <Head>
        <title>Japper</title>
      </Head>
      <div className={styles.containerCol}>
        <Sidebar />

        <div className={styles.column2}>
          <div style={{marginTop:'130px' }}>
            <div className={modules.box3}>
              Lesson {id}: {lessonTitle}
            </div>

            <div className={modules.box4}>
              <div className={modules.box5L}>{kanjis[currentID]?.kanji}</div>
              <div className={modules.box5R}>
                <div>Kun: {kanjis[currentID]?.kunyomi}</div>
                <div>On: {kanjis[currentID]?.onyomi}</div>
                <div>Word: {kanjis[currentID]?.word}</div>
              </div>
            </div>

            <span className={modules.ID_number}>
              <button className={modules.button} onClick={handlePreviousID}>
                <div style={{ fontSize: "18px" }}>{"<"}</div>
              </button>

              <div style={{ margin: "0 10px", fontSize: "18px" }}>
                {currentID + 1} / {kanjis.length}
              </div>

              <button className={modules.button} onClick={handleNextID}>
                <div style={{ fontSize: "18px" }}>{">"}</div>
              </button>
            </span>
          </div>
        </div>
      </div>
    </main>
  );
}
