import React, { useEffect, useState } from "react";
import Keypad from "./Keypad";
import { setBalance } from "../database/user.db";
import { useGlobalContext } from "../context/Context";

const Model = ({ whereTo, amount, setAmount, setIsModelOpen }) => {
    const { user } = useGlobalContext();
    const [amt, setAmt] = useState(amount === 0 ? "" : amount);
    const [showCalBtn, setShowCalBtn] = useState(false);

    const handleNumberClick = (value) => {
        setAmt((prevAmt) => prevAmt + value);
    };

    const handleBackspace = () => {
        setAmt((prevAmt) => prevAmt.slice(0, -1));
    };

    const handleClear = () => {
        setAmt("");
    };

    const handleSubmit = async () => {
        setAmount(parseFloat(amt));
        console.log(amt);
        await setBalance(user.uid, parseFloat(amt), whereTo);
        setIsModelOpen(false);
    };

    return (
        <div>
            <div>
                <input
                    type="text"
                    className="amount-input"
                    value={`₹${amt}`}
                    readOnly
                />
            </div>
            <div>
                <Keypad
                    handleNumberClick={handleNumberClick}
                    handleBackspace={handleBackspace}
                    handleClear={handleClear}
                    handleSubmit={handleSubmit}
                    setShowCalBtn={setShowCalBtn}
                    showCalBtn={showCalBtn}
                />
            </div>
        </div>
    );
};

export default Model;
