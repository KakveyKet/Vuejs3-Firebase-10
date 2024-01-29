// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
    apiKey: "AIzaSyDtap6o_rgGmVtunn9o97M94bPq4xtNe_Q",
    authDomain: "ecommerce-353ff.firebaseapp.com",
    projectId: "ecommerce-353ff",
    storageBucket: "ecommerce-353ff.appspot.com",
    messagingSenderId: "1058601864354",
    appId: "1:1058601864354:web:dd14393336f8c16cf9dbfb"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const projectFirestore = getFirestore(app)