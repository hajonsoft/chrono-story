import React, { useState } from "react";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";

import { saveNewTimeLine, setMode, setSnackbar } from "@/redux/globalSlice";
import { CircularProgress, TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

const NewTimeLineModal = () => {
  const globalState = useSelector((state) => state.global);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const dispatch = useDispatch();

  const handleSaveNewTimeLine = () => {
    setLoading(true);
    dispatch(
      saveNewTimeLine({
        name,
      })
    )
      .then((action) => {
        if (saveNewTimeLine.fulfilled.match(action)) {
          dispatch(setMode("default"));
          dispatch(setSnackbar({ open: true, message: "New Timeline Saved" }));
          setName("");
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
          value={name}
          fullWidth
          onChange={(event) => setName(event.target.value)}
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
