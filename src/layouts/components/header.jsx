import React, { useEffect } from "react";

import { auth, firestore } from "@/firebase";
import { setActiveTimeLine, setMode, setUser } from "@/redux/globalSlice";
import AddBoxIcon from "@mui/icons-material/AddBox";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import {
  AppBar,
  Avatar,
  Box,
  Button,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import { signOut } from "firebase/auth";
import { collection, onSnapshot } from "firebase/firestore";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [timelines, setTimelines] = React.useState([]);
  const globalState = useSelector((state) => state.global);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const userId = globalState.user?.uid;
    if (!userId) return;

    const unsubscribe = onSnapshot(
      collection(firestore, "users", userId, "timelines"),
      (snapshot) => {
        const timelinesData = snapshot.docs.map((doc) => ({
          id: doc.id,
          name: doc.data().name,
        }));
        setTimelines(timelinesData);
      }
    );

    return unsubscribe;
  }, [globalState.user?.uid]);

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
    dispatch(
      setActiveTimeLine({
        key: event.target.value,
        name: timelines.find((timeline) => timeline.id === event.target.value)
          .name,
      })
    );
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
        }}
      >
        <Stack direction={"row"} alignItems={"center"} sx={{ width: "75%" }}>
          <Box sx={{ display: "flex", alignItems: "center", width: "100%" }}>
            <FormControl
              variant="filled"
              sx={{ backgroundColor: "#fff", marginRight: 2, flexGrow: 1 }}
            >
              <InputLabel id="timeline-select-label">
                Select a timeline
              </InputLabel>
              <Select
                labelId="timeline-select-label"
                value={globalState.activeTimeline.key}
                onChange={handleTimelineChange}
                sx={{ textAlign: "left" }}
              >
                <MenuItem value="" disabled>
                  Select a timeline
                </MenuItem>
                {timelines.map((timeline) => (
                  <MenuItem value={timeline.id} key={timeline.id}>
                    {timeline.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <IconButton onClick={handleAddTimeline}>
              <AddCircleOutlineIcon sx={{ color: "#fff" }} />
            </IconButton>
          </Box>
          <IconButton
            onClick={() => dispatch(setMode("add-capsule"))}
            disabled={!globalState.activeTimeline.key}
            sx={{ marginLeft: 2 }}
          >
            <AddBoxIcon sx={{ color: "#fff" }} />
            <Typography variant="body1" sx={{ color: "#fff" }}>
              New Capsule
            </Typography>
          </IconButton>
        </Stack>
        <Stack direction={"row"} alignItems={"center"}>
          <Avatar sx={{ bgcolor: "orange" }}>
            {globalState?.user?.displayName
              ? globalState?.user?.displayName?.[0]
              : globalState?.user?.email?.[0]}
          </Avatar>
          <Typography sx={{ marginLeft: 1 }}>
            {globalState?.user?.displayName || globalState?.user?.email}
          </Typography>
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
