import type { NextPage } from "next";
import Head from "next/head";
import { getAllUsers } from '../../lib/firebase';
import { Home } from "../modules/Home";

export async function getServerSideProps(context) {
    const allUserDocs = await getAllUsers();

    if (!allUserDocs) {
        return { noUsers: true, };
    }

    const users = allUserDocs.map((userDoc) => {
        const data = userDoc.data();
        return { ...data };
    })
    return {
        props: { users },
    }
}

interface Props {
    users: [],
}

const IndexPage: NextPage<Props> = ({ users }) => {
    return (<Home users={users} />)
};

export default IndexPage;