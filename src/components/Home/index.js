// import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth"; // Import Firebase authentication modules
import React, { useState } from "react";
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
        // Handle successful sign-up
        console.log("Signed up with Google:", result.user);
        setUser(result.user);
      })
      .catch((error) => {
        // Handle errors
        console.error("Error signing up with Google:", error);
      });
  };

  return (
    <div>
      <Welcome
        handleLogin={handleLogin}
        handleSignUp={handleSignUp}
        user={user}
      />
    </div>
  );
};

export default Home;
