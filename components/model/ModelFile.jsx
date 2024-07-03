import React from "react";
import { CrossIcon, PdfIcon } from "../common/Icon";
import Image from "next/image";

const ModelFile = ({ close }) => {
  return (
    <div className="px-4 md:px-0 py-4">
      <div className="bg-white shadow-[0px_8px_16px_0px_rgba(0,0,0,0.16)] px-4 sm:px-6 max-w-[691px] w-full mx-auto overflow-x-hidden overflow-y-scroll h-[90vh] relative z-30">
        <div className="flex flex-col gap-2 w-full pb-[84px]">
          <div className="flex gap-2 items-center justify-between sticky top-0 bg-white pt-[23px] pb-3">
            <div className="flex gap-[11px] items-center">
              <PdfIcon />
              <p className="font-interTight font-medium leading-[130%] text-[12px] sm:text-[16px] text-carbonColor whitespace-nowrap">
                Upcoming Grant Opportunities for Africa in 2024
              </p>
            </div>
            <button onClick={close}>
              <CrossIcon />
            </button>
          </div>
          <Image
            src="/assets/img/pdf-img.png"
            alt="pdf image"
            width={643}
            height={1073}
          />
        </div>
      </div>
    </div>
  );
};

export default ModelFile;
