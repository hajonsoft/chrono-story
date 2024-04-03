import { Avatar, Box, Button, Stack } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import React from "react";
import TimeLine from "../TimeLine";
import Information from "./Information";

const Home = ({ user, handleLogin, handleSignUp }) => {
  return (
    <div>
      <AppBar position="static" sx={{backgroundColor: '#FDFFEF', color: '#D0000E'}}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Time Verse
          </Typography>
          {user ? (
            <Stack direction={"row"} alignItems={"center"}>
              <Avatar sx={{ bgcolor: "orange" }}>
                {user.displayName ? user.displayName[0] : user.email[0]}
              </Avatar>
              <Typography sx={{ marginLeft: 1 }}>
                {user.displayName || user.email}
              </Typography>
            </Stack>
          ) : (
            <div>
              <Button variant="contained" color="primary" onClick={handleLogin}>
                Login
              </Button>
              <Button color="secondary" onClick={handleSignUp}>
                Sign Up
              </Button>
            </div>
          )}
        </Toolbar>
      </AppBar>
      {!user && <Information />}
      {/* TODO: Replace Welcome back with the timeLine when the user is logged in and there is a timeLine */}
      {/* Create one free time line per login for more timelines per login, payment is required */}
      {user && (
        <Box sx={{ marginTop: "16px" }}>
          <Typography variant="h5">
            Welcome back, {user.displayName || user.email}!
          </Typography>
          <p>
            You are now logged in to Time Verse. You can start creating your own
            timelines or view existing ones.
          </p>

          <TimeLine />
        </Box>
      )}
    </div>
  );
};

export default Home;
