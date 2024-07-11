import Image from "next/image";
import { proposalCreatorData } from "../common/Helper";
import { ExploreMoreRightArrowIcon } from "../common/Icon";
import { useDispatch, useSelector } from "react-redux";

import { getAllChats, getAllSampleProposals, getProposalQuestions } from "@/app/store/actions/dataActions";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const ProposalCreatorComponent = ({ setActive, setCreateProposal }) => {


  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch()
  const router = useRouter()

  const proposalData = useSelector((state) => state?.data?.proposalData)

  console.log("proposalDatachat?", proposalData)

  useEffect(() => {

    dispatch(getAllSampleProposals())
    // dispatch(resetStore())

  }, [])

  const handleClick = (id) => {

    const data = {
      "sample_proposal_id": id
    }

    setLoading(true);
    dispatch(getProposalQuestions(data)).then(() => {
      // setActive("chats"
       dispatch(getAllChats())
      setLoading(false);
      setCreateProposal((prev) => !prev)
      // router.push('/ai-chat')
    })

  }
  return (
    <>
      {loading ?

        <div className="flex items-center justify-center h-full">
          <div role="status">
            <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
              <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
            </svg>
            <span className="sr-only">Loading...</span>
          </div>
        </div>
        :
        <>
          <div className="max-w-[814px] w-full mx-auto flex flex-col items-center justify-center sm:grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-x-4 md:gap-y-6">


            {proposalData?.result?.map((item, index) => (
              <div
                key={index}
                className="max-w-[260px] w-full border-[1px] border-[#E0E0E0] bg-white rounded p-[12px_12px_24px] md:p-[12px_12px_34px]"
              >
                <div className="group relative z-50">
                  <Image
                    src={item.image}
                    width={324}
                    height={240}
                    alt="CraftYour-img4.png"
                  />
                  <div className="card-hover-bg hidden group-hover:block flex-col absolute w-full top-0 h-full justify-center">
                    <div className="w-full h-full flex flex-col items-center justify-center gap-[10px]">
                      <button className=" bg-[#F2F2F2] rounded py-[8px] px-[35px] max-w-[100px] w-full border-[1px] border-white hover:bg-transparent hover:duration-300 text-[#333] font-interTight text-[14px] font-semibold hover:text-white"
                        onClick={() => handleClick(item.id)}
                      >
                        Use
                      </button>
                      <button className=" hover:bg-[#F2F2F2] rounded py-[8px] px-[35px] max-w-[100px] w-full border-[1px] border-white bg-transparent hover:duration-300 hover:text-[#333] font-interTight text-[14px] font-semibold text-white">
                        View
                      </button>
                    </div>
                  </div>
                </div>
                <p className="font-interTight leading-[130%] text-[#333333] text-base pt-3 line-clamp-2">
                  {item.name}
                </p>
              </div>
            ))}


          </div>

          {/* Explore more btn */}
          {/* <button
            className="my-[60px] group flex items-center justify-center gap-2 mx-auto text-[#333] text-xl font-medium leading-[160%] font-interTight hover:text-[#316FF4]
      duration-300"
          >
            <span>Explore more</span>
            <ExploreMoreRightArrowIcon />
          </button> */}
        </>

      }
    </>
  );
};

export default ProposalCreatorComponent;
