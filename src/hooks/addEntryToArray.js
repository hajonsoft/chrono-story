import { doc, runTransaction, getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const addEntryToTimeline = async (newEntry) => {
  try {
    const auth = getAuth();
    const firestore = getFirestore();

    // Get the current user's UID
    const userId = auth.currentUser.uid;

    // Reference to the document containing the timeline array
    const userDocRef = doc(firestore, `users/${userId}`);

    // Run a transaction to ensure atomicity
    await runTransaction(firestore, async (transaction) => {
      // Fetch the document data within the transaction
      const userDocSnapshot = await transaction.get(userDocRef);

      // Initialize the timeline array or retrieve existing one
      const timeLine = userDocSnapshot.exists()
        ? userDocSnapshot.data().timeLine || []
        : [];

      // Append the new entry to the timeline array
      timeLine.push(newEntry);

      // Update the document with the modified timeline array
      if (userDocSnapshot.exists()) {
        // Document exists, update it
        transaction.update(userDocRef, { timeLine: [...timeLine] });
      } else {
        // Document doesn't exist, set it with the new data
        transaction.set(userDocRef, { timeLine: [...timeLine] });
      }
    });

    console.log("Entry added to the timeline successfully");
  } catch (error) {
    console.error("Error adding entry to the timeline: ", error);
  }
};

export default addEntryToTimeline;
