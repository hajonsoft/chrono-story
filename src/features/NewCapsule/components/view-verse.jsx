import React from "react";

import { setActiveCapsule } from "@/redux/globalSlice";
import { Delete } from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  IconButton,
  Stack,
  TextField,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setMode } from "../../../redux/globalSlice";
import VerseModal from "./verse-modal";
import { useParams } from "react-router-dom";

// TODO: Make the quran verse into maximum height, so that it can be scrolled, allow drag and drop to reorder the verses here and in the display component
const ViewVerse = ({ capsuleId }) => {
  const globalState = useSelector((state) => state.global);
  const dispatch = useDispatch();

  const { id } = useParams();

  const handleStartAddVerse = () => {
    const activeCapsule = {
      ...globalState.activeCapsule,
      id: capsuleId,
    };
    dispatch(setActiveCapsule(activeCapsule));
    dispatch(setMode("add-verse"));
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
      <Button variant="contained" onClick={handleStartAddVerse}>
        Add Verse
      </Button>
      <Box sx={{ padding: "8px" }}>
        {globalState.timelines?.[id]?.capsules?.[capsuleId]?.verses?.verses?.map(
          (verse, index) => (
            <Card
              key={`verse-${index}`}
              sx={{ marginTop: 2, position: "relative" }}
            >
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
                    value={verse.comments}
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
          )
        )}
      </Box>
      <VerseModal />
    </Stack>
  );
};

export default ViewVerse;
