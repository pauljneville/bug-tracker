import { Timestamp } from 'firebase/firestore';
import Link from 'next/link';

interface Props {
    record: {
        username: string,
        firstName: string,
        lastName: string,
        email: string,
        lastUpdated: Timestamp,
        ticketCounts: {
            working: number,
        },
    },
}

export const RowUserRecord: React.FC<Props> = ({ record }) => {
    return (
        <tr key={record?.username}>
            <td key={record?.username}>
                <Link href={`/users/${record?.username}`}>
                    <a>{record?.username ?? "username"}</a>
                </Link>
            </td>
            <td key={record?.username + "firstName"}>
                <Link href={`/users/${record?.username}`}>
                    <a>{record?.firstName ?? "firstName"}</a>
                </Link>
            </td>
            <td key={record?.username + "lastName"}>
                <Link href={`/users/${record?.username}`}>
                    <a>{record?.lastName ?? "lastName"}</a>
                </Link>
            </td>
            <td key={record?.username + "email"}>
                <Link href={`/users/${record?.username}`}>
                    <a>{record?.email ?? "email"}</a>
                </Link>
            </td>
            <td key={record?.username + "lastUpdated"}>
                <Link href={`/users/${record?.username}`}>
                    <a>
                        {record?.lastUpdated?.toDate().getDate().toString()}
                        /
                        {record?.lastUpdated?.toDate().getMonth().toString()}
                        /
                        {record?.lastUpdated?.toDate().getFullYear().toString()}
                    </a>
                </Link>
            </td>
            <td key={record?.username + "working"}>
                <Link href={`/users/${record?.username}`}>
                    <a>{record?.ticketCounts?.working ?? 0}</a>
                </Link>
            </td>
        </tr>
    );
}