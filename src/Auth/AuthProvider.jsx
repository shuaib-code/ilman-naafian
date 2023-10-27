import { createContext, useEffect, useState } from "react";
import {
  getAuth,
  onAuthStateChanged,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import app from "../firebase/firebase.config";

const auth = getAuth(app);
export const AuthContext = createContext(null);
const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(1);

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(0);
    });
    return () => {
      unSubscribe;
    };
  }, []);

  const googleSignIn = () => {
    setLoading(1);
    return signInWithPopup(auth, googleProvider);
  };
  const logOut = () => {
    setLoading(1);
    window.location.reload(true);
    return signOut(auth);
  };

  const authObj = { user, loading, googleSignIn, logOut };
  return (
    <AuthContext.Provider value={authObj}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
