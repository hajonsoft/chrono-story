import React from "react";

import {
  Button,
  Card,
  CardActions,
  CardContent,
  Chip,
  Stack,
  Typography,
  Box,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import formatYear from "@/helpers/formatYear";

const ViewCapsule = ({ entry, onEdit, onDelete }) => {
  return (
    <Card key={entry.id} sx={{ padding: "16px", margin: "16px" }}>
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
                <Chip key={index} label={tag} style={{ margin: 5 }} />
              ))}
            </Stack>
            <Typography variant="body1" align="left">
              {entry.description}
            </Typography>
            {entry.verses
              ?.sort((a, b) => a.order - b.order)
              .map((verse, index) => (
                <Box>
                  <Typography key={index} variant="body2" align="right">
                    {verse.text}
                  </Typography>
                  <Typography
                    key={index}
                    variant="body2"
                    align="right"
                    color={"textSecondary"}
                  >
                    {verse.comment}
                  </Typography>
                </Box>
              ))}
            <Stack direction={"row"} spacing={1}>
              {entry.photos?.map((photo) => (
                <img
                  key={photo.image}
                  src={photo.image}
                  alt={photo.title}
                  style={{ width: "50px", cursor: "pointer" }}
                  onClick={() => window.open(photo.image)}
                />
              ))}
            </Stack>
          </Stack>
        </Stack>
      </CardContent>
      <CardActions>
        <Stack direction={"row"} spacing={1}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => onEdit(entry)}
            startIcon={<EditIcon />}
          >
            Edit
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => onDelete(entry)}
            startIcon={<DeleteIcon />}
          >
            Delete
          </Button>
        </Stack>
      </CardActions>
    </Card>
  );
};

export default ViewCapsule;
