import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { auth, storage } from "@/firebase";

const uploadImage = async (file, setDownloadUrl) => {
  try {
    // Get the current user's UID
    const userId = auth.currentUser.uid;

    const base64Content = file.content; // Remove the data URL prefix
    const storageRef = ref(storage, `users/${userId}/${file.name}`);

    // Upload the base64 content to Firebase Storage
    const uploadTask = uploadString(storageRef, base64Content, "data_url");

    uploadTask
      .then((snapshot) => {
        console.log("File uploaded successfully:", snapshot);
        // Get the download URL
        return getDownloadURL(snapshot.ref);
      })
      .then((downloadURL) => {
        setDownloadUrl(downloadURL);
      })
      .catch((error) => {
        console.error("Error uploading file:", error);
      });
  } catch (error) {
    console.error("Error adding entry to the timeline: ", error);
  }
};

export default uploadImage;
