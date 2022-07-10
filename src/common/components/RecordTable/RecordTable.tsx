
import styles from './RecordTable.module.css';

export const RecordTable = ({ columnHeaders, children }) => {
    return (
        <div className={styles.recordTable}>
            <table>
                <thead>
                    <tr>
                        {columnHeaders.map((header, index) => {
                            return (<th key={index}>{header}</th>);
                        })}
                    </tr>
                </thead>
                <tbody>
                    {children}
                </tbody>
            </table>
        </div>
    );
}