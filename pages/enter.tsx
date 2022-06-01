import { useContext, useEffect, useState, useCallback } from 'react';
import { UserContext } from '../lib/context';
import { firestore, auth, googleAuthProvider, googleSignInWithPopup, googleSignOut } from '../lib/firebase';
import { doc, getDoc, writeBatch } from 'firebase/firestore'
import debounce from 'lodash.debounce';
import { useForm } from 'react-hook-form';
import styles from '../styles/EnterPage.module.css';
import Router from 'next/router'
import Link from 'next/link';

export default function EnterPage(props) {
    const { user, username } = useContext(UserContext);
    useEffect(() => {
        if (username) {
            Router.push('/');
            console.log("a username");
        } else {
            console.log("no username");
        }
    }, [username]);

    // 1. user signed out <SignInButton />
    // 2. user signed in, but missing username <UsernameForm />
    // 3. user signed in, has username <SignOutButton />

    return (
        <main>
            {user ?
                !username ? <UsernameForm /> : <></> : <SignInButton />
            }
        </main>
    )
}

const SignInButton = () => {
    const signIn = async () => {
        googleSignInWithPopup(auth, googleAuthProvider)
            .then((user) => {
                console.log(" ###### user");
                console.log(user);
            })
            .catch((error) => {
                console.error(error);
            })
    };
    return (
        <button className="btn-google" onClick={signIn}>
            <img src={'/google.png'} alt="google g" />Sign in with Google
        </button>
    );
}

const UsernameForm = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');

    const [userName, setUserName] = useState('');
    const [isValid, setIsValid] = useState(false);
    const [loading, setLoading] = useState(false);

    const { user, username } = useContext(UserContext);

    useEffect(() => {
        checkUsername(userName);
    }, [userName]);


    const onUsernameChange = (e) => {
        // username must be between 3 and 15 characters long
        // containing only letters, numbers, underscore
        const val = e.target.value.toLowerCase();
        const re = /^(?=[a-zA-Z0-9._]{3,15}$)(?!.*[_.]{2})[^_.].*[^_.]$/;

        // check that username is >= 3 characters and passes regex format
        if (val.length < 3) {
            setUserName(val);
            setLoading(false);
            setIsValid(false);
        }
        if (re.test(val)) {
            setUserName(val);
            setLoading(true);
            setIsValid(false);
        }
    };
    const onFirstNameChange = (e) => {
        // username must be between 3 and 15 characters long, only letters
        const val = e.target.value.toLowerCase();
        const re = /^(?=[a-zA-Z]{3,15}$)$/;

        if (re.test(val)) {
            setFirstName(val);
        }
    };
    const onLastNameChange = (e) => {
        // username must be between 3 and 15 characters long, only letters
        const val = e.target.value.toLowerCase();
        const re = /^(?=[a-zA-Z]{3,15}$)$/;

        if (re.test(val)) {
            setLastName(val);
        }
    };

    const checkUsername = useCallback(debounce(async (username) => {
        if (username.length >= 3) {
            const ref = doc(firestore, `usernames/${username}`);
            const documentRef = await getDoc(ref);
            setIsValid(documentRef.exists() == false);
            setLoading(false);
        }
    }, 500), []
    );

    const onSubmit = async (e) => {
        e.preventDefault();

        // get/create the documents that will change in this operation
        const userDoc = doc(firestore, `users/${user.uid}`);
        const usernameDoc = doc(firestore, `usernames/${userName}`);

        const batch = writeBatch(firestore);
        try {
            // batch set the changes to the documents
            batch.set(
                userDoc,
                {
                    username: userName,
                    photoURL: user.photoURL,
                    displayName: user.displayName,
                    email: user.email,
                    firstName: firstName,
                    lastName: lastName,
                    roles: [
                        "user"
                    ],
                }
            );
            batch.set(usernameDoc, { uid: user.uid });
            await batch.commit();
        } catch (error) {
            console.error("error with user batch write");
            console.error(error);
        }
    };

    return (
        <>
            {!username && (
                <section>
                    <h3>Choose Username</h3>
                    <form onSubmit={onSubmit} className={styles.enterForm}>
                        <input placeholder="firstName" onChange={onFirstNameChange} />
                        <input placeholder="lastName" onChange={onLastNameChange} />
                        <input placeholder="username" onChange={onUsernameChange} />
                        <UsernameMessage username={userName} isValid={isValid} loading={loading} />
                        <button type="submit" className="btn-green" disabled={!isValid}>
                            Choose
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
            )}
        </>
    );
}



function UsernameMessage({ username, isValid, loading }) {
    if (loading) {
        return <p>Checking...</p>;
    } else if (isValid) {
        return <p className="text-success">{username} is available!</p>;
    } else if (username && !isValid) {
        return <p className="text-danger">That username is taken!</p>;
    } else {
        <p></p>
    }
}
