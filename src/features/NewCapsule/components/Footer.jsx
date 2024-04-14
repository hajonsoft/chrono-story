import React from "react";

import {
  saveEditCapsule,
  saveNewCapsule,
  setMode,
  setSnackbar,
} from "@/redux/globalSlice";
import { Button, CircularProgress, Stack } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const Footer = () => {
  const { id } = useParams();
  const [loading, setLoading] = React.useState(false);
  const globalState = useSelector((state) => state.global);
  const dispatch = useDispatch();

  const handleSaveNewCapsule = () => {
    setLoading(true);
    if (globalState.mode === "add-capsule") {
      dispatch(saveNewCapsule())
        .then(() => {
          dispatch(setMode("default"));
          setLoading(false);
        })
        .catch(() => {
          dispatch(
            setSnackbar({ open: true, message: "Failed to save capsule" })
          );
        });
    }
    if (globalState.mode === "edit-capsule") {
      dispatch(
        saveEditCapsule({
          timelineId: id,
          capsuleId: globalState.activeCapsule.id,
        })
      )
        .then(() => {
          dispatch(setMode("default"));
          setLoading(false);
        })
        .catch(() => {
          dispatch(
            setSnackbar({ open: true, message: "Failed to save capsule" })
          );
        });
    }
  };

  return (
    <Stack
      direction={"row"}
      alignItems={"center"}
      sx={{ width: "100%" }}
      m={2}
      p={2}
    >
      <Button
        onClick={handleSaveNewCapsule}
        color="primary"
        variant="contained"
        endIcon={loading && <CircularProgress sx={{ color: "#fff" }} />}
      >
        Save
      </Button>
    </Stack>
  );
};

export default Footer;
