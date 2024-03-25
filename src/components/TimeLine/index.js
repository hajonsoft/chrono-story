import React from "react";
import data from "../../data/data.json";
import TimeCapsule from "../TimeCapsule";
import Button from "@mui/material/Button";
import { getAuth } from "firebase/auth";
import { getFirestore, collection, addDoc } from "firebase/firestore";

const TimeLine = () => {
  const auth = getAuth(); // Get Firebase authentication instance
  const firestore = getFirestore(); // Get Firestore instance

  const handleAddEntry = async () => {
    try {
      // Get the current user's username
      const user = auth.currentUser;
      const username = user.displayName || user.email;

      // Add a new entry to Firestore under the user's username
      const docRef = await addDoc(
        collection(firestore, `users/${username}/entries`),
        {
          // Define your entry object here, for example:
          title: "New Entry",
          description: "This is a new entry added by the user.",
          timestamp: new Date().toISOString(),
        }
      );

      console.log("Document written with ID: ", docRef.id);
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleAddEntry}>
        Add Entry
      </Button>
      {data.timeline.map((item) => (
        <TimeCapsule key={item.title} {...item} />
      ))}
    </div>
  );
};

export default TimeLine;
