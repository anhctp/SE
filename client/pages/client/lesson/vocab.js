import styles from "../../../styles/Home.module.css";
import Link from "next/link";
import modules from "../../../styles/Lesson.module.css";
import { useRouter } from "next/router";

export default function Vocabulary() {
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
              router.pathname === "/client/lesson/vocab"
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
          <div className={modules.box3}>Vocabulary</div>

          <table className={modules.table}>
            <tbody>
              <tr>
                <td className={modules.th1}>Vocabulary</td>
                <td className={modules.th}>Meaning</td>
              </tr>
              <tr>
                <td width="400px">watashi</td>
                <td width="650px">i</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
