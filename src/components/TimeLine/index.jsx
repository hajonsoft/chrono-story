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
  });

  const handleSetMode = (mode) => {
    if (mode === "save") {
      console.log("📢[index.jsx:20]: newCapsule: ", newCapsule);
      addEntryToArray(newCapsule);
    }
    setMode(mode);
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
      <TimelineDisplay mode={mode} />
    </div>
  );
};

export default TimeLine;
