import React, { useState } from "react";
import { IoBackspaceOutline } from "react-icons/io5";
import { IoAddOutline } from "react-icons/io5";
import "../assets/style/keypad.css";
import { SlCalender } from "react-icons/sl";
import CalenderModel from "./CalenderModel";

const Keypad = ({
  handleNumberClick,
  handleBackspace,
  handleClear,
  handleSubmit,
  showCalBtn,
  setShowCalBtn,
}) => {

  const [isCalOpen , setIsCalOpen] =useState(false) ;
 
  return (
    <div className="keypad">
      <button className="number-btn" onClick={() => handleNumberClick("1")}>
        1
      </button>
      <button className="number-btn" onClick={() => handleNumberClick("2")}>
        2
      </button>
      <button className="number-btn" onClick={() => handleNumberClick("3")}>
        3
      </button>
      <button className="backspace-btn red-btn" onClick={handleBackspace}>
        <IoBackspaceOutline />
      </button>
      <button className="number-btn" onClick={() => handleNumberClick("4")}>
        4
      </button>
      <button className="number-btn" onClick={() => handleNumberClick("5")}>
        5
      </button>
      <button className="number-btn" onClick={() => handleNumberClick("6")}>
        6
      </button>
      {showCalBtn && (
        <button
          className="calender-btn clear-btn red-btn"
          onClick={()=>{ setIsCalOpen(true)}}
        >
          <SlCalender />
        </button>
      )}

      {!showCalBtn && (
        <button
          className="extended-btn"
          onClick={handleSubmit}
          style={{ gridRow: "span 3" }}
        >
          <IoAddOutline />
        </button>
      )}
      <button className="number-btn" onClick={() => handleNumberClick("7")}>
        7
      </button>
      <button className="number-btn" onClick={() => handleNumberClick("8")}>
        8
      </button>
      <button className="number-btn" onClick={() => handleNumberClick("9")}>
        9
      </button>

      {showCalBtn && (
        <button
          className="extended-btn"
          onClick={handleSubmit}
          style={{ gridRow: "span 2" }}
        >
          <IoAddOutline />
        </button>
      )}

      <button className="clear-btn red-btn" onClick={handleClear}>
        C
      </button>
      <button className="number-btn" onClick={() => handleNumberClick("0")}>
        0
      </button>
      <button className="number-btn" onClick={() => handleNumberClick(".")}>
        .
      </button>
      {isCalOpen && <CalenderModel isCalOpen= {isCalOpen} setIsCalOpen={setIsCalOpen} />}
    </div>
  );
};

export default Keypad;
