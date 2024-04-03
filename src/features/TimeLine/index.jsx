import React, { useState } from "react";

import { Box } from "@mui/material";
import deleteEntry from "../../hooks/deleteEntry";
import saveExistingEntry from "../../hooks/saveExistingEntry";
import saveNewEntry from "../../hooks/saveNewEntry";
import NewCapsule from "../NewCapsule";
import Actions from "./components/Actions";
import TimelineDisplay from "./components/time-line-display";

const TimeLine = () => {
  const [mode, setMode] = useState("default");
  console.log("mode", mode);
  const [activeCapsule, setActiveCapsule] = useState({});

  const handleSetMode = (mode) => {
    if (mode === "save") {
      saveNewEntry(activeCapsule);
      setMode(mode);
    }
    if (mode === "update") {
      saveExistingEntry(activeCapsule.id, activeCapsule);
      setMode("default");
    }
    if (mode === "add") {
      setActiveCapsule({
        id: new Date().getTime(),
        year: "",
        title: "",
        description: "",
        image: "",
        tags: [],
        photos: [],
        verses: [],
      });
      setMode(mode);
    }
    if (mode === "default") {
      setMode(mode);
    }
  };

  const handleEditCapsule = (capsule) => {
    setActiveCapsule(capsule);
    setMode("edit");
  };

  const handleDeleteCapsule = (capsule) => {
    deleteEntry(capsule.id);
  };

  return (
    <Box
      elevation={10}
      sx={{
        margin: "0 32px",
        padding: "32px 64px 32px 16px",
        minHeight: "100vh",
      }}
    >
      <Actions mode={mode} setMode={handleSetMode} />
      {mode === "add" && (
        <NewCapsule
          newCapsule={activeCapsule}
          setNewCapsule={setActiveCapsule}
          setParentMode={setMode}
        />
      )}
      <Box sx={{border: '1px solid teal', borderRadius: '16px', boxShadow: '8px 4px 8px teal'}}>
        <TimelineDisplay
          mode={mode}
          onEdit={handleEditCapsule}
          onDelete={handleDeleteCapsule}
          newCapsule={activeCapsule}
          setNewCapsule={setActiveCapsule}
          setMode={handleSetMode}
        />
      </Box>
    </Box>
  );
};

export default TimeLine;
