import React, { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import { auth } from "../firebase/firebase.config";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";

const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const createUser = (email, password, name, photo) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        // প্রোফাইল আপডেট করো
        return updateProfile(result.user, {
          displayName: name,
          photoURL: photo,
        }).then(() => {
          // আপডেট হওয়ার পর স্টেট ম্যানুয়ালি আপডেট করো জাতে সাথে সাথে নেভবারে দেখা যায়
          setUser({ ...result.user, displayName: name, photoURL: photo });
          setLoading(false);
          return result;
        });
      })
      .catch((error) => {
        setLoading(false);
        throw error; // এররটা রেজিস্টার পেজে পাঠানোর জন্য
      });
  };

  // Login
  const signInUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  // Google Login
  const signInWithGoogle = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  // Logout
  const signOutUser = () => {
    setLoading(true);
    return signOut(auth);
  };

  // User state manage
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const authinfo = {
    user,
    loading,
    createUser,
    signInUser,
    signInWithGoogle,
    signOutUser,
  };

  return (
    <AuthContext.Provider value={authinfo}>{children}</AuthContext.Provider>
  );
};;

export default AuthProvider;
