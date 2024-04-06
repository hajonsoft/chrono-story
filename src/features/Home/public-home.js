// import { getAnalytics } from "firebase/analytics";
import React, { useEffect, useState } from "react";

import { auth } from "@/firebase";
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
} from "firebase/auth";
import TimeLine from "../TimeLine";
import Welcome from "./welcome";

const googleAuthProvider = new GoogleAuthProvider(); // Create Google authentication provider

const PublicHome = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    // Clean up the listener when the component unmounts
    return () => unsubscribe();
  }, []);

  const handleLogin = () => {
    signInWithPopup(auth, googleAuthProvider)
      .then((result) => {
        setUser(result.user);
      })
      .catch((error) => {
        console.error("Error logging in with Google:", error);
      });
  };

  const handleSignUp = () => {
    signInWithPopup(auth, googleAuthProvider)
      .then((result) => {
        setUser(result.user);
      })
      .catch((error) => {
        console.error("Error signing up with Google:", error);
      });
  };

  const handleSignOut = () => {
    setUser(undefined);
  };

  return (
    <>
      {user ? (
        <TimeLine user={user} signOut={handleSignOut} />
      ) : (
        <Welcome
          handleLogin={handleLogin}
          handleSignUp={handleSignUp}
          user={user}
        />
      )}
    </>
  );
};

export default PublicHome;
