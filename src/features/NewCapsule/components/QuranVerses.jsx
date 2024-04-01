import React, { useState } from "react";

import FormatAlignJustifyIcon from "@mui/icons-material/FormatAlignJustify";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Stack,
  TextField
} from "@mui/material";

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
      <Stack direction={"row"} spacing={2} sx={{ width: "100%" }}>
        <TextField
          label="surah:ayah"
          variant="outlined"
          value={reference}
          onChange={(e) => setReference(e.target.value)}
          style={{ marginRight: "10px" }}
        />
        <Button
          variant="outlined"
          color="secondary"
          onClick={handleAddVerse}
          style={{ marginBottom: "10px" }}
          startIcon={<FormatAlignJustifyIcon />}
          size="small"
        >
          Add
        </Button>
      </Stack>
      <Box sx={{padding: '32px'}}>
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
