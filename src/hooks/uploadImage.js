import { getAuth } from "firebase/auth";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
  uploadString
} from "firebase/storage";

const uploadImage = async (file) => {
  try {
    const auth = getAuth();
    // Create a root reference
    const storage = getStorage();
    console.log("📢[uploadImage.js:14]: storage: ", storage);

    // Get the current user's UID
    const userId = auth.currentUser.uid;

    // Create a reference to 'images/mountains.jpg'
    const storageRef = ref(storage, 'users/');

    console.log("📢[uploadImage.js:23]: file: ", file);
    const uploadTask = uploadString(storageRef, "ayman");

    // uploadTask.on(
    //   "state_changed",
    //   (snapshot) => {
    //     // Observe state change events such as progress, pause, and resume
    //     // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
    //     const progress =
    //       (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    //     console.log("Upload is " + progress + "% done");
    //     switch (snapshot.state) {
    //       case "paused":
    //         console.log("Upload is paused");
    //         break;
    //       case "running":
    //         console.log("Upload is running");
    //         break;
    //       default:
    //         console.log("Upload is done");
    //     }
    //   },
    //   (error) => {
    //     // Handle unsuccessful uploads
    //   },
    //   () => {
    //     // Handle successful uploads on complete
    //     // For instance, get the download URL: https://firebasestorage.googleapis.com/...
    //     getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
    //       console.log("File available at", downloadURL);
    //     });
    //   }
    // );
  } catch (error) {
    console.error("Error adding entry to the timeline: ", error);
  }
};

export default uploadImage;
