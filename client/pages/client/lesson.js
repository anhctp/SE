/* cài đặt Axios để tương tác với API endpoint và thiết lập các yêu cầu tới Laravel API 
Hoặc dùng fetch() */
/* getStaticProps: dùng để lấy data tại thời điểm build time và tạo pre-rendered HTML */
/* getStaticPaths: dùng khi có nhiều dynamic routes, 
giúp Next.js biết được những routes cần pre-render và sẽ generate trước những pages tương ứng */
/* getServerSideProps: dùng để fetch data từ server tại thời điểm request,
 không dùng được khi muốn pre-render HTML trước và cache lại */
/* useEffect: dùng khi muốn fetch data tại thời điểm component được mount */

import styles from "../../styles/Home.module.css";
import Link from "next/link";
import Sidebar from "../component/sidebar";
import { useEffect, useState } from "react";
import axios from "axios";
import { token } from "../../utils/token";

export default function Lesson() {
  /* useState để lưu trữ các bài học */
  const [lessons, setLessons] = useState([]);

  // Set the Authorization header with the bearer token
  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }
  /* useEffect để gọi function fetchLessons khi component được load lần đầu tiên. */
  useEffect(() => {
    async function loadLessons() {
      const result = await axios.get(`http://localhost:8000/api/lessons`);
      setLessons(result.data);
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
                href={`/client/lesson/${lesson.id}/question/1`}
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
