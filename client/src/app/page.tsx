import { Inter } from 'next/font/google'
import styles from '../../styles/page.module.css';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main>
      <div className={styles.containerCol}>

        <div className={styles.column}>
          <div className={styles.japper}>Japper</div>

          <div className={styles.box1}>
            <div className={styles.lesson}>Lesson</div>
          </div>
          <div className={styles.box1}>
            <div className={styles.lesson}>Game</div>
          </div>
          <div className={styles.box1}>
            <div className={styles.lesson}>Flashcard</div>
          </div>
          <div className={styles.box1}>
            <div className={styles.lesson}>Account</div>
          </div>
        </div>

        <div className={styles.column}>Column 2</div>
      </div>
    </main>
  )
}
