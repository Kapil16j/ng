import React from "react";
import AnimateHeight from "react-animate-height";
import { FaqMinusIcon, FaqPlusIcon } from "../common/Icon";

const Faqs = ({ item, value, isOpen, toggleAccordion, height }) => {
  return (
    <div className="h-fit w-full">
      <div
        onClick={() => toggleAccordion(value)}
        className="cursor-pointer border-t border-t-[rgba(4,0,14,0.16)] pt-4"
      >
        <button
          type="submit"
          className={`flex w-full transition duration-700 ease-in-out justify-between items-center text-start gap-6 text-carbonColor font-interTight font-medium leading-normal text-[14px] sm:text-[18px] lg:text-[24px]`}
        >
          <span>{item.title}</span>
          <span
            className={`transform transition ease-in-out duration-700 ${
              isOpen ? "rotate-[180deg]" : "-rotate-[180deg]"
            }`}
          >
            {isOpen ? (
              <>
                <FaqMinusIcon />
              </>
            ) : (
              <>
                <FaqPlusIcon />
              </>
            )}
          </span>
        </button>
        <AnimateHeight duration={500} height={height}>
          <div className="overflow-hidden max-w-[1220px] w-full duration-300  pt-2 transition-all ease-in-out text-fiftiethShadeOfGrey font-interTight font-normal leading-[140%] sm:leading-[160%] text-[13px] sm:text-[16px]">
            <div className="overflow-hidden">{item.description}</div>
          </div>
        </AnimateHeight>
      </div>
    </div>
  );
};

export default Faqs;
