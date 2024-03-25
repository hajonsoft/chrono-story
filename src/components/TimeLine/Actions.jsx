import Button from "@mui/material/Button";
import React from "react";

const Actions = ({ mode, setMode }) => {
  const entry = {
    title: "",
    description: "",
    year: "",
    image: "",
    photos: [],
  };
  const handleAddEntry = () => {
    setMode("add");
  };

  const handleSaveEntry = () => {
    // save entry to firestore
    console.log("Saving entry: ", entry);
    setMode("save");
  };

  return (
    <div>
      {(mode === "default" || mode === "save") && (
        <Button variant="contained" color="primary" onClick={handleAddEntry}>
          Add Entry
        </Button>
      )}
      {mode === "add" && (
        <Button variant="contained" color="primary" onClick={handleSaveEntry}>
          Save New Entry
        </Button>
      )}
    </div>
  );
};

export default Actions;
