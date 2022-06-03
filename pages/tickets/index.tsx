import Link from 'next/link';
import Metatags from '../../components/Metatags';
import { useContext, useEffect, useState, useCallback } from 'react';
import { UserContext } from '../../lib/context';
import { firestore, auth, googleAuthProvider, googleSignInWithPopup, googleSignOut } from '../../lib/firebase';
import { getFirestore, addDoc, setDoc, doc, collection, onSnapshot, getDoc, getDocs, writeBatch, query, where, limit, Timestamp, serverTimestamp } from 'firebase/firestore'
import { useRouter } from 'next/router';

export default function Tickets() {
    const { user, username } = useContext(UserContext);
    const [loading, setLoading] = useState(false);
    const [project, setProject] = useState(null);
    const [tickets, setTickets] = useState([]);

    const router = useRouter();
    // let { slug } = router.query;

    useEffect(() => {
        // declare the data fetching function
        const fetchData = async () => {
            const uid = user?.uid ?? "eKlX03CN4MhrjJNp7sne";
            try {
                //`users/${username}/tickets
                const ticketsRef = collection(firestore, 'users', uid, 'tickets');
                // const ticketsRef = collection(firestore, 'tickets');
                const q = query(ticketsRef);//, where('username', '==', username));
                const snapshot = await getDocs(q);
                const tickets = snapshot?.docs?.map((ticketDoc) => {
                    const data = ticketDoc.data();
                    return { ...data };
                });
                setTickets(tickets);
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
            <Metatags title="Tickets"
                description="The tickets on this project"
            />
            <main>
                <h1>{user?.username ?? "john-campbell"}'s Tickets</h1>

                <ul>
                    {tickets?.map((ticket, index) => {
                        return (
                            <li key={ticket?.code ?? index}>
                                <Link href={`/tickets/${ticket?.code}`}>
                                    <a>{ticket?.code} {ticket?.projectCode} - {ticket?.projectName} ticket</a>
                                </Link>
                            </li>
                        );
                    })}
                </ul>

            </main>
        </>
    );
}