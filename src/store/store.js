import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
    apiKey: "AIzaSyCoSep5cv4MeQUGmeWVGo1xcTulb1V5ZwM",
    authDomain: "roulette-bcf12.firebaseapp.com",
    projectId: "roulette-bcf12",
    storageBucket: "roulette-bcf12.appspot.com",
    messagingSenderId: "274288140947",
    appId: "1:274288140947:web:1264f642f41a5190a52366",
    measurementId: "G-6SVTSE5LNK",
  };
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
