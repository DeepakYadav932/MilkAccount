// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getFirestore } from 'firebase/firestore';
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyCA8TRhlNStGCqvQ8QiC8blyl1Kj9rJM4w",
//   authDomain: "smallmilkdatabase.firebaseapp.com",
//   projectId: "smallmilkdatabase",
//   storageBucket: "smallmilkdatabase.firebasestorage.app",
//   messagingSenderId: "343907054312",
//   appId: "1:343907054312:web:62cc1dbd19624d7e950f5d"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// // Initialize Firestore
// const db = getFirestore(app);

// export { db };

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAtRFx0Vkjfkp2_YpAG8ExhBAwWaspFPLk",
  authDomain: "milksalesrecord.firebaseapp.com",
  projectId: "milksalesrecord",
  storageBucket: "milksalesrecord.firebasestorage.app",
  messagingSenderId: "363746128514",
  appId: "1:363746128514:web:5e20a5eb99f68906713a9b",
  measurementId: "G-BRCSMQQQ09"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

const db = getFirestore(app)

export { db }

