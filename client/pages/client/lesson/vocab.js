import styles from "../../../styles/Home.module.css";
import modules from "../../../styles/Lesson.module.css";
import Sidebar from "../../component/sidebar";

export default function Vocabulary() {

  return (
    <main>
      <div className={styles.containerCol}>
        <Sidebar/>

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
