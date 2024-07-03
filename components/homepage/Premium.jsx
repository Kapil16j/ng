import Image from "next/image";
import React from "react";
import PremiumFeatures from "./PremiumFeatures";
import { LineIcon } from "../common/Icon";

const Premium = () => {
  return (
    <>
      <div className="max-w-[1280px] w-full mx-auto px-6 2xl:px-0 mt-8 md:mt-20 lg:mt-[141px] flex max-lg:flex-col-reverse max-lg:items-center gap-5 justify-between">
        <div className="flex flex-col gap-[15px] sm:gap-8 max-w-[596px] w-full">
          <div className="flex gap-[13px] sm:gap-6">
            <Image
              src="/assets/img/premium-img1.png"
              alt="premium section image"
              width={320}
              height={300}
              className="max-sm:w-[183px] max-h-[169px] sm:max-h-[300px]"
            />
            <Image
              src="/assets/img/premium-img2.png"
              alt="premium section image"
              width={252}
              height={300}
              className="max-sm:w-[144px] max-h-[169px] sm:max-h-[300px] mt-[71px]"
            />
          </div>
          <div className="flex gap-[13px] sm:gap-6">
            <Image
              src="/assets/img/premium-img3.png"
              alt="premium section image"
              width={260}
              height={300}
              className="max-sm:w-[149px] max-h-[169px] sm:max-h-[300px] -mt-[62px]"
            />
            <Image
              src="/assets/img/premium-img4.png"
              alt="premium section image"
              width={312}
              height={300}
              className="max-sm:w-[179px] max-h-[169px] sm:max-h-[300px]"
            />
          </div>
        </div>
        <div className="flex flex-col gap-4 md:gap-5 xl:gap-8 md:pt-5 xl:pt-[60px] lg:max-w-[507px] xl:max-w-[607px] w-full">
          <div className="flex gap-2 sm:gap-6 items-center">
            <LineIcon />
            <p className=" font-interTight font-bold tracking-[2px] uppercase text-[10px] sm:text-[16px] text-carbonColor leading-3 sm:leading-[19px]">
              premium
            </p>
          </div>
          <div className="flex flex-col gap-2 md:gap-4">
            <h2 className=" font-productSans font-bold text-[18px] sm:text-[28px] lg:text-[38px] xl:text-[48px] text-carbonColor leading-[125%] max-md:pt-2">
              <span className="text-retroBlue">Premium</span> Membership
              Features
            </h2>
            <p className=" font-interTight font-normal leading-[145%] text-[13px] sm:text-[16px] lg:text-[18px] text-fiftiethShadeOfGrey">
              Unlock the full potential of your mission with our Premium
              Membership, designed to provide unparalleled support and resources
              for NGOs, companies, and individuals committed to sustainable
              development and poverty alleviation. Our premium features include:
            </p>
          </div>
          <div className="flex flex-col gap-2 xl:gap-4">
            <PremiumFeatures />
          </div>
        </div>
      </div>
    </>
  );
};

export default Premium;
