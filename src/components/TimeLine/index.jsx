import React, { useState } from "react";

import addEntryToArray from "../../hooks/addEntryToArray";
import NewCapsule from "../NewCapsule";
import Actions from "./Actions";
import TimelineDisplay from "./Display";

const TimeLine = () => {
  const [mode, setMode] = useState("default");
  const [newCapsule, setNewCapsule] = useState({
    title: "",
    description: "",
    year: "",
    image: "",
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
    <div>
      <Actions mode={mode} setMode={handleSetMode} />
      {mode === "add" && (
        <NewCapsule
          newCapsule={newCapsule}
          setNewCapsule={setNewCapsule}
          setParentMode={setMode}
        />
      )}
      <TimelineDisplay mode={mode} onEditCapsule={handleEditCapsule}/>
    </div>
  );
};

export default TimeLine;
