import styles from "../../styles/Home.module.css";
import Link from "next/link";
import Sidebar from "../component/sidebar";
import { useEffect, useState } from "react";
import { fetchLessons } from "../api/api";

export default function Lesson() {
  /* useState để lưu trữ các bài học */
  const [lessons, setLessons] = useState([]);

  /* useEffect để gọi function fetchLessons khi component được load lần đầu tiên. */
  useEffect(() => {
    async function loadLessons() {
      const data = await fetchLessons();
      setLessons(data);
    }
    loadLessons();
  }, []);

  return (
    <main>
      <div className={styles.containerCol}>
        <Sidebar />

        <div className={styles.column2}>
          {lessons.map((lesson) => (
            <div key={lesson.id} className={styles.box1}>
              <div className={styles.box2}>
                <div className={styles.box3}>Lesson {lesson.id}</div>
                <div className={styles.box4}>{lesson.title}</div>
              </div>

              <Link
                href={`/client/lesson/${lesson.id}/vocab`}
                className={styles.button3}
              >
                Vocabulary
              </Link>
              <Link
                href={`/client/lesson/${lesson.id}/kanji`}
                className={styles.button3}
              >
                Kanji
              </Link>
              <Link
                href={`/client/lesson/${lesson.id}/grammar`}
                className={styles.button3}
              >
                Grammar
              </Link>
              <Link
                href={`/client/lesson/${lesson.id}/question`}
                className={styles.button3}
              >
                Question
              </Link>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
