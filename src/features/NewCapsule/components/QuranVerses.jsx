import React, { useState } from "react";

import { fetchVerse, setActiveCapsule } from "@/redux/globalSlice";
import { Delete, LibraryBooks } from "@mui/icons-material";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  CircularProgress,
  IconButton,
  Stack,
  TextField,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

// TODO: Make the quran verse into maximum height, so that it can be scrolled, allow drag and drop to reorder the verses here and in the display component
const QuranVerse = () => {
  const [reference, setReference] = useState("");
  const [loading, setLoading] = useState(false);
  const globalState = useSelector((state) => state.global);
  const dispatch = useDispatch();

  const handleAddVerse = async () => {
    setLoading(true);
    dispatch(fetchVerse(reference)).then(() => {
      setLoading(false);
      setReference("");
    });
  };

  const handleDeleteVerse = (verseToDelete) => {
    dispatch(
      setActiveCapsule({
        ...globalState.activeCapsule,
        verses: globalState.activeCapsule.verses?.filter(
          (verse) => verse.reference !== verseToDelete.reference
        ),
      })
    );
  };

  const handleVerseCommentChange = (comment, verse) => {
    dispatch(
      setActiveCapsule({
        ...globalState.activeCapsule,
        verses: globalState.activeCapsule.verses?.map((v) =>
          v.reference === verse.reference ? { ...v, comment } : v
        ),
      })
    );
  };

  return (
    <Stack sx={{ width: "100%" }} display={"flex"} justifyContent={"flex-end"}>
      <Stack direction={"row-reverse"} spacing={2} sx={{ width: "100%" }}>
        <TextField
          label="surah:ayah"
          variant="outlined"
          value={reference}
          onChange={(e) => setReference(e.target.value)}
          InputProps={{
            endAdornment: (
              <IconButton onClick={handleAddVerse}>
                {!loading && <LibraryBooks />}
                {loading && <CircularProgress />}
              </IconButton>
            ),
          }}
        />
      </Stack>
      <Box sx={{ padding: "8px" }}>
        {globalState.activeCapsule.verses?.map((verse, index) => (
          <Card key={index} sx={{ marginTop: 2, position: "relative" }}>
            <IconButton
              onClick={() => handleDeleteVerse(verse)}
              size="small"
              style={{ position: "absolute", top: 0, right: 0 }}
            >
              <Delete fontSize="small" />
            </IconButton>
            <CardHeader
              title={`${verse.reference} ${verse.name}`}
              subheader={verse.text}
            />
            <CardContent>
              <Stack direction={"row"} spacing={1}>
                <TextField
                  value={verse.comment}
                  onChange={(e) =>
                    handleVerseCommentChange(e.target.value, verse)
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
  );
};

export default QuranVerse;
