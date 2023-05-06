import styles from "../../styles/Home.module.css";
import modules from "../../styles/Lesson.module.css";
import Link from "next/link";
import { useRouter } from "next/router";
import Sidebar from "../component/sidebar";
import Card from "../component/card";

export default function Flashcard() {
  const router = useRouter();

  return (
    <main>
      <div className={styles.containerCol}>
        <Sidebar />

        <div className={styles.column2}>
          <Link
            href="/client/flashcard"
            className={
              router.pathname === "/client/flashcard"
                ? modules.box3
                : modules.box3
            }
          >
            Create Flashcard
          </Link>
          
          <Card/>
        </div>
      </div>
    </main>
  );
}
