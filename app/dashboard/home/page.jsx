"use client"
import { getUser } from "@/app/store/actions/dataActions";
import DiscoverNGO from "@/components/NGO’sforfunds/DiscoverNGO";
import DashboardLayout from "@/components/common/DashboardLayout";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const DashboardHome = () => {


  const dispatch = useDispatch()
  const userData = useSelector((state) => state?.data?.userData)

  console.log("userData??", userData)
  useEffect(() => {
    dispatch(getUser())
  }, [])
  return (
    <div>
      <DashboardLayout>
        <DiscoverNGO />
      </DashboardLayout>
    </div>
  );
};
export default DashboardHome;
