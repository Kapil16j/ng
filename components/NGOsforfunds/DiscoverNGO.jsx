import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { DiscoverNGOcard } from "../common/Helper";
import { RightarrowIcons } from "../common/Icon";
import { getAllSampleProposals, getProposalQuestions, resetStore } from "@/app/store/actions/dataActions";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import Loader from "../common/Loader";

const DiscoverNGO = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch()
  const router = useRouter()

  const proposalData = useSelector((state) => state?.data?.proposalData)

  console.log("proposalData?", proposalData)

  useEffect(() => {

    dispatch(getAllSampleProposals())
    // dispatch(resetStore())

  }, [])

  const handleClick = (id) =>{

    const data = {
      "sample_proposal_id":id
    }

    setLoading(true);
    dispatch(getProposalQuestions(data)).then(()=>{
      setLoading(false);
      router.push('/ai-chat')
    })
    
  }
  return (
    <div className="bg-[#FAFAFA] h-screen">
        {loading && <Loader />}
      <div className=" max-w-[1180px] w-full px-4 xl:px-8">
        <div className=" flex max-sm:flex-col gap-[10px] justify-between mt-[32px] items-center ">
          <div>
            <p className=" text-[#333] max-sm:text-center font-interTight mb-[4px] lg:text-[28px] text-[23px] font-medium ">
              Discover NGO’sforfunds
            </p>
            <p className=" text-[#828282] max-sm:text-center font-interTight lg:text-[18px] text-[15px] max-sm:w-full white leading-[140%] ">
              Check out our new feature AI Search and get inspiration to help
              create proposals.
            </p>
          </div>
          <div className=" group ">
            <button
              type="submit"
              className=" flex gap-[12px] bg-[#1D2130] text-white lg:text-[16px] text-[14px] 
              font-interTight font-medium text-right sm:py-[18px] py-[12px] lg:px-[60px] sm:px-[40px] px-[20px] rounded-[5px] whitespace-nowrap border-[1px] border-black group-hover:bg-transparent group-hover:duration-300 group-hover:text-black "
            >
              Create Proposal
              <RightarrowIcons />
            </button>
          </div>
        </div>
        <div className=" max-w-[1100px] bg-white rounded-[16px] w-full pt-[32px] sm:mt-[34px] px-3 lg:pl-[32px] lg:pr-[36px] pb-6 md:pb-10 lg:pb-[50px]">
          <div className=" max-sm:flex-col flex justify-between items-center gap-[10px] ">
            <div>
              <p className=" text-[#333333] font-interTight font-medium md:text-[24px] sm:text-[20px] text-[15px] ">
                Get started with proposal templates
              </p>
            </div>
            <div>
              <Link
                className=" text-[#316FF4] text-[18px] font-interTight "
                href="/"
              >
                Explore all templates
              </Link>
            </div>
          </div>
          <div className=" grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-[24px] mt-[24px]">
            {proposalData?.result?.map((item, index) => (
              <div
                key={index}
                className=" max-w-[240px] w-full mx-auto border-[1px] border-[#E0E0E0] bg-white rounded-[4px] "
              >
                <div className=" group relative ">
                  <Image
                    src={item.image}
                    width={324}
                    height={240}
                    alt="CraftYour-img4.png"

                  />
                  <div className=" flex-col flex gap-[10px] custom-bg group-hover:duration-300 absolute w-full top-0 h-full justify-center ">
                    <button
                    onClick={()=>handleClick(item.id)}
                      className=" bg-[#F2F2F2] rounded-[4px] py-[8px] px-[35px] max-w-[100px]
                     w-full border-[1px] border-white hover:bg-transparent duration-300 text-[#333] font-interTight text-[14px] font-semibold hover:text-white mx-auto hidden group-hover:block"
                    >
                      Use
                    </button>
                  </div>
                </div>
                <div className="pb-4 lg:pb-6 px-2 sm:px-3 lg:px-[17px] text-center">
                  <p className="font-interTight leading-[130%] text-[#333333] text-[12px] sm:text-[14px] md:text-[16px] pt-2 md:pt-[12px] line-clamp-2">
                    {item.name}
                  </p>
                </div>

              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiscoverNGO;
