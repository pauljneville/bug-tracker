import { Timestamp } from 'firebase/firestore';
import Link from 'next/link';

interface Props {
    record: {
        code: string,
        name: string, owner: string,
        version: string,
        lastUpdated: Timestamp,
        ticketCounts: {
            working: number,
        },
    },
}

export const RowProjectRecord: React.FC<Props> = ({ record }) => {
    const clickBox = {
        width: '100px',
        background: '#f00',
        height: '50px',
    };

    return (
        <tr key={record?.code}>
            <td key={record?.code}>
                <Link href={`/projects/${record?.code}`}>
                    <a>{record?.code ?? "code"}</a>
                </Link>
            </td>
            <td key={record?.code + "name"}>
                <Link href={`/projects/${record?.code}`}>
                    <a>{record?.name ?? "name"}</a>
                </Link>
            </td>
            <td key={record?.code + "owner"}>
                <Link href={`/projects/${record?.code}`}>
                    <a>{record?.owner ?? "owner"}</a>
                </Link>
            </td>
            <td key={record?.code + "version"}>
                <Link href={`/projects/${record?.code}`}>
                    <a>{record?.version ?? "version"}</a>
                </Link>
            </td>
            <td key={record?.code + "lastUpdated"}>
                <Link href={`/projects/${record?.code}`}>
                    <a>record
                        {record?.lastUpdated?.toDate().getDate().toString()}
                        /
                        {record?.lastUpdated?.toDate().getMonth().toString()}
                        /
                        {record?.lastUpdated?.toDate().getFullYear().toString()}
                    </a>
                </Link>
            </td>
            <td key={record?.code + "working"}>
                <Link href={`/projects/${record?.code}`}>
                    <a>{record?.ticketCounts?.working ?? 0}</a>
                </Link>
            </td>
            <td><Link href={`/projects/${record?.code}`}>
                <a></a>
            </Link>
            </td>
            <td><Link href={`/projects/${record?.code}`}>
                <a></a>
            </Link>
            </td>
        </tr>
    );
}