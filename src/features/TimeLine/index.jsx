import React from "react";

import { deleteTimeline } from "@/redux/globalSlice";
import { Box } from "@mui/system";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";

import { useTimelineData } from "@/hooks/useTimelineData";
import ViewCapsule from "./components/ViewCapsule";
import Title from "./components/title";

const Timeline = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const globalState = useSelector((state) => state.global);

  useTimelineData(id);

  return (
    <Box sx={{ width: "100%" }}>
      <Title />
      {globalState.timelines?.[id]?.capsules?.length === 0 && (
        <div>
          <div>No entries found </div>
          <Link to="#" onClick={() => dispatch(deleteTimeline(id))}>
            Delete timeline
          </Link>
        </div>
      )}
      {Object.entries(globalState.timelines?.[id]?.capsules || {}).map(
        ([key, entry], index) => (
          <ViewCapsule entry={entry} capsuleId={key} key={`timeline-${key}-${index}`} />
        )
      )}
    </Box>
  );
};

export default Timeline;
