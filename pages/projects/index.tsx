import Link from 'next/link';
import Metatags from '../../components/Metatags';
import { getAllProjects } from '../../lib/firebase';
import { useContext, useEffect, useState, useCallback } from 'react';
import { UserContext } from '../../lib/context';
import { firestore, auth, googleAuthProvider, googleSignInWithPopup, googleSignOut } from '../../lib/firebase';
import { getFirestore, addDoc, setDoc, doc, collection, onSnapshot, getDoc, getDocs, writeBatch, query, where, limit, Timestamp, serverTimestamp } from 'firebase/firestore'
import debounce from 'lodash.debounce';
// TODO change styles
import styles from '../../styles/EnterPage.module.css';

const NewProjectForm = () => {
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

    const onProjectNameChange = (e) => {
        // username must be between 3 and 15 characters long
        // containing only letters, numbers, underscore
        const val = e.target.value.toLowerCase();
        const re = /^(?=[a-zA-Z0-9._]{3,15}$)(?!.*[_.]{2})[^_.].*[^_.]$/;

        // check that username is >= 3 characters and passes regex format
        if (val.length < 3) {
            setProjectName(val);
            setLoading(false);
            setIsValid(false);
        }
        if (re.test(val)) {
            setProjectName(val);
            setLoading(true);
            setIsValid(false);
        }
    };

    // TODO change regex to accept hyphen and numbers
    const onProjectCodeChange = (e) => {
        setProjectCode(e.target.value);
    };

    const onProjectDescriptionChange = (e) => {
        setProjectDescription(e.target.value);
    };

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

        // get/create the documents that will change in this operation
        const userDoc = doc(firestore, `projects/${projectCode}`);
        // TODO add project code to projects list
        // const usernameDoc = doc(firestore, `usernames/${projectName}`);

        const batch = writeBatch(firestore);
        try {
            // batch set the changes to the documents
            batch.set(
                userDoc,
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
                }
            );
            // TODO add project code to projects list
            // batch.set(usernameDoc, { uid: user.uid });
            await batch.commit();
        } catch (error) {
            console.error("error with user batch write");
            console.error(error);
        }

        setProjectCode("");
        setProjectDescription("");
        setProjectName("");
    };

    return (
        <>
            {/* {!username && ( */}
            <section>
                <h3>Enter Project Details</h3>
                <form onSubmit={onSubmit} className={styles.enterForm}>
                    <input placeholder="project code" onChange={onProjectCodeChange} />
                    <input placeholder="project description" onChange={onProjectDescriptionChange} />
                    <input placeholder="project name" onChange={onProjectNameChange} />
                    {/* <UsernameMessage username={projectName} isValid={isValid} loading={loading} /> */}
                    <button type="submit" className="btn-green">
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


export default function Projects() {
    const { user, username } = useContext(UserContext);
    const [loading, setLoading] = useState(false);
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        // declare the data fetching function
        const fetchData = async () => {
            const uid = user?.uid ?? "eKlX03CN4MhrjJNp7sne";
            try {
                //`users/${username}/projects
                const projectsRef = collection(firestore, 'users', uid, 'projects');
                // const projectsRef = collection(firestore, 'projects');
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

    /**
     * return table of projects
     */
    return (
        <>
            <Metatags title="Projects"
                description="The projects assigned to you"
            />
            <main>
                <h1>Projects</h1>
                Hello {username ?? "john-campbell"}{" "}
                {user?.uid ?? "eKlX03CN4MhrjJNp7sne"}
                <ul>
                    {projects?.map((project, index) => {
                        return (
                            <li key={project?.code ?? index}>
                                <Link href={`/projects/${project?.code}`}>
                                    <a>{project?.code} {project?.name} - {project?.stage}</a>
                                </Link>
                            </li>
                        );
                    })}
                </ul>

                <h2>Add New Project</h2>
                <NewProjectForm />
            </main>
        </>
    );
}