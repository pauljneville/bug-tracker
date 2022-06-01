import Link from 'next/link';
import { useContext } from 'react';
import { UserContext } from '../lib/context';
import { auth, googleSignOut } from '../lib/firebase';
import Image from 'next/image';
import styles from '../styles/Navbar.module.css'

export default function Navbar() {
    const { user, username } = useContext(UserContext);
    const SignOutButton = () => {
        const signOut = async () => {
            googleSignOut(auth)
                .then(() => {
                    console.log('signout successful');
                })
                .catch((error) => {
                    console.error(error);
                })
        };
        return <button onClick={signOut}>Sign Out</button>
    }

    return (
        <nav className={styles.navbar}>
            <ul>
                <li>
                    <Link href="/">
                        <a>Dashboard</a>
                    </Link>
                </li>
                {/* {username && ( */}
                <>
                    <li>
                        <Link href="/projects">
                            <a>Projects</a>
                        </Link>
                    </li>
                    <li>
                        <Link href="/tickets">
                            <a>Tickets</a>
                        </Link>
                    </li>
                    <li>
                        <Link href="/roles">
                            <a>Roles</a>
                        </Link>
                    </li>
                    <li>
                        <Link href="/users">
                            <a>Users</a>
                        </Link>
                    </li>
                    <li>
                        <Link href="/admin">
                            <button>Admin Only Panel</button>
                        </Link>
                    </li>
                    <li>
                        <Link href={`/${username}`}>
                            <><Image src={user?.photoURL || "/default-profile.png"} alt="user photo" width="50" height="50" /></>
                        </Link>
                    </li>
                    <li>
                        <SignOutButton />
                    </li>
                </>
                {/* )}
                 {!username && ( 
                //     <li>
                //         <Link href="/enter" passHref={true}>
                //             <button className="btn-blue">Log in</button>
                //         </Link>
                //     </li>
                // )}*/}
            </ul>
        </nav>
    );
}