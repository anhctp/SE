import styles from "../../../styles/Home.module.css";
import modules from "../../../styles/Lesson.module.css";
import Link from "next/link";

export default function Grammar() {
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
          <div className={modules.box3}>Grammar</div>

          <div className={modules.box1}>
            <div className={modules.box2}>Practice</div>
          </div>
        </div>
      </div>
    </main>
  );
}
