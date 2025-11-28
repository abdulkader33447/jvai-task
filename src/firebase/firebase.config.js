// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAU-o5X16K_LiHiJTJMFWfOcUrLwWImiZg",
  authDomain: "task-a257a.firebaseapp.com",
  projectId: "task-a257a",
  storageBucket: "task-a257a.firebasestorage.app",
  messagingSenderId: "15206083020",
  appId: "1:15206083020:web:8bcf5f0dbee2f0d4809569"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);