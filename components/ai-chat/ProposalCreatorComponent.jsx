import Image from "next/image";
import { proposalCreatorData } from "../common/Helper";
import { ExploreMoreRightArrowIcon } from "../common/Icon";

const ProposalCreatorComponent = () => {
  return (
    <>
      <div className="max-w-[814px] w-full mx-auto flex flex-col items-center justify-center sm:grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-x-4 md:gap-y-6">
        {proposalCreatorData.map((item, index) => (
          <div
            key={index}
            className="max-w-[260px] w-full border-[1px] border-[#E0E0E0] bg-white rounded p-[12px_12px_24px] md:p-[12px_12px_34px]"
          >
            <div className="group relative z-50">
              <Image
                src={item.img1}
                width={324}
                height={240}
                alt="CraftYour-img4.png"
              />
              <div className="card-hover-bg hidden group-hover:block flex-col absolute w-full top-0 h-full justify-center">
                <div className="w-full h-full flex flex-col items-center justify-center gap-[10px]">
                  <button className=" bg-[#F2F2F2] rounded py-[8px] px-[35px] max-w-[100px] w-full border-[1px] border-white hover:bg-transparent hover:duration-300 text-[#333] font-interTight text-[14px] font-semibold hover:text-white">
                    Use
                  </button>
                  <button className=" hover:bg-[#F2F2F2] rounded py-[8px] px-[35px] max-w-[100px] w-full border-[1px] border-white bg-transparent hover:duration-300 hover:text-[#333] font-interTight text-[14px] font-semibold text-white">
                    View
                  </button>
                </div>
              </div>
            </div>
            <p className="font-interTight leading-[130%] text-[#333333] text-base pt-3 line-clamp-2">
              {item.text1}
            </p>
          </div>
        ))}
      </div>

      {/* Explore more btn */}
      <button
        className="my-[60px] group flex items-center justify-center gap-2 mx-auto text-[#333] text-xl font-medium leading-[160%] font-interTight hover:text-[#316FF4]
      duration-300"
      >
        <span>Explore more</span>
        <ExploreMoreRightArrowIcon />
      </button>
    </>
  );
};

export default ProposalCreatorComponent;
