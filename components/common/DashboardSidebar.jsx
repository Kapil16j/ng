import React, { useEffect } from "react";
import {
  AlModelsSidebarIcon,
  CrossIcon,
  DownArrowIcon,
  DownArrowIcon2,
  HelpSidebarIcon,
  HomeSidebarIcon,
  KeywordSidebarIcon,
  LogoIcon,
  ProposalsSidebarIcon,
  TemplatesSidebarIcon,
  WritingSidebarIcon,
} from "./Icon";
import Link from "next/link";
import Image from "next/image";
import TemplatesDropdown from "./TemplatesDropdown";
import { Templates, writingBeta } from "./Helper";
import NaimurDropDown from "./NaimurDropDown";
import WritingBeteDropDown from "./WritingBeteDropDown";

const DashboardSidebar = ({ sidebar, setSidebar }) => {
  useEffect(() => {
    if (sidebar) {
      document.body.classList.add("sidebar-open");
    } else {
      document.body.classList.remove("sidebar-open");
    }

    // Clean up the effect
    return () => {
      document.body.classList.remove("sidebar-open");
    };
  }, [sidebar]);
  return (
    <div
      className={`sm:max-w-[260px] scrollbar_hide h-full overflow-hidden bg-whiteSmoke z-20 pb-4 relative w-full px-4 pt-6 max-lg:absolute max-sm:w-full duration-300 top-0 ${
        sidebar ? "left-0" : "max-lg:left-[-105%]"
      }`}
    >
      <div className="bg-retroBlue absolute top-[50%] right-0 w-[169px] h-[305px] rounded-[305px] blur-[200px] -z-1"></div>
      <div className="w-full flex items-center justify-between">
        <div className="flex items-center gap-2 ">
          <LogoIcon />
          <h2 className="text-black font-Inter text-[25px] font-bold">
            Ddsgnr
          </h2>
        </div>
        <div className="lg:hidden">
          <button type="submit" onClick={() => setSidebar(!sidebar)}>
            <CrossIcon />
          </button>
        </div>
      </div>
      <div
        className="w-full h-full flex flex-col items-center 
      justify-between gap-12"
      >
        <div className="flex flex-col h-[calc(100vh-200px)] overflow-auto scrollbar_hide gap-1 mt-2 lg:mt-[59px]">
          <Link
            href="#"
            className="py-[11px] px-3 rounded-[4px] max-w-[228px] w-full border border-[rgba(255,255,255,0.11)] bg-transparent  group hover:bg-retroBlue  flex gap-3 items-center transition duration-300 ease-in-out"
          >
            <HomeSidebarIcon />
            <p className=" font-interTight font-normal text-[18px] leading-[140%] group-hover:text-white text-coarseWool">
              Home
            </p>
          </Link>
          <Link
            href="#"
            className="py-[11px] px-3 rounded-[4px] max-w-[228px] w-full border border-[rgba(255,255,255,0.11)] bg-transparent  group hover:bg-retroBlue  flex gap-3 items-center transition duration-300 ease-in-out"
          >
            <ProposalsSidebarIcon />
            <p className=" font-interTight font-normal text-[18px] leading-[140%] group-hover:text-white text-coarseWool">
              Proposals
            </p>
          </Link>
          <div>
            <TemplatesDropdown />
          </div>
          <Link
            href="#"
            className="py-[11px] px-3 rounded-[4px] max-w-[228px] w-full border border-[rgba(255,255,255,0.11)] bg-transparent  group hover:bg-retroBlue  flex gap-3 items-center transition duration-300 ease-in-out"
          >
            <KeywordSidebarIcon />
            <p className=" font-interTight font-normal text-[18px] leading-[140%] group-hover:text-white text-coarseWool">
              Keyword Research
            </p>
          </Link>
          <Link
            href="#"
            className="py-[11px] px-3 rounded-[4px] max-w-[228px] w-full border border-[rgba(255,255,255,0.11)] bg-transparent  group hover:bg-retroBlue  flex gap-3 items-center transition duration-300 ease-in-out"
          >
            <AlModelsSidebarIcon />
            <p className=" font-interTight font-normal text-[18px] leading-[140%] group-hover:text-white text-coarseWool">
              Custom Al Models
            </p>
          </Link>
          <div>
            <WritingBeteDropDown />
          </div>
          <Link
            href="#"
            className="py-[11px] px-3 rounded-[8px] max-w-[228px] w-full border border-[rgba(255,255,255,0.11)] bg-transparent  group hover:bg-retroBlue hover:rounded-[4px] flex gap-3 items-center transition duration-300 ease-in-out z-50"
          >
            <HelpSidebarIcon />
            <p className=" font-interTight font-normal text-[18px] leading-[140%] group-hover:text-white text-coarseWool">
              Help
            </p>
          </Link>
        </div>
        <div className="w-[180px] mx-auto flex flex-col gap-[10px] items-center rounded-[12px] border border-[rgba(255,255,255,0.11)] bg-white px-2 pt-[47px] pb-[15px] relative mb-10 mt-5">
          <Image
            alt="sidebar-img"
            src="/assets/img/boost-sidebaar-img.png"
            width={80}
            height={80}
            className=" absolute -top-[37px] left-[50px]"
          />
          <div>
            <NaimurDropDown />
          </div>
          <p className="font-montserrat  font-semibold text-[12px] leading-[150%] text-trolleyGrey pt-2 text-center">
            15 AI Paragraphs left
          </p>
          <button
            type="submit"
            className="w-[148px] h-[38px] flex justify-center items-center rounded-[8px] bg-[linear-gradient(92deg,#0076FE_-9.48%,#00D372_109.3%)] font-montserrat font-medium text-[14px] leading-[150%] text-white hover:scale-90 duration-300"
          >
            Upgrade Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardSidebar;
