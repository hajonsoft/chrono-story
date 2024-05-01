import React, { useEffect } from "react";

import uploadImage from "@/hooks/uploadImage";
import { setActiveCapsule, setMode } from "@/redux/globalSlice";
import { Close, Photo } from "@mui/icons-material";
import CloseIcon from "@mui/icons-material/Close";
import {
  CardActions,
  CardMedia,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  TextField,
  Tooltip,
} from "@mui/material";
import { Box } from "@mui/system";
import { useDispatch, useSelector } from "react-redux";
import { useFilePicker } from "use-file-picker";
import Footer from "./components/Footer";
import Tags from "./components/Tags";

const CapsuleModal = () => {
  const globalState = useSelector((state) => state.global);
  const dispatch = useDispatch();

  const { openFilePicker, filesContent, loading } = useFilePicker({
    readAs: "DataURL",
    accept: "image/*",
    multiple: false,
  });

  useEffect(() => {
    async function saveImage() {
      await uploadImage(filesContent[0], handleSaveMainImage);
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
                        openFilePicker();
                      }}
                    >
                      <Photo />
                    </IconButton>
                  </Tooltip>
                </Box>
              )}
            </Box>
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
              <Tags />
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

export default CapsuleModal;
