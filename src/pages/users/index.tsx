
import Link from 'next/link';
import Metatags from '../../common/components/Metatags';
import { getAllProjects } from '../../../lib/firebase';
import { useContext, useEffect, useState, useCallback } from 'react';
import { UserContext } from '../../../lib/context';
import { firestore, auth, googleAuthProvider, googleSignInWithPopup, googleSignOut } from '../../../lib/firebase';
import { getFirestore, addDoc, setDoc, doc, collection, onSnapshot, getDoc, getDocs, writeBatch, query, where, limit, Timestamp, serverTimestamp } from 'firebase/firestore'

import { RecordTable } from '@components/RecordTable';
import { EmptyRows } from '@components/EmptyRows';
import { RowUserRecord } from '@components/RowUserRecord';

export default function Users() {
    const { user, username } = useContext(UserContext);
    const [loading, setLoading] = useState(false);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        // declare the data fetching function
        const fetchData = async () => {
            try {
                const usersRef = collection(firestore, 'users');
                const q = query(usersRef);//, where('username', '==', username));
                const snapshot = await getDocs(q);
                const users = snapshot?.docs?.map((userDoc) => {
                    const data = userDoc.data();
                    return { ...data };
                });
                setUsers(users);
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

    const columnHeaders = ["Username", "First Name", "Last Name", "email", "", "..."];

    return (
        <>
            <Metatags title="Users"
                description="The list of users"
            />
            <main>
                <h1>Users</h1>
                <RecordTable columnHeaders={columnHeaders}>
                    {users?.map((record, index) => {
                        return (
                            <RowUserRecord key={index} record={record} />
                        );
                    })}
                    <EmptyRows columnCount={columnHeaders.length} rowCount={MIN_PROJECT_TABLE_ROWS - users.length} />
                </RecordTable>
                <ul>
                    {users?.map((user, index) => {
                        console.log(user.data);
                        return (<li key={user?.username ?? index}>{user?.firstName} {user?.lastName} - {user?.email}</li>);
                    })}
                </ul>
            </main>
        </>
    );
}

