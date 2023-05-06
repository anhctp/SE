import styles from "../../styles/Home.module.css";
import Sidebar from "../component/sidebar";

export default function Account() {
  return (
    <main>
      <div className={styles.containerCol}>
        <Sidebar />

        <div className={styles.column2}>column2</div>
      </div>
    </main>
  );
}
