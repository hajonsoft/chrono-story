import React, { useState } from "react";

import saveNewEntry from "../../hooks/saveNewEntry";
import saveExistingEntry from "../../hooks/saveExistingEntry";
import NewCapsule from "../NewCapsule";
import Actions from "./components/Actions";
import TimelineDisplay from "./components/Display";
import { Paper } from "@mui/material";
import deleteEntry from "../../hooks/deleteEntry";

const TimeLine = () => {
  const [mode, setMode] = useState("default");
  const [newCapsule, setNewCapsule] = useState({});

  const handleSetMode = (mode) => {
    if (mode === "save") {
      saveNewEntry(newCapsule);
      setMode(mode);
    }
    if (mode === "update") {
      saveExistingEntry(newCapsule.id, newCapsule);
      setMode("default");
    }
    if (mode === "add") {
      setNewCapsule({
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
  };

  const handleEditCapsule = (capsule) => {
    setNewCapsule(capsule);
    setMode("edit");
  };

  const handleDeleteCapsule = (capsule) => {
    deleteEntry(capsule.id);
  };

  return (
    <Paper
      elevation={10}
      sx={{
        margin: "0 32px",
        padding: "32px 64px 32px 16px",
        minHeight: "100vh",
      }}
    >
      <Actions mode={mode} setMode={handleSetMode} />
      {(mode === "add" || mode === "edit") && (
        <NewCapsule
          newCapsule={newCapsule}
          setNewCapsule={setNewCapsule}
          setParentMode={setMode}
        />
      )}
      <TimelineDisplay
        mode={mode}
        onEdit={handleEditCapsule}
        onDelete={handleDeleteCapsule}
      />
    </Paper>
  );
};

export default TimeLine;
