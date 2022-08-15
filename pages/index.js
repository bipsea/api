import Head from "next/head";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Bipsea API</title>
        <meta name="description" content="Bipsea API" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <h1 className={styles.title}>Bipsea API</h1>
        <p className={styles.description}>
          <code>https://github.com/bipsea/api</code>
        </p>
      </main>
    </div>
  );
}
