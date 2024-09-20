
"use client";
import React, { useState } from "react";
import DashboardSidebar from "./DashboardSidebar";
import DashboardHeader from "./DashboardHeader";
import DiscoverNGO from "../NGOsforfunds/DiscoverNGO";
import Aisearch from "../ai-search/Aisearch";
import Proposal from "../proposals/proposal";
import ProfilePage from "../profile/profile";
import Plans from "../plans/Plans";


const DashboardLayout = ({ children }) => {
  const [sidebar, setSidebar] = useState(false);
  const [selectedComponent, setSelectedComponent] = useState("Home");

  const renderComponent = () => {
    switch (selectedComponent) {
      case "Home":
        return <DiscoverNGO setSelectedComponent={setSelectedComponent}/>;
      case "AISearch":
        return <Aisearch />;
      case "Proposals":
        return <Proposal setSelectedComponent={setSelectedComponent}/>;;
      case "Plans":
        return <Plans setSelectedComponent={setSelectedComponent}/>;
        case "Profile":
        return <ProfilePage/>;
      case "Help":
        return null;
      default:
        return <DiscoverNGO />;
    }
  };

  return (
    <div className="h-screen flex">
      <DashboardSidebar
        sidebar={sidebar}
        setSidebar={setSidebar}
        setSelectedComponent={setSelectedComponent}
        selectedComponent={selectedComponent}
      />
      <div className="flex w-full flex-col h-full overflow-auto">
        <DashboardHeader sidebar={sidebar} setSidebar={setSidebar} />
        {renderComponent()}
      </div>
    </div>
  );
};

export default DashboardLayout;

