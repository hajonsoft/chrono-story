import React from "react";

import formatYear from "@/helpers/formatYear";
import {
  deleteCapsuleMetadata,
  deleteCapsulePhotos,
  setActiveCapsule,
  setMode,
} from "@/redux/globalSlice";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Chip,
  CircularProgress,
  Stack,
  Typography,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import Photos from "./photos";
import ViewVerse from "../../NewCapsule/components/view-verse";

const ViewCapsule = ({ entry, capsuleId }) => {
  const [loading, setLoading] = React.useState(false);
  const { id } = useParams();

  const dispatch = useDispatch();

  const handleDeleteCapsule = () => {
    setLoading(true);
    dispatch(
      deleteCapsuleMetadata({
        timelineId: id,
        capsuleId,
      })
    )
      .then(() => {
        setLoading(false);
        dispatch(
          deleteCapsulePhotos({
            timelineId: id,
            capsuleId,
          })
        );
      })
      .catch(() => {
        console.error("Failed to delete capsule");
      });
  };

  const handleEditCapsule = () => {
    dispatch(setActiveCapsule(entry));
    dispatch(setMode("edit-capsule"));
  };

  return (
    <Card sx={{ padding: "16px", margin: "16px" }}>
      <CardContent>
        <Stack spacing={2} direction={"row"}>
          <Typography variant="h5" sx={{ width: "8%" }}>
            {formatYear(entry.year)}
          </Typography>
          <img
            style={{ width: "100px", height: "100px", cursor: "pointer" }}
            src={
              entry.image ||
              "https://via.placeholder.com/200x200?text=No+Image&bg=CCCCCC&fg=000000"
            }
            alt={entry.title}
            onClick={() => window.open(entry.image)}
          />
          <Stack direction={"column"} sx={{ width: "100%" }}>
            <Stack direction={"row"} spacing={1} alignItems={"center"}>
              <Typography variant="subtitle" align="left" gutterBottom>
                {entry.title}
              </Typography>
              {entry.tags?.map((tag, index) => (
                <Chip key={`tag-${index}`} label={tag} style={{ margin: 5 }} />
              ))}
            </Stack>
            <Typography variant="body1" align="left">
              {entry.description}
            </Typography>
            <ViewVerse capsuleId={capsuleId} />
            <Photos capsuleId={entry.id} />
          </Stack>
        </Stack>
      </CardContent>
      <CardActions>
        <Stack direction={"row"} spacing={1}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleEditCapsule}
            disabled={loading}
            startIcon={
              loading ? (
                <CircularProgress sx={{ color: "#fff" }} />
              ) : (
                <EditIcon />
              )
            }
          >
            Edit
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            onClick={handleDeleteCapsule}
            disabled={loading}
            startIcon={
              loading ? (
                <CircularProgress sx={{ color: "#D0000E" }} />
              ) : (
                <DeleteIcon />
              )
            }
          >
            Delete
          </Button>
        </Stack>
      </CardActions>
    </Card>
  );
};

export default ViewCapsule;
