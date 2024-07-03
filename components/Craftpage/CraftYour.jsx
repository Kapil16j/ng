import Image from "next/image";
import React from "react";
import Craftyourdropdown from "./Craftyourdropdown";
import { CraftYourcard } from "../common/Helper";
import ViewBtnModel from "../model/ViewBtnModel";
const CraftYour = () => {
  return (
    <>
      <div className="w-full px-4 xl:pl-8  xl:pr-12 md:pt-8 pt-6  pb-6 ">
        <div>
          <p className="text-[#333333] font-interTight font-medium md:text-[28px] sm:text-[20px] text-[16px] mb-1 ">
            Craft Your Proposal
          </p>
          <p className="text-[#828282] font-interTight sm:text-[18px] text-[12px] leading-[140%] mb-[33px] ">
            Start creating impactful proposals with our AI-powered templates
            tailored for your projects.
          </p>
        </div>
        <div className="border border-[#F2F2F2] bg-white rounded-lg w-full mx-auto py-4 px-2 md:px-4 lg:px-6 ">
          <div className="flex  justify-between gap-[10px] max-sm:flex-col ">
            <div className="sm:max-w-[240px] w-full flex items-center gap-2 py-2  px-2 lg:px-6  border border-[#F2F2F2] rounded-[4px] ">
              <Image
                src="/assets/img/search-normal.png"
                width={20}
                height={20}
                alt="search-normal.png"
              />
              <input
                type="text"
                placeholder="Search"
                className="text-[#4F4F4F] w-full outline-none text-[14px] leading-[130%] "
              />
            </div>
            <div>
              <Craftyourdropdown />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 2xl:grid-cols-4 gap-7 mt-[27px]">
          {CraftYourcard.map((item, index) => (
            <div
              key={index}
              className="max-w-[348px] w-full mx-auto border-[1px] border-[#E0E0E0] bg-white rounded-[4px] p-[12px_12px_0px_12px] "
            >
              <div className="group relative ">
                <Image
                  src={item.img1}
                  width={324}
                  height={240}
                  alt="CraftYour-img4.png"
                />
                <div className="flex-col flex gap-[10px]   custom-bg group-hover:duration-300 absolute w-full top-0 h-full justify-center ">
                  <button className="bg-[#F2F2F2] rounded-[4px] py-2 px-[35px] max-w-[100px] w-full border border-white hover:bg-transparent hover:duration-300 text-[#333] font-interTight text-[14px] font-semibold hover:text-white mx-auto hidden group-hover:block">
                    Use
                  </button>
                  <div>
                    <div className="max-w-[100px] w-full mx-auto">
                      <ViewBtnModel>
                        <button className="hover:bg-[#F2F2F2] rounded-[4px] py-2 px-[35px]  border border-white bg-transparent duration-300 hover:text-[#333] font-interTight text-[14px] font-semibold text-white mx-auto  hidden group-hover:block">
                          View
                        </button>
                      </ViewBtnModel>
                    </div>
                  </div>
                </div>
              </div>
              <p className="font-interTight leading-[130%] text-[#333333] text-[14px] md:text-[16px] pt-3 pb-6 md:pb-8 lg:pb-10 xl:pb-[55px] ">
                {item.text1}
              </p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default CraftYour;
