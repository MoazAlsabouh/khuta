import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, sendPasswordResetEmail, GoogleAuthProvider, signInWithPopup, onAuthStateChanged, signOut, confirmPasswordReset } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { getFirestore, collection, getDocs, getDoc, doc, setDoc, updateDoc, query, where, addDoc, deleteDoc } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSy" + "Drs5mq2KaxBn" + "nLSBugncOsvnFX_2GY6EQ",
  authDomain: "khuta-b9128.firebaseapp.com",
  projectId: "khuta-b9128",
  storageBucket: "khuta-b9128.firebasestorage.app",
  messagingSenderId: "137647973861",
  appId: "1:137647973861:web:ce4f3c740688af5bc97b0c"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();

export { app, auth, db, googleProvider, signInWithEmailAndPassword, createUserWithEmailAndPassword, sendPasswordResetEmail, signInWithPopup, onAuthStateChanged, signOut, confirmPasswordReset, collection, getDocs, getDoc, doc, setDoc, updateDoc, query, where, addDoc, deleteDoc };
