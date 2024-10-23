import React, { useState } from "react";
import { useGlobalContext } from "../context/Context";
import "../assets/style/profile.css";
import { IoIosAdd } from "react-icons/io";
import { logout } from "../database/auth.db";
import AddCategory from "../components/AddCategory";

const Profile = () => {
  const { categories, setUid, user , setBankBal ,setCashBal} = useGlobalContext();

  const [showForm, setShowForm] = useState(false);
  const onResetClick = () => {
    setBankBal(0);
    setCashBal(0);
  };

  const handleLogout = () => {
    logout();
    setUid(null);
    localStorage.removeItem("user");
    console.log("Logout clicked");
  };

  const renderCategories = () => {
    return (
      <>
        {categories?.map((cat) => {
          return (
            <div className="category">
              <span className="emoji" style={{ backgroundColor: cat.color }}>
                {cat.emoji}
              </span>
              {cat.name}
            </div>
          );
        })}
      </>
    );
  };

  return (
    <div className="profile-page">
      <h2>Your Profile</h2>
      <div className="user-profile">
        <img src={`${user?.photoURL}`} alt="profile" />
        <span className="display-name">{user?.name}</span>
        <span className="username">{user?.email}</span>
      </div>
      <div className="button-container">
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>

        <button className="logout-btn" onClick={onResetClick}>
          Reset
        </button>
      </div>

      <h3>All Categories</h3>
      <div className="categories">
        {renderCategories()}

        {categories?.length < 20 && (
          <button className="category" onClick={() => setShowForm(true)}>
            <span className="emoji">
              <IoIosAdd />
            </span>
            Add
          </button>
        )}
      </div>

      {showForm && <AddCategory setShowForm={setShowForm} />}
    </div>
  );
};

export default Profile;
