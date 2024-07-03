import React from "react";
import Image from "next/image";
import { carddata } from "../common/Helper";

const Searchcards = () => {
  return (
    <>
      {/* <div className="flex max-w-[1184px] w-full justify-between  gap-3 flex-wrap mt-[32px]"> */}
      <div className=" max-w-[1184px] w-full grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1  gap-4  md:gap-6 mt-[32px]">
        {carddata.map((item, index) => (
          <div
            key={index}
            className="max-w-[378px] w-full flex flex-col gap-4 mx-auto"
          >
            <span>{item.cubeicon}</span>
            <div className="flex flex-col sm:gap-4 gap-2">
              <h1 className="text-carbonColor font-interTight sm:text-2xl text-base font-medium leading-[normal] ">
                {item.heading}
              </h1>

              <p className="text-fiftiethShadeOfGrey font-interTight sm:text-lg text-[13px] leading-[140%] font-normal sm:leading-[160%]">
                {item.content}
              </p>
            </div>
          </div>
        ))}
        <div className="max-md:mt-2">
          <Image
            src="/assets/img/grant_database_img.png"
            className="max-xl:w-[420px] max-sm:h-[199px] max-lg:h-[280px] lg:hidden mx-auto"
            width={520}
            height={303}
            alt="ss--img"
          />
        </div>
      </div>
    </>
  );
};

export default Searchcards;
