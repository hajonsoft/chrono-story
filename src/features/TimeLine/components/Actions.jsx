import React from "react";

import { Add, Cancel, Save } from "@mui/icons-material";
import { Stack } from "@mui/material";
import Button from "@mui/material/Button";

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

  const handleCancelEntry = () => {
    // save entry to firestore
    setMode("default");
  };

  return (
    <Stack direction={"row"} justifyContent={"flex-end"} alignItems={"center"}>
      {(mode === "default" || mode === "save") && (
        <Button
          onClick={handleAddEntry}
          color="primary"
          variant="contained"
          startIcon={<Add />}
        >
          New capsule
        </Button>
      )}
      {mode === "add" && (
        <Stack direction={"row"} spacing={1}>
          <Button
            variant="outlined"
            color="secondary"
            onClick={handleCancelEntry}
            startIcon={<Cancel />}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSaveEntry}
            startIcon={<Save />}
          >
            Save Capsule
          </Button>
        </Stack>
      )}
    </Stack>
  );
};

export default Actions;
