// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAy9TsqSc-Bewwd7f1ArR34hMbK3-bNbbY",
  authDomain: "projeksainsdata-2b30f.firebaseapp.com",
  projectId: "projeksainsdata-2b30f",
  storageBucket: "projeksainsdata-2b30f.appspot.com",
  messagingSenderId: "659158932631",
  appId: "1:659158932631:web:41e255b449f9da3545ddd2",
  measurementId: "G-BH805L1WK7"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

const auth = getAuth();

export const authWithGoogle = async () => {
  let user = null;
  await signInWithPopup(auth, provider)
    .then((result) => {
      user = result.user
    })
    .catch((err) => {
      console.log(err)      
    })

    return user;
};