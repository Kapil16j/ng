import React from "react";
import { RightIcon } from "../common/Icon";
import { premiumFeatureData } from "../common/Helper";

const PremiumFeatures = () => {
  return (
    <>
      {premiumFeatureData.map((item, index) => (
        <div key={index}>
          <div className="flex gap-2 md:gap-4 items-center">
            <div className="w-[24px] md:w-[34px] xl:w-[40px] h-[24px] md:h-[34px] xl:h-[40px] bg-retroBlue  md:p-[10px] rounded-full flex items-center justify-center">
              <RightIcon />
            </div>
            <p className=" font-interTight font-medium text-[14px] md:text-[18px] lg:text-[20px] xl:text-[24px] text-carbonColor">
              {item.name}
            </p>
          </div>
        </div>
      ))}
    </>
  );
};

export default PremiumFeatures;
