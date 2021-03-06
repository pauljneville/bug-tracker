import Link from 'next/link';
import Metatags from '../../common/components/Metatags';
import { useContext, useEffect, useState, useCallback } from 'react';
import { UserContext } from '../../../lib/context';
import { firestore, auth, googleAuthProvider, googleSignInWithPopup, googleSignOut } from '../../../lib/firebase';
import { getFirestore, addDoc, setDoc, doc, collection, collectionGroup, onSnapshot, getDoc, getDocs, writeBatch, query, where, limit, Timestamp, serverTimestamp } from 'firebase/firestore'
import { useRouter } from 'next/router';
import { connectStorageEmulator } from 'firebase/storage';

import { RecordTable } from '@components/RecordTable';
import { EmptyRows } from '@components/EmptyRows';
import { RowRoleRecord } from '@components/RowRoleRecord';

export default function Roles() {
    const { user, username } = useContext(UserContext);
    const [loading, setLoading] = useState(false);
    const [entriesData, setEntriesData] = useState([]);
    const [rolesData, setRolesData] = useState([]);

    const router = useRouter();

    useEffect(() => {
        // declare the data fetching function
        const fetchData = async () => {
            // const uid = user?.uid ?? "eKlX03CN4MhrjJNp7sne";
            try {
                // check that the user has that project assigned to them
                // const entiresRef = collectionGroup(firestore, 'entries');
                // const entriesQuery = query(entiresRef);
                // const entiresSnapshot = await getDocs(entriesQuery);
                // const users = entiresSnapshot?.docs?.map((user) => { return user.data() });
                // setEntriesData(users);

                const rolesQuery = query(collection(firestore, 'roles'));
                const rolesSnapshot = await getDocs(rolesQuery);
                const roles = rolesSnapshot?.docs?.map((role) => {
                    return role.data();
                });
                // setRolesData(roles);

                for (let role of roles) {
                    const entriesQuery = query(collection(firestore, 'roles', role.roleId, 'entries'));
                    const entriesSnapshot = await getDocs(entriesQuery);
                    role.entries = entriesSnapshot?.docs?.map((entry) => {
                        return entry.data();
                    });
                }
                // roles.forEach(async (role) => {
                //     const entriesQuery = query(collection(firestore, 'roles', role.roleId, 'entries'));
                //     const entriesSnapshot = await getDocs(entriesQuery);
                //     role.entries = entriesSnapshot?.docs?.map((entry) => {
                //         return entry.data();
                //     });
                //     return role;
                // });
                // setEntriesData(roles);
                setRolesData(roles);
            } catch (err) {
                console.error(err);
            }
        }

        // call the function
        fetchData()
            // make sure to catch any error
            .catch(console.error);
    }, []);

    const MIN_PROJECT_TABLE_ROWS = 10;

    const columnHeaders = ["Code", "Project Code", "Project Name", "Last Updated", "Bells", "..."];

    return (
        <>
            <Metatags title="Roles"
                description="The users grouped by role."
            />
            <main>
                <h1>Roles</h1>
                <RecordTable columnHeaders={columnHeaders}>
                    {rolesData?.map((record, index) => {
                        return (
                            <RowRoleRecord key={index} record={record} />
                        );
                    })}
                    <EmptyRows columnCount={columnHeaders.length} rowCount={MIN_PROJECT_TABLE_ROWS - rolesData.length} />
                </RecordTable>
                <ul>
                    {rolesData.map((role) => {
                        return (
                            <Role key={role.roleId} role={role} />
                        );
                    })}
                </ul>
            </main>
        </>
    );
}

function Role({ role }) {
    return (
        <li key={role.title}>
            {role.title}
            <ul>
                {role.entries?.map((entry) => {
                    return (
                        <UserRole key={entry.userId} entry={entry} />
                    );
                })}
            </ul>
        </li>
    );
}

function UserRole({ entry }) {
    return (
        <li key={entry.role + entry.userId}>
            {entry.userId}
        </li>
    );
}