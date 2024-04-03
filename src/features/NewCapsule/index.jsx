import React, { useEffect, useState } from "react";

import { Add, Photo } from "@mui/icons-material";
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
import uploadImage from "../../hooks/uploadImage";
import Actions from "./components/Actions";
import QuranVerse from "./components/QuranVerses";
import Tags from "./components/Tags";

const NewCapsule = ({ newCapsule, setNewCapsule, setParentMode }) => {
  const [localeMode, setLocaleMode] = useState("edit");
  const [photoMode, setPhotoMode] = useState("main");
  const [newTag, setNewTag] = useState("");

  const { openFilePicker, filesContent, loading } = useFilePicker({
    readAs: "DataURL",
    accept: "image/*",
    multiple: false,
  });

  useEffect(() => {
    async function saveImage() {
      await uploadImage(
        filesContent[0],
        photoMode === "main" ? handleSaveMainImage : handleSavePhoto
      );
    }

    if (!loading && filesContent && filesContent.length > 0) {
      saveImage();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filesContent, loading]);

  const handleSaveMainImage = async (downloadUrl) => {
    setNewCapsule({
      ...newCapsule,
      image: downloadUrl,
    });
  };

  const handleSavePhoto = async (downloadUrl) => {
    setNewCapsule({
      ...newCapsule,
      photos: [
        ...newCapsule.photos,
        {
          image: downloadUrl,
          title: "",
        },
      ],
    });
  };

  const handleAddPhoto = () => {
    setPhotoMode("photo");
    openFilePicker();
  };

  const handleDeleteTag = (tagToDelete) => {
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

  const handleTagOnChange = (e) => {
    // get tag value and when a comma is entered, add the tag to the list
    const tagText = e.target.value;
    if (tagText.includes(",")) {
      setNewCapsule({
        ...newCapsule,
        tags: [...newCapsule.tags, tagText.replace(",", "")],
      });
      setNewTag("");
      return;
    }

    setNewTag(e.target.value);
  };

  const handleSetMode = (mode) => {
    setLocaleMode(mode);
    setParentMode(mode);
  };

  return (
    <Card elevation={6} sx={{ padding: "16px 32px 32px 16px", margin: "16px" }}>
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
                  onClick={() => {
                    setPhotoMode("main");
                    openFilePicker();
                  }}
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
                  label="Topic"
                  placeholder="Capsule topic"
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
                  <Tags tags={newCapsule.tags} handleDelete={handleDeleteTag} />
                  <TextField
                    label="Add Tag"
                    variant="outlined"
                    value={newTag}
                    onChange={handleTagOnChange}
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
                          <Add color="secondary" />
                        </button>
                      ),
                    }}
                  />
                </Stack>
              </Stack>
              <TextField
                label="Topic details"
                multiline
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
                {newCapsule.photos?.map((photo) => (
                  <img
                    key={photo.image}
                    src={photo.image}
                    alt={photo.title}
                    style={{ width: "50px", cursor: "pointer" }}
                    onClick={() => window.open(photo.image)}
                  />
                ))}
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={handleAddPhoto}
                  startIcon={<Photo />}
                >
                  Add Photo
                </Button>
              </Stack>
            </Stack>
          </Box>
        </Stack>
        <CardActions>
          <Actions mode={localeMode} setMode={handleSetMode} />
        </CardActions>
      </CardContent>
    </Card>
  );
};

export default NewCapsule;
