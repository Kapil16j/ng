import React from "react";
import { CheckIcon, GemIcon } from "../common/Icon";
import { Freecards, Premiumcards } from "../common/Helper";
import Pricingbutton from "./Pricingbutton";

const Premiumcaed = () => {
  return (
    <>
      <div className="max-w-[614.80px] w-full bg-[url(/assets/img/premium-bg.png)] bg-no-repeat lg:p-10 md:p-6 p-4 bg-white rounded-lg border border-[#E7EBFF] flex-col justify-start items-start  inline-flex">
        <div className="inline-flex flex-col gap-4 md:gap-5">
          <GemIcon />
          <div className="inline-flex flex-col gap-2 sm:gap-4 md:gap-6">
            <div className=" flex sm:gap-6 gap-4 items-center">
              <h2 className="text-retroBlue  md:text-[32px] sm:text-[24px] text-[16px] font-bold font-interTight">
                Premium
              </h2>
              <p className="px-2 py-[5px] bg-white/opacity-10 rounded-[8px] border text-retroBlue border-retroBlue justify-center items-center  inline-flex lg:text-[18px] sm:text-[14px] text-[10px] font-light">
                Best offer
              </p>
            </div>
            <div className="flex md:gap-6 sm:gap-4 gap-2 items-center sm:items-end">
              <h1 className="text-carbonColor lg:text-[48px] sm:text-[36px] text-[24px] font-bold font-interTight md:leading-[57.60px] leading-normal">
                $56
              </h1>
              <p className="text-neutral-600 sm:text-[24px] text-[12px] font-light font-interTight leading: normal;">
                per month
              </p>
            </div>
          </div>
        </div>
        <div className=" w-full h-[1px] md:my-[28px] sm:my-[22px] my-[16px] border border-violet-100"></div>
        <div className="flex flex-col gap-2 sm:gap-3">
          {Premiumcards.map((items, index) => (
            <div
              className="  max-w-[534px] flex sm:gap-4 gap-3 mx-auto w-full"
              key={index}
            >
              <CheckIcon />
              <div className="max-w-[490px] in w-full">
                <p className=" text-carbonColor lg:text-[24px] sm:text-[18px] text-[14px] font-normal font-interTight leading-normal">
                  {items.heading}{" "}
                </p>
                <p className=" text-trolleyGrey lg:text-xl sm:text-[16px] text-[12px] font-normal sm:mt-2 mt-1 font-interTight  md:leading-[130%] sm1:leading-[70%] leading-normal">
                  {items.subheading}{" "}
                </p>
              </div>
            </div>
          ))}
        </div>
        <Pricingbutton pricingbtn="Sign Up" />
      </div>
    </>
  );
};

export default Premiumcaed;
