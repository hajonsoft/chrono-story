import React from "react";

import { Add, Cancel, Save } from "@mui/icons-material";
import { Stack } from "@mui/material";
import Button from "@mui/material/Button";

const Actions = ({ mode, setMode }) => {
  return (
    <Stack direction={"row"} justifyContent={"flex-end"} alignItems={"center"}>
      {(mode === "default" || mode === "save") && (
        <Button
          onClick={() => setMode("add")}
          color="primary"
          variant="contained"
          startIcon={<Add />}
        >
          New capsule
        </Button>
      )}
      <Stack direction={"row"} spacing={1}>
        {(mode === "add" || mode === "edit") && (
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => setMode("default")}
            startIcon={<Cancel />}
          >
            Cancel
          </Button>
        )}
        {mode === "add" && (
          <Button
            variant="contained"
            color="primary"
            onClick={() => setMode("save")}
            startIcon={<Save />}
          >
            Save Capsule
          </Button>
        )}
        {mode === "edit" && (
          <Button
            variant="contained"
            color="primary"
            onClick={() => setMode("update")}
            startIcon={<Save />}
          >
            Update Capsule
          </Button>
        )}
      </Stack>
    </Stack>
  );
};

export default Actions;
