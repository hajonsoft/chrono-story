import React, { useState, useEffect } from "react";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { Box, Stack } from "@mui/material";

const TimelineDisplay = ({ mode }) => {
  const [timeline, setTimeline] = useState([]);

  useEffect(() => {
    const fetchTimeline = async () => {
      try {
        const auth = getAuth();
        const firestore = getFirestore();
        // Get the current user's UID
        const userId = auth.currentUser.uid;

        // Reference to the document containing the timeline array
        const userDocRef = doc(firestore, `users/${userId}`);

        // Fetch the document data
        const docSnapshot = await getDoc(userDocRef);
        if (docSnapshot.exists()) {
          // Extract the timeline array from the document data
          const userTimeline = (await docSnapshot.data().timeLine) || [];
          setTimeline(userTimeline);
        } else {
          console.error("Document does not exist");
        }
      } catch (error) {
        console.error("Error fetching timeline: ", error);
      }
    };

    fetchTimeline(); // Fetch timeline when component mounts
  }, [mode]); // Empty dependency array ensures useEffect runs only once

  return (
    <Box
      sx={{
        border: "1px solid brown",
        borderRadius: "16px",
        margin: "16px",
        padding: "16px",
      }}
    >
      <ul>
        {timeline.map((entry, index) => (
          <Stack key={index} spacing={2}>
            <h3>{entry.year}</h3>
            <h4>{entry.title}</h4>
            <p>{entry.description}</p>
            <img
              src={entry.image}
              alt={entry.title}
              style={{ width: "100px" }}
            />
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
        ))}
      </ul>
    </Box>
  );
};

export default TimelineDisplay;
