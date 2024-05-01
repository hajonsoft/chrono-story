import React from "react";

import formatYear from "@/helpers/formatYear";
import { deleteCapsule, setActiveCapsule, setMode } from "@/redux/globalSlice";
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

const ViewCapsule = ({ entry }) => {
  const [loading, setLoading] = React.useState(false);
  const { id } = useParams();

  const dispatch = useDispatch();

  const handleDeleteCapsule = () => {
    setLoading(true);
    dispatch(
      deleteCapsule({
        timelineId: id,
        capsuleId: entry.id,
      })
    )
      .then(() => {
        setLoading(false);
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
            {/* {entryVerses
              ?.sort((a, b) => {
                if (!a.order) return 1;
                if (!b.order) return -1;
                return a.order - b.order;
              })
              .map((verse, index) => (
                <Box
                  key={`verse.reference-${index}`}
                  sx={{
                    border: "1px solid red",
                    marginBottom: "8px",
                    padding: "4px",
                    borderRadius: "8px",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      width: "100%",
                    }}
                  >
                    <Box sx={{ flexGrow: 1 }}>
                      <Typography key={`verse-text-${index}`} variant="body2" align="right">
                        {verse.text}
                      </Typography>
                      <Typography
                        key={`verse-text-0-${index}`}
                        variant="body2"
                        align="right"
                        color={"textSecondary"}
                      >
                        {verse.comment}
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        width: "32px",
                        display: "flex",
                        justifyContent: "flex-end",
                        marginLeft: "8px",
                      }}
                    >
                      <Box
                        sx={{
                          borderRadius: "100%",
                          backgroundColor: "teal",
                          color: "white",
                          width: "24px",
                          height: "24px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        {verse.order}
                      </Box>
                    </Box>
                  </Box>
                </Box>
              ))} */}
            {/* <Stack direction={"row"} spacing={1}>
              {entry.photos?.map((photo, index) => (
                <img
                  key={`photo-${photo.image}-${index}`}
                  src={photo.image}
                  alt={photo.title}
                  style={{ width: "50px", cursor: "pointer" }}
                  onClick={() => window.open(photo.image)}
                />
              ))}
            </Stack> */}
          </Stack>
        </Stack>
      </CardContent>
      <CardActions>
        <Stack direction={"row"} spacing={1}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleEditCapsule}
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
            startIcon={
              loading ? (
                <CircularProgress sx={{ color: "#fff" }} />
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
