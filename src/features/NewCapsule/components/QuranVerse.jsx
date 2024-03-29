import React, { useState } from "react";

import { Button, TextField } from "@mui/material";
import Tags from "./Tags";

const QuranVerse = ({newCapsule , setNewCapsule}) => {
  const [reference, setReference] = useState("");

  const handleAddVerse = async () => {
    try {
      // Fetch the verse using the API
      const response = await fetch(
        `http://api.alquran.cloud/v1/ayah/${reference}`
      );
      const data = await response.json();

      // Extract the verse text from the response
      const verseText = data.data.text;

      setNewCapsule({
        ...newCapsule,
        verses: [...newCapsule.verses, verseText],
      });
    } catch (error) {
      console.error("Error fetching verse:", error);
    }
  };

  const handleDeleteVerse = (verseToDelete) => {
    setNewCapsule({
        ...newCapsule,
        verses: newCapsule.verses.filter((verse) => verse !== verseToDelete),
        });
  };

  return (
    <div>
      <TextField
        label="Reference (ayah number or surah:ayah)"
        variant="outlined"
        value={reference}
        onChange={(e) => setReference(e.target.value)}
        style={{ marginRight: "10px" }}
      />
      <Button
        variant="contained"
        onClick={handleAddVerse}
        style={{ marginBottom: "10px" }}
      >
        Add
      </Button>

      <Tags tags={newCapsule.verses} handleDelete={handleDeleteVerse} />
    </div>
  );
};

export default QuranVerse;
