import { Box, Card, Chip, Stack, Typography } from "@mui/material";
import { getAuth } from "firebase/auth";
import { doc, getFirestore, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";

const TimelineDisplay = ({ mode }) => {
  const [timeline, setTimeline] = useState([]);

  useEffect(() => {
    const auth = getAuth();
    const db = getFirestore();
    const userId = auth.currentUser.uid;

    const unsubscribe = onSnapshot(doc(db, "users", userId), (doc) => {
      const timeLineData = doc.data()?.timeLine || [];
      setTimeline(timeLineData);
    });

    return unsubscribe;
  }, [mode]); // Empty dependency array ensures useEffect runs only once

  return (
    <Box>
      <ul>
        {timeline.map((entry, index) => (
          <Card key={index} sx={{ padding: "16px", margin: "16px" }}>
            <Stack key={index} spacing={2} direction={"row"}>
              <Typography variant="h5" sx={{ width: "8%" }}>
                {entry.year}
              </Typography>
              <img
                style={{ width: "100px", height: "100px" }}
                src={entry.image || "https://source.unsplash.com/random"}
                alt={entry.title}
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
                    {verse}
                  </Typography>
                ))}
                <ul>
                  {entry.photos?.map((photo, index) => (
                    <li key={index}>
                      <img
                        src={photo.image}
                        alt={photo.title}
                        style={{ width: "50px" }}
                      />
                      <p>{photo.title}</p>
                    </li>
                  ))}
                </ul>
              </Stack>
            </Stack>
          </Card>
        ))}
      </ul>
    </Box>
  );
};

export default TimelineDisplay;
