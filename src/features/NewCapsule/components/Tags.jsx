import { Chip } from '@mui/material';
import React from 'react';

const Tags = ({ tags, handleDelete, getTagText }) => {
  return (
    <div>
      {tags?.map((tag, index) => (
        <Chip
          key={index}
          label={getTagText ? getTagText(tag) : tag}
          onDelete={() => handleDelete(tag)}
          style={{ margin: 5 }}
        />
      ))}
    </div>
  );
};

export default Tags;
