import Head from 'next/head'
import Image from 'next/image'
import Metatags from '../components/Metatags'
import { getAllUsers } from '../lib/firebase'
import styles from '../styles/Home.module.css'
import Link from 'next/link'

export async function getServerSideProps(context) {
  const allUserDocs = await getAllUsers();

  if (!allUserDocs) {
    return { noUsers: true, };
  }

  const users = allUserDocs.map((userDoc) => {
    const data = userDoc.data();
    // console.log(data);
    return { ...data };
  })

  // const users = JSON.stringify(usersData);

  return {
    props: { users },
  }
}

export default function Home({ users }) {
  // console.log("------ users ------");
  // console.log(users);
  return (
    <div className={styles.container}>
      <Metatags />

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to Bug Tracker
        </h1>

        <p className={styles.description}>
          This is a web app to track tasks and issues in a software development project and to assign users who are governed by user roles that determine their access to functions.
        </p>
        <img src="https://bug-tracker-one.vercel.app/v0/page-project-with-tickets.png" alt="possible future version of said tracking app" />

        <p>We have the following users registered:</p>
        <ul>
          {users?.map((user) => {
            return (<li key={user?.username}>{user?.displayName} - {user?.roles != null ? user?.roles[0] : ""}</li>);
          })}
        </ul>
      </main>

      <footer className={styles.footer}>
        👨‍🎨
      </footer>
    </div>
  )
}
