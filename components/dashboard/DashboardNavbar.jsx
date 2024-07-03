"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import {  DashboardDropdownIcons, SidebarIcon } from "../common/Icon";
import DashboardSidebar from "./DashboardSidebar";

const DashboardNavbar = () => {
  const [sidebar, setSidebar] = useState(false);

  const toggleSidebar = () => {
    setSidebar(!sidebar);
  };

  useEffect(() => {
    if (sidebar) {
      document.body.style.height = "100vh";
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.height = "100%";
      document.body.style.overflow = "auto";
    }

    // Clean up the effect
    return () => {
      document.body.style.height = "100%";
      document.body.style.overflow = "auto";
    };
  }, [sidebar]);

  return (
    <>
      <nav>
        <div
          className={`w-full px-4 py-[13px] flex justify-between  items-center border-b border-b-[#E4E4E7] ${
            sidebar ? "hidden" : ""
          }`}
        >
          <div className="flex items-center gap-[47px]">
            <div className="max-w-[198px] w-full border border-[#E4E4E7] rounded-[6px] px-4 py-2 flex justify-between items-center gap-2">
             <div className="flex items-center gap-2">
                <img src="/assets/img/dashboard-logo-image.png" alt="logo image" width={20} height={20}/>
                <p className=" font-inter font-medium text-[14px] leading-[142%] text-[#09090B]">Alicia Koch</p>
             </div>
            <DashboardDropdownIcons/>
            </div>
            <div className="max-w-[327px] w-full flex justify-between gap-6 items-center max-lg:hidden">
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
          <div className="flex items-center gap-4">
<div className="max-w-[320px] w-full px-3 py-[6px] rounded-[6px] border border-[#E4E4E7] bg-white shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] max-sm:hidden">
<input type="search" placeholder="Search..." className=" outline-none w-full font-inter font-normal text-[14px] leading-[142%] text-[#71717A] cursor-pointer" />
</div>
<div className="min-w-8 h-8 rounded-full bg-[#D9D9D9] flex items-center justify-center cursor-pointer">
<img src="/assets/img/profile-dashboard-img.png" alt="profile image " width={32} height={32} />
</div>
<button
            className={`lg:hidden ${sidebar ? "py-0" : ""}`}
            onClick={toggleSidebar}
          >
            <SidebarIcon />
          </button>
          </div>
        </div>
      </nav>

      {/* Sidebar */}
      <DashboardSidebar sidebar={sidebar} setSidebar={setSidebar} />
    </>
  );
};

export default DashboardNavbar;
