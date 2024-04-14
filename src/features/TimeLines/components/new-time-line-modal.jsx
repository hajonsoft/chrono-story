import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import React, { useState } from "react";

import {
  saveNewTimeLine,
  setActiveTimeLine,
  setMode,
  setSnackbar,
} from "@/redux/globalSlice";
import { CircularProgress, TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

const NewTimeLineModal = () => {
  const globalState = useSelector((state) => state.global);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const handleSaveNewTimeLine = () => {
    setLoading(true);
    dispatch(saveNewTimeLine())
      .then((action) => {
        if (saveNewTimeLine.fulfilled.match(action)) {
          dispatch(setMode("default"));
          dispatch(setSnackbar({ open: true, message: "New Timeline Saved" }));
          setLoading(false);
        }
      })
      .catch((error) => {
        console.error("Error saving timeline: ", error);
        dispatch(setSnackbar({ open: true, message: "Error saving timeline" }));
      });
  };

  return (
    <Dialog
      open={globalState.mode.includes("add-timeline")}
      onClose={() => dispatch(setMode("default"))}
      aria-labelledby="new-timeline-modal-title"
      aria-describedby="new-timeline-modal-description"
      fullWidth
      maxWidth="md"
    >
      <DialogTitle id="new-timeline-modal-title">Add New Timeline</DialogTitle>
      <DialogContent sx={{ padding: "16px" }}>
        <TextField
          placeholder="Time line Name"
          value={globalState.activeTimeline.name}
          fullWidth
          onChange={(event) =>
            dispatch(setActiveTimeLine({ name: event.target.value }))
          }
          autoFocus
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={() => dispatch(setMode("default"))} color="primary">
          Cancel
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSaveNewTimeLine}
          endIcon={
            loading && (
              <CircularProgress size={24} style={{ color: "#FFFFFF" }} />
            )
          }
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};
export default NewTimeLineModal;
