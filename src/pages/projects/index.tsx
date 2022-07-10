import Link from 'next/link';
import Metatags from '../../common/components/Metatags';
import { getAllProjects } from '../../../lib/firebase';
import { useContext, useEffect, useState, useCallback } from 'react';
import { UserContext } from '../../../lib/context';
import { firestore, auth, googleAuthProvider, googleSignInWithPopup, googleSignOut } from '../../../lib/firebase';
import { getFirestore, addDoc, setDoc, doc, collection, onSnapshot, getDoc, getDocs, writeBatch, query, where, limit, Timestamp, serverTimestamp } from 'firebase/firestore'
import debounce from 'lodash.debounce';
// TODO change styles
import styles from '../../common/styles/EnterPage.module.css';
import Router from 'next/router'

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

    useEffect(() => {
        setProjectCode("");
        setProjectDescription("");
        setProjectName("");
    }, []);

    const onProjectNameChange = (e) => {
        setProjectName(e.target.value);
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

function EmptyRows({ columnCount, rowCount }) {
    const rows = [];
    for (let i = 0; i < rowCount; ++i) {
        rows.push(
            <tr key={"empty" + i}>
                {[...Array(columnCount)].map((val, index) => { return (<td key={i + index}>{" "}</td>); })}
            </tr>
        );
    }
    return (<>{rows}</>);
}

export default function Projects() {
    const { user, username } = useContext(UserContext);
    const [loading, setLoading] = useState(false);
    const [projects, setProjects] = useState([]);
    const MIN_PROJECT_TABLE_ROWS = 10;

    useEffect(() => {
        // declare the data fetching function
        const fetchData = async () => {
            const uid = user?.uid ?? "eKlX03CN4MhrjJNp7sne";
            setLoading(true);
            try {
                //`users/${username}/projects
                const userProjectsRef = collection(firestore, 'users', uid, 'projects');
                // const projectsRef = collection(firestore, 'projects');
                const userProjectsQuery = query(userProjectsRef);//, where('username', '==', username));
                const userProjectsSnapshot = await getDocs(userProjectsQuery);
                const userProjects = userProjectsSnapshot?.docs?.map((projectDoc) => {
                    const data = projectDoc.data();
                    return { ...data };
                });

                // setProjects(userProjects);
                let projectRows = [];
                for (let project of userProjects) {
                    const projectSnapshot = await getDoc(doc(firestore, 'projects', project.code));
                    if (projectSnapshot.exists()) {
                        projectRows.push(projectSnapshot.data());
                    }
                }
                setProjects(projectRows);
                setLoading(false);
            } catch (err) {
                console.error(err);
            }
        }

        // call the function
        fetchData()
            // make sure to catch any error
            .catch(console.error);
    }, [user?.uid]);

    const columnHeaders = ["Code", "Project Name", "Owner", "Version", "Last Updated", "Tickets", "Bells", "..."];
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
                {/* {loading && <p>loading</p>} */}
                <table>
                    <thead>
                        <tr>
                            {columnHeaders.map((header, index) => {
                                return (<th key={index}>{header}</th>);
                            })}
                        </tr>
                    </thead>
                    <tbody>
                        {projects?.map((project, index) => {
                            return (
                                <tr key={project.code}>
                                    <td key={project.code}>
                                        <Link href={`/projects/${project?.code}`}>
                                            <a>{project?.code ?? "code"}</a>
                                        </Link>
                                    </td>
                                    <td key={project.code + "name"}>
                                        <Link href={`/projects/${project?.code}`}>
                                            <a>{project?.name ?? "name"}</a>
                                        </Link>
                                    </td>
                                    <td key={project.code + "owner"}>
                                        <Link href={`/projects/${project?.code}`}>
                                            <a>{project?.owner ?? "owner"}</a>
                                        </Link>
                                    </td>
                                    <td key={project.code + "version"}>
                                        <Link href={`/projects/${project?.code}`}>
                                            <a>{project?.version ?? "version"}</a>
                                        </Link>
                                    </td>
                                    <td key={project.code + "lastUpdated"}>
                                        <Link href={`/projects/${project?.code}`}>
                                            <a>
                                                {project?.lastUpdated?.toDate().getDate().toString()}
                                                /
                                                {project?.lastUpdated?.toDate().getMonth().toString()}
                                                /
                                                {project?.lastUpdated?.toDate().getFullYear().toString()}
                                            </a>
                                        </Link>
                                    </td>
                                    <td key={project.code + "working"}>
                                        <Link href={`/projects/${project?.code}`}>
                                            <a>{project?.ticketCounts?.working ?? 0}</a>
                                        </Link>
                                    </td>
                                    <td></td>
                                    <td></td>
                                </tr>
                            );
                        })}
                        <EmptyRows columnCount={columnHeaders.length} rowCount={MIN_PROJECT_TABLE_ROWS - projects.length} />
                    </tbody>
                </table>

                <h2>Add New Project</h2>
                <NewProjectForm />
            </main>
        </>
    );
}

