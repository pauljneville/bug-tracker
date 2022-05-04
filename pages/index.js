import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Bug Tracker</title>
        <meta name="description" content="web app to track tasks and issues in a software development project." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to Bug Tracker
        </h1>

        <p className={styles.description}>
          This is a web app to track tasks and issues in a software development project and to assign users who are governed by user roles that determine their access to functions.
        </p>
        <img src="https://bug-tracker-one.vercel.app/v0/page-project-with-tickets.png" alt="possible future version of said tracking app" />
      </main>

      <footer className={styles.footer}>
        👨‍🎨
      </footer>
    </div>
  )
}
