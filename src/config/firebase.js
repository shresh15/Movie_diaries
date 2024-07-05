import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'
import {getStorage} from 'firebase/storage'
const firebaseConfig = {
  apiKey: "AIzaSyAVncdEr80S6Id_Ush6jncgsCjBlYazgRM",
  authDomain: "pedrotech-26da2.firebaseapp.com",
  projectId: "pedrotech-26da2",
  storageBucket: "pedrotech-26da2.appspot.com",
  messagingSenderId: "172686633604",
  appId: "1:172686633604:web:7effab57750361148c30d1",
  measurementId: "G-KDGH27GMPV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth=getAuth(app);
export const googleProvider= new GoogleAuthProvider();
export const db=getFirestore(app);
export const storage=getStorage(app)