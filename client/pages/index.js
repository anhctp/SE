import Lessons from '../pages/client/lesson';
import Head from 'next/head';
export default function Home() {
  return (
    <main>
      <Head>
        <title>Japper</title>
      </Head>
      <Lessons/>
    </main>
  );
}
