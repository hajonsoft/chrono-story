import React, { useEffect, useState } from "react";

import {
  Button,
  Card,
  CardActions,
  CardContent,
  Stack,
  TextField,
} from "@mui/material";
import { Box } from "@mui/system";
import { useFilePicker } from "use-file-picker";
import Actions from "./components/Actions";
import QuranVerse from "./components/QuranVerse";
import Tags from "./components/Tags";
import uploadImage from "../../hooks/uploadImage";
import { Photo } from "@mui/icons-material";

const NewCapsule = ({ newCapsule, setNewCapsule, setParentMode }) => {
  const [mode, setMode] = useState("new");
  const [newTag, setNewTag] = useState("");

  const { openFilePicker, filesContent, loading } = useFilePicker({
    accept: ".jpg, .jpeg, .png, .gif",
  });
  console.log("📢[index.jsx:23]: loading: ", loading);

  useEffect(() => {
    async function saveImage() {
      await uploadImage(filesContent[0]);
    }

    if (!loading && filesContent && filesContent.length > 0) {
      saveImage();
    }
  }, [filesContent, loading]);

  const handleDelete = (tagToDelete) => {
    setNewCapsule({
      ...newCapsule,
      tags: newCapsule.tags.filter((tag) => tag !== tagToDelete),
    });
  };

  const handleAddTag = () => {
    if (newTag.trim() !== "") {
      setNewCapsule({
        ...newCapsule,
        tags: [...newCapsule.tags, newTag],
      });
    }
  };

  const handleSetMode = (mode) => {
    setMode(mode);
    setParentMode("save");
  };

  return (
    <Card elevation={6} sx={{ padding: "16px 32px 32px 16px", margin: "16px" }}>
      {mode === "new" && (
        <CardContent>
          <Stack direction={"row"} spacing={1} sx={{ height: "100%" }}>
            <Box sx={{ width: "13%", height: "100%" }}>
              <Stack sx={{ height: "100%" }}>
                <TextField
                  label="Year"
                  type="number"
                  variant="filled"
                  fullWidth
                  value={newCapsule.year}
                  onChange={(e) =>
                    setNewCapsule({
                      ...newCapsule,
                      year: e.target.value,
                    })
                  }
                />
                <Box sx={{ height: "100%" }}>
                  <Button
                    onClick={() => openFilePicker()}
                    startIcon={<Photo />}
                  >
                    Image
                  </Button>
                </Box>
                {/* Display the selected image (optional) */}
                {newCapsule.image && (
                  <img
                    src={newCapsule.image}
                    alt="Selected"
                    style={{
                      maxWidth: "100px",
                      maxHeight: "100px",
                      marginTop: "10px",
                    }}
                  />
                )}
              </Stack>
            </Box>
            <Box sx={{ width: "87%" }}>
              <Stack spacing={1}>
                <Stack direction={"row"} alignItems={"center"}>
                  <TextField
                    label="Title"
                    placeholder="Capsule title"
                    value={newCapsule.title}
                    fullWidth
                    onChange={(e) =>
                      setNewCapsule({
                        ...newCapsule,
                        title: e.target.value,
                      })
                    }
                  />
                  <Stack
                    direction={"row"}
                    alignItems={"center"}
                    spacing={1}
                    sx={{ width: "50%" }}
                  >
                    <Tags tags={newCapsule.tags} handleDelete={handleDelete} />
                    <TextField
                      label="Add Tag"
                      variant="outlined"
                      value={newTag}
                      onChange={(e) => setNewTag(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          handleAddTag();
                        }
                      }}
                      InputProps={{
                        endAdornment: (
                          <button
                            onClick={handleAddTag}
                            style={{
                              border: "none",
                              background: "transparent",
                              cursor: "pointer",
                            }}
                          >
                            Add
                          </button>
                        ),
                      }}
                    />
                  </Stack>
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
                <QuranVerse
                  newCapsule={newCapsule}
                  setNewCapsule={setNewCapsule}
                />
                <Stack direction={"row"}>
                  <Button variant="contained" color="primary">
                    Add Photo
                  </Button>
                </Stack>
              </Stack>
            </Box>
          </Stack>
          <CardActions>
            <Actions mode={mode} setMode={handleSetMode} />
          </CardActions>
        </CardContent>
      )}
      {mode === "add" && <div>View mode</div>}
    </Card>
  );
};

export default NewCapsule;
