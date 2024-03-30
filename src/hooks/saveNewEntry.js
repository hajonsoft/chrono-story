import { auth, firestore } from "@/firebase";
import { doc, runTransaction } from "firebase/firestore";

const saveNewEntry = async (newEntry) => {
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

export default saveNewEntry;
