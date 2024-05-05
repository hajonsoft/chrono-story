import React, { useEffect } from "react";

import uploadImage from "@/hooks/uploadImage";
import {
  savePhoto,
  setActiveCapsule,
  setActiveTimeLine,
} from "@/redux/globalSlice";
import { Add, Delete } from "@mui/icons-material";
import { Box, IconButton, Tooltip, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useFilePicker } from "use-file-picker";
import { v4 as uuidv4 } from "uuid";

const Photos = ({ capsuleId }) => {
  const [imageLoading, setImageLoading] = React.useState(false);
  const globalState = useSelector((state) => state.global);
  const dispatch = useDispatch();

  const { id } = useParams();
  const { openFilePicker, filesContent, loading } = useFilePicker({
    readAs: "DataURL",
    accept: "image/*",
    multiple: false,
  });

  useEffect(() => {
    async function saveImage() {
      setImageLoading(true);
      await uploadImage(filesContent[0], handleSavePhoto);
      setImageLoading(false);
    }

    if (!loading && filesContent && filesContent.length > 0) {
      saveImage();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filesContent, loading]);

  const handleSavePhoto = async (downloadUrl) => {
    dispatch(
      savePhoto({
        image: downloadUrl,
        title: "",
        id: uuidv4(),
      })
    );
  };
  const handleAddPhoto = () => {
    dispatch(setActiveTimeLine(id));
    dispatch(setActiveCapsule({ ...globalState.activeCapsule, id: capsuleId }));
    openFilePicker();
  };

  const handleDeletePhoto = async (image) => {
    console.log("delete photo not implemented");
  };
  return (
    <Box>
      <Box style={{ display: "flex", alignItems: "center" }}>
        <Typography variant="h6">Photos</Typography>
        {globalState.timelines?.[id]?.capsules?.[
          capsuleId
        ]?.photos?.photos?.map((photo, index) => (
          <Box key={`photo-${photo.image}-${index}`}>
            <img
              src={photo.image}
              alt={photo.title}
              style={{
                width: "50px",
                height: "50px",
                cursor: "pointer",
              }}
              onClick={() => window.open(photo.image)}
            />
            <IconButton
              onClick={() => handleDeletePhoto(photo.id)}
              size="small"
            >
              <Delete size="small" />
            </IconButton>
          </Box>
        ))}

        <Tooltip title="Add photo">
          {!imageLoading && (
            <IconButton variant="outlined" onClick={handleAddPhoto}>
              <Add color="primary" />
            </IconButton>
          )}
        </Tooltip>
      </Box>
    </Box>
  );
};

export default Photos;
