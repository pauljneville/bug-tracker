import Link from 'next/link';
import Metatags from '../components/Metatags';
import { getAllProjects } from '../lib/firebase';
import { useContext, useEffect, useState, useCallback } from 'react';
import { UserContext } from '../lib/context';
import { firestore, auth, googleAuthProvider, googleSignInWithPopup, googleSignOut } from '../lib/firebase';
import { getFirestore, addDoc, setDoc, doc, collection, onSnapshot, getDoc, getDocs, writeBatch, query, where, limit, Timestamp, serverTimestamp } from 'firebase/firestore'

export default function Projects() {
    const { user, username } = useContext(UserContext);
    const [loading, setLoading] = useState(false);
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        // declare the data fetching function
        const fetchData = async () => {
            try {
                //`usernames/${username}/projects
                const projectsRef = collection(firestore, 'projects');
                const q = query(projectsRef);//, where('username', '==', username));
                const snapshot = await getDocs(q);
                const projects = snapshot?.docs?.map((projectDoc) => {
                    const data = projectDoc.data();
                    return { ...data };
                });
                setProjects(projects);
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
            <Metatags title="Projects"
                description="The projects assigned to you"
            />
            <main>
                <h1>Projects</h1>
                <ul>
                    {projects?.map((project) => {
                        return (<li key={project?.code ?? "1"}>{project?.owner} {project?.projectName} - {project?.stage}</li>);
                    })}
                </ul>
            </main>
        </>
    );
}
