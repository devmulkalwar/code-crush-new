import {
    collection,
    doc,
    updateDoc,
    getDocs,
    getDoc,
    addDoc,
} from "@firebase/firestore";
import { db } from "./config.db";

const setBalance = async (uid, balanceAmount, mode) => {
    const colRef = doc(db, "users", uid);

    const toUpdate =
        mode === "cash"
            ? { cashBal: balanceAmount }
            : { bankBal: balanceAmount };

    await updateDoc(colRef, toUpdate);
    console.log("balance updated", toUpdate);
};

const addBalance = async (uid, balanceAmount, mode) => {
    const colRef = doc(db, "users", uid);
    const docSnap = await getDoc(colRef);
    const bal = docSnap.data();

    const prevBank = bal.bankBal;
    const prevCash = bal.cashBal;

    const toUpdate =
        mode === "cash"
            ? { cashBal: prevCash + balanceAmount }
            : { bankBal: prevBank + balanceAmount };

    await updateDoc(colRef, toUpdate);
    console.log("balance updated", toUpdate);
};

const getCategories = async (uid) => {
    const colRef = collection(db, `users/${uid}/categories`);

    const snapShot = await getDocs(colRef);
    const categories = [];

    snapShot.forEach((cat) => {
        categories.push({ id: cat.id, ...cat.data() });
    });

    console.log('fewfefefe',categories);
    return categories; 
};

const addCategory = async (uid, categoryData) => {
    const colRef = collection(db, `users/${uid}/categories`);

    await addDoc(colRef, categoryData);
    console.log("added a category");
};



export { setBalance, addBalance, getCategories, addCategory};
