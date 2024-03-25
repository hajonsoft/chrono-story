import { doc, getDoc, updateDoc, getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const addEntryToArray = async (newEntry) => {
  try {
    const auth = getAuth();
    const firestore = getFirestore();
    // Get the current user's UID
    const userId = auth.currentUser.uid;

    // Reference to the document containing the array
    const userDocRef = doc(firestore, `users/${userId}`);

    // Fetch the document data
    const docSnapshot = await getDoc(userDocRef);
    if (!docSnapshot.exists()) {
      console.error("Document does not exist");
    //   return;
    }

    // Extract the existing array from the document data
    const existingArray = docSnapshot.data().timeLine || [];

    // Add the new entry to the array
    existingArray.push(newEntry);

    // Update the document with the modified array
    await updateDoc(userDocRef, { timeLine: existingArray });

    console.log("Entry added to the array successfully");
  } catch (error) {
    console.error("Error adding entry to the array: ", error);
  }
};

export default addEntryToArray;
