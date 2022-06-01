
import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth'
import { getFirestore, addDoc, setDoc, doc, collection, onSnapshot, getDoc, getDocs, writeBatch, query, where, limit, Timestamp, serverTimestamp } from 'firebase/firestore'
import { getStorage, TaskEvent } from 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyA84gQhLuqwTAtE8SCG-ZSN0Ll38r3iGk4",
    authDomain: "for-real-bug-tracker.firebaseapp.com",
    projectId: "for-real-bug-tracker",
    storageBucket: "for-real-bug-tracker.appspot.com",
    messagingSenderId: "700262348843",
    appId: "1:700262348843:web:d7cd37f7a48fae8df9126e",
    measurementId: "G-F6HKHYVN4Q"
};

const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const googleAuthProvider = new GoogleAuthProvider();
export const googleSignInWithPopup = signInWithPopup;
export const googleSignOut = signOut;
export const firestore = getFirestore(app);
export const storage = getStorage(app);

/**
 * Gets a users/{uid} document by username
 * @param  {string} username
 */
export async function getUserWithUsername(username) {
    const usersRef = collection(firestore, 'users');
    const q = query(usersRef, where('username', '==', username), limit(1));
    const snapshot = await getDocs(q);
    const userDoc = snapshot.docs[0];
    return userDoc;
}

/**
 * Converts a firestore document to JSON
 * @param  {DocumentSnapshot} doc
 */
export function postToJSON(doc) {
    const data = doc.data();
    return {
        ...data,
        // firestore timestamp NOT serializable to JSON. Must convert to milliseconds
        createdAt: data.createdAt.toMillis(),
        updatedAt: data.updatedAt.toMillis(),
    };
}

/**
 * Gets all users
 */
export async function getAllUsers() {
    const usersRef = collection(firestore, 'users');
    const q = query(usersRef);
    const snapshot = await getDocs(q);
    return snapshot.docs;
}

/**
 * Gets all projects
 */
export async function getAllProjects(username) {
    const projectsRef = collection(firestore, 'projects');
    const q = query(projectsRef, where('username', '==', username));
    const snapshot = await getDocs(q);
    return snapshot.docs;
}

export const fromMillis = Timestamp.fromMillis;
export const timestampOfServer = serverTimestamp();
