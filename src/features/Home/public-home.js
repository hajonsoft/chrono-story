// import { getAnalytics } from "firebase/analytics";
import React, { useEffect, useState } from "react";

import { auth } from "@/firebase";
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
} from "firebase/auth";
import Home from "./home";

const googleAuthProvider = new GoogleAuthProvider(); // Create Google authentication provider

const PublicHome = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check if the user is already authenticated when the component mounts
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    // Clean up the listener when the component unmounts
    return () => unsubscribe();
  }, []); // Empty dependency array ensures the effect runs only once on mount

  const handleLogin = () => {
    // Sign in with Google using Firebase
    signInWithPopup(auth, googleAuthProvider)
      .then((result) => {
        // Handle successful login
        console.log("Logged in with Google:", result.user);
        setUser(result.user);
      })
      .catch((error) => {
        // Handle errors
        console.error("Error logging in with Google:", error);
      });
  };

  // Function to handle Google sign-up
  const handleSignUp = () => {
    // Sign up with Google using Firebase
    signInWithPopup(auth, googleAuthProvider)
      .then((result) => {
        setUser(result.user);
      })
      .catch((error) => {
        console.error("Error signing up with Google:", error);
      });
  };

  return (
    <Home handleLogin={handleLogin} handleSignUp={handleSignUp} user={user} />
  );
};

export default PublicHome;
