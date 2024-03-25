import React from "react";
import Button from "@mui/material/Button";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth"; // Import Firebase authentication modules

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
const analytics = getAnalytics(app);

const auth = getAuth(app); // Initialize Firebase authentication service
const googleAuthProvider = new GoogleAuthProvider(); // Create Google authentication provider

const Home = () => {
  const handleLogin = () => {
    // Code to handle login with Firebase
    console.log("Logging in...");
  };

  // Function to handle Google sign-up
  const handleSignUp = () => {
    // Sign up with Google using Firebase
    signInWithPopup(auth, googleAuthProvider)
      .then((result) => {
        // Handle successful sign-up
        console.log("Signed up with Google:", result.user);
      })
      .catch((error) => {
        // Handle errors
        console.error("Error signing up with Google:", error);
      });
  };

  return (
    <div>
      <h1>Welcome to Chrono Story</h1>
      <p>
        Chrono Story is a website that allows you to build your own timeline
        with a focus on retrieving Quranic verses and commenting on them. Create
        timelines for various historical events, such as the ancient Egyptian
        timeline.
      </p>
      <Button variant="contained" color="primary" onClick={handleLogin}>
        Login
      </Button>
      <Button variant="contained" color="secondary" onClick={handleSignUp}>
        Sign Up
      </Button>
    </div>
  );
};

export default Home;
