import React from "react";
import OverViewChart from "./OverViewChart";

const Overview = () => {
  return (
    <>
      <div className="xl:max-w-[702px] w-full rounded-[8px] bg-white border border-[#E4E4E7] shadow-[0px_1px_2px_-1px_rgba(0,0,0,0.10),0px_1px_3px_0px_rgba(0,0,0,0.10)] sm:p-4 md:p-6">
        <p className=" font-inter font-semibold text-[16px] leading-[100%] tracking-[-0.4px] text-ruinedSmores max-sm:p-3">
          Overview
        </p>
        <div className="flex items-center justify-center w-full pt-6">
          <OverViewChart />
        </div>
      </div>
    </>
  );
};

export default Overview;
