import React, { useState } from "react";

import addEntryToArray from "../../hooks/addEntryToArray";
import NewCapsule from "../NewCapsule";
import Actions from "./components/Actions";
import TimelineDisplay from "./components/Display";
import { Paper } from "@mui/material";

const TimeLine = () => {
  const [mode, setMode] = useState("default");
  const [newCapsule, setNewCapsule] = useState({
    year: "",
    title: "",
    description: "",
    image: "",
    tags: [],
    photos: [],
    verses: [],
  });

  const handleSetMode = (mode) => {
    if (mode === "save") {
      addEntryToArray(newCapsule);
    }
    setMode(mode);
  }

  const handleEditCapsule = (capsule) => {
    setNewCapsule(capsule);
    setMode("edit");
  }

  return (
    <Paper elevation={10} sx={{margin: '0 32px', padding: '32px 64px 32px 16px' , minHeight: '100vh'}}>
      <Actions mode={mode} setMode={handleSetMode} />
      {mode === "add" && (
        <NewCapsule
          newCapsule={newCapsule}
          setNewCapsule={setNewCapsule}
          setParentMode={setMode}
        />
      )}
      <TimelineDisplay mode={mode} onEditCapsule={handleEditCapsule}/>
    </Paper>
  );
};

export default TimeLine;
