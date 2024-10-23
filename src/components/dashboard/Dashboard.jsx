import React, { useEffect, useRef } from "react";
import { useGlobalContext } from "../../context/Context";
import { Chart } from "chart.js/auto";
import "../../assets/style/dashboard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ChartComponent from "../chart/Chart";
import { Progress } from "antd";
import PieChart from "../chart/PieChart";

function Dashboard() {
    const chartRef = useRef(null);
    const { totalIncome, totalExpenses, totalBalance } = useGlobalContext();

    const expensePercentage = totalIncome === 0 ? totalExpenses : Math.min((totalExpenses / totalIncome) * 100, 100).toFixed(0);
    const balancePercentage = totalIncome === 0 ? 0 : Math.max(((totalIncome - totalExpenses) / totalIncome) * 100, 0).toFixed(0);


    useEffect(() => {
        if (!chartRef.current) return;

        const myChart = new Chart(chartRef.current, {
            type: "bar",
            data: {
                labels: ["Total Income", "Total Expenses"],
                datasets: [
                    {
                        label: "Amount",
                        data: [totalIncome, totalExpenses],
                        backgroundColor: [
                            "rgba(75, 192, 192, 0.2)",
                            "rgba(255, 99, 132, 0.2)",
                        ],
                        borderColor: [
                            "rgba(75, 192, 192, 1)",
                            "rgba(255, 99, 132, 1)",
                        ],
                        borderWidth: 1,
                    },
                ],
            },
            options: {
                plugins: {
                    legend: {
                        labels: {
                            color: "white",
                        },
                    },
                },
                responsive: true,
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
                        beginAtZero: true,
                        grid: {
                            color: "rgba(255, 255, 255, 0.2)", 
                        },
                        ticks: {
                            color: "rgba(240, 240, 240, 0.5)", 
                        },
                    },
                },
            },
        });

        return () => {
            myChart.destroy();
        };
    }, [chartRef, totalIncome, totalExpenses]);

    return (
        <div className="">
            <div className="statistics">
                    <h4>Total Income Vs Total Expenses</h4>
                <div className="chart container">
                    <canvas ref={chartRef}></canvas>
                </div>

                <div className="chartLine">
                    <div className="line">
                        <h4>Income and Expenses Over Time</h4>
                        <ChartComponent></ChartComponent>
                    </div>
                </div>

                <h4>Overall Percentage</h4>
                <div className="progress container">

                    <div className="circle">
                        <h5>Total Expenses</h5>

                        <Progress
                            type="circle"
                            strokeColor={"red"}
                            percent={expensePercentage}
                            format={() => (
                                <span
                                    style={{ color: "white" }}
                                >{`${expensePercentage}%`}</span>
                            )}
                            trailColor={"#e9e9e9"}
                        ></Progress>
                        {/* <FontAwesomeIcon icon="fas fa-rupee-sign" /> */}
                        {/* {totalExpenses} */}

                    </div>

                    <div className="circle">
                        <h5>Total Balance</h5>

                        <Progress
                            type="circle"
                            strokeColor={"green"}
                            percent={balancePercentage}
                            format={() => (
                                <span
                                    style={{ color: "white" }}
                                >{`${balancePercentage}%`}</span>
                            )}
                            trailColor={"#e9e9e9"}
                        ></Progress>
                        {/* <FontAwesomeIcon icon="fas fa-rupee-sign" /> */}
                        {/* {totalExpenses} */}

                    </div>
                </div>
                <div className="pie-con">
            <h3>Category Distributions</h3>
                    <div className="container pie">

                        <PieChart></PieChart>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
