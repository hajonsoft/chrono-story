import React from "react";

import { Button, Link } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
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
            Quranic verse study website
          </Typography>

          <div>
            <Link variant="body2" color="primary" component={"button"} onClick={handleLogin}>
              Login
            </Link>
            <Button color="secondary" onClick={handleSignUp}>
              Sign Up
            </Button>
          </div>
        </Toolbar>
      </AppBar>
      <Information onGetStarted={handleSignUp}/>
    </div>
  );
};

export default Welcome;
