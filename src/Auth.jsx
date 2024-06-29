/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React, { useEffect } from "react";
import { auth, provider } from "./firebase";
import { signInWithPopup, onAuthStateChanged, signOut } from "firebase/auth";
import { Button } from "@mui/material";

const Auth = ({ user, setUser }) => {
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });
        return () => unsubscribe();
    }, [setUser]);

    const signIn = async () => {
        try {
            await signInWithPopup(auth, provider);
        } catch (error) {
            console.error("Error signing in: ", error.message);
        }
    };

    const logOut = async () => {
        try {
            await signOut(auth);
            setUser(null);
        } catch (error) {
            console.error("Error signing out: ", error.message);
        }
    };

    return (
        <div>
            {user ? (
                <>
                    <h2>Welcome, {user.displayName}</h2>
                    <Button onClick={logOut}>Log Out</Button>
                </>
            ) : (
                <Button onClick={signIn}>Sign In with Google</Button>
            )}
        </div>
    );
};

export default Auth;
