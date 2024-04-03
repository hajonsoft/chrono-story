import React, { useState } from "react";

import { LibraryBooks } from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  IconButton,
  Stack,
  TextField
} from "@mui/material";

// TODO: Make the quran verse into maximum height, so that it can be scrolled, allow drag and drop to reorder the verses here and in the display component
const QuranVerse = ({ newCapsule, setNewCapsule }) => {
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
      const name = data.data.surah.name;

      setNewCapsule({
        ...newCapsule,
        verses: [
          ...newCapsule.verses,
          {
            text: verseText,
            reference: reference,
            comments: [""],
            name
          },
        ],
      });
      setReference("");
    } catch (error) {
      console.error("Error fetching verse:", error);
    }
  };

  const handleDeleteVerse = (verseToDelete) => {
    setNewCapsule({
      ...newCapsule,
      verses: newCapsule.verses?.filter(
        (verse) => verse.reference !== verseToDelete.reference
      ),
    });
  };

  return (
    <Stack sx={{ width: "100%" }} display={"flex"} justifyContent={"flex-end"}>
      <Stack direction={"row-reverse"} spacing={2} sx={{ width: "100%" }}>
        <TextField
          label="surah:ayah"
          variant="outlined"
          value={reference}
          onChange={(e) => setReference(e.target.value)}
          InputProps={{
            endAdornment: <IconButton onClick={handleAddVerse}><LibraryBooks /></IconButton>,
          }}
        />
      </Stack>
      <Box sx={{padding: '8px'}}>
        {newCapsule.verses?.map((verse, index) => (
          <Card key={index} sx={{ marginTop: 2 }}>
            <CardHeader title={`${verse.reference} ${verse.name}`} subheader={verse.text} />
            <CardContent>
              <Stack direction={"row"} spacing={1}>
                <TextField
                  label="order"
                  variant="filled"
                  type="number"
                  value={verse.order}
                  onChange={(e) =>
                    setNewCapsule({
                      ...newCapsule,
                      verses: newCapsule.verses.map((v, i) => {
                        if (i === index) {
                          return {
                            ...v,
                            order: e.target.value,
                          };
                        }
                        return v;
                      }),
                    })
                  }
                />
                <TextField
                  value={verse.comment}
                  onChange={(e) =>
                    setNewCapsule({
                      ...newCapsule,
                      verses: newCapsule.verses.map((v, i) => {
                        if (i === index) {
                          return {
                            ...v,
                            comment: e.target.value,
                          };
                        }
                        return v;
                      }),
                    })
                  }
                  fullWidth
                  label="Comment"
                  variant="outlined"
                  sx={{ mt: 1 }}
                  multiline
                />
              </Stack>
            </CardContent>
            <CardActions>
              <Button
                variant="outlined"
                color="secondary"
                onClick={() => handleDeleteVerse(verse)}
              >
                Delete
              </Button>
            </CardActions>
          </Card>
        ))}
      </Box>
    </Stack>
  );
};

export default QuranVerse;
