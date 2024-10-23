import React, { useEffect, useState } from "react";
import { Bubble, Doughnut, Pie, Scatter } from "react-chartjs-2";
import { useGlobalContext } from "../../context/Context";
import "../../assets/style/piechart.css";

function PieChart() {
    const { user, categories, transactions } = useGlobalContext();
    const [categoryData, setCategoryData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const categoryNames = categories.map(
                    (category) => category.name
                );
                if (categories && transactions) {
                    const transactionAmounts = transactions.map((transaction) =>
                        parseFloat(transaction.amount)
                    );

                    const pieChartData = categoryNames.map((name, index) => ({
                        name,
                        amount: transactionAmounts[index] || 0,
                    }));

                    setCategoryData(pieChartData);
                } else {
                    console.log("No categories :", user?.uid);
                }
            } catch (error) {
                console.error("Error:", error);
            }
        };

        if (user?.uid) {
            fetchData();
        } else {
            console.log("User ID is not available.");
        }
    }, [user, transactions, categories]);

    const calculateCategoryAmount = (categoryName, transactions) => {
        return transactions.reduce((total, transaction) => {
            if (transaction.category === categoryName) {
                return total + transaction.amount;
            }
            return total;
        }, 0);
    };

    const totalAmount = categoryData.reduce(
        (total, category) => total + category.amount,
        0
    );

    const pieData = {
        labels: categoryData.map(
            (category) =>
                `${category.name} (${(
                    (category.amount / totalAmount) *
                    100
                ).toFixed(2)}%)`
        ),
        datasets: [
            {
                label: "Categories",
                data: categoryData?.map((category) => category.amount),
                backgroundColor: categories?.map((cat) => cat.color),
                hoverOffset: 4,
                borderWidth: 1,
                borderColor: "#aaa",
            },
        ],
    };

    const options = {
        plugins: {
            legend: {
                labels: {
                    color: "white",
                    usePointStyle: false,
                },
            },
        },
    };

    return (
        <div className="containerr">
            <Doughnut data={pieData} options={options} />
        </div>
    );
}

export default PieChart;
