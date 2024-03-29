import { Chip } from '@mui/material';
import React from 'react';

const Tags = ({ tags, handleDelete }) => {
  return (
    <div>
      {/* Display tags as chips */}
      {tags?.map((tag, index) => (
        <Chip
          key={index}
          label={tag}
          onDelete={() => handleDelete(tag)} // onDelete function to remove the tag
          style={{ margin: 5 }}
        />
      ))}
    </div>
  );
};

export default Tags;
