import React, { useEffect } from "react";

import { auth } from "@/firebase";
import { setUser } from "@/redux/globalSlice";
import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
} from "firebase/auth";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const googleAuthProvider = new GoogleAuthProvider(); // Create Google authentication provide

const PublicLayout = ({ children }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, displayName, email, photoURL } = user;
        dispatch(setUser({ uid, displayName, email, photoURL }));
        navigate("/timelines");
      } else {
        dispatch(setUser(null));
      }
    });

    // Clean up the listener when the component unmounts
    return () => unsubscribe();
  }, [dispatch, navigate]);

  const handleLogin = () => {
    signInWithPopup(auth, googleAuthProvider)
      .then((result) => {
        const { uid, displayName, email, photoURL } = result.user;
        dispatch(setUser({ uid, displayName, email, photoURL }));
        navigate("/timelines");
      })
      .catch((error) => {
        console.error("Error logging in with Google:", error);
      });
  };

  const handleSignUp = () => {
    signInWithPopup(auth, googleAuthProvider)
      .then((result) => {
        const { uid, displayName, email, photoURL } = result.user;
        dispatch(setUser({ uid, displayName, email, photoURL }));
        navigate("/timelines");
      })
      .catch((error) => {
        console.error("Error signing up with Google:", error);
      });
  };
  return (
    <>
      <AppBar
        position="static"
        sx={{ backgroundColor: "#FDFFEF", color: "#D0000E" }}
      >
        <Toolbar>
          <Box display="flex" alignItems="center" sx={{ flexGrow: 1 }}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="40"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
              <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5V4.5A2.5 2.5 0 0 1 6.5 2z"></path>
            </svg>
            <Typography variant="h6" component="div" sx={{ marginLeft: 2 }}>
              Quranic verse study
            </Typography>
          </Box>

          <Box display="flex" gap={2}>
            <Button variant="outlined" color="primary" onClick={handleLogin}>
              Login
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleSignUp}
            >
              Sign Up
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
      {children}
    </>
  );
};

export default PublicLayout;
