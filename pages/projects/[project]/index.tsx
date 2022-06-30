import Link from 'next/link';
import Metatags from '../../../components/Metatags';
import { useContext, useEffect, useState, useCallback } from 'react';
import { UserContext } from '../../../lib/context';
import { firestore, auth, googleAuthProvider, googleSignInWithPopup, googleSignOut } from '../../../lib/firebase';
import { getFirestore, addDoc, setDoc, doc, collection, onSnapshot, getDoc, getDocs, writeBatch, query, where, limit, Timestamp, serverTimestamp } from 'firebase/firestore'
import { useRouter } from 'next/router';
import { connectStorageEmulator } from 'firebase/storage';

export default function ProjectDetails() {
    const { user, username } = useContext(UserContext);
    const [loading, setLoading] = useState(false);
    const [projectData, setProjectData] = useState(null);
    const [tickets, setTickets] = useState([]);

    const router = useRouter();
    // let { project } = router.query;

    useEffect(() => {
        if (router.isReady) {
            const { project } = router.query;

            // declare the data fetching function
            const fetchData = async () => {
                const uid = user?.uid ?? "eKlX03CN4MhrjJNp7sne";
                const projectCode = String(project);
                try {
                    // check that the user has that project assigned to them
                    const userProjectRef = collection(firestore, 'users', uid, 'projects');
                    const qUP = query(userProjectRef, where('code', '==', project), limit(1));
                    const snapshotUP = await getDocs(qUP);
                    const userProject = snapshotUP?.docs[0]?.data();

                    // if they do have that project assigned, get the project's data to display
                    if (userProject != null) {
                        const projectsRef = collection(firestore, 'projects');
                        const q = query(projectsRef, where('code', '==', project));
                        const snapshot = await getDocs(q);
                        const projectData = snapshot?.docs[0]?.data();
                        setProjectData(projectData);

                        // get the tickets for the project
                        const ticketsRef = collection(firestore, 'projects', projectCode, 'tickets');
                        console.log(project);
                        const qTickets = query(ticketsRef);
                        const snapshotTickets = await getDocs(qTickets);
                        const tickets = snapshotTickets?.docs?.map((ticketDoc) => {
                            const data = ticketDoc.data();
                            return { ...data };
                        });
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
        }
    }, [router.isReady]);

    return (
        <>
            <Metatags title="Project Name"
                description="The project details"
            />
            <main>
                <h1>Project Details</h1>
                <p>{projectData?.code} - {projectData?.name}</p>
                <p>{projectData?.description}</p>
                <Link href={`/projects/${projectData?.code}/tickets`}><a><h2>Tickets</h2></a></Link>
                <ul>
                    {tickets?.map((ticket, index) => {
                        return (
                            <li key={ticket?.code ?? index}>
                                <Link href={`/projects/${projectData?.code}/tickets/${ticket?.code}`}>
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