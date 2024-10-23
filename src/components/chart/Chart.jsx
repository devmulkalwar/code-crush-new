import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { useGlobalContext } from "../../context/Context";
import { getAllIncome, getAllExpenses } from "../../database/transaction.db";
import PieChart from "./PieChart";
import { range } from "lodash";

function Chart() {
    const {
        incomes,
        uid,
        expenses,
        totalIncome,
        totalExpenses,
        user,
        date,
        duration,
    } = useGlobalContext();
    const [labels, setLabels] = useState([]);
    const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());

    useEffect(() => {
        const fetchData = async () => {
            const allData = Math.max(incomes?.length, expenses?.length);

            // console.log("data  ", incomes);

            setLabels(range(1, allData + 1));
        };

        fetchData();
    }, [incomes, expenses]);

    const handleMonthChange = (event) => {
        setSelectedMonth(parseInt(event.target.value));
    };

    const reverseArray = (ar) => {
        // const ar = [];

        let newAr = ar
            ?.slice()
            .reverse()
            .map((sth) => sth.amount);

        // console.log("new ar", newAr)
        return newAr;
    };

    const data = {
        labels, // Example labels for months
        datasets: [
            {
                label: "Income",
                data: incomes ? reverseArray(incomes) : [],
                fill: false,
                borderColor: "green",
                backgroundColor: "green",
                color: "white",
                tension: 0.3,
            },
            {
                label: "Expenses",
                data: expenses ? reverseArray(expenses) : [],
                fill: false,
                borderColor: "red",
                backgroundColor: "red",
                color: "white",
                tension: 0.5,
            },
        ],
    };

    const options = {
        plugins: {
            legend: {
                labels: {
                    color: "white",
                },
            },
        },
        scales: {
            x: {
                grid: {
                    color: "rgba(240, 240, 240, 0.5)",
                },
                ticks: {
                    color: "rgba(240, 240, 240, 0.8)",
                },
            },
            y: {
                grid: {
                    color: "rgba(255, 255, 255, 0.2)",
                },
                ticks: {
                    color: "rgba(240, 240, 240, 0.5)",
                    max: Math.max(totalIncome, totalExpenses),
                },
            },
        },
    };

    return (
        <div className="container">
            {/* <select value={selectedMonth} onChange={handleMonthChange}>
        <option value={0}>January</option>
        <option value={1}>February</option>
        <option value={2}>March</option>
        <option value={3}>April</option>
       
      </select> */}
            <Line data={data} options={options} />
        </div>
    );
}

export default Chart;
