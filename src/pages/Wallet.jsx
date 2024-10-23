import React, { useEffect, useState } from "react";
import "../assets/style/wallet.css";
import Model from "../components/Model";
import { useGlobalContext } from "../context/Context";

const Wallet = () => {
    const [totalAmt, setTotalAmt] = useState(0);
    const { cashBal, bankBal, setCashBal, setBankBal } = useGlobalContext();
    const [isModelOpen, setIsModelOpen] = useState(false);
    const [selectedType, setSelectedType] = useState("");

    const openModel = (type) => {
        setIsModelOpen(true);
        setSelectedType(type);
    };

    
    useEffect(() => {
        // Convert amount values to Float before performing addition
        const total = parseFloat(cashBal) + parseFloat(bankBal);
        setTotalAmt(total);
    }, [cashBal, bankBal]);

    return (
        <div className="wallet-container">
            <header className="wallet-header">
                <h1>Wallet</h1>
                <h1>{`₹ ${totalAmt}`}</h1>
            </header>

            <div className="wallet primary">
                <div className="wallet-icon">🏦</div>
                <div className="wallet-details">
                    <span>Bank</span>
                    <span>{`₹${bankBal}`}</span>
                </div>
                <div className="add-amt">
                    <button onClick={() => openModel("bank")}>
                        Add amount
                    </button>
                </div>
            </div>

            <div className="wallet primary">
                <div className="wallet-icon">💵</div>
                <div className="wallet-details">
                    <span>Cash</span>
                    <span>{`₹${cashBal}`}</span>
                </div>
                <div className="add-amt">
                    <button onClick={() => openModel("cash")}>
                        Add amount
                    </button>
                </div>
            </div>

            {isModelOpen && (
                <Model
                    amount={selectedType === "cash" ? cashBal : bankBal}
                    setAmount={
                        selectedType === "cash" ? setCashBal : setBankBal
                    }
                    whereTo={selectedType === "cash" ? "cash" : "bank"}
                    setIsModelOpen={setIsModelOpen}
                />
            )}
        </div>
    );
};

export default Wallet;
