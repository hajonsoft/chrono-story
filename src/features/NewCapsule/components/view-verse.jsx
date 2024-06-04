import useCapsuleVerse from "@/hooks/useCapsuleVerse"; // Adjust the import path accordingly
import { setActiveCapsule, setMode } from "@/redux/globalSlice";
import { Delete, Edit, Save } from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  deleteCapsuleVerse,
  updateVerseComment,
  saveVerse,
} from "@/redux/globalSlice";
import VerseModal from "./verse-modal";

const ViewVerse = ({ capsuleId }) => {
  const globalState = useSelector((state) => state.global);
  const [isEditing, setIsEditing] = React.useState(false);
  const [verseToEdit, setVerseToEdit] = React.useState(null);
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

  const handleEditVerse = (verse) => {
    setVerseToEdit(verse);
    setIsEditing(true);
  };
  const handleSaveVerse = (verse) => {
    dispatch(
      saveVerse({
        timelineId: id,
        capsuleId,
        verseId: verse.id,
        comment: verse.comments,
      })
    ).then(() => {
      setIsEditing(false);
    });
  };

  const handleVerseCommentChange = (comment, verse) => {
    dispatch(
      updateVerseComment({
        timelineId: id,
        capsuleId,
        verseId: verse.id,
        comment,
      })
    );
  };

  return (
    <Stack sx={{ width: "100%" }} display={"flex"} justifyContent={"flex-end"}>
      <Stack direction={"row"} spacing={1}>
        <Button variant="contained" onClick={handleStartAddVerse}>
          Add Verse
        </Button>
        {hasMore && (
          <Button
            variant="outlined"
            onClick={loadMoreVerses}
            disabled={loading}
          >
            {loading ? "Loading..." : "Load More"}
          </Button>
        )}
      </Stack>
      <Box sx={{ padding: "8px" }}>
        {globalState.timelines?.[id]?.capsules?.[capsuleId]?.verses &&
          Object.values(
            globalState.timelines[id].capsules[capsuleId].verses
          ).map((verse, index) => (
            <Card
              key={`verse-${index}`}
              sx={{ marginTop: 2, position: "relative" }}
            >
              {(!isEditing || (isEditing && verse.id !== verseToEdit.id)) && (
                <IconButton
                  onClick={() => handleEditVerse(verse)}
                  size="small"
                  style={{ position: "absolute", top: 0, right: 32 }}
                >
                  <Edit fontSize="small" />
                </IconButton>
              )}
              {isEditing && verse.id === verseToEdit.id && (
                <IconButton
                  onClick={() => handleSaveVerse(verse)}
                  size="small"
                  style={{ position: "absolute", top: 0, right: 32 }}
                >
                  <Save fontSize="small" />
                </IconButton>
              )}
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
                {isEditing && verse.id === verseToEdit.id && (
                  <TextField
                    value={verse.comments}
                    onChange={(e) =>
                      handleVerseCommentChange(e.target.value, verse)
                    }
                    fullWidth
                    label="Comment"
                    variant="outlined"
                    sx={{
                      mt: 1,
                    }}
                    multiline
                  />
                )}
                {(!isEditing || (isEditing && verse.id !== verseToEdit.id)) && (
                  <Typography>{verse.comments}</Typography>
                )}
              </CardContent>
            </Card>
          ))}
      </Box>
      <VerseModal />
    </Stack>
  );
};

export default ViewVerse;
