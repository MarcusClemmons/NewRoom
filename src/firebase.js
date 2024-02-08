// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {getFirestore} from "firebase/firestore"
import { getDatabase } from "firebase/database";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBQHCy8slb0-a4ryn7-qc8OwJNrco1tpac",
  authDomain: "newroom-1a460.firebaseapp.com",
  databaseURL: "https://newroom-1a460-default-rtdb.firebaseio.com",
  projectId: "newroom-1a460",
  storageBucket: "newroom-1a460.appspot.com",
  messagingSenderId: "924718221437",
  appId: "1:924718221437:web:1c5067cedb3d0f1de08914"
};



const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const firestore = getFirestore(app);
export const database = getDatabase(app);