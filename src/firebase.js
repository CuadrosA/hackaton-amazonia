import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import {
  getFirestore,
  doc,
  getDoc,
  collection,
  getDocs,
  setDoc,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAX_qh9Vs6FjSTlhNDVOvdRAJVGN1W8lxE",
  authDomain: "hackathon-ia-5a9ff.firebaseapp.com",
  projectId: "hackathon-ia-5a9ff",
  storageBucket: "hackathon-ia-5a9ff.firebasestorage.app",
  messagingSenderId: "135740134014",
  appId: "1:135740134014:web:dfff9b3c7afb9dec877e2f",
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export {
  auth,
  signInWithEmailAndPassword,
  getAuth,
  createUserWithEmailAndPassword,
  getFirestore,
  signOut,
  setDoc,
  db,
  getDoc,
  doc,
  collection,
  getDocs,
};
