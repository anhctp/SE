import styles from "../../../styles/Home.module.css";
import modules from "../../../styles/Lesson.module.css";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Grammar() {
  const router = useRouter();

  return (
    <main>
      <div className={styles.containerCol}>
        <div className={styles.column1}>
          <Link href="/client/lesson" className={styles.button2}>
            <div className={styles.japper}>Japper</div>
          </Link>

          <Link
            href="/client/lesson"
            className={
              router.pathname === "/client/lesson/grammar"
                ? styles.activeButton1
                : styles.button1
            }
          >
            <div className={styles.lesson}>Lesson</div>
          </Link>
          <Link
            href="/client/game"
            className={
              router.pathname === "/client/game"
                ? styles.activeButton1
                : styles.button1
            }
          >
            <div className={styles.lesson}>Game</div>
          </Link>
          <Link
            href="/client/flashcard"
            className={
              router.pathname === "/client/flashcard"
                ? styles.activeButton1
                : styles.button1
            }
          >
            <div className={styles.lesson}>Flashcard</div>
          </Link>
          <Link
            href="/client/account"
            className={
              router.pathname === "/client/account"
                ? styles.activeButton1
                : styles.button1
            }
          >
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
