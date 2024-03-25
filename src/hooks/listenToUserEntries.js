import { getAuth } from "firebase/auth"; // Import Firebase authentication modules
import { collection, getFirestore, onSnapshot } from "firebase/firestore";

const listenToUserEntries = (callback) => {
  try {
    // Get the current user
    const auth = getAuth();
    const firestore = getFirestore();
    const user = auth.currentUser;
    if (!user) {
      console.error("User is not authenticated.");
      return () => {}; // Return an empty function if user is not authenticated
    }

    // Reference to the user's entries collection
    const entriesRef = collection(firestore, `users/${user.uid}/timeLine`);

    // Set up a listener for changes to the entries collection
    const unsubscribe = onSnapshot(entriesRef, (snapshot) => {
      const entriesArray = [];
      snapshot.forEach((doc) => {
        console.log("📢[listenToUserEntries.js:22]: doc: ", doc);
        entriesArray.push({ id: doc.id, ...doc.data() });
      });
      console.log("📢[listenToUserEntries.js:25]: entriesArray: ", entriesArray);
      callback(entriesArray); // Call the provided callback with the updated entries array
    });

    // Return the unsubscribe function to stop listening to changes
    return unsubscribe;
  } catch (error) {
    console.error("Error listening to user entries: ", error);
    return () => {}; // Return an empty function in case of error
  }
};

export default listenToUserEntries;
