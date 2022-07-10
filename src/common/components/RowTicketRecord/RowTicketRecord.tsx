import { Timestamp } from 'firebase/firestore';
import Link from 'next/link';

interface Props {
    record: {
        code: string,
        projectCode: string,
        projectName: string,
        lastUpdated: Timestamp,
    },
}

export const RowTicketRecord: React.FC<Props> = ({ record }) => {
    return (
        <tr key={record?.code}>
            <td key={record?.code}>
                <Link href={`/tickets/${record?.code}`}>
                    <a>{record?.code ?? "code"}</a>
                </Link>
            </td>
            <td key={record?.code + "projectCode"}>
                <Link href={`/tickets/${record?.code}`}>
                    <a>{record?.projectCode ?? "projectCode"}</a>
                </Link>
            </td>
            <td key={record?.code + "projectName"}>
                <Link href={`/tickets/${record?.code}`}>
                    <a>{record?.projectName ?? "projectName"}</a>
                </Link>
            </td>
            <td key={record?.code + "lastUpdated"}>
                <Link href={`/tickets/${record?.code}`}>
                    <a>
                        {record?.lastUpdated?.toDate().getDate().toString()}
                        /
                        {record?.lastUpdated?.toDate().getMonth().toString()}
                        /
                        {record?.lastUpdated?.toDate().getFullYear().toString()}
                    </a>
                </Link>
            </td>
            <td><Link href={`/tickets/${record?.code}`}>
                <a></a>
            </Link>
            </td>
            <td><Link href={`/tickets/${record?.code}`}>
                <a></a>
            </Link>
            </td>
        </tr>
    );
}