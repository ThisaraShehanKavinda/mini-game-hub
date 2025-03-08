import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { doc, getFirestore, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCF1GZuqLM-glDEAOQQ6n01HJXQ5fmtWDQ",
  authDomain: "mini-game-hub-c2983.firebaseapp.com",
  projectId: "mini-game-hub-c2983",
  storageBucket: "mini-game-hub-c2983.firebasestorage.app",
  messagingSenderId: "218691293533",
  appId: "1:218691293533:web:1bd6df5af6a8ccc89798b4",
  measurementId: "G-1BGP4CDQ4X"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication
const auth = getAuth(app);

// Initialize Firestore
const db = getFirestore(app);

// Function to save player score
const savePlayerScore = async (playerName, score) => {
  try {
    const playerRef = doc(db, "players", playerName); // You can store score under playerName as document
    await setDoc(playerRef, {
      score: score,
      timestamp: new Date()
    });
    console.log("Score saved successfully!");
  } catch (error) {
    console.error("Error saving score: ", error);
  }
};

export { auth, savePlayerScore };
