// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDOdTR0_d_VM1yVe_9g0Kc1Cer5ka8K46k",
  authDomain: "chrono-story.firebaseapp.com",
  projectId: "chrono-story",
  storageBucket: "chrono-story.appspot.com",
  messagingSenderId: "169058871382",
  appId: "1:169058871382:web:16653261123826e59833f7",
  measurementId: "G-PZ0KJ73475"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);