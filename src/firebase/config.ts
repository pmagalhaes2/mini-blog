import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDztiebjZsNOuXLXxvKCFNpJX0gte4ArOM",
  authDomain: "blog-f09cd.firebaseapp.com",
  projectId: "blog-f09cd",
  storageBucket: "blog-f09cd.appspot.com",
  messagingSenderId: "210595055826",
  appId: "1:210595055826:web:012d1b6d4c94355d55c50b",
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db };
