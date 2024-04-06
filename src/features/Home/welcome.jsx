import { Button } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import React from "react";
import Information from "./Information";

const Welcome = ({ handleLogin, handleSignUp }) => {
  return (
    <div>
      <AppBar
        position="static"
        sx={{ backgroundColor: "#FDFFEF", color: "#D0000E" }}
      >
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Time Verse
          </Typography>

          <div>
            <Button variant="contained" color="primary" onClick={handleLogin}>
              Login
            </Button>
            <Button color="secondary" onClick={handleSignUp}>
              Sign Up
            </Button>
          </div>
        </Toolbar>
      </AppBar>
      <Information />
    </div>
  );
};

export default Welcome;
