import styles from "../../styles/Home.module.css";
import modules from "../../styles/Lesson.module.css";
import Link from "next/link";
import { useRouter } from "next/router";
import Sidebar from "../component/sidebar";
import Card from "../component/card";
import { useState } from "react";
import AddCardModal from "./addCardModal";
import { Modal } from "antd";

export default function Flashcard() {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <main>
      <div className={styles.containerCol}>
        <Sidebar />

        <div className={styles.column2}>
          <div
            style={{ cursor: "pointer" }}
            className={
              router.pathname === "/client/flashcard"
                ? modules.box3
                : modules.box3
            }
            onClick={() => setIsModalOpen(true)}
          >
            Create Flashcard
          </div>

          <Card />
          <AddCardModal
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
          ></AddCardModal>
        </div>
      </div>
    </main>
  );
}
