import React, { useEffect, useState } from "react";

import { firestore } from "@/firebase";
import {
  deleteTimeline,
  setTimelineCapsules,
  updateTimelineMetaData,
} from "@/redux/globalSlice";
import { Box } from "@mui/system";
import { collection, onSnapshot, query } from "firebase/firestore";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";

import ViewCapsule from "./ViewCapsule";
import Title from "./title";

const TimelineDisplay = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const { id } = useParams();
  const dispatch = useDispatch();
  const globalState = useSelector((state) => state.global);

  useEffect(() => {
    const userId = globalState.user?.uid;
    if (!userId) return;
    setName(globalState.timelines[id]?.name);
    setDescription(globalState.timelines[id]?.description);
    const capsulesCollectionRef = collection(
      firestore,
      `capsule/${id}/metadata`
    );

    const unsubscribe = onSnapshot(
      query(capsulesCollectionRef),
      (snapshot) => {
        if (!snapshot.empty) {
          const capsules = [];
          snapshot.forEach((doc) => {
            const capsuleData = doc.data();
            capsules.push(capsuleData);
          });
          dispatch(setTimelineCapsules({ id, capsules })); 
        } else {
          console.log("No such document!");
        }
      },
      (error) => {
        console.log("Error getting document:", error);
      }
    );

    return unsubscribe;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [globalState.user?.uid, id, dispatch]);

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
          dispatch(updateTimelineMetaData({ name, description }));
        }}
      />
      {globalState.timelines?.[id]?.capsules?.length === 0 && (
        <div>
          <div>No entries found </div>
          <Link to="#" onClick={() => dispatch(deleteTimeline(id))}>
            Delete timeline
          </Link>
        </div>
      )}
      {globalState.timelines?.[id]?.capsules?.map((entry, index) => (
        <ViewCapsule entry={entry} key={`timeline-${entry.id}-${index}`} />
      ))}
    </Box>
  );
};

export default TimelineDisplay;
