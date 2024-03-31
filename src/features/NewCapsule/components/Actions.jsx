import { Button, Stack } from "@mui/material";
import React from "react";

const Actions = ({ mode, setMode }) => {
  const handleSetMode = () => {
    setMode("update");
  };

  return (
    <Stack direction={"row"} alignItems={"center"} sx={{ width: "100%" }}>
      {mode === "edit" && (
        <Button onClick={handleSetMode} color="primary" variant="contained">
          Save
        </Button>
      )}
    </Stack>
  );
};

export default Actions;
