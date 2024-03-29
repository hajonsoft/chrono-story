import { Button, Stack } from "@mui/material";
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
    setMode("saved");
  };

  const handleSaveEntry = () => {
    // save entry to firestore
    console.log("Saving entry: ", entry);
    setMode("edit");
  };

  return (
    <Stack
      direction={"row"}
      justifyContent={"flex-end"}
      alignItems={"center"}
      sx={{ width: "100%" }}
    >
      {mode === "saved" && <Button onClick={handleAddEntry}>Edit</Button>}
      {mode === "new" && <Button onClick={handleSaveEntry}>Save</Button>}
    </Stack>
  );
};

export default Actions;
