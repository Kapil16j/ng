"use client";
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { CalenderIcons } from "../common/Icon";

const DatePickerDashboard = () => {
  const defaultStartDate = new Date("2024-08-01");
  const defaultEndDate = new Date("2024-10-01");
  const [startDate, setStartDate] = useState(defaultStartDate);
  const [endDate, setEndDate] = useState(defaultEndDate);

  const handleChange = ([newStartDate, newEndDate]) => {
    setStartDate(newStartDate);
    setEndDate(newEndDate);
  };

  return (
    <div className="flex gap-2 w-full items-center ">
      <CalenderIcons />
      {/* <DatePicker
        selected={startDate}
        startDate={startDate}
        endDate={endDate}
        onChange={handleChange}
        excludeDates={[
          new Date("2024-05-01"),
          new Date("2024-02-01"),
          new Date("2024-01-01"),
          new Date("2024-11-01"),
        ]}
        dateFormat="dd/MM/yyyy"
        placeholderText="Time Period"
        showDateMonthYearPicker
        selectsRange
        className=" outline-none w-full cursor-pointer"
      /> */}
    </div>
  );
};

export default DatePickerDashboard;
