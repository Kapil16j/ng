"use client";
import { useState } from "react";
import Faqs from "./Faqs";
import { faqlist } from "../common/Helper";

const FaqServices = () => {
  const [height, setHeight] = useState(0);
  const [openAccordion, setOpenAccordion] = useState(null);

  const toggleAccordion = (index) => {
    setOpenAccordion(openAccordion === index ? null : index);
  };

  return (
    <div className="px-6 2xl:px-0 ">
      <div className="max-w-[1280px] mt-12 md:mt-20 xl:mt-[106px] mx-auto">
        <h2 className="text-carbonColor text-[18px] sm:text-[24px] md:text-[32px] lg:text-[40px] xl:text-[48px] font-interTight font-bold leading-[120%] mb-8">
          Frequently Asked Questions
        </h2>
        <div className="w-full flex flex-col gap-[9px] md:gap-4 lg:gap-6 xl:gap-8">
          {faqlist.map((item, index) => (
            <Faqs
              value={index}
              item={item}
              key={index}
              height={openAccordion === index ? "auto" : 0}
              toggleAccordion={toggleAccordion}
              isOpen={openAccordion === index}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FaqServices;
