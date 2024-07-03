import React from "react";
import { LineIcon } from "../common/Icon";
import VideoComponent from "./VideoComponent";

const AboutUs = () => {
  return (
    <>
      <div className="max-w-[1280px] items-start w-full mx-auto px-6 xl:px-0 xl:pt-[121px] lg:pt-[90px] md:pt-[50px] sm:pt-[40px] pt-[37px] flex max-lg:flex-col max-lg:items-center gap-6 sm:gap-10 lg:gap-[63px] ">
        <div className="max-w-[300px] sm:max-w-[770px] w-full">
          <div className="flex items-center gap-2 md:gap-6 lg:pt-14 xl::pt-[94px] ">
            <span>
              <LineIcon />
            </span>
            <h1 className="text-carbonColor font-interTight sm:text-base text-[10px]  font-bold tracking-[2px] leading-[normal] uppercase">
              GRANT DATABASE
            </h1>
          </div>
          <div className="flex flex-col gap-4 sm:gap-8 pt-6 sm:pt-8 ml-[55px] sm:ml-[96px]">
            <div className="flex flex-col gap-2 sm:gap-4 ">
              <h2 className="font-interTight font-bold text-[18px] sm:text-[27px] xl:text-[48px] leading-[120%] text-carbonColor">
                Empowering Change: Our Mission in Bridging Resources for Global
                Impact
              </h2>
              <p className="font-interTight font-normal text-[13px] sm:text-[18px] leading-[160%] text-fiftiethShadeOfGrey max-w-[608px] w-full">
                fundsforNGOs is a social enterprise offering knowledge and
                skills to NGOs, companies and individuals worldwide to improve
                their resource mobilization processes and enable a sustainable
                environment.
              </p>
            </div>
            <button
              type="submit"
              className="w-[102px] sm:w-[144px] h-[32px] sm:h-[51px] bg-retroBlue rounded-[4px] flex items-center justify-center font-interTight text-white font-medium text-[12px] sm:text-[16px] border border-retroBlue hover:bg-transparent hover:text-retroBlue transition duration-300 ease-in-out"
            >
              Learn more
            </button>
          </div>
        </div>
        <div>
          <VideoComponent />
        </div>
      </div>
    </>
  );
};

export default AboutUs;
