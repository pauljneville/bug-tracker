
import Link from 'next/link';
import Metatags from '../components/Metatags';
import { getAllProjects } from '../lib/firebase';
import { useContext, useEffect, useState, useCallback } from 'react';
import { UserContext } from '../lib/context';
import { firestore, auth, googleAuthProvider, googleSignInWithPopup, googleSignOut } from '../lib/firebase';
import { getFirestore, addDoc, setDoc, doc, collection, onSnapshot, getDoc, getDocs, writeBatch, query, where, limit, Timestamp, serverTimestamp } from 'firebase/firestore'


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

    return (
        <>
            <Metatags title="Users"
                description="The list of users"
            />
            <main>
                <h1>Users</h1>
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

