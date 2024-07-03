import React from "react";
import {
  LogoIcon,
  MenuIcon,
  NotificationBellIcon,
  ProfileHeaderIcon,
  SidebarOpenIcon,
} from "./Icon";

const DashboardHeader = ({ sidebar, setSidebar }) => {
  return (
    <div className="bg-whiteSmoke w-full h-[90px] flex items-center justify-end py-2 md:py-[19px] pr-4 lg:pr-10 xl:pr-12 sticky top-0 z-10">
      <div className="flex gap-4 md:gap-6 lg:gap-8 items-center">
        <div className=" relative cursor-pointer">
          <NotificationBellIcon />
          <div className="w-[11px] h-[11px] absolute bg-[#EB5757] rounded-full top-[1px] right-0"></div>
        </div>
        <div className=" flex gap-2 py-2 pl-4 pr-2 items-center rounded-[100px] border border-[#E5E7EB] bg-white cursor-pointer">
          <MenuIcon />
          <div className="w-[32px] h-[32px] rounded-full bg-[#F3F4F6] flex justify-center items-center">
            <ProfileHeaderIcon />
          </div>
        </div>
        <div className="lg:hidden" onClick={() => setSidebar(!sidebar)}>
          <SidebarOpenIcon />
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
