import { Box, Card, Stack, Typography } from "@mui/material";
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
      const timeLineData = doc.data().timeLine;
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
                style={{ width: "100px", height: '100px' }}
                src={entry.image || "https://source.unsplash.com/random"}
                alt={entry.title}
              />
              <Stack direction={"column"}>
                <Typography variant="subtitle" align="left" gutterBottom>
                  {entry.title}
                </Typography>
                <Typography variant="body1" align="left">
                  {entry.description}
                </Typography>
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
