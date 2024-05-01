import React, { useState } from "react";

import { Check, Edit } from "@mui/icons-material";
import { Box, IconButton, TextField, Typography, Tooltip } from "@mui/material";
import { useParams } from "react-router-dom";

const Title = ({
  handleTitleChange,
  handleDescriptionChange,
  handleSave,
  title,
  description,
}) => {
  const [editName, setEditName] = useState(false);
  const [editDesc, setEditDesc] = useState(false);
  const [hoverName, setHoverName] = useState(false);
  const [hoverDesc, setHoverDesc] = useState(false);
  const { id } = useParams();

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
            onChange={(e) => handleTitleChange(e.target.value)}
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
            onChange={(e) => handleDescriptionChange(e.target.value)}
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
