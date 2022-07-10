
import Metatags from '../../common/components/Metatags';
import { getAllProjects } from '../../../lib/firebase';
import { useContext, useEffect, useState, useCallback } from 'react';
import { UserContext } from '../../../lib/context';
import { firestore, auth, googleAuthProvider, googleSignInWithPopup, googleSignOut } from '../../../lib/firebase';
import { getFirestore, addDoc, setDoc, doc, collection, onSnapshot, getDoc, getDocs, writeBatch, query, where, limit, Timestamp, serverTimestamp } from 'firebase/firestore'
import debounce from 'lodash.debounce';

import Router from 'next/router'
import Link from 'next/link';
import { NewProjectForm } from 'src/modules/NewProjectForm';

import { RecordTable } from '@components/RecordTable/RecordTable';
import { EmptyRows } from '@components/EmptyRows';
import { RowProjectRecord } from '@components/RowProjectRecord';

export default function Projects() {
    const { user, username } = useContext(UserContext);
    const [loading, setLoading] = useState(false);
    const [projects, setProjects] = useState([]);
    const MIN_PROJECT_TABLE_ROWS = 10;

    const columnHeaders = ["Code", "Project Name", "Owner", "Version", "Last Updated", "Tickets", "Bells", "..."];

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

                <RecordTable columnHeaders={columnHeaders}>
                    {projects?.map((record, index) => {
                        return (
                            <RowProjectRecord key={index} record={record} />
                        );
                    })}
                    <EmptyRows columnCount={columnHeaders.length} rowCount={MIN_PROJECT_TABLE_ROWS - projects.length} />
                </RecordTable>

                <h2>Add New Project</h2>
                <NewProjectForm />
            </main>
        </>
    );
}

