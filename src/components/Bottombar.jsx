import React, { useEffect, useState } from "react";
import "../assets/style/bottombar.css";
import { Link } from "react-router-dom";

import { IoHomeOutline } from "react-icons/io5";
import { HiOutlineArrowsRightLeft } from "react-icons/hi2";
import { IoAddOutline } from "react-icons/io5";
import { IoBarChartOutline } from "react-icons/io5";
import { IoWalletOutline } from "react-icons/io5";
import { useGlobalContext } from "../context/Context";

const Bottombar = () => {
  const menus = [
    { route: "", icon: <IoHomeOutline /> },
    { route: "transactions", icon: <HiOutlineArrowsRightLeft /> },
    { route: "add-transaction", icon: <IoAddOutline /> },
    { route: "charts", icon: <IoBarChartOutline /> },
    { route: "wallet", icon: <IoWalletOutline /> },
  ];

  const { active, setActive }= useGlobalContext();
  const currentRoute = window.location.pathname.substring(1);

  useEffect(() => {
    switch (currentRoute) {
      case " ":
        setActive(0);
        break;
      case "transactions":
        setActive(1);
        break;
      case "add-transaction":
        setActive(2);
        break;
      case "charts":
        setActive(3);
        break;
      case "wallet":
        setActive(4);
        break;
      default:
        return;
    }
  }, [currentRoute]);

  const createMenus = () => {
    return menus.map((menu, i) => (
      <Link
        key={i}
        to={`/${menu.route}`}
        className={`nav-icon ${active === i ? "nav-active" : ""}`}
        onClick={() => setActive(i)}
      >
        {menu.icon}
      </Link>
    ));
  };

  return <nav className="bottom-bar">{createMenus()}</nav>;
};

export default Bottombar;
