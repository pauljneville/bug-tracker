import Link from 'next/link';
import Metatags from '../../../../components/Metatags';
import { useContext, useEffect, useState, useCallback } from 'react';
import { UserContext } from '../../../../lib/context';
import { firestore, auth, googleAuthProvider, googleSignInWithPopup, googleSignOut } from '../../../../lib/firebase';
import { getFirestore, addDoc, setDoc, doc, collection, collectionGroup, onSnapshot, getDoc, getDocs, writeBatch, query, where, limit, Timestamp, serverTimestamp } from 'firebase/firestore'
import { useRouter } from 'next/router';

export default function Tickets() {
    const { user, username } = useContext(UserContext);
    const [loading, setLoading] = useState(false);
    const [ticketsData, setTicketsData] = useState([]);
    const [projectCode, setProjectCode] = useState("");

    const router = useRouter();

    useEffect(() => {
        if (router.isReady) {
            const project: string = router.query.project as string;
            setProjectCode(project);

            // declare the data fetching function
            const fetchData = async () => {
                const uid = user?.uid ?? "eKlX03CN4MhrjJNp7sne";
                try {
                    // check that the user has that project assigned to them
                    // const entriesRef = collectionGroup(firestore, 'entries');
                    // const entriesQuery = query(entriesRef);
                    // const entriesSnapshot = await getDocs(entriesQuery);
                    // const users = entriesSnapshot?.docs?.map((user) => { return user.data() });
                    // setEntriesData(users);

                    // check that the user has that project assigned to them
                    // const userProjectRef = collection(firestore, 'users', uid, 'tickets');
                    // const qUP = query(userProjectRef, limit(5));
                    // const snapshotUP = await getDocs(qUP);
                    // const userTickets = snapshotUP?.docs?.map((ticket) => { return ticket.data() });
                    // setProjectData(userTickets);

                    const ticketsRef = collection(firestore, 'projects', project, 'tickets');
                    const ticketsQuery = query(ticketsRef);
                    const ticketsSnapshot = await getDocs(ticketsQuery);

                    const tickets = ticketsSnapshot?.docs?.map((ticket) => {
                        return ticket.data();
                    });
                    setTicketsData(tickets);

                } catch (err) {
                    console.error(err);
                }
            }

            // call the function
            fetchData()
                // make sure to catch any error
                .catch(console.error);
        }
    }, [router.isReady]);

    return (
        <>
            <Metatags title="Tickets"
                description="The tickets on this project"
            />
            <main>
                <h1>Project Tickets</h1>
                <ol>
                    {ticketsData.map((ticket) => {
                        return (
                            <li key={ticket?.code}>

                                <Link href={`/projects/${projectCode}/tickets/${ticket?.code}`}>
                                    <a>{ticket?.code} - {ticket?.projectCode} - {ticket?.projectName}</a>
                                </Link>

                            </li>
                        );
                    })}
                </ol>

            </main>
        </>
    );
}