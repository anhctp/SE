import styles from "../../../styles/Home.module.css";
import React, { useState } from "react";
import Sidebar from "../../component/sidebar";
import Create from "../../component/createQuestion";

export default function Question() {
    return (
    <main>
      <div className={styles.containerCol}>
        <Sidebar />

        <div className={styles.column2}>
          <Create/>
        </div>
      </div>
    </main>
  );
}
