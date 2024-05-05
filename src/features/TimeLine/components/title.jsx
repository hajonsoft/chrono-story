import React, { useEffect, useState } from "react";

import { Check, Edit } from "@mui/icons-material";
import { Box, IconButton, TextField, Typography, Tooltip } from "@mui/material";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateTimelineMetaData } from "@/redux/globalSlice";

const Title = () => {
  const globalState = useSelector((state) => state.global);
  const dispatch = useDispatch();
  const [editName, setEditName] = useState(false);
  const [editDesc, setEditDesc] = useState(false);
  const [hoverName, setHoverName] = useState(false);
  const [hoverDesc, setHoverDesc] = useState(false);
  const { id } = useParams();
  const [title, setTitle] = useState(globalState.timelines?.[id]?.name);
  const [description, setDescription] = useState(globalState.timelines?.[id]?.description);

  useEffect(() => {
    setTitle(globalState.timelines?.[id]?.name);
    setDescription(globalState.timelines?.[id]?.description);
  }, [globalState.timelines, id]);

  const handleSave = () => {
    dispatch(updateTimelineMetaData({ name: title, description }));
  };

  return (
    <Box
      sx={{
        padding: "16px",
        width: "90%",
        margin: "auto",
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
        }}
        onMouseEnter={() => setHoverName(true)}
        onMouseLeave={() => setHoverName(false)}
      >
        {editName ? (
          <TextField
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            fullWidth
            variant="outlined"
          />
        ) : (
          <Tooltip title={`Timeline ID: ${id}`} placement="top-end">
            <Typography variant="h6">{title}</Typography>
          </Tooltip>
        )}
        <IconButton
          style={{
            opacity: hoverName || editName ? 1 : 0,
            transition: "opacity 0.3s",
            marginLeft: "10px",
          }}
          onClick={() => {
            if (editName) {
              handleSave();
            }
            setEditName(!editName);
          }}
        >
          {editName ? <Check /> : <Edit />}
        </IconButton>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
        }}
        onMouseEnter={() => setHoverDesc(true)}
        onMouseLeave={() => setHoverDesc(false)}
      >
        {editDesc ? (
          <TextField
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            fullWidth
            variant="outlined"
            multiline
          />
        ) : (
          <Typography variant="body">{description}</Typography>
        )}
        <IconButton
          style={{
            opacity: hoverDesc || editDesc ? 1 : 0,
            transition: "opacity 0.3s",
            marginLeft: "10px",
          }}
          onClick={() => {
            if (editDesc) {
              handleSave();
            }
            setEditDesc(!editDesc);
          }}
        >
          {editDesc ? <Check /> : <Edit />}
        </IconButton>
      </div>
    </Box>
  );
};

export default Title;
