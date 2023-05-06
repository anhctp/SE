import styles from "../../styles/Home.module.css";
import Link from "next/link";
import Sidebar from '../component/sidebar';

export default function Lesson() {
  return (
    <main>
      <div className={styles.containerCol}>
        <Sidebar/>

        <div className={styles.column2}>
          <div className={styles.box1}>
            <div className={styles.box2}>
              <div className={styles.box3}>Lesson fffffffff fffff</div>
              <div className={styles.box4}>content kkkkkkkkkkkkkkkkkk lkkkkkkkkkkkkkkkk</div>
            </div>

            <Link href="/client/lesson/vocab" className={styles.button3}>Vocabulary</Link>
            <Link href="/client/lesson/kanji" className={styles.button3}>Kanji</Link>
            <Link href="/client/lesson/grammar" className={styles.button3}>Grammar</Link>
            <Link href="/client/lesson/question" className={styles.button3}>Question</Link>
          </div>

          <div className={styles.box1}>
            <div className={styles.box2}>
              <div className={styles.box3}>Lesson ffff fffff</div>
              <div className={styles.box4}>content kkkkkkkkkkkkkkkkkk lkkkkkkkkkkkkkkkk</div>
            </div>

            <Link href="/client/lesson/vocab" className={styles.button3}>Vocabulary</Link>
            <Link href="/client/lesson/kanji" className={styles.button3}>Kanji</Link>
            <Link href="/client/lesson/grammar" className={styles.button3}>Grammar</Link>
            <Link href="/client/lesson/question" className={styles.button3}>Question</Link>
          </div>

          <div className={styles.box1}>
            <div className={styles.box2}>
              <div className={styles.box3}>Lesson fffffffff fffff</div>
              <div className={styles.box4}>content kkkkkkkkkkkkkkkkkk lkkkkkkkkkkkkkkkk</div>
            </div>

            <Link href="/client/lesson/vocab" className={styles.button3}>Vocabulary</Link>
            <Link href="/client/lesson/kanji" className={styles.button3}>Kanji</Link>
            <Link href="/client/lesson/grammar" className={styles.button3}>Grammar</Link>
            <Link href="/client/lesson/question" className={styles.button3}>Question</Link>
          </div>

        </div>
      </div>
    </main>
  );
}
