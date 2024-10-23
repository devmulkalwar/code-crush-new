import React, { useEffect, useState } from "react";
import "../assets/style/calendermodel.css";
import { MdOutlineCancel } from "react-icons/md";
import DatePicker from "./DatePicker";
import { useGlobalContext } from "../context/Context";

const CalenderModel = ({ setIsCalOpen, handleTimeChange }) => {
  const { time, setTime } = useGlobalContext();

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const t = now.toTimeString().slice(0, 5);
      setTime(t);
    };

    updateTime();

    const intervalId = setInterval(updateTime, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="calender-model">
      <div className="btn-div">
        <button
          className="cancel-btn"
          onClick={() => {
            setIsCalOpen(false);
          }}
        >
          <MdOutlineCancel />
        </button>
      </div>
      <DatePicker />
      <input
        type="time"
        value={time}
        className="time-picker"
        onChange={handleTimeChange}
      />
    
    </div>
  );
};

export default CalenderModel;
