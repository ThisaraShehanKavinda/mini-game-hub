import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCF1GZuqLM-glDEAOQQ6n01HJXQ5fmtWDQ",
  authDomain: "mini-game-hub-c2983.firebaseapp.com",
  projectId: "mini-game-hub-c2983",
  storageBucket: "mini-game-hub-c2983.firebasestorage.app",
  messagingSenderId: "218691293533",
  appId: "1:218691293533:web:1bd6df5af6a8ccc89798b4",
  measurementId: "G-1BGP4CDQ4X"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
