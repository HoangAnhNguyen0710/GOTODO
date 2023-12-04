// Import the functions you need from the SDKs you need

import Firebase from "firebase/app";
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';
import 'firebase/analytics';

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration

// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyCHQwe4XELF58RPRKVhdcTbMhWAiOQYw8Q",
  authDomain: "gotodo-cb9aa.firebaseapp.com",
  projectId: "gotodo-cb9aa",
  storageBucket: "gotodo-cb9aa.appspot.com",
  messagingSenderId: "43224117052",
  appId: "1:43224117052:web:ffbc534b159e25bd2ef839",
  measurementId: "G-J077VK287C"

};



// Initialize Firebase

const firebase = Firebase.initializeApp(firebaseConfig);
const analytics = Firebase.analytics(firebase);
const firestore = firebase.firestore();
const storage = firebase.storage();
export { firebase, analytics, firestore, storage };