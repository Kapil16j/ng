"use client";

import React, { useEffect, useState } from "react";
import { LogoIcon, SidebarIcon } from "./Icon";
import Link from "next/link";
import SideBar from "./SideBar";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/app/store/actions/dataActions";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const [sidebar, setSidebar] = useState(false);
  const dispatch = useDispatch()
  const router = useRouter()
  const toggleSidebar = () => {
    setSidebar(!sidebar);
  };

  const loginData = useSelector((state) => state?.data?.loginData)

  console.log("loginData", loginData)

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

  const handleDashboard = () =>{

    if(loginData?.user_type == "USER"){
      router.push("/dashboard/home")
    }
    else if(["ADMIN", "SUPERADMIN", "EDITOR"].includes(loginData?.user_type)){
      router.push("/admin/app")
    }else{
      router.push("/signin")
    }
  }

  const handleLogin = () =>{

 
    router.push('/signin')
  }

  const handleAdminLogin = () =>{

 
    router.push('/admin/app')
  }



  
  return (
    <>
      <nav>
        <div
          className={`w-full px-6 xl:px-[64px] sm:py-[16px] max-sm:flex flex-row-reverse justify-between ${sidebar ? "hidden" : ""
            }`}
        >
          <button
            className={`sm:hidden ${sidebar ? "py-0" : "py-5"}`}
            onClick={toggleSidebar}
          >
            <SidebarIcon />
          </button>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 ">
              <LogoIcon />
              <h2 className="text-black font-Inter text-[25px] font-bold">
                NGO
              </h2>
            </div>

            <div className="max-w-[406px] w-full flex justify-between items-center max-sm:hidden">
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
              {
                loginData ?
                  <button className="w-[100px] font-interTight text-base font-normal rounded-[4px] leading-[150%] h-[40px] bg-coarseWool border-[1px] border-black text-white hover:bg-transparent hover:text-black transition duration-300 ease-in-out"
                  onClick={()=>handleDashboard()}
                  >
                    Dashboard
                  </button>
                  :
                  <button className="w-[78px] font-interTight text-base font-normal rounded-[4px] leading-[150%] h-[40px] bg-coarseWool border-[1px] border-black text-white hover:bg-transparent hover:text-black transition duration-300 ease-in-out"
                  onClick={()=>handleLogin()} 
                  >
                    Login
                  </button>
              }
            </div>
          </div>
        </div>
      </nav>

      {/* Sidebar */}
      <SideBar sidebar={sidebar} setSidebar={setSidebar} />
    </>
  );
};

export default Navbar;
