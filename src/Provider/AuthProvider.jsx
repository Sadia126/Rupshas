/* eslint-disable react-refresh/only-export-components */
import { createContext, useEffect, useState } from "react";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";


import app from "../Firebase/Firebase.config";

const auth = getAuth(app);

export const AuthContext = createContext(null);
const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

// Fetch JWT token and store it in localStorage
const getJWT = async (email) => {
  const res = await fetch("https://rupsha-server-side.vercel.app/jwt", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });

  const data = await res.json();
  if (data.token) {
    localStorage.setItem("access-token", data.token);
  }
  else{
    setUser(null);
  }
};

  
  // Google Login
const googleLogin = () => {
  setLoading(true);
  return signInWithPopup(auth, googleProvider).then((result) => {
    const email = result.user?.email;
    console.log("Google Login Result:", email);
    if (email) {
      getJWT(email);
    }
    setUser(result.user);
    return result.user;
  }).finally(() => setLoading(false));
};



  // Email/Password Registration
  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // Login with Email/Password
  const login = (email, password) => {
  setLoading(true);
  return signInWithEmailAndPassword(auth, email, password).then((result) => {
    getJWT(email);
    return result;
  });
};


  // Update user profile (name + photo)
const handleUpdateProfile = async (name, photo) => {
  if (auth.currentUser) {
    await updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo,
    });

    
    setUser({ ...auth.currentUser });
  }
};


  // Logout
 const logout = () => {
  setLoading(true);
  localStorage.removeItem("access-token");
  return signOut(auth);
};


  

  // Monitor auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (loggedUser) => {
      setUser(loggedUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  console.log("User in AuthProvider:", user);

  const authentication = {
    googleLogin,
    createUser,
    login,
    logout,
    user,
    loading,
    handleUpdateProfile,
  };

  return (
    <AuthContext.Provider value={authentication}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;