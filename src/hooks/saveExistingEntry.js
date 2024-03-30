// saveExistingEntry.js

import { auth, firestore } from "@/firebase";
import { doc, runTransaction } from "firebase/firestore";

const saveExistingEntry = async (entryId, updatedEntry) => {
  try {
    const userId = auth.currentUser.uid;
    const userDocRef = doc(firestore, `users/${userId}`);
    await runTransaction(firestore, async (transaction) => {
      // Fetch the document data within the transaction
      const userDocSnapshot = await transaction.get(userDocRef);

      // Initialize the timeline array or retrieve existing one
      let timeLine = userDocSnapshot.exists()
        ? userDocSnapshot.data().timeLine || []
        : [];

      // Check if entry with the given ID already exists
      const existingIndex = timeLine.findIndex((entry) => entry.id === entryId);

      if (existingIndex !== -1) {
        // Entry with the given ID exists, update it
        timeLine[existingIndex] = updatedEntry;

        // Update the document with the modified timeline array
        transaction.update(userDocRef, { timeLine: [...timeLine] });
        console.log("Entry updated successfully");
      } else {
        console.error("Entry with ID " + entryId + " not found in the timeline");
      }
    });
  } catch (error) {
    console.error("Error updating entry in the timeline: ", error);
  }
};

export default saveExistingEntry;
