import React, { useState } from "react";

import { Button, Stack, TextField } from "@mui/material";
import { Box } from "@mui/system";
import Actions from "./Actions";

const NewCapsule = ({ newCapsule, setNewCapsule, setParentMode }) => {
  const [mode, setMode] = useState("new");

  const handleSetMode = (mode) => {
    setMode(mode);
    setParentMode("save");
  }
  return (
    <>
      {mode === "new" && (
        <Stack direction={"row"} alignItems={"center"} spacing={1}>
          <Box sx={{ width: "7%" }}>
            <TextField
              label="Year"
              fullWidth
              value={newCapsule.year}
              onChange={(e) =>
                setNewCapsule({
                  ...newCapsule,
                  year: e.target.value,
                })
              }
            />
          </Box>
          <Box sx={{ width: "23%" }}>
          </Box>
          <Box sx={{ width: "65%" }}>
            <Stack spacing={1}>
              <Stack direction={"row"} alignItems={"center"}>
                <TextField
                  label="Title"
                  value={newCapsule.title}
                  fullWidth
                  onChange={(e) =>
                    setNewCapsule({
                      ...newCapsule,
                      title: e.target.value,
                    })
                  }
                />
                <Box sx={{ width: "50%" }}>Tags Area</Box>
              </Stack>
              <TextField
                label="Description"
                fullWidth
                value={newCapsule.description}
                onChange={(e) =>
                  setNewCapsule({
                    ...newCapsule,
                    description: e.target.value,
                  })
                }
              />
              <Stack direction={"row"}>
                <Button variant="contained" color="primary">
                  Add Photo
                </Button>
              </Stack>
            </Stack>
          </Box>

          <Box sx={{ width: "5%" }}>
            <Actions mode={mode} setMode={handleSetMode} />
          </Box>
        </Stack>
      )}
      {mode === "add" && <div>View mode</div>}
    </>
  );
};

export default NewCapsule;
