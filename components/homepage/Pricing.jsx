import React from "react";
import Freecard from "./Freecard";
import Premiumcaed from "./Premiumcaed";

const Pricing = () => {
  return (
    <>
      <div className="max-w-[1290px] px-6 2xl:px-0 w-full flex flex-col flex-start mx-auto pt-8 md:pt-12 lg:pt-16 xl:pt-[95px]">
        <h2 className=" text-carbonColor md:text-[48px] sm:text-[34px] text-[18px] font-bold font-interTight leading-normal md:leading-[57.60px]">
          Pricing
        </h2>
        <div className="flex max-md:flex-col max-md:items-center gap-5 md:gap-2 justify-between md:mt-10 sm:mt-8 mt-6">
          <Freecard />
          <Premiumcaed />
        </div>
      </div>
    </>
  );
};

export default Pricing;
