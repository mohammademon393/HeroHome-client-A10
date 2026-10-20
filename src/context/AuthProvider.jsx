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
  sendPasswordResetEmail,
  updateProfile,
} from "firebase/auth";

const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const updateUserProfile = async (displayName, photoURL) => {
    const currentUser = auth.currentUser;
    await updateProfile(currentUser, { displayName, photoURL });
    setUser({ ...currentUser, displayName, photoURL });
  };

  const resetPassword = (email) => sendPasswordResetEmail(auth, email);

  const createUser = (email, password, name, photo) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        // প্রোফাইল আপডেট করো
        return updateUserProfile(name, photo).then(() => {
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
  const signInUser = async (email, password) => {
    setLoading(true);
    try {
      return await signInWithEmailAndPassword(auth, email, password);
    } finally {
      setLoading(false);
    }
  };

  // Google Login
  const signInWithGoogle = async () => {
    setLoading(true);
    try {
      return await signInWithPopup(auth, googleProvider);
    } finally {
      setLoading(false);
    }
  };

  // Logout
  const signOutUser = async () => {
    setLoading(true);
    try {
      return await signOut(auth);
    } finally {
      setLoading(false);
    }
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
    updateUserProfile,
    resetPassword,
  };

  return (
    <AuthContext.Provider value={authinfo}>{children}</AuthContext.Provider>
  );
};;

export default AuthProvider;
