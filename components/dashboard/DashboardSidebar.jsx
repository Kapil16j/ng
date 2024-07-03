"use client";
import React from "react";
import Link from "next/link";
import { CloseIcon, DashboardDropdownIcons, LogoIcon } from "../common/Icon";

const DashboardSidebar = ({ sidebar, setSidebar }) => {
  return (
    <div
      className={`w-screen h-screen lg:hidden fixed top-0 duration-300 z-50 ${
        sidebar ? "left-0" : "-left-full"
      }`}
    >
      <div className="w-full bg-white h-screen">
        <div className="flex justify-between pt-4 px-6 w-full">
        <div className="max-w-[198px] w-full border border-[#E4E4E7] rounded-[6px] px-4 py-2 flex justify-between items-center gap-2">
             <div className="flex items-center gap-2">
                <img src="/assets/img/dashboard-logo-image.png" alt="logo image" width={20} height={20}/>
                <p className=" font-inter font-medium text-[14px] leading-[142%] text-[#09090B]">Alicia Koch</p>
             </div>
            <DashboardDropdownIcons/>
            </div>
          <button
            onClick={() => setSidebar(!sidebar)}
            aria-label="Close Sidebar"
          >
            <CloseIcon />
          </button>
        </div>
        <div className="max-w-[320px] w-full px-3 py-[6px] rounded-[6px] border border-[#E4E4E7] bg-white shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] mx-auto mt-5 sm:hidden">
<input type="search" placeholder="Search..." className=" outline-none w-full font-inter font-normal text-[14px] leading-[142%] text-[#71717A]" />
</div>
       <div className="max-w-[327px] w-full flex flex-col mx-auto mt-5  justify-between gap-5 items-center">
              <Link href="#" className="navtabs-text-dashboard">
              Overview
              </Link>
              <Link href="#" className="navtabs-text-dashboard">
              Customers
              </Link>
              <Link href="#" className="navtabs-text-dashboard">
              Products
              </Link>
              <Link href="#" className="navtabs-text-dashboard">
              Settings
              </Link>
            </div>
      </div>
    </div>
   
  );
};

export default DashboardSidebar;
