import styles from "../../styles/sidebar.module.css";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Sidebar() {
  const router = useRouter();

  return (
    <div className={styles.column1}>
      <Link href="/" className={styles.button2}>
        <div className={styles.japper}>Japper</div>
      </Link>

      <Link
        href="/"
        className={
          router.pathname === "/" ||
          router.pathname === "/client/lesson" ||
          router.pathname === "/client/lesson/[id]/grammar" ||
          router.pathname === "/client/lesson/[id]/kanji" ||
          router.pathname === "/client/lesson/[id]/vocab" ||
          router.pathname === "/client/lesson/[id]/question" ||
          router.pathname === "/client/lesson/[id]/question/[question_id]"
            ? styles.activeButton1
            : styles.button1
        }
      >
        <div className={styles.lesson}>Lesson</div>
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
          router.pathname === "/client/acc/user" || router.pathname ==="/client/acc/admin"
            ? styles.activeButton1
            : styles.button1
        }
      >
        <div className={styles.lesson}>Account</div>
      </Link>
    </div>
  );
}
