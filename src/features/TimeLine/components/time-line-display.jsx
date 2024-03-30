import React, { useEffect, useState } from "react";

import { auth, firestore } from "@/firebase";
import ViewCapsule from "./ViewCapsule";
import { doc, onSnapshot } from "firebase/firestore";
import { Box } from "@mui/system";
import NewCapsule from "../../NewCapsule";

const TimelineDisplay = ({
  mode,
  onEdit,
  onDelete,
  newCapsule,
  setNewCapsule,
  setMode,
}) => {
  const [timeline, setTimeline] = useState([]);

  useEffect(() => {
    const userId = auth.currentUser.uid;
    const unsubscribe = onSnapshot(doc(firestore, "users", userId), (doc) => {
      const timeLineData = doc.data()?.timeLine || [];
      setTimeline(timeLineData.sort((a, b) => a.year - b.year));
    });

    return unsubscribe;
  }, [mode]);

  return (
    <Box>
      {timeline.map((entry) => (
        <Box key={entry.id} sx={{ mb: 2 }}>
          {(mode !== "edit" || (mode === "edit" && entry.id !== newCapsule.id) )&& (
            <ViewCapsule entry={entry} onEdit={onEdit} onDelete={onDelete} />
          )}
          {mode === "edit" && entry.id === newCapsule.id && (
            <Box sx={{ mb: 2, border: '2px solid purple' }}>
            <NewCapsule newCapsule={newCapsule} setNewCapsule={setNewCapsule} setMode={setMode} />
            </Box>
          )}
        </Box>
      ))}
    </Box>
  );
};

export default TimelineDisplay;
