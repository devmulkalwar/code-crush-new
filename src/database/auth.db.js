import { GoogleAuthProvider, signInWithPopup } from "@firebase/auth";
import { addDoc, collection, doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db, userCollection } from "./config.db";
import { defaultData } from "../data/default.data";

const login = async () => {
    const user = await loginWithGoogle();

    const userExist = await checkUserExist(user.uid);

    if (!userExist) {
        await createNewUser(user);
    }

    const userData = await getCurrentUser(user.uid);
    return user.uid;
};

const logout = async () => {
    auth.signOut();
};

const loginWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    const user = (await signInWithPopup(auth, provider)).user;
    return user;
};

const checkUserExist = async (uid) => {
    const docRef = doc(db, "users", uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        return true;
    } else {
        return false;
    }
};

const createNewUser = async (user) => {
    const data = {
        uid: user.uid,
        photoURL: user.photoURL,
        email: user.email,
        name: user.displayName,
        bankBal: 0,
        cashBal: 0,
    };

    await setDoc(doc(db, "users", user.uid), data);

    const colRef = collection(db, `users/${user.uid}/categories`);
    defaultData.catergories.forEach(async (cat) => {
        await addDoc(colRef, cat);
    });
    console.log("new user created");
};

const getCurrentUser = async (uid) => {
    const docRef = doc(db, "users", uid);
    const data = (await getDoc(docRef)).data();

    return data;
};

export { login, checkUserExist, logout };
