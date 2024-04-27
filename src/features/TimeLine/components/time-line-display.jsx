import React, { useEffect, useState } from "react";

import { firestore } from "@/firebase";
import { Box } from "@mui/system";
import { doc, onSnapshot } from "firebase/firestore";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { updateTimeline } from "../../../redux/globalSlice";
import ViewCapsule from "./ViewCapsule";
import Title from "./title";

const TimelineDisplay = () => {
  const [timeline, setTimeline] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const { id } = useParams();
  const dispatch = useDispatch();
  const globalState = useSelector((state) => state.global);

  useEffect(() => {
    const userId = globalState.user?.uid;
    if (!userId) return;

    const unsubscribe = onSnapshot(
      doc(firestore, "users", userId, "timelines", id),
      (snapshot) => {
        if (snapshot.exists()) {
          const timeLineData = snapshot.data();
          setName(timeLineData.name);
          setDescription(timeLineData.description);
          const timelineEntries = timeLineData.entries || [];
          setTimeline(timelineEntries.sort((a, b) => a.year - b.year));
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
    <Box sx={{ width: "100%" }}>
      <Title
        title={name}
        description={description}
        handleTitleChange={(e) => {
          setName(e);
        }}
        handleDescriptionChange={(e) => {
          setDescription(e);
        }}
        handleSave={() => {
          dispatch(updateTimeline({ name, description }));
        }}
      />
      {timeline.length === 0 && <p>No entries found</p>}
      {timeline.map((entry, index) => (
        <ViewCapsule entry={entry} key={`timeline-${entry.id}-${index}`} />
      ))}
    </Box>
  );
};

export default TimelineDisplay;
