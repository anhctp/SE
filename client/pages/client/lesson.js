import styles from "../../styles/Home.module.css";
import Link from "next/link";

export default function Lesson() {
  return (
    <main>
      <div className={styles.containerCol}>
        <div className={styles.column1}>
            <Link href="/" className={styles.button2}>
              <div className={styles.japper}>Japper</div>
            </Link>

            <Link href="/client/lesson" className={styles.button1} >
              <div className={styles.lesson}>Lesson</div>
            </Link>
            <Link href="/client/game" className={styles.button1}>
              <div className={styles.lesson}>Game</div>
            </Link>
            <Link href="/client/flashcard" className={styles.button1}>
              <div className={styles.lesson}>Flashcard</div>
            </Link>
            <Link href="/client/account" className={styles.button1}>
              <div className={styles.lesson}>Account</div>
            </Link>
        </div>

        <div className={styles.column2}>
          <div className={styles.box1}>
            <div className={styles.box2}>
              <div className={styles.lesson}>Account</div>
            </div>

            <Link href="/client/lesson/vocab" className={styles.button3}>
              <div className={styles.lesson}>Vocabulary</div>
            </Link>
            <Link href="/client/lesson/kanji" className={styles.button3}>
              <div className={styles.lesson}>Kanji</div>
            </Link>
            <Link href="/client/lesson/grammar" className={styles.button3}>
              <div className={styles.lesson}>Grammar</div>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
