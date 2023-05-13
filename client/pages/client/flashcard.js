import styles from "../../styles/Home.module.css";
import modules from "../../styles/Lesson.module.css";
import Sidebar from "../component/sidebar";
import Card from "../component/card";
import Head from 'next/head';

export default function Flashcard() {
  return (
    <main>
      <Head>
        <title>Japper</title>
      </Head>
      <div className={styles.containerCol}>
        <Sidebar />

        <div className={styles.column2}>
          <div className={modules.box3}>Flashcard</div>

          <Card />
        </div>
      </div>
    </main>
  );
}
