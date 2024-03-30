import { auth, firestore } from "@/firebase";
import { doc, runTransaction } from "firebase/firestore";


const deleteEntry = async (entryId) => {
  try {
    const userId = auth.currentUser.uid;
    const userDocRef = doc(firestore, `users/${userId}`);
    await runTransaction(firestore, async (transaction) => {
      // Fetch the document data within the transaction
      const userDocSnapshot = await transaction.get(userDocRef);

      // Initialize the timeline array or retrieve existing one
      const timeLine = userDocSnapshot.exists()
        ? userDocSnapshot.data().timeLine || []
        : [];

      // Find the index of the entry to delete
      const index = timeLine.findIndex((entry) => entry.id === entryId);

      // If the entry is found, remove it from the timeline array
      if (index !== -1) {
        timeLine.splice(index, 1);

        // Update the document with the modified timeline array
        transaction.update(userDocRef, { timeLine: [...timeLine] });
        console.log("Entry deleted from the timeline successfully");
      } else {
        console.log("Entry not found in the timeline");
      }
    });
  } catch (error) {
    console.error("Error deleting entry from the timeline: ", error);
  }
};

export default deleteEntry;