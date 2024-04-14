import React, { useState } from "react";

import { Box, Chip, ClickAwayListener, TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setActiveCapsule } from "../../../redux/globalSlice";

const Tags = () => {
  const [newTag, setNewTag] = useState("");
  const globalState = useSelector((state) => state.global);
  const dispatch = useDispatch();

  const handleTagOnChange = (e) => {
    setNewTag(e.target.value);
  };

  const handleAddTag = () => {
    if (newTag.trim() !== "") {
      dispatch(
        setActiveCapsule({
          ...globalState.activeCapsule,
          tags: [...globalState.activeCapsule.tags, newTag],
        })
      );
      setNewTag("");
    }
  };

  const handleDelete = (tagToDelete) => {
    dispatch(
      setActiveCapsule({
        ...globalState.activeCapsule,
        tags: globalState.activeCapsule.tags.filter(
          (tag) => tag !== tagToDelete
        ),
      })
    );
  };

  return (
    <Box sx={{ display: "flex", flexWrap: "wrap", alignItems: "center" }}>
      {globalState.activeCapsule.tags.map((tag) => (
        <Chip
          key={`tag-${tag}`}
          label={tag}
          onDelete={() => handleDelete(tag)}
          sx={{ margin: "4px" }}
        />
      ))}
      <ClickAwayListener onClickAway={handleAddTag}>
        <TextField
          value={newTag}
          onChange={handleTagOnChange}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleAddTag();
            }
          }}
          sx={{ margin: "4px" }}
        />
      </ClickAwayListener>
    </Box>
  );
};

export default Tags;
