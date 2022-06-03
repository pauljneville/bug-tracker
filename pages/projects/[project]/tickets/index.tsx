import Link from 'next/link';
import Metatags from '../../../../components/Metatags';
import { useContext, useEffect, useState, useCallback } from 'react';
import { UserContext } from '../../../../lib/context';
import { firestore, auth, googleAuthProvider, googleSignInWithPopup, googleSignOut } from '../../../../lib/firebase';
import { getFirestore, addDoc, setDoc, doc, collection, onSnapshot, getDoc, getDocs, writeBatch, query, where, limit, Timestamp, serverTimestamp } from 'firebase/firestore'
import { useRouter } from 'next/router';

export default function Tickets() {
    const { user, username } = useContext(UserContext);
    const [loading, setLoading] = useState(false);
    const [projectData, setProjectData] = useState(null);
    const [tickets, setTickets] = useState([]);

    const router = useRouter();
    let { ticket } = router.query;

    useEffect(() => {
        // declare the data fetching function
        const fetchData = async () => {
            const uid = user?.uid ?? "eKlX03CN4MhrjJNp7sne";
            const projectCode = String(ticket);
            try {
                console.log(ticket);
                if (!ticket) {
                    router.push("/");
                    return;
                }
                // check that the user has that project assigned to them
                const userProjectRef = collection(firestore, 'users', uid, 'projects');
                const qUP = query(userProjectRef, where('code', '==', ticket), limit(1));
                const snapshotUP = await getDocs(qUP);
                const userProject = snapshotUP?.docs[0]?.data();
                setProjectData(userProject);

                // if they do have that project assigned, get the project's data and tickets
                if (userProject != null) {
                    const ticketsRef = collection(firestore, 'projects', projectCode, 'tickets');
                    console.log(ticket);
                    const q = query(ticketsRef);
                    const snapshot = await getDocs(q);
                    const tickets = snapshot?.docs?.map((ticketDoc) => {
                        const data = ticketDoc.data();
                        return { ...data };
                    });
                    console.log(tickets);
                    setTickets(tickets);
                }
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
                <h1>Project Tickets</h1>
                <p>{projectData?.code} - {projectData?.name}</p>
                <p>{projectData?.description}</p>

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