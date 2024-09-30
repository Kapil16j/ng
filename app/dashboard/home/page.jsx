"use client"
import { getUser } from "@/app/store/actions/dataActions";
import DiscoverNGO from "@/components/NGOsforfunds/DiscoverNGO";
import DashboardLayout from "@/components/common/DashboardLayout";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import SuccessPage from "@/components/plans/SuccessPage";

const DashboardHome = () => {

  const searchParams = useSearchParams();
  const paymentStatus = searchParams.get("redirect_status");
  const dispatch = useDispatch()

  // useEffect(() => {
  //   const fetchUserData = async () => {
  //     try {
  //       const response = await axios.get(`http://127.0.0.1:8000/auth/me`, {
  //         headers: {
  //           Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJLYXBpbGpAeW9wbWFpbC5jb20iLCJleHAiOjE3MTk5OTM5OTR9.LIh2SP18BDXOgYisa3kAHZNebCAYa90_iRXJenHPM4g`,
  //         },
  //       });
  //      console.log("response??",response)
  //     } catch (error) {
  //       console.error("Error fetching user data:", error);
  //     }
  //   };

  //   fetchUserData();
  // }, []);
  return (
    <div>
      {paymentStatus==="succeeded" ? <SuccessPage />:
      <DashboardLayout >
        <DiscoverNGO />
      </DashboardLayout>}
    </div>
  );
};
export default DashboardHome;
