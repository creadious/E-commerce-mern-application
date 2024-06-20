import { createContext, useEffect, useState } from "react";
import {
  FacebookAuthProvider,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import app from "../firebase/firebase.config";
import axios from "axios";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const auth = getAuth(app);

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Mange user by email password
  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };
  const addNamePhoto = (currentUser, name) => {
    return updateProfile(currentUser, {
      displayName: name,
    });
  };
  const logIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };
  const logOut = () => {
    setLoading(true);
    return signOut(auth);
  };

  // Social

  const googleProvider = new GoogleAuthProvider();
  const facebookProvider = new FacebookAuthProvider();

  const signInWithGoogle = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  const signInWithFacebook = () => {
    setLoading(true);
    return signInWithPopup(auth, facebookProvider);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);

      console.log("Current User", currentUser);
      //  get and set token
      if (currentUser) {
        axios
          .post("http://localhost:8000/api/v1/users/jwt", {
            email: currentUser.email,
          })
          .then((res) => {
            const token = res.data.data.token;
            localStorage.setItem("access-token", token);

        });
        setLoading(false);
    } else {
        localStorage.removeItem("access-token");
        setLoading(false);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const authInfo = {
    user,
    loading,
    createUser,
    logIn,
    logOut,
    addNamePhoto,
    signInWithGoogle,
    signInWithFacebook,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
