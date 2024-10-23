import React, { createContext, useContext, useEffect, useState } from "react";
import { login } from "../database/auth.db";
import { useDocumentData, useCollection } from "react-firebase-hooks/firestore";
import { collection, doc } from "firebase/firestore";
import { db } from "../database/config.db";
import {
    getAllExpenses,
    getAllIncome,
    getTransactionQuery,
    getTransactions,
} from "../database/transaction.db";

const chartContext = createContext();

export const ContextProvider = ({ children }) => {
    const [active, setActive] = useState(1);
    const [uid, setUid] = useState(null);
    const [user] = useDocumentData(doc(db, `users/${uid}`));

    const [date, setDate] = useState(new Date());
    const [time, setTime] = useState("");
    const [mode, setMode] = useState("");
    const [type, setType] = useState("");
    const [categoryFilter, setCategoryFilter] = useState("");

    const [duration, setDuration] = useState("monthly");
    const [cashBal, setCashBal] = useState(null);
    const [bankBal, setBankBal] = useState(null);
    const [incomes, setIncomes] = useState(null);
    const [expenses, setExpenses] = useState(null);
    const [categories, setCategories] = useState(null);
    const [transactions, setTransaction] = useState(null);
    const [categoriesSnap] = useCollection(
        collection(db, `users/${user?.uid}/categories`)
    );
    const [totalIncome, setTotalIncome] = useState(null);
    const [totalExpenses, setTotalExpenses] = useState(null);

    const totalBalance = cashBal + bankBal;

    const getTotalIncome = () => {
        const tI = incomes?.reduce(
            (total, income) => total + parseFloat(income.amount),
            0
        );

        setTotalIncome(tI);
    };

    const getTotalExpenses = () => {
        const tE = expenses?.reduce(
            (total, expense) => total + parseFloat(expense.amount),
            0
        );

        setTotalExpenses(tE);
    };

    const handleLogin = async () => {
        const userID = await login();
        setUid(userID);
        localStorage.setItem("user", JSON.stringify(userID));
    };

    const checkLoginData = () => {
        let userID = localStorage.getItem("user");
        userID = JSON.parse(userID);
        if (userID) {
            setUid(userID);
        }
    };

    const fetchData = async () => {
        const incoms = await getAllIncome(
            user?.uid,
            date,
            duration,
            categoryFilter,
            type,
            mode
        );
        setIncomes(incoms?.data);
        const expensesData = await getAllExpenses(
            user?.uid,
            date,
            duration,
            categoryFilter,
            type,
            mode
        );
        setExpenses(expensesData?.data);

        const transactionData = await getTransactions(
            getTransactionQuery(
                user?.uid,
                date,
                duration,
                categoryFilter,
                type,
                mode
            )
        );
        setTransaction(transactionData);
    };

    useEffect(() => console.log(categoryFilter), [categoryFilter]);

    useEffect(() => {
        checkLoginData();
    }, []);

    useEffect(() => {
        const newCat = categoriesSnap?.docs?.map((cat) => ({
            id: cat.id,
            ...cat.data(),
        }));
        setCategories(newCat);
    }, [categoriesSnap]);

    useEffect(() => {
        setCashBal(user?.cashBal);
        setBankBal(user?.bankBal);
    }, [user]);

    useEffect(() => {
        if (user) {
            console.log("user Update");
            fetchData();
        }
    }, [user, date, duration, mode, type, categoryFilter]);

    useEffect(() => {
        getTotalExpenses();
        getTotalIncome();
    }, [incomes, expenses]);

    useEffect(() => {
        if (categories) console.log("Categories Update");
    }, [categories]);

    useEffect(() => {
        if (transactions) console.log("Transactions Update");

    }, [transactions]);

    useEffect(() => {
        console.log("Duration Update");
    }, [duration]);

    useEffect(() => {
        setDate(new Date());
    }, [active]);

    const value = {
        incomes,
        setIncomes,
        expenses,
        setExpenses,
        type,
        setType,
        mode,
        setMode,
        categoryFilter,
        setCategoryFilter,
        totalIncome,
        totalExpenses,
        totalBalance,
        user,
        bankBal,
        cashBal,
        uid,
        categories,
        transactions,
        duration,
        setDuration,
        setUid,
        active,
        date,
        setDate,
        setBankBal,
        setCashBal,
        setActive,
        handleLogin,
        time,
        setTime,
    };

    return (
        <chartContext.Provider value={value}>{children}</chartContext.Provider>
    );
};

export const useGlobalContext = () => {
    return useContext(chartContext);
};
