import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDOdTR0_d_VM1yVe_9g0Kc1Cer5ka8K46k",
  authDomain: "chrono-story.firebaseapp.com",
  projectId: "chrono-story",
  storageBucket: "chrono-story.appspot.com",
  messagingSenderId: "169058871382",
  appId: "1:169058871382:web:16653261123826e59833f7",
  measurementId: "G-PZ0KJ73475",
};

export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const firestore = getFirestore(app);
export const storage = getStorage(app);
