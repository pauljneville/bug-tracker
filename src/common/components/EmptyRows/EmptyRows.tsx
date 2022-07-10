
import styles from './EmptyRows.module.css';

interface Props {
    columnCount: number,
    rowCount: number,
}

export const EmptyRows: React.FC<Props> = ({ columnCount, rowCount }) => {
    // any declared as rows is declared by default to never[] https://stackoverflow.com/a/56439957
    const rows: any[] = [];
    for (let i = 0; i < rowCount; ++i) {
        rows.push(
            <tr key={"empty" + i}>
                {[...Array(columnCount)].map((val, index) => {
                    return (
                        <td key={i + index}>{" "}</td>
                    );
                })}
            </tr>
        );
    }
    return (<>{rows}</>);
}
