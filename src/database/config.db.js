import { initializeApp } from "firebase/app";
import { collection, getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDLJjdSfhs9zihm7tqFoJ74i85IG7j-BYw",
    authDomain: "code-crush-new.firebaseapp.com",
    projectId: "code-crush-new",
    storageBucket: "code-crush-new.appspot.com",
    messagingSenderId: "1044029160449",
    appId: "1:1044029160449:web:ce1653a48429a4e6cbd400",
    measurementId: "G-Q4LYE5TNZD"
  };

//Initilized variables
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth();

//collections
const userCollection = collection(db, "users");

export { app, db, auth, userCollection };