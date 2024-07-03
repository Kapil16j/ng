import Image from "next/image";
import { DownloadPDFIcon, PdfIcons, ViewPDFIcon } from "../common/Icon";

const AiChatGenerateProposal = () => {
  return (
    <div className="w-full sm:pl-[22px] mt-8 mb-8">
      {/* Generate proposal and add more btn */}
      <div className="w-full gap-4 flex items-center max-sm:flex-col ">
        <button
          type="submit"
          className=" text-[14px] max-sm:w-full font-interTight leading-[130%] hover:bg-white hover:text-[#316FF4] text-[#FAFAFA] hover:duration-300 bg-[#316FF4] rounded py-3 px-4 "
        >
          Generate proposal now
        </button>
        <button
          type="submit"
          className=" bg-white text-[#316FF4] max-sm:w-full py-3 px-4 text-center font-interTight hover:bg-[#316FF4] hover:duration-300 hover:text-white rounded text-[14px] leading-[130%] "
        >
          No add more data
        </button>
      </div>

      {/* Processing */}
      <div className="max-w-[263px] w-full mt-[50px]">
        <p className=" text-[#09090B] text-[12px] font-interTight text-center mb-[18px]">
          Processing...
        </p>
        <div>
          <Image
            src="/assets/img/process-img.png"
            width={263}
            height={28}
            alt="process-img.png"
          />
        </div>
      </div>

      {/* Pdf download */}
      <div className="w-full flex flex-col items-start justify-center gap-8 mb-8 mt-8">
        {/* Pdf show and download */}
        <div className="max-w-[992px] w-full bg-white py-2 rounded pl-3 pr-6 flex items-center justify-between gap-4">
          <div className="flex items-center justify-center gap-3">
            <PdfIcons />
            <span className="text-[#333] text-base leading-[120%] font-interTight">
              Grants offers for the mid year.pdf
            </span>
          </div>
          <div className="flex items-center justify-center gap-4">
            <div className="cursor-pointer">
              <ViewPDFIcon />
            </div>
            <div className="cursor-pointer">
              <DownloadPDFIcon />
            </div>
          </div>
        </div>

        {/* Multiple edit btns */}
        <div className="w-full flex max-sm:flex-col max-sm:items-center max-sm:justify-center gap-3">
          <button className="aiChatEditBtn">Edit from where you left</button>
          <button className="aiChatEditBtn">Edit from start</button>
          <button className="aiChatEditBtn">No edit required</button>
        </div>
      </div>
    </div>
  );
};

export default AiChatGenerateProposal;
