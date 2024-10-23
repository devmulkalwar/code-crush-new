import React, { useEffect, useState } from "react";
import { useGlobalContext } from "../context/Context";
import TransactionCard from "../components/TransactionCard";
import { Link } from "react-router-dom";
import "../assets/style/home.css";
import { getAllIncome, getAllExpenses } from "../database/transaction.db";
import { months } from "moment";

const Home = () => {
  const {
    user,
    transactions,
    setActive,
    totalIncome,
    totalExpenses,
    bankBal,
    cashBal,
  } = useGlobalContext();

  const totalBalance = parseFloat(bankBal) + parseFloat(cashBal);
  return (
    <div className="home">
      <span className="home-header">Welcome, {user?.name}</span>
      <div className="balance blurry-box">
        <span>Available Balance</span>
        <span>₹ {totalBalance}</span>
      </div>
      <div className="summary">
        <div className="income blurry-box">
          <span>Income</span>
          <span>₹ {totalIncome}</span>
        </div>
        <div className="expenses blurry-box">
          <span>Expenses</span>
          <span>₹ {totalExpenses}</span>
        </div>
      </div>
      <div className="recent-transactions">

        <div className="see-all">
          <span>Recent Transactions</span>
          <Link to="/transactions" className="sm-btn" onClick={()=>setActive(1)}>
            See All
          </Link>
        </div>
        {transactions?.slice(0, 3)?.map((trans) =>   //slice the array to limmit only 3 result 
          <TransactionCard
            key={trans.id}
            amount={trans.amount}
            category={trans.category}
            type={trans.type}
            note={trans.note}
            time={trans.time}
            mode={trans.mode}
          />
        )}
      </div>
    </div>
  );
};

export default Home;
