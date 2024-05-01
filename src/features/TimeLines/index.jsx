import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchAllTimelinesMetadata } from "@/redux/globalSlice";

const TimeLines = () => {
  const dispatch = useDispatch();

  return (
    <Box mt={2}>
      <Typography variant="h4" gutterBottom>
        Welcome!
      </Typography>
      <Typography variant="body1">
        You are now logged in. You can create new timelines or{" "}
        <Link to="#" onClick={() => dispatch(fetchAllTimelinesMetadata())}>
          view existing ones
        </Link>
      </Typography>
    </Box>
  );
};

export default TimeLines;
