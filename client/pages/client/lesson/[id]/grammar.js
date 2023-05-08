import styles from "../../../../styles/Home.module.css";
import modules from "../../../../styles/Lesson.module.css";
import Sidebar from "../../../component/sidebar";

import axios from "axios";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function Grammar() {
  const [grammars, setGrammars] = useState([]);
  const [lessonTitle, setLessonTitle] = useState("");
  const router = useRouter();
  const { id } = router.query; //vd: ủrl là /api/lesson/1 thì router.query=1

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get(
        `http://localhost:8000/api/lesson/${id}/grammar`
      );
      setGrammars(result.data);
      if (result.data.length > 0) {
        setLessonTitle(result.data[0].title); // Lấy title đầu tiên
      }
    };

    fetchData();
  }, [id]);

  return (
    <main>
      <div className={styles.containerCol}>
        <Sidebar />

        <div className={styles.column2}>
          <div className={modules.box3}>
            Lesson {id}: {lessonTitle}
          </div>

          {grammars.map((grammar) => (
            <div className={modules.box1}>
              <div className={modules.box2}>Practice {grammar.structure}</div>
              <p className={modules.param}>Explanation: {grammar.explanation}
              </p>
              <p className={modules.param}>Example: {grammar.example}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
