import React, { useEffect, useState } from "react";
import "../assets/style/header.css";
import { useGlobalContext } from "../context/Context";
import logo from "../assets/images/logo.png";
import { Link } from "react-router-dom";

const Header = () => {
    const [showDropdown, setShowDropdown] = useState(false);
    const { user, uid, setUid, setActive } = useGlobalContext();

    const handleImageClick = () => {
        setShowDropdown((p) => !p);
    };

    const currentRoute = window.location.pathname.substring(1);
    useEffect(() => {
        if (currentRoute === "") {
            setActive(0);
        }
    }, [currentRoute]);

    return (
        <header className="header">
            <div className="header-logo">
                <Link to="/" onClick={() => setActive(0)}>
                    <img className="logo-img" src={logo} alt="logo" />
                    <span>FinGo</span>
                </Link>
            </div>

            <Link to="/profile" onClick={() => setActive(-1)}>
                <div
                    className="header-img"
                >
                    {uid === null ? (
                        <img
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSX5DWWYRWd7uysUpQK690_mjjaBPgll2-V0Q&usqp=CAU"
                            alt="profile"
                        />
                    ) : (
                        <img src={`${user?.photoURL}`} alt="profile" />
                    )}
                </div>
            </Link>
        </header>
    );
};

export default Header;
