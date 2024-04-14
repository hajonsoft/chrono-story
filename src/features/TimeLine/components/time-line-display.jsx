import React, { useEffect, useState } from "react";

import { firestore } from "@/firebase";
import { Box } from "@mui/system";
import { doc, onSnapshot } from "firebase/firestore";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import ViewCapsule from "./ViewCapsule";

const TimelineDisplay = () => {
  const [timeline, setTimeline] = useState([]);
  const { id } = useParams();
  const globalState = useSelector((state) => state.global);

  useEffect(() => {
    const userId = globalState.user?.uid;
    if (!userId) return;

    const unsubscribe = onSnapshot(
      doc(firestore, "users", userId, "timelines", id),
      (snapshot) => {
        if (snapshot.exists()) {
          const timelineData = snapshot.data().entries || [];
          setTimeline(timelineData.sort((a, b) => a.year - b.year));
        } else {
          console.log("No such document!");
        }
      },
      (error) => {
        console.log("Error getting document:", error);
      }
    );

    return unsubscribe;
  }, [globalState.user.uid, id]);

  return (
    <Box>
      {timeline.length === 0 && <p>No entries found</p>}
      {timeline.map((entry) => (
        <ViewCapsule entry={entry} key={entry.id} />
      ))}
    </Box>
  );
};

export default TimelineDisplay;
