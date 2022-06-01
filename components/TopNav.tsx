import Link from 'next/link';
import styles from '../styles/TopNav.module.css'

export default function TopNav({ path }) {
    const breadcrumbs = path.split("/", 4).slice(1);
    let currentPath = "";

    return (
        <nav className={styles.topnav}>
            <ul>
                {(path.length > 1) ? breadcrumbs.map((crumb) => {
                    currentPath += "/" + crumb;
                    return (
                        <li key={crumb}>
                            <Link href={currentPath}>
                                <a>{crumb.charAt(0).toUpperCase() + crumb.slice(1)}</a>
                            </Link>
                        </li>
                    );
                }) : <li><p></p></li>}
            </ul>
        </nav>
    );
}