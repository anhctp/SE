import styles from "../../../../styles/Home.module.css";
import modules from "../../../../styles/Lesson.module.css";
import Sidebar from "../../../component/sidebar";

import axios from "axios";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";


export default function Vocabulary() {
  const [vocabularies, setVocabularies] = useState([]); 
  const [lessonTitle, setLessonTitle] = useState('');
  
  const router = useRouter();
  const { id } = router.query; //vd: ủrl là /api/lesson/1 thì router.query=1

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get(`http://localhost:8000/api/lesson/${id}/vocabulary`);
      setVocabularies(result.data);
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
          <div>
            <div className={modules.box3}>Lesson {id}: {lessonTitle}</div>

            <table className={modules.table}>
              <tbody>
                <tr>
                  <td className={modules.th1}>Vocabulary</td>
                  <td className={modules.th}>Meaning</td>
                </tr>
                {vocabularies.map((vocab) => (
                  <tr key={vocab.id}>
                    <td className={modules.td1}>
                      {vocab.word}
                    </td>
                    <td className={modules.td}>
                      {vocab.meaning}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
}

