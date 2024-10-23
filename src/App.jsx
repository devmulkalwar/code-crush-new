import "./App.css";
import { Outlet } from "react-router-dom";
import Header from "./components/Header";

import BottomBar from "./components/Bottombar";
import { useGlobalContext } from "./context/Context";
import Login from "./pages/Login";
import { getAllExpenses } from "./database/transaction.db";

function App() {
    const { uid } = useGlobalContext();
    return (
        <div>
            <Header />
            {uid === null ? (
                <Login />
            ) : (
                <>
                    <main className="main">
                        <Outlet />
                    </main>
                    <div className="bottom-filling"></div>

                    <BottomBar />
                </>
            )}
        </div>
    );
}

export default App;
