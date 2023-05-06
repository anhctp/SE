import styles from "../../../styles/Home.module.css";
import modules from "../../../styles/Lesson.module.css";
import Sidebar from "../../component/sidebar";

export default function Grammar() {

  return (
    <main>
      <div className={styles.containerCol}>
        <Sidebar/>

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
