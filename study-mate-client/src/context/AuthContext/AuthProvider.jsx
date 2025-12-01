import React, { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth } from "../../firebase/firebase.init";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);
  const googleProvider = new GoogleAuthProvider();

  // .............. registation with email & password  ....................
  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };
  // -----ueser profile update------
  const updatedUserSet = (updateUser) => {
    return updateProfile(auth.currentUser, updateUser);
  };

  //   ....................... logIn with email & password ........
  const logInUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  ///// log in with Google
  const logInWithGoogle = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };
  // ......... logOut .......
  const logOut = () => {
    return signOut(auth);
  };
  /// -----remaber user
  useEffect(() => {
    const unsubcribe = onAuthStateChanged(auth, (currentUser) => {
      console.log(currentUser);
      setUser(currentUser);
      setLoading(false);
    });
    return () => {
      unsubcribe();
    };
  }, []);
  //   ----- usable data ----
  const authInfo = {
    createUser,
    logInUser,
    setUser,
    setLoading,
    user,
    loading,
    logOut,
    logInWithGoogle,
    updatedUserSet,
  };
  return <AuthContext value={authInfo}>{children}</AuthContext>;
};

export default AuthProvider;
