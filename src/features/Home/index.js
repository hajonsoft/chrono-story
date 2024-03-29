// import { getAnalytics } from "firebase/analytics";
import React, { useState, useEffect } from "react";

import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth, signInWithPopup, onAuthStateChanged } from "firebase/auth"; // Import Firebase authentication modules
import Welcome from "./Welcome";

const firebaseConfig = {
  apiKey: "AIzaSyDOdTR0_d_VM1yVe_9g0Kc1Cer5ka8K46k",
  authDomain: "chrono-story.firebaseapp.com",
  projectId: "chrono-story",
  storageBucket: "chrono-story.appspot.com",
  messagingSenderId: "169058871382",
  appId: "1:169058871382:web:16653261123826e59833f7",
  measurementId: "G-PZ0KJ73475",
};

const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

const auth = getAuth(app); // Initialize Firebase authentication service
const googleAuthProvider = new GoogleAuthProvider(); // Create Google authentication provider

const Home = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check if the user is already authenticated when the component mounts
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, update the user state
        console.log("User is already signed in:", user);
        setUser(user);
      } else {
        // No user is signed in, reset the user state
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
    <Welcome
      handleLogin={handleLogin}
      handleSignUp={handleSignUp}
      user={user}
    />
  );
};

export default Home;
