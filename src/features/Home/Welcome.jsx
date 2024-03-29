import { Avatar, Box, Stack } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import React from "react";
import TimeLine from "../TimeLine";

const Welcome = ({ user, handleLogin, handleSignUp }) => {
  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Chrono Story
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
              <Button
                variant="contained"
                color="secondary"
                onClick={handleSignUp}
              >
                Sign Up
              </Button>
            </div>
          )}
        </Toolbar>
      </AppBar>
      {!user && (
        <Box sx={{ marginTop: "16px" }}>
          <Typography variant="h3">Welcome to Chrono Story</Typography>
          <p>
            Chrono Story is a website that allows you to build your own timeline
            with a focus on retrieving Quranic verses and commenting on them.
            Create timelines for various historical events, such as the ancient
            Egyptian timeline.
          </p>
        </Box>
      )}

      {user && (
        <Box sx={{ marginTop: "16px" }}>
          <Typography variant="h5">
            Welcome back, {user.displayName || user.email}!
          </Typography>
          <p>
            You are now logged in to Chrono Story. You can start creating your
            own timelines or view existing ones.
          </p>

          <TimeLine />
        </Box>
      )}
    </div>
  );
};

export default Welcome;
