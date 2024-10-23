import React, { useState } from "react";
import "../assets/style/addtransaction.css";
import Keypad from "../components/Keypad";
import { useGlobalContext } from "../context/Context";
import { addTransaction } from "../database/transaction.db";
import { Link, useNavigate } from "react-router-dom";

const EditModel = () => {
    const navigate = useNavigate();
    const { categories, user, date, time, setTime } = useGlobalContext();
    const [showCalBtn, setShowCalBtn] = useState(true);
    const [amount, setAmount] = useState("");
    const [comment, setComment] = useState("");
    const [paymentMode, setPaymentMode] = useState("cash");

    const [transactionCategory, setTransactionCategory] = useState(
        categories?.at(0)?.id
    );
    const [transactionType, setTransactionType] = useState("expense");

    const handleNumberClick = (value) => {
        setAmount(amount + value);
    };

    const handleBackspace = () => {
        setAmount(amount.slice(0, -1));
    };

    const handleCommentChange = (event) => {
        setComment(event.target.value);
    };

    const handleClear = () => {
        setAmount("");
    };

    const handleSubmit = async () => {
        if (amount === "") {
            alert("Paise kon dalega !!");
            return;
        }
        // Submit the expense data
        let t = new Date(date?.getTime());
        if (time != "") {
            const [hour, min] = time.split(":").map(Number);
            t.setHours(hour);
            t.setMinutes(min);
        } else {
            t = new Date();
        }
        console.log(t);

        const data = {
            amount: parseFloat(amount),
            mode: paymentMode,
            note: comment,
            type: transactionType,
            time: t.getTime(),
            category: transactionCategory,
        };

        await addTransaction(user?.uid, data);
        console.log(`added a transaction`, data);

        // Reset the fields
        setAmount("");
        setComment("");
        navigate("/transactions");
    };

    const renderCatergories = () => {
        return (
            <>
                {categories?.map((cat) => {
                    return (
                        <option key={cat.id} value={cat.id}>
                            {cat.name}
                        </option>
                    );
                })}
            </>
        );
    };

    const getColor = () => {
        const obj = categories?.find((cat) => cat.id === transactionCategory);
        return obj?.color;
    };

    const handleTimeChange = (e) => {
        console.log(e.target.value);
        setTime(e.target.value);
    };

    return (
        <div className="add-transaction">
            <div className="dropdowns">
                <select
                    className="transaction-dropdown"
                    value={paymentMode}
                    onChange={(e) => setPaymentMode(e.target.value)}
                >
                    <option value="cash">Cash</option>
                    <option value="card">Card</option>
                    <option value="upi">Upi</option>
                    <option value="netbanking">Netbanking</option>
                </select>

                <select
                    className="category-dropdown"
                    value={transactionCategory}
                    style={{ backgroundColor: getColor() }}
                    onChange={(e) => setTransactionCategory(e.target.value)}
                >
                    {renderCatergories()}
                </select>
            </div>
            <div className="second-row">
                <div className="transaction-type">
                    <select
                        className="type-dropdown"
                        value={transactionType}
                        onChange={(e) => setTransactionType(e.target.value)}
                    >
                        <option value="expense">Expense</option>
                        <option value="income">Income</option>
                    </select>
                </div>
            </div>

            <div className="amount-entry">
                <input
                    type="text"
                    className="amount-input"
                    value={`₹${amount}`}
                    readOnly
                />
                <input
                    type="text"
                    className="comment-input"
                    placeholder="Add comment..."
                    value={comment}
                    onChange={handleCommentChange}
                />
            </div>

            <Keypad
                handleNumberClick={handleNumberClick}
                handleBackspace={handleBackspace}
                handleClear={handleClear}
                handleSubmit={handleSubmit}
                showCalBtn={showCalBtn}
                setShowCalBtn={setShowCalBtn}
            />
        </div>
    );
};

export default EditModel;
