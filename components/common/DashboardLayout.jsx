"use client";
import React, { useState } from "react";
import DashboardSidebar from "./DashboardSidebar";
import DashboardHeader from "./DashboardHeader";

const DashboardLayout = ({ children }) => {
  const [sidebar, setSidebar] = useState (false)
  return (
    <div className="h-screen flex ">
      <DashboardSidebar sidebar={sidebar} setSidebar={setSidebar} />

      <div className="flex w-full flex-col h-full overflow-auto">
        <DashboardHeader sidebar={sidebar} setSidebar={setSidebar} />
        {children}
      </div>
    </div>
  );
};

export default DashboardLayout;
