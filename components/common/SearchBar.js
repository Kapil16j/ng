"use client";
import { useState, useEffect, useRef } from "react";
import {
  CloseIcon,
  CrossIcon,
  DownArrowIcon,
  DropdownIcon,
  SearchIcon,
} from "../common/Icon";

const SearchBar = ({query,setQuery}) => {
  const [timeOpen, setTimeOpen] = useState(false);
  const [amountOpen, setAmountOpen] = useState(false);
  const [selectedTime, setSelectedTime] = useState("Select Time");
  const [selectedAmount, setSelectedAmount] = useState("Select Amount");

  const timeRef = useRef();
  const amountRef = useRef();

  const toggleTimeDropdown = () => setTimeOpen(!timeOpen);
  const toggleAmountDropdown = () => setAmountOpen(!amountOpen);

  const handleTimeSelect = (time) => {
    setSelectedTime(time);
    setTimeOpen(false);
  };

  const handleAmountSelect = (amount) => {
    setSelectedAmount(amount);
    setAmountOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (timeRef.current && !timeRef.current.contains(event.target)) {
        setTimeOpen(false);
      }
      if (amountRef.current && !amountRef.current.contains(event.target)) {
        setAmountOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="flex flex-col items-center p-4">
      <div className="w-full flex items-center justify-between gap-2 max-w-[991px] mx-auto border border-white rounded-md shadow-sm p-2">
        <span>
          <SearchIcon />
        </span>
        <input
          type="text"
          placeholder="AI Search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full outline-none sm:text-sm bg-transparent text-white"
        />
        <span>
          <CrossIcon />
        </span>
      </div>
      {/* <div className="flex mt-4 space-x-4">
        <div ref={timeRef} className="relative inline-block text-left">
          <button
            onClick={toggleTimeDropdown}
            className="flex items-center p-2 gap-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm justify-between min-w-fit max-w-fit w-full"
          >
            <span>
              <CloseIcon />
            </span>
            {selectedTime}
            <DropdownIcon />
          </button>
          {timeOpen && (
            <div className="absolute right-0 w-40 mt-2 origin-top-right bg-white border border-gray-300 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div className="py-1">
                <button
                  onClick={() => handleTimeSelect("Last 24 hours")}
                  className="w-full p-2 text-sm text-left text-gray-700 hover:bg-gray-100"
                >
                  Last 24 hours
                </button>
                <button
                  onClick={() => handleTimeSelect("Last week")}
                  className="w-full p-2 text-sm text-left text-gray-700 hover:bg-gray-100"
                >
                  Last week
                </button>
                <button
                  onClick={() => handleTimeSelect("Last month")}
                  className="w-full p-2 text-sm text-left text-gray-700 hover:bg-gray-100"
                >
                  Last month
                </button>
              </div>
            </div>
          )}
        </div>

        <div ref={amountRef} className="relative inline-block text-left">
          <button
            onClick={toggleAmountDropdown}
            className="flex items-center p-2 gap-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm justify-between min-w-fit max-w-fit w-full"
          >
            <span>
              <CloseIcon />
            </span>
            {selectedAmount}
            <DropdownIcon />
          </button>
          {amountOpen && (
            <div className="absolute right-0 w-40 mt-2 origin-top-right bg-white border border-gray-300 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div className="py-1">
                <button
                  onClick={() => handleAmountSelect("$10 - $50")}
                  className="w-full p-2 text-sm text-left text-gray-700 hover:bg-gray-100"
                >
                  $10 - $50
                </button>
                <button
                  onClick={() => handleAmountSelect("$50 - $100")}
                  className="w-full p-2 text-sm text-left text-gray-700 hover:bg-gray-100"
                >
                  $50 - $100
                </button>
                <button
                  onClick={() => handleAmountSelect("$100 - $500")}
                  className="w-full p-2 text-sm text-left text-gray-700 hover:bg-gray-100"
                >
                  $100 - $500
                </button>
              </div>
            </div>
          )}
        </div>
      </div> */}
    </div>
  );
};

export default SearchBar;