"use client";
import DashboardNavbar from "@/components/dashboard/DashboardNavbar";
import DatePickerDashboard from "@/components/dashboard/DatePickerDashboard";
import Overview from "@/components/dashboard/Overview";
import PriceCard from "@/components/dashboard/PriceCard";
import RecentSales from "@/components/dashboard/RecentSales";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchData, resetStore } from "../store/actions/dataActions";

const Dashboard = () => {
  const [navTab, setNavTab] = useState(false);

  const dispatch = useDispatch()
  const data = useSelector((state)=>state)

  console.log("data??",data)

  useEffect(()=>{
    dispatch(fetchData())
    // dispatch(resetStore());

  },[])
  return (
    <>
      <DashboardNavbar />
      <div className="max-w-[1334px] w-full mx-auto pt-4 sm:pt-6 px-4 md:px-8 pb-4 sm:pb-8 flex flex-col gap-4">
        <div className="flex max-sm:flex-col max-sm:gap-4 justify-between w-full items-center">
          <p className=" font-inter font-semibold text-[30px] leading-[120%] tracking-[-0.75px] text-ruinedSmores">
            Home
          </p>
          <div className="flex max-sm:flex-col gap-4 sm:gap-2 items-center max-w-[407px] w-full">
            <div className="max-w-[300px] w-full py-2 px-4 border border-[#E4E4E7] rounded-[6px] bg-white">
              <DatePickerDashboard />
            </div>
            <button className="w-[99px] h-[36px] flex items-center justify-center font-inter font-medium text-[14px] leading-[142%] bg-[#18181B] rounded-[6px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] border border-[#18181B] text-[#FAFAFA] hover:bg-transparent hover:text-[#18181B] transition duration-300 ease-in-out ">
              Download
            </button>
          </div>
        </div>
        {/* tabs */}
        <div className="bg-[#F4F4F5] rounded-[8px] p-1 max-w-[369px] w-full overflow-auto">
          <div className="flex cursor-pointer">
            <button
              onClick={() => setNavTab("")}
              className={` text-sm font-medium rounded-[4px] leading-[20px] p-[4px_4px]  sm:p-[4px_12px]   ${
                navTab ? "text-[#71717A]" : "bg-white text-black"
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setNavTab("Analytics")}
              className={` text-sm font-medium rounded-[4px] leading-[20px] p-[4px_10px]  sm:p-[4px_12px]   ${
                navTab === "Analytics"
                  ? "bg-white text-black"
                  : "text-[#71717A]"
              }`}
            >
              Analytics
            </button>
            <button
              onClick={() => setNavTab("Reports")}
              className={` text-sm font-medium rounded-[4px] leading-[20px] p-[4px_10px]  sm:p-[4px_12px]   ${
                navTab === "Reports" ? "bg-white text-black" : "text-[#71717A]"
              }`}
            >
              Reports
            </button>
            <button
              onClick={() => setNavTab("Notifications")}
              className={` text-sm font-medium rounded-[4px] leading-[20px] p-[4px_10px]  sm:p-[4px_12px]   ${
                navTab === "Notifications"
                  ? "bg-white text-black"
                  : "text-[#71717A]"
              }`}
            >
              Notifications
            </button>
          </div>
        </div>
        <div>
          <PriceCard />
        </div>
        <div className="flex gap-4 justify-between max-xl:flex-col max-lg:items-center">
          <Overview />
          <RecentSales />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
