import React, { useEffect, useState } from "react";

import { auth, firestore } from "@/firebase";
import { Box, Button, Card, CardActions, CardContent, Chip, Stack, Typography } from "@mui/material";
import { doc, onSnapshot } from "firebase/firestore";

const TimelineDisplay = ({ mode , onEdit, onDelete}) => {
  const [timeline, setTimeline] = useState([]);

  useEffect(() => {
    const userId = auth.currentUser.uid;
    const unsubscribe = onSnapshot(doc(firestore, "users", userId), (doc) => {
      const timeLineData = doc.data()?.timeLine || [];
      setTimeline(timeLineData);
    });

    return unsubscribe;
  }, [mode]);

  return (
    <Box>
      <ul>
        {timeline.map((entry, index) => (
          <Card key={entry.id} sx={{ padding: "16px", margin: "16px" }}>
            <CardContent>
            <Stack key={index} spacing={2} direction={"row"}>
              <Typography variant="h5" sx={{ width: "8%" }}>
                {entry.year}
              </Typography>
              <img
                style={{ width: "100px", height: "100px", cursor: "pointer"}}
                src={entry.image || "https://via.placeholder.com/200x200?text=No+Image&bg=CCCCCC&fg=000000"}
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
                {entry.verses?.map((verse, index) => (
                  <Typography key={index} variant="body2" align="right">
                    {verse.text}
                  </Typography>
                ))}
                <Stack direction={"row"} spacing={1}>
                  {entry.photos?.map((photo) => (
                    <img
                      key={photo.image}
                      src={photo.image}
                      alt={photo.title}
                      style={{ width: "50px", cursor: "pointer"}}
                      onClick={() => window.open(photo.image)}
                    />
                  ))}
                </Stack>
              </Stack>
            </Stack>
            </CardContent>
            <CardActions>
              <Stack direction={"row"} spacing={1}>
                <Button variant="contained" color="primary" onClick={() => onEdit(entry)}>
                  Edit
                </Button>
                <Button variant="contained" color="secondary" onClick={() => onDelete(entry)}>
                  Delete
                </Button>
              </Stack>
            </CardActions>
          </Card>
        ))}
      </ul>
    </Box>
  );
};

export default TimelineDisplay;
