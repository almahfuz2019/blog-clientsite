import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyCQdPdsMUh_uqurcPifq_mvbvVkMd__zkc",
  authDomain: "mindscape-c6f0d.firebaseapp.com",
  projectId: "mindscape-c6f0d",
  storageBucket: "mindscape-c6f0d.appspot.com",
  messagingSenderId: "381780022218",
  appId:"1:381780022218:web:eef469297aff94662e7533"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth=getAuth(app);
export default auth;