import React from "react";
import { BullseyearrowIcon, CheckIcon } from "../common/Icon";
import { Freecards } from "../common/Helper";
import Pricingbutton from "./Pricingbutton";

const Freecard = () => {
  return (
    <div className="max-w-[614.80px] h-fit w-full  md:p-10 sm:p-6 p-4 bg-white rounded-lg border border-[#E7EBFF] justify-start items-start flex-col  inline-flex">
      <div className="inline-flex gap-4 md:gap-5 flex-col">
        <BullseyearrowIcon />
        <div className="inline-flex gap-2 sm:gap-4 md:gap-6 flex-col">
          <h2 className="text-carbonColor  lg:text-[32px] sm:text-[24px] text-[16px] font-bold font-interTight">
            Free
          </h2>
          <div className="flex md:gap-6 sm:gap-4 gap-2 items-center sm:items-end">
            <h1 className="text-carbonColor lg:text-[48px] sm:text-[36px] text-[24px] font-bold font-interTight md:leading-[120%] leading-normal">
              $34
            </h1>
            <p className="text-fiftiethShadeOfGrey  sm:text-[24px] text-[12px]  font-light font-interTight leading-normal">
              per month
            </p>
          </div>
        </div>
      </div>
      <div className=" w-full h-[1px] md:my-[28px] sm:my-[22px] my-[16px] border border-violet-100"></div>
      <div className="flex flex-col gap-2 sm:gap-3">
        {Freecards.map((items, index) => (
          <div
            className="  max-w-[534px] flex sm:gap-4 gap-3 mx-auto w-full"
            key={index}
          >
            <CheckIcon />
            <div className="max-w-[490px] w-full ">
              <p className=" text-carbonColor lg:text-2xl sm:text-[18px] text-[14px] font-normal font-interTight leading-normal">
                {items.heading}{" "}
              </p>
              <p className=" text-trolleyGrey  lg:text-xl sm:text-[16px] text-[12px] font-normal sm:mt-2 mt-1 font-interTight md:leading-[130%] sm1:leading-[70%] leading-normal">
                {items.subheading}{" "}
              </p>
            </div>
          </div>
        ))}
      </div>
      <Pricingbutton pricingbtn="Visit" />
    </div>
  );
};

export default Freecard;
