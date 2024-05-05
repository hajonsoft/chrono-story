import React from "react";

import { auth } from "@/firebase";
import { setActiveTimeLine, setMode, setUser } from "@/redux/globalSlice";
import AddBoxIcon from "@mui/icons-material/AddBox";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import {
  AppBar,
  Avatar,
  Button,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { signOut } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useTimelines } from "../../hooks/useTimelines";

const Header = () => {
  const globalState = useSelector((state) => state.global);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useTimelines();

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        dispatch(setUser(null));
      })
      .catch((error) => {
        console.error("Error signing out:", error);
      });
  };

  const handleTimelineChange = (event) => {
    if (event.target.value === "") return;
    dispatch(setActiveTimeLine(event.target.value));
    navigate(`/timeline/${event.target.value}`);
  };

  const handleAddTimeline = () => {
    dispatch(setMode("add-timeline"));
  };

  return (
    <AppBar position="static">
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 4,
        }}
      >
        <Stack direction={"row"} alignItems={"center"} flexGrow={1}>
          <FormControl
            variant="filled"
            fullWidth
            sx={{ backgroundColor: "white", borderRadius: 1, margin: 1 }}
          >
            <InputLabel id="timeline-select-label">
              Select a timeline
            </InputLabel>
            <Select
              labelId="timeline-select-label"
              value={globalState.activeTimeline || ""}
              onChange={handleTimelineChange}
              sx={{ textAlign: "left" }}
            >
              <MenuItem value={""}>Select a Time Line</MenuItem>
              {Object.keys(globalState.timelines).map((key) => (
                <MenuItem value={key} key={key}>
                  {globalState.timelines[key].name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <IconButton onClick={handleAddTimeline}>
            <AddCircleOutlineIcon sx={{ color: "#fff" }} />
            {!isMobile && (
              <Typography variant="body1" sx={{ color: "#fff", margin: 1 }}>
                New Time Line
              </Typography>
            )}
          </IconButton>
          <IconButton
            onClick={() => dispatch(setMode("add-capsule"))}
            disabled={!globalState.activeTimeline}
            sx={{ marginLeft: 2 }}
          >
            <AddBoxIcon sx={{ color: "#fff" }} />
            {!isMobile && (
              <Typography variant="body1" sx={{ color: "#fff", margin: 1 }}>
                New Capsule
              </Typography>
            )}
          </IconButton>
        </Stack>
        <Stack direction={"row"} alignItems={"center"}>
          <Avatar sx={{ bgcolor: "orange" }}>
            {globalState?.user?.displayName
              ? globalState?.user?.displayName?.[0]
              : globalState?.user?.email?.[0]}
          </Avatar>
          {!isMobile && (
            <Typography sx={{ marginLeft: 1 }}>
              {globalState?.user?.displayName || globalState?.user?.email}
            </Typography>
          )}
          <Button
            onClick={handleSignOut}
            sx={{ color: "#fff", textTransform: "lowercase" }}
          >
            Logout
          </Button>
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
