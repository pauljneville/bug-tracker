
import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, firestore } from './firebase';
import { addDoc, collection, doc, setDoc, onSnapshot } from 'firebase/firestore';

export function useUserData() {
    const [user] = useAuthState(auth);
    const [username, setUsername] = useState(null);

    useEffect(() => {
        // turn off realtime subscription
        let unsubscribe;

        if (user) {
            const docRef = doc(firestore, 'users', user.uid);
            // onSnapshot callback runs everytime the document is updated
            unsubscribe = onSnapshot(docRef, (doc) => {
                setUsername(doc.data()?.username);
            });
        } else {
            setUsername(null);
        }

        return unsubscribe;
    }, [user]);

    return { user, username };
}