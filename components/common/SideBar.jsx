"use client";
import React from "react";
import { CloseIcon, LogoIcon } from "./Icon";
import Link from "next/link";

const SideBar = ({ sidebar, setSidebar }) => {
  return (
    <div
      className={`w-screen h-screen sm:hidden fixed top-0 duration-300 z-50 ${
        sidebar ? "left-0" : "-left-full"
      }`}
    >
      <div className="w-full bg-white h-screen">
        <div className="flex justify-between pt-4 px-6 w-full">
          <div className="flex items-center gap-2">
            <LogoIcon />
            <h2 className="text-black font-Inter text-[25px] font-bold">
              NGO
            </h2>
          </div>
          <button
            onClick={() => setSidebar(!sidebar)}
            aria-label="Close Sidebar"
          >
            <CloseIcon />
          </button>
        </div>
        <div className="flex flex-col items-start gap-4 pt-8 px-6">
          <Link href="/" className="navtabs-text">
            Home
          </Link>
          <Link href="/about" className="navtabs-text">
            About
          </Link>
          <Link href="/premium" className="navtabs-text">
            Premium
          </Link>
          <Link href="/contact" className="navtabs-text">
            Contact
          </Link>
          <button className="w-full bg-coarseWool text-white font-interTight rounded-[4px] text-base font-normal leading-[150%] h-[40px] border-[1px] border-black hover:bg-transparent hover:text-black transition duration-300 ease-in-out">
            Login
          </button>
        </div>
      </div>
    </div>
   
  );
};

export default SideBar;
