import styles from "../../styles/Home.module.css";
import modules from "../../styles/Lesson.module.css";
import Link from "next/link";
import { useRouter } from "next/router";
import Sidebar from "../component/sidebar";
import Card from "../component/card";
import { useState } from "react";

export default function Flashcard() {
  const router = useRouter();

  return (
    <main>
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
