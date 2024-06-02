import useCapsuleVerse from "@/hooks/useCapsuleVerse"; // Adjust the import path accordingly
import { setActiveCapsule, setMode } from "@/redux/globalSlice";
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
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { deleteCapsuleVerse } from "../../../redux/globalSlice";
import VerseModal from "./verse-modal";

const ViewVerse = ({ capsuleId }) => {
  const globalState = useSelector((state) => state.global);
  const dispatch = useDispatch();
  const { id } = useParams();

  const { loadMoreVerses, hasMore, loading } = useCapsuleVerse(id, capsuleId);

  useEffect(() => {
    // Optionally, fetch initial verses when component mounts
  }, [id, capsuleId]);

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
      deleteCapsuleVerse({
        timelineId: id,
        capsuleId,
        verseId: verseToDelete.id,
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
        {globalState.timelines?.[id]?.capsules?.[capsuleId]?.verses &&
          Object.values(
            globalState.timelines[id].capsules[capsuleId].verses
          ).map((verse, index) => (
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
          ))}
        {hasMore && (
          <Button
            variant="contained"
            onClick={loadMoreVerses}
            disabled={loading}
          >
            {loading ? "Loading..." : "Load More"}
          </Button>
        )}
      </Box>
      <VerseModal />
    </Stack>
  );
};

export default ViewVerse;
