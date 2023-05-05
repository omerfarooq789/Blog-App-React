import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCVXNVpFS4imkjJqtfnfECaibaSh7-sn9Y",
  authDomain: "blog-app-with-react.firebaseapp.com",
  databaseURL: "https://blog-app-with-react-default-rtdb.firebaseio.com",
  projectId: "blog-app-with-react",
  storageBucket: "blog-app-with-react.appspot.com",
  messagingSenderId: "710955823636",
  appId: "1:710955823636:web:05e0a9216c55870f03ed01",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth();
