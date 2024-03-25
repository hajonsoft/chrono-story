import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";

const TimeCapsule = ({ title, description, year, image, photos }) => {
  return (
    <Stack direction={"row"} sx={{ maxHeight: "300px" }}>
      <Box p={4}>
        <Typography variant={"h5"}>{year}</Typography>
      </Box>
      <img
        src={image}
        alt={title}
        style={{ width: "150px", height: "150px" }}
      />
      <Stack sx={{ width: "90%" }} pl={2}>
        <Typography variant={"h5"}>{title}</Typography>
        <Typography variant={"body1"}>{description}</Typography>
        <Stack direction={"row"} spacing={1}>
          {photos?.map((photo) => (
            <Stack key={photo.title} sx={{ width: 96 }}>
              <img
                height="64"
                src={photo.image}
                alt={photo.title}
              />
              <Box>
                <Typography variant={"body2"}>{photo.title}</Typography>
              </Box>
            </Stack>
          ))}
        </Stack>
      </Stack>
    </Stack>
  );
};

export default TimeCapsule;
