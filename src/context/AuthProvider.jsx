import React, { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { auth } from '../firebase/firebase.config';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';

const AuthProvider = ({children}) => {

    // use states
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // create user || sign up && registation email and password
    const createUser = (email, password) => {
        setLoading(true);
       return createUserWithEmailAndPassword(auth, email, password);   
    }

    // signIn user with email and password
    const signInUser = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }


    // useEffect user manege state
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
                // setLoading(false);
        });

        return () => {
            unsubscribe();
        };
    }, []);

    const authinfo = {
        user,
        loading,
        createUser,
        signInUser,
    }

    return (
        <AuthContext value={authinfo}>
            {children}
        </AuthContext>
    );
};

export default AuthProvider;