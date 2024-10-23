import React, { useState } from "react";
import DatePicker from "./DatePicker";
import "../assets/style/filtersmenu.css";
import { useGlobalContext } from "../context/Context";
import { MdOutlineCancel } from "react-icons/md";

const FiltersMenu = ({ setIsMenuOpen }) => {
    const { categories, categoryFilter, setCategoryFilter, duration, setDuration, mode, setMode, type, setType } =
        useGlobalContext();
    const [category, setCategory] = useState("");
    const [startdate, setStartDate] = useState(new Date());

    return (
        <div className="filters-menu">
            <div className="btn-div">
                <button
                    className="cancel-btn"
                    onClick={() => {
                        setIsMenuOpen(false);
                    }}
                >
                    <MdOutlineCancel />
                </button>
            </div>

            <select
                name="transaction-sort"
                className="transactionSort"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
            >
                <option value="">All</option>
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
            </select>

            <select
                name="mode-sort"
                className="transactionSort"
                defaultValue=""
                value={mode}
                onChange={(e) => setMode(e.target.value)}
            >
                <option value="">All</option>
                <option value="cash">Cash</option>
                <option value="card">Card</option>
                <option value="upi">UPI</option>
                <option value="netbanking">Netbanking</option>
            </select>

            <select
                name="mode-sort"
                className="transactionSort"
                defaultValue=""
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
            >
                <option value="">All</option>
                {categories?.map((cat) => {
                    return (
                        <option key={cat.id} value={cat.id}>
                            {cat.name}
                        </option>
                    );
                })}
            </select>

            <select
                name="transaction-sort"
                className="transactionSort"
                value={type}
                onChange={(e) => setType(e.target.value)}
            >
                <option value="">All</option>
                <option value="expense">Expenses</option>
                <option value="income">Income</option>
            </select>

            <DatePicker />
        </div>
    );
};

export default FiltersMenu;
