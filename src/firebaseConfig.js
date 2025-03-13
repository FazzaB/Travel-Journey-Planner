import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAwtR-AcwK0-peEoRAxDI8HLTue_vIB8rk",
  authDomain: "travel-journal-app-65702.firebaseapp.com",
  projectId: "travel-journal-app-65702",
  storageBucket: "travel-journal-app-65702.firebasestorage.app",
  messagingSenderId: "40634343565",
  appId: "1:40634343565:web:bc9b53d225f747092d02c4",
  measurementId: "G-TQ3PEVLC0V"
};

export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const db = getFirestore(app);
