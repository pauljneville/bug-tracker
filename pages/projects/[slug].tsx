import Link from 'next/link';
import Metatags from '../../components/Metatags';
import { useContext, useEffect, useState, useCallback } from 'react';
import { UserContext } from '../../lib/context';
import { firestore, auth, googleAuthProvider, googleSignInWithPopup, googleSignOut } from '../../lib/firebase';
import { getFirestore, addDoc, setDoc, doc, collection, onSnapshot, getDoc, getDocs, writeBatch, query, where, limit, Timestamp, serverTimestamp } from 'firebase/firestore'
import { useRouter } from 'next/router';

export default function ProjectDetails() {
    const { user, username } = useContext(UserContext);
    const [loading, setLoading] = useState(false);
    const [project, setProject] = useState(null);

    const router = useRouter();
    let { slug } = router.query;

    useEffect(() => {
        // declare the data fetching function
        const fetchData = async () => {
            const uid = user?.uid ?? "eKlX03CN4MhrjJNp7sne";
            console.log("slug: " + slug);
            try {
                if (!slug) {
                    router.push("/");
                    return;
                }
                // const userProjectRef = collection(firestore, 'users', uid, 'projects');
                // const qUP = query(userProjectRef, where('code', '==', slug), limit(1));
                // const snapshotUP = await getDocs(qUP)[0];
                // if (snapshotUP == null) { return {} }

                const projectsRef = collection(firestore, 'projects');
                const q = query(projectsRef, where('code', '==', slug));
                const snapshot = await getDocs(q);
                console.log(snapshot.docs[0].data());
                const projectData = snapshot?.docs[0]?.data();
                console.log(projectData);
                setProject(projectData);
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
            <Metatags title="Project Name"
                description="The project details"
            />
            <main>
                <h1>Project Details</h1>
                <p>{project?.code} - {project?.projectName}</p>
                <p>{project?.description}</p>
            </main>
        </>
    );
}