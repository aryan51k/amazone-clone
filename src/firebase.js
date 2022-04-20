// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from "firebase/compat/app";
import "firebase/compat/auth"
import "firebase/compat/firestore"


const firebaseConfig = {
    apiKey: "AIzaSyAyhG_INU6EQUWkIBsVLiDSF2gfAQ4cegk",
    authDomain: "clone-1ef90.firebaseapp.com",
    projectId: "clone-1ef90",
    storageBucket: "clone-1ef90.appspot.com",
    messagingSenderId: "1097262550702",
    appId: "1:1097262550702:web:a91783275c31018effa73f",
    measurementId: "G-6YSXBNTKBM"
  };

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();

export {db, auth};