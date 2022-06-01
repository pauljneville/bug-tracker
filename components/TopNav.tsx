import Link from 'next/link';
import styles from '../styles/TopNav.module.css'

export default function TopNav() {

    return (
        <nav className={styles.topnav}>
            <ul>
                <li>
                    <Link href="/projects">
                        <a>Projects</a>
                    </Link>
                </li>
            </ul>
        </nav>
    );
}