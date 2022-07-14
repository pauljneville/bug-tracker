import Router from 'next/router';
import { UserContext } from '../../../lib/context';
import { useContext, useEffect, useState, useCallback } from 'react';
import { getFirestore, addDoc, setDoc, doc, collection, onSnapshot, getDoc, getDocs, writeBatch, query, where, limit, Timestamp, serverTimestamp } from 'firebase/firestore'
import { firestore, auth, googleAuthProvider, googleSignInWithPopup, googleSignOut } from '../../../lib/firebase';
import styles from './NewProjectForm.module.css';

export const NewProjectForm = () => {
    const [projectDescription, setProjectDescription] = useState('');
    // TODO check uniqueness of project code
    const [projectCode, setProjectCode] = useState('');

    // TODO check uniqueness of project name
    const [projectName, setProjectName] = useState('');
    const [isValid, setIsValid] = useState(false);
    const [loading, setLoading] = useState(false);

    const { user, username } = useContext(UserContext);

    // TODO check uniqueness of said project names, keep list and create set?
    // useEffect(() => {
    //     checkProjectName(projectName);
    // }, [projectName]);

    useEffect(() => {
        setProjectCode("");
        setProjectDescription("");
        setProjectName("");
    }, []);

    // const checkProjectName = useCallback(debounce(async (username) => {
    //     if (username.length >= 3) {
    //         const ref = doc(firestore, `usernames/${username}`);
    //         const documentRef = await getDoc(ref);
    //         setIsValid(documentRef.exists() == false);
    //         setLoading(false);
    //     }
    // }, 500), []
    // );

    const onSubmit = async (e) => {
        e.preventDefault();

        const uid = user?.uid ?? "eKlX03CN4MhrjJNp7sne";

        // get/create the documents that will change in this operation
        const projectDoc = doc(firestore, `projects/${projectCode}`);
        const projectUsersSubDoc = doc(firestore, `projects/${projectCode}/users/${uid}`);
        // TODO add project code to projects list
        const userProjectDoc = doc(firestore, `users/${uid}/projects/${projectCode}`);

        const batch = writeBatch(firestore);
        try {
            // batch set the changes to the documents
            batch.set(
                projectDoc,
                {
                    code: projectCode,
                    description: projectDescription,
                    name: projectName,
                    // TODO add edit with users list to add owner
                    owner: "john-cambell",
                    // TODO add drop down for list of stages
                    stage: "planning",
                    ticketCounts: {
                        closed: 0,
                        holding: 0,
                        pending: 0,
                        total: 0,
                        working: 0,
                    },
                    version: "0.0.1",
                    lastUpdated: serverTimestamp(),
                }
            );
            // TODO add project code to projects list
            batch.set(userProjectDoc,
                {
                    code: projectCode,
                    name: projectName,
                }
            );
            batch.set(projectUsersSubDoc,
                {
                    displayName: user?.displayName ?? "John Campbell",
                    projectRoles: [
                        "manager",
                        "developer",
                    ],
                    username: user?.username ?? "john-campbell",
                }
            );
            await batch.commit();
        } catch (error) {
            console.error("error with user batch write");
            console.error(error);
        }

        Router.push('/projects');
    };

    return (
        <>
            {/* {!username && ( */}
            <section>
                <h3>Enter Project Details</h3>
                <form onSubmit={onSubmit} className={styles.newProjectForm}>
                    <input placeholder="project code" onChange={(e) => setProjectCode(e.target.value)} value={projectCode} />
                    <input placeholder="project description" onChange={(e) => setProjectDescription(e.target.value)} />
                    <input placeholder="project name" onChange={(e) => setProjectName(e.target.value)} />

                    {/* <UsernameMessage username={projectName} isValid={isValid} loading={loading} /> */}
                    <button type="submit">
                        Create New Project
                    </button>
                    {/* <h3>Debug State</h3>
                    <div>
                        Username: {userName}
                        <br />
                        Loading: {loading.toString()}
                        <br />
                        Username Valid: {isValid.toString()}
                    </div> */}
                </form>
            </section>
            {/* )} */}
        </>
    );
}