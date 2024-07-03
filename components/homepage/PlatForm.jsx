import Image from "next/image";
import React from "react";
import ViewBtnModel from "../model/ViewBtnModel";
const PlatForm = () => {
  return (
    <div className="bg-[url(/assets/img/platform-hero-bg.png)] bg-no-repeat sm:h-[58vw] flex items-center bg-center bg-cover relative overflow-hidden ">
      <div className="max-w-[1440px] w-full mx-auto px-6 xl:px-0 py-[65px]">
        <div>
          <Image
            src="/assets/img/UpperHand-img.png"
            alt="hand image"
            width={576}
            height={247}
            className="w-[40vw]  absolute top-3 sm:top-7 -left-[25px] sm:left-0 opacity-[0.3] "
          />
          <Image
            src="/assets/img/lowerHand-img.png"
            alt="hand image"
            width={659}
            height={327}
            className="w-[45vw] absolute bottom-[25px] sm:-bottom-6 -right-[35px]  sm:right-0 opacity-[0.3] "
          />
        </div>
        <h1 className="max-w-[347px] md:max-w-[600px] lg:max-w-[956px] w-full mx-auto text-white font-interTight font-bold text-center text-[24px] md:text-[44px] lg:text-[64px] leading-[112%] capitalize">
          A Platform That Offers Everything You Need To Find New Donors And
          Grants
        </h1>
        <p className="max-md:max-w-[275px] w-full mx-auto pt-[10px] md:pt-3 text-center text-white font-interTight font-medium text-[13px] md:text-[20px] leading-[140%] capitalize">
          Your Ultimate Resource Hub for Grants, Donors, and Sustainable Growth
          Tools
        </p>
        <div className="flex gap-2 md:gap-4 mt-[23px] md:mt-8 justify-center">
     <button
            type="submit"
            className="w-[83px] md:w-[160px] h-[26px] md:h-[56px] rounded-[4px] bg-retroBlue border border-retroBlue  text-white text-center font-interTight font-medium text-[10px] md:text-[16px] leading-[150%] capitalize hover:bg-transparent hover:border-white transition duration-300 ease-in-out"
          >
            Join Premium
          </button>
          <button
            type="submit"
            className="w-[94px] md:w-[177px] h-[26px] md:h-[56px] rounded-[4px] bg-transparent border border-white  text-white text-center font-interTight font-medium text-[10px] md:text-[16px] leading-[150%] capitalize hover:bg-retroBlue hover:border-retroBlue transition duration-300 ease-in-out z-20"
          >
            {" "}
            know about us
          </button>
        </div>

      </div>
    </div>
  );
};

export default PlatForm;
