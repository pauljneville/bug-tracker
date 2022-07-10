import Link from 'next/link';
import styles from '../styles/TwoColumn.module.css'

export default function TwoColumn({ children }) {
    return (
        <div className={styles.twocolumn}>
            {children}
        </div>
    );
}