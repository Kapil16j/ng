import React, { useEffect, useState } from "react";
import {
  LogoIcon,
  MenuIcon,
  NotificationBellIcon,
  ProfileHeaderIcon,
  SidebarOpenIcon,
} from "./Icon";
import { useDispatch, useSelector } from "react-redux";
import { getAllNotification, getUser, logout, markAllNotiRead } from "@/app/store/actions/dataActions";
import { useRouter } from "next/navigation";
import moment from "moment";

const DashboardHeader = ({ sidebar, setSidebar }) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isPopupNotification, setIsPopupNotification] = useState(false);
  const [notificationData, setNotificationData] = useState([]);
  const dispatch = useDispatch();
  const userData = useSelector((state) => state?.data?.userData);
  const router = useRouter();

  console.log("userData??", userData);


  const getNotifications= () =>{
    dispatch(getAllNotification()).then((item) => {
      console.log("item??????", item)
      setNotificationData(item?.data)
    })
  }

  useEffect(() => {
    dispatch(getUser());
   
    getNotifications()
  }, [dispatch]);


 

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
    setIsPopupNotification(false)
  };


  const togglePopupNotification = () => {
    setIsPopupNotification(!isPopupNotification);
    setIsPopupOpen(false)
  };

  const handleLogout = () => {
    // Redirect to login page
    dispatch(logout())
    // router.push('/');
  };


  const markAllRead = () =>{

    dispatch(markAllNotiRead()).then((item) => {

      console.log("itemRead???",item)
      getNotifications()
    })

  }

  return (
    <div className="bg-[#e5e6e9] w-full h-[90px] flex items-center justify-end py-2 md:py-[19px] pr-4 lg:pr-10 xl:pr-12 sticky top-0 z-10">
      <div className="flex gap-4 md:gap-6 lg:gap-8 items-center">
        <div className="relative cursor-pointer" onClick={togglePopupNotification}>
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

        {isPopupNotification && (
          <div className="absolute top-[calc(75%)] right-20 mt-1 w-[400px] bg-white shadow-lg rounded-lg p-4 z-20">
            <div className="max-w-lg mx-auto p-4">
              {/* Header */}
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Your notifications</h2>
                <button className="text-blue-500 font-medium hover:underline" onClick={()=>markAllRead()}>Mark all as read</button>
              </div>

              {/* Tabs */}

              {/* Notification Items */}
              <div>
                {notificationData?.map((notification) => (
                  <div key={notification.id} className="flex items-start space-x-3 py-3 border-b">
                    {/* Profile picture */}
                    <img
                      src={notification.image}
                      alt="profile"
                      className="w-10 h-10 rounded-full"
                    />
                    {/* Notification content */}
                    <div className={`flex-1 ${!notification.isRead ? 'text-gray-600 bg-gray-100'  :""} `}>

                      <p className="text-sm ">
                      {/* <span className="font-semibold">{notification.username}</span> */}
                         {notification.body}
                      </p>
                      <p className="text-xs text-gray-400 mt-1">{moment(notification.createdAt).format("MMM Do YY")}</p>
                    </div>
                    {/* Unread marker */}
                    {!notification.isRead && (
                      <span className="w-3 h-3 bg-blue-500 rounded-full mt-2"></span>
                    )}
                  </div>
                ))}
              </div>
            </div>

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
