import React from "react";

import Searchandfilter from "./Searchandfilter";
import Searchcards from "./Searchcards";
import { LineIcon } from "../common/Icon";

const GrantDatabase = () => {
  return (
    <>
      <div className="max-w-[1280px] items-start w-full mx-auto px-6 2xl:px-0 xl:pt-[128px] lg:pt-[90px] md:pt-[50px] sm:pt-[40px] pt-[32px]">
        <div className="flex flex-col sm:gap-[32px] gap-6">
          <div className="flex items-center gap-2 md:gap-6">
            <span>
              <LineIcon />
            </span>
            <h1 className="text-carbonColor font-interTight sm:text-base text-[10px]  font-bold tracking-[2px] leading-[normal] uppercase">
              GRANT DATABASE
            </h1>
          </div>
          <div className="  flex justify-end">
            <Searchandfilter />
          </div>
        </div>

        <div className=" flex justify-end ">
          <Searchcards />
        </div>
      </div>
    </>
  );
};

export default GrantDatabase;
