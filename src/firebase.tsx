// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: import.meta.env.VITE_firebase_apikey,
    authDomain: import.meta.env.VITE_firebase_authDomain,
    projectId: import.meta.env.VITE_firebase_projID,
    storageBucket: import.meta.env.VITE_firebase_storageBucket,
    messagingSenderId: import.meta.env.VITE_firebase_messagingSenderID,
    appId: import.meta.env.VITE_firebase_appID,
    measurementId: import.meta.env.VITE_firebase_measurementID
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
  const storage = getStorage(app);


  export { app, analytics, storage };