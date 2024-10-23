import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";
import { ContextProvider } from "./context/Context";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

//pages imports
import Home from "./pages/Home";
import Login from "./pages/Login";
import Charts from "./pages/Charts";
import Transactions from "./pages/Transactions";
import AddTransaction from "./pages/AddTransaction";
import Wallet from "./pages/Wallet";
import Error from "./pages/Error";
import Profile from "./pages/Profile";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        errorElement: <Error />,
        children: [
            { index: true, element: <Home /> },
            { path: "login", element: <Login /> },
            { path: "transactions", element: <Transactions /> },
            { path: "add-transaction", element: <AddTransaction /> }, 
            { path: "charts", element: <Charts /> },
            { path: "wallet", element: <Wallet /> },
            {path: "profile", element: <Profile />},
        ],
    },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <ContextProvider>
        <RouterProvider router={router} />
    </ContextProvider>
);
