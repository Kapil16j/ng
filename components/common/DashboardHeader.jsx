import React, { useEffect, useState } from "react";
import {
  LogoIcon,
  MenuIcon,
  NotificationBellIcon,
  ProfileHeaderIcon,
  SidebarOpenIcon,
} from "./Icon";
import { useDispatch, useSelector } from "react-redux";
import { getUser, logout } from "@/app/store/actions/dataActions";
import { useRouter } from "next/navigation";


const DashboardHeader = ({ sidebar, setSidebar }) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const dispatch = useDispatch();
  const userData = useSelector((state) => state?.data?.userData);
  const router = useRouter();

  console.log("userData??", userData);

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  const handleLogout = () => {
    // Clear user data, authentication tokens, etc.
    // For example:
    // dispatch(clearUserData());
    // localStorage.removeItem('authToken');

    // Redirect to login page
    dispatch(logout())
    // router.push('/');
  };

  return (
    <div className="bg-[#e5e6e9] w-full h-[90px] flex items-center justify-end py-2 md:py-[19px] pr-4 lg:pr-10 xl:pr-12 sticky top-0 z-10">
      <div className="flex gap-4 md:gap-6 lg:gap-8 items-center">
        <div className="relative cursor-pointer">
          <NotificationBellIcon />
          <div className="w-[11px] h-[11px] absolute bg-[#EB5757] rounded-full top-[1px] right-0"></div>
        </div>
        <div className="relative flex gap-2 py-2 pl-4 pr-2 items-center rounded-[100px] border border-[#E5E7EB] bg-white cursor-pointer" onClick={togglePopup}>
          <MenuIcon />
          <div className="w-[32px] h-[32px] rounded-full bg-[#F3F4F6] flex justify-center items-center">
            <ProfileHeaderIcon />
          </div>
        </div>
        {isPopupOpen && (
          <div className="absolute top-[calc(75%)] right-20 mt-1 w-[230px] bg-white shadow-lg rounded-lg p-4 z-20">
            <div className="text-sm text-gray-700 mb-4">
              <p> {userData?.name}</p>
              <p> {userData?.email}</p>
            </div>
            <button
              onClick={handleLogout}
              className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600"
            >
              Logout
            </button>
          </div>
        )}
        <div className="lg:hidden" onClick={() => setSidebar(!sidebar)}>
          <SidebarOpenIcon />
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
