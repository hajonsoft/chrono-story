import { Box, Typography } from "@mui/material";

const TimeLines = () => {
  return (
    <Box mt={2}>
      <Typography variant="h4" gutterBottom>
        Welcome!
      </Typography>
      <Typography variant="body1">
        You are now logged in. You can create new timelines or view existing
        ones.
      </Typography>
    </Box>
  );
};

export default TimeLines;
