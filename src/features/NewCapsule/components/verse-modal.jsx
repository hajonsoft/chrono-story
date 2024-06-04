import React, { useState } from "react";

import { fetchVerse, deleteFetchedVerse, updateFetchedVerseComment } from "@/redux/globalSlice";
import { Delete, LibraryBooks } from "@mui/icons-material";
import CloseIcon from "@mui/icons-material/Close";

import { saveVerses, searchVerse, setMode } from "@/redux/globalSlice";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  TextField,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

const VerseModal = () => {
  const [reference, setReference] = useState("");
  const [loading, setLoading] = useState(false);
  const globalState = useSelector((state) => state.global);
  const dispatch = useDispatch();

  const handleFetchVerse = async () => {
    setLoading(true);
    if (!reference) return;
    if (reference.includes(":")) {
      dispatch(fetchVerse({ reference })).then(() => {
        setLoading(false);
        setReference("");
      });
    } else {
      dispatch(searchVerse({ keyword: reference })).then(() => {
        setLoading(false);
        setReference("");
      });
    }
  };

  const handleSaveVerses = () => {
    dispatch(saveVerses()).then(() => {
      dispatch(setMode("default"));
    });
  };

  const handleDeleteVerse = (verseToDelete) => {
    dispatch(deleteFetchedVerse({ verseId: verseToDelete.id }));
  };

  const handleVerseCommentChange = (comment, verse) => {
    dispatch(updateFetchedVerseComment({ verseId: verse.id, comment }));
  };

  return (
    <Dialog
      open={
        globalState.mode === "add-verse" || globalState.mode === "edit-verse"
      }
      onClose={() => dispatch(setMode("default"))}
      fullWidth
      maxWidth="md"
    >
      <DialogTitle>
        {globalState.mode === "add-verse" ? "New Verse" : "Edit Verse"}
        <IconButton
          style={{ position: "absolute", right: "8px", top: "8px" }}
          onClick={() => dispatch(setMode("default"))}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Stack
          sx={{ width: "100%" }}
          display={"flex"}
          justifyContent={"flex-end"}
        >
          <Stack direction={"row-reverse"} alignItems={"center"} spacing={2} sx={{ width: "100%" }}>
            <TextField
              label="surah:ayah or arabic text"
              variant="outlined"
              value={reference}
              onChange={(e) => setReference(e.target.value)}
              InputProps={{
                endAdornment: (
                  <IconButton onClick={handleFetchVerse}>
                    {!loading && <LibraryBooks />}
                    {loading && <CircularProgress />}
                  </IconButton>
                ),
              }}
            />
            <div>
              {`Verses: ${Object.keys(globalState.fetchedVerses).length}`}
            </div>
          </Stack>
          <Box sx={{ padding: "8px" }}>
            {Object.entries(globalState.fetchedVerses).map(([key, entry]) => (
              <Card
                key={`verse-${key}`}
                sx={{ marginTop: 2, position: "relative" }}
              >
                <IconButton
                  onClick={() => handleDeleteVerse(entry)}
                  size="small"
                  style={{ position: "absolute", top: 0, right: 0 }}
                >
                  <Delete fontSize="small" />
                </IconButton>
                <CardHeader
                  title={`${entry.reference} ${entry.name}`}
                  subheader={entry.text}
                />
                <CardContent>
                  <Stack direction={"row"} spacing={1}>
                    <TextField
                      value={entry.comments}
                      onChange={(e) =>
                        handleVerseCommentChange(e.target.value, entry)
                      }
                      fullWidth
                      label="Comment"
                      variant="outlined"
                      sx={{ mt: 1 }}
                      multiline
                    />
                  </Stack>
                </CardContent>
              </Card>
            ))}
          </Box>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Stack direction={"row"} spacing={1}>
          <Button onClick={handleSaveVerses} size="large" variant="contained" disabled={loading}>
            Save Verses
          </Button>
        </Stack>
      </DialogActions>
    </Dialog>
  );
};

export default VerseModal;
