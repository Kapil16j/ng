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
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const DashboardSidebar = ({ sidebar, setSidebar, setSelectedComponent, selectedComponent }) => {

  const userData = useSelector((state) => state?.data?.userData)

  console.log("userDatadash????", userData)
  useEffect(() => {
    if (sidebar) {
      document.body.classList.add("sidebar-open");
    } else {
      document.body.classList.remove("sidebar-open");
    }

    return () => {
      document.body.classList.remove("sidebar-open");
    };
  }, [sidebar]);

  const handleSelection = (component) => {
    setSelectedComponent(component);
    setSidebar(false); // Close sidebar on selection
  };

  const handleSelectionData = (component) => {

    if (userData?.tier == "free") {
      toast.warn("Upgrade the Plan to access this feature!", {position:"top-center"})
    } else {


      setSelectedComponent(component);
      setSidebar(false); // Close sidebar on selection
    }
  };


  const isSelected = (component) => selectedComponent === component;

  return (
    <div
      className={`sm:max-w-[260px] scrollbar_hide h-full overflow-hidden bg-whiteSmoke z-20 pb-4 relative w-full px-4 pt-6 max-lg:absolute max-sm:w-full duration-300 top-0 ${sidebar ? "left-0" : "max-lg:left-[-105%]"
        }`}
    >
      <div className="bg-retroBlue absolute top-[50%] right-0 w-[169px] h-[305px] rounded-[305px] blur-[200px] -z-1"></div>
      <div className="w-full flex items-center justify-between">
        <div className="flex items-center gap-2">
          <LogoIcon />
          <h2 className="text-black font-Inter text-[25px] font-bold">NGO</h2>
        </div>
        <div className="lg:hidden">
          <button type="submit" onClick={() => setSidebar(!sidebar)}>
            <CrossIcon />
          </button>
        </div>
      </div>
      <div className="w-full h-full flex flex-col justify-between gap-12">
        <div className="flex flex-col h-[calc(100vh-200px)] overflow-auto scrollbar_hide gap-1 mt-2 lg:mt-[59px]">
          <button
            onClick={() => handleSelection("Home")}
            className={`py-[11px] px-3 rounded-[4px] max-w-[228px] w-full border border-[rgba(255,255,255,0.11)] ${isSelected("Home") ? "bg-retroBlue text-white" : "bg-transparent group hover:bg-retroBlue"
              } flex gap-3 items-center transition duration-300 ease-in-out`}
          >
            <HomeSidebarIcon className={isSelected("Home") ? "text-white" : ""} />
            <p className={`font-interTight font-normal text-[18px] leading-[140%] ${isSelected("Home") ? "text-white" : "group-hover:text-white text-coarseWool"}`}>
              Home
            </p>
          </button>
          <button
            onClick={() => handleSelectionData("AISearch")}
            className={`py-[11px] px-3 rounded-[4px] max-w-[228px] w-full border border-[rgba(255,255,255,0.11)] ${isSelected("AISearch") ? "bg-retroBlue text-white" : "bg-transparent group hover:bg-retroBlue"
              } flex justify-between gap-3 items-center transition duration-300 ease-in-out`}
          >
            <div className="flex items-center gap-3">
              <HomeSidebarIcon className={isSelected("AISearch") ? "text-white" : ""} />
              <p className={`font-interTight font-normal text-[18px] leading-[140%] ${isSelected("AISearch") ? "text-white" : "group-hover:text-white text-coarseWool"}`}>
                AI Search
              </p>
            </div>
            {userData?.tier === "free" && (
              <Image src="/assets/img/star.png" width={20} height={20} />
            )}
          </button>

          <button
            onClick={() => handleSelectionData("Proposals")}
            className={`py-[11px] px-3 rounded-[4px] max-w-[228px] w-full border border-[rgba(255,255,255,0.11)] ${isSelected("Proposals") ? "bg-retroBlue text-white" : "bg-transparent group hover:bg-retroBlue"
              } flex justify-between gap-3 items-center transition duration-300 ease-in-out`}
          >
            <div className="flex items-center gap-3">
              <ProposalsSidebarIcon className={isSelected("Proposals") ? "text-white" : ""} />
              <p className={`font-interTight font-normal text-[18px] leading-[140%] ${isSelected("Proposals") ? "text-white" : "group-hover:text-white text-coarseWool"}`}>
                Proposals
              </p>
            </div>
            {userData?.tier === "free" && (
              <Image src="/assets/img/star.png" width={20} height={20} />
            )}
          </button>

          <button
            onClick={() => handleSelection("Plans")}
            className={`py-[11px] px-3 rounded-[4px] max-w-[228px] w-full border border-[rgba(255,255,255,0.11)] ${isSelected("Plans") ? "bg-retroBlue text-white" : "bg-transparent group hover:bg-retroBlue"
              } flex gap-3 items-center transition duration-300 ease-in-out`}
          >
            <ProposalsSidebarIcon className={isSelected("Plans") ? "text-white" : ""} />
            <p className={`font-interTight font-normal text-[18px] leading-[140%] ${isSelected("Plans") ? "text-white" : "group-hover:text-white text-coarseWool"}`}>
              Plans
            </p>
          </button>

          <button
            onClick={() => handleSelection("Profile")}
            className={`py-[11px] px-3 rounded-[4px] max-w-[228px] w-full border border-[rgba(255,255,255,0.11)] ${isSelected("Profile") ? "bg-retroBlue text-white" : "bg-transparent group hover:bg-retroBlue"
              } flex gap-3 items-center transition duration-300 ease-in-out`}
          >
            <ProposalsSidebarIcon className={isSelected("Profile") ? "text-white" : ""} />
            <p className={`font-interTight font-normal text-[18px] leading-[140%] ${isSelected("Profile") ? "text-white" : "group-hover:text-white text-coarseWool"}`}>
              My Profile
            </p>
          </button>


          <button
            onClick={() => handleSelectionData("Help")}
            className={`py-[11px] px-3 rounded-[8px] max-w-[228px] w-full border border-[rgba(255,255,255,0.11)] ${isSelected("Help") ? "bg-retroBlue text-white" : "bg-transparent group hover:bg-retroBlue hover:rounded-[4px]"
              } flex justify-between gap-3 items-center transition duration-300 ease-in-out z-50`}
          >
            <div className="flex items-center gap-3">
              <HelpSidebarIcon className={isSelected("Help") ? "text-white" : ""} />
              <p className={`font-interTight font-normal text-[18px] leading-[140%] ${isSelected("Help") ? "text-white" : "group-hover:text-white text-coarseWool"}`}>
                Help
              </p>
            </div>
            {userData?.tier === "free" && (
              <Image src="/assets/img/star.png" width={20} height={20} />
            )}
          </button>

        </div>
      </div>
    </div>
  );
};

export default DashboardSidebar;
