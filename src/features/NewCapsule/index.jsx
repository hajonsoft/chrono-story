import CloseIcon from "@mui/icons-material/Close";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import React, { useEffect, useState } from "react";

import uploadImage from "@/hooks/uploadImage";
import { setActiveCapsule, setMode } from "@/redux/globalSlice";
import { Add, Close, Delete, Photo } from "@mui/icons-material";
import {
  Card,
  CardActions,
  CardMedia,
  Grid,
  IconButton,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { useDispatch, useSelector } from "react-redux";
import { useFilePicker } from "use-file-picker";
import Footer from "./components/Footer";
import QuranVerse from "./components/QuranVerses";
import Tags from "./components/Tags";

const NewCapsule = () => {
  const globalState = useSelector((state) => state.global);
  const dispatch = useDispatch();
  const [photoMode, setPhotoMode] = useState("main");

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
    dispatch(
      setActiveCapsule({ ...globalState.activeCapsule, image: downloadUrl })
    );
  };

  const handleSavePhoto = async (downloadUrl) => {
    dispatch(
      setActiveCapsule({
        ...globalState.activeCapsule,
        photos: [
          ...globalState.activeCapsule.photos,
          { image: downloadUrl, title: "" },
        ],
      })
    );
  };

  const handleAddPhoto = () => {
    setPhotoMode("photo");
    openFilePicker();
  };

  const handleDeletePhoto = (image) => {
    dispatch(
      setActiveCapsule({
        ...globalState.activeCapsule,
        photos: globalState.activeCapsule.photos.filter(
          (photo) => photo.image !== image
        ),
      })
    );
  };

  return (
    <Dialog
      open={
        globalState.mode === "add-capsule" ||
        globalState.mode === "edit-capsule"
      }
      onClose={() => dispatch(setMode("default"))}
      fullWidth
      maxWidth="md"
    >
      <DialogTitle>
        {globalState.mode === "add-capsule" ? "New Capsule" : "Edit Capsule"}
        <IconButton
          style={{ position: "absolute", right: "8px", top: "8px" }}
          onClick={() => dispatch(setMode("default"))}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Grid container sx={{ marginBottom: "64px" }}>
          <Grid
            item
            xs={12}
            md={4}
            sx={{
              display: "flex",
              flexDirection: "column",
              height: "60vh",
              padding: "16px",
              marginTop: "16px",
            }}
          >
            <TextField
              type="number"
              variant="filled"
              label="Year"
              fullWidth
              value={globalState.activeCapsule.year}
              onChange={(e) =>
                dispatch(
                  setActiveCapsule({
                    ...globalState.activeCapsule,
                    year: e.target.value,
                  })
                )
              }
            />

            <Box
              sx={{
                flexGrow: 1,
                position: "relative",
                height: "auto",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {globalState.activeCapsule.image ? (
                <>
                  <CardMedia
                    component="img"
                    image={globalState.activeCapsule.image}
                    alt="Selected"
                    sx={{
                      maxWidth: "250px",
                      maxHeight: "250px",
                      objectFit: "contain",
                    }}
                  />
                  <CardActions sx={{ position: "absolute", top: 0, right: 0 }}>
                    <Tooltip title="Remove image">
                      <IconButton
                        onClick={() =>
                          dispatch(
                            setActiveCapsule({
                              ...globalState.activeCapsule,
                              image: null,
                            })
                          )
                        }
                      >
                        <Close />
                      </IconButton>
                    </Tooltip>
                  </CardActions>
                </>
              ) : (
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "250px",
                    width: "250px",

                    backgroundColor: "#f5f5f5",
                  }}
                >
                  <Tooltip title="Add image">
                    <IconButton
                      onClick={() => {
                        setPhotoMode("main");
                        openFilePicker();
                      }}
                    >
                      <Photo />
                    </IconButton>
                  </Tooltip>
                </Box>
              )}
            </Box>

            <Tags />
          </Grid>
          <Grid item xs={12} md={8}>
            <Box sx={{ padding: "16px", marginTop: "16px", height: "75vh" }}>
              <TextField
                placeholder="Capsule topic"
                label="Capsule topic"
                value={globalState.activeCapsule.title}
                fullWidth
                onChange={(e) =>
                  dispatch(
                    setActiveCapsule({
                      ...globalState.activeCapsule,
                      title: e.target.value,
                    })
                  )
                }
                sx={{ marginBottom: "16px" }} // Add bottom margin
              />

              <TextField
                placeholder="Tell us about the capsule"
                label="Topic Description"
                multiline
                fullWidth
                value={globalState.activeCapsule.description}
                onChange={(e) =>
                  dispatch(
                    setActiveCapsule({
                      ...globalState.activeCapsule,
                      description: e.target.value,
                    })
                  )
                }
                sx={{ marginBottom: "16px" }} // Add bottom margin
              />
              <QuranVerse />
              <Typography variant="h6" sx={{ marginBottom: "16px" }}>
                Photos
              </Typography>
              <div style={{ display: "flex", alignItems: "center" }}>
                {globalState.activeCapsule.photos?.map((photo) => (
                  <Card
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      margin: "10px",
                    }}
                  >
                    <img
                      key={photo.image}
                      src={photo.image}
                      alt={photo.title}
                      style={{
                        width: "50px",
                        height: "50px",
                        cursor: "pointer",
                      }}
                    />
                    <IconButton
                      onClick={() => handleDeletePhoto(photo.image)}
                      size="small"
                    >
                      <Delete size="small" />
                    </IconButton>
                  </Card>
                ))}
                <Tooltip title="Add photo">
                  <IconButton variant="outlined" onClick={handleAddPhoto}>
                    <Add color="primary" />
                  </IconButton>
                </Tooltip>
              </div>
            </Box>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Footer />
      </DialogActions>
    </Dialog>
  );
};

export default NewCapsule;
