import React, { useEffect } from "react";

import { setSnackbar } from "@/redux/globalSlice";
import { Snackbar } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import NewCapsule from "../features/NewCapsule";
import NewTimeLineModal from "../features/TimeLines/components/new-time-line-modal";
import Header from "./components/header";

const PrivateLayout = ({ children }) => {
  const globalState = useSelector((state) => state.global);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!globalState.user || Object.keys(globalState.user).length === 0) {
      navigate("/");
    }
  }, [globalState.user, navigate]);
  return (
    <>
      <Header />
      <NewCapsule />
      <NewTimeLineModal />
      <Snackbar
        open={globalState.snackbar.open}
        autoHideDuration={6000}
        onClose={() => dispatch(setSnackbar({ open: false }))}
        message={globalState.snackbar.message}
      />
      {children}
    </>
  );
};

export default PrivateLayout;
