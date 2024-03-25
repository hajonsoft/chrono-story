import React, { useEffect } from "react";
import Button from "@mui/material/Button";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Avatar, Stack } from "@mui/material";
import TimeLine from "../TimeLine";
import listenToUserEntries from "../../hooks/listenToUserEntries";

const Welcome = ({ user, handleLogin, handleSignUp }) => {
  useEffect(() => {
    const unsubscribe =
      user &&
      listenToUserEntries((entries) => {
        console.log("User entries: ", entries);
      });

    return () => {
      unsubscribe && unsubscribe();
    };
  }, [user]);

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
        <div>
          <h1>Welcome to Chrono Story</h1>
          <p>
            Chrono Story is a website that allows you to build your own timeline
            with a focus on retrieving Quranic verses and commenting on them.
            Create timelines for various historical events, such as the ancient
            Egyptian timeline.
          </p>
        </div>
      )}

      {user && (
        <div>
          <h1>Welcome back, {user.displayName || user.email}!</h1>
          <p>
            You are now logged in to Chrono Story. You can start creating your
            own timelines or view existing ones.
          </p>

          <TimeLine />
        </div>
      )}
    </div>
  );
};

export default Welcome;
