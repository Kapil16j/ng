import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { DiscoverNGOcard } from "../common/Helper";
import { AiChatAiIcon } from "../common/Icon";
import { getProposalQuestions, resetStore, searchAllGrants } from "@/app/store/actions/dataActions";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import Loader from "../common/Loader";
import SearchBar from "../common/SearchBar";

const Aisearch = () => {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();

  const searchGrants = useSelector((state) => state?.data?.searchGrants);

  console.log("searchGrants???", searchGrants);

  useEffect(() => {
    if (query) {
      dispatch(searchAllGrants(query));
    }
    // Clean up the search results when the query is cleared
    return () => {
      if (!query) {
        dispatch(resetStore());
      }
    };
  }, [query]);

  const handleClick = (id) => {
    const data = {
      "sample_proposal_id": id
    };

    setLoading(true);
    dispatch(getProposalQuestions(data)).then(() => {
      setLoading(false);
      router.push('/ai-chat');
    });
  };

  console.log("query??", query);
  return (
    <div className="bg-[rgb(0,43,66)] min-h-screen p-6">
      {loading && <Loader />}
      <div className="max-w-[1180px] w-full px-4 xl:px-8">

        <SearchBar query={query} setQuery={setQuery} />

        {/* New Section for Search Results */}
        {searchGrants?.data?.proposal?.length > 0 && (
          <>
            <div className="max-sm:flex-col flex justify-between sm:mt-[34px] items-center gap-[10px]">
              <div>
                <p className="text-white font-interTight font-medium md:text-[24px] sm:text-[20px] text-[15px]">
                  Results for Sample Proposals
                </p>
              </div>
            </div>
            <div className="max-w-[1100px] bg-[#F2F2F2] rounded-[16px] w-full pt-[32px] px-3 lg:pl-[32px] lg:pr-[36px] pb-6 md:pb-10 lg:pb-[50px]">
                {/* <div className="flex gap-2 bg-[#FAFAFA] p-2 ">
                <div>
                  <AiChatAiIcon />
                </div>
                <div>
                  <p className="text-[#333333] font-interTight font-medium md:text-[20px] sm:text-[20px] text-[15px]">
                    AI Search
                  </p>
                </div>
              </div>

              <p className="text-[#666666] mt-[12px] mb-[24px]">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
              </p>
              <p className="text-[#333333] font-interTight font-medium md:text-[20px] sm:text-[20px] text-[15px]">
                Sources
              </p> */}
              <div className="overflow-x-auto">
                <div className="flex flex-nowrap gap-[24px]">
                  {searchGrants.data.proposal.map((item) => (
                    <div
                      key={item.id}
                      className="max-w-[240px] w-full mx-auto border-[1px] border-[#E0E0E0] bg-white rounded-[4px]"
                      style={{ minWidth: "240px" }} // Ensures minimum width for each card
                    >
                      <div className="group relative">
                        <Image
                          src={item.image}
                          width={324}
                          height={240}
                          alt="Proposal Image"
                        />
                        <div className="flex-col flex gap-[10px] custom-bg group-hover:duration-300 absolute w-full top-0 h-full justify-center">
                          <button
                            onClick={() => handleClick(item.id)}
                            className="bg-[#F2F2F2] rounded-[4px] py-[8px] px-[35px] max-w-[100px] w-full border-[1px] border-white hover:bg-transparent duration-300 text-[#333] font-interTight text-[14px] font-semibold hover:text-white mx-auto hidden group-hover:block"
                          >
                            Use
                          </button>
                        </div>
                      </div>
                      <div className="pb-4 lg:pb-6 px-2 sm:px-3 lg:px-[17px]">
                        <p className="leading-[160%]">{item.name}</p>
                        <p className="font-interTight leading-[130%] text-[#333333] text-[12px] sm:text-[14px] md:text-[16px] pt-2 md:pt-[12px] line-clamp-2">
                          <span>Location :</span> {item.location}
                        </p>
                        <p className="font-interTight leading-[130%] text-[#333333] text-[12px] sm:text-[14px] md:text-[16px] pt-2 md:pt-[12px] line-clamp-2">
                          <span>Deadline :</span> {item.deadline}
                        </p>
                        <p className="font-interTight leading-[130%] text-[#333333] text-[12px] sm:text-[14px] md:text-[16px] pt-2 md:pt-[12px] line-clamp-2">
                          <span>Amount :</span><strong> {item.amount}</strong>
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}

        {/* Recommended Proposals Section */}
        <div className="max-w-[1100px] bg-white rounded-[16px] w-full pt-[32px] sm:mt-[34px] px-3 lg:pl-[32px] lg:pr-[36px] pb-6 md:pb-10 lg:pb-[50px]">
          <div className="max-sm:flex-col flex justify-between items-center gap-[10px]">
            <div>
              <p className="text-[#333333] font-interTight font-medium md:text-[24px] sm:text-[20px] text-[15px]">
                Recommended Proposals (based on your search)
              </p>
            </div>
          </div>
          <div className="overflow-x-auto">
            <div className="flex flex-nowrap gap-[24px] mt-[24px]">
              {DiscoverNGOcard?.map((item, index) => (
                <div
                  key={index}
                  className="max-w-[240px] w-full mx-auto border-[1px] border-[#E0E0E0] bg-white rounded-[4px]"
                  style={{ minWidth: "240px" }} // Ensures minimum width for each card
                >
                  <div className="group relative">
                    <Image
                      src={item.img1}
                      width={324}
                      height={240}
                      alt="CraftYour-img4.png"
                    />
                    <div className="flex-col flex gap-[10px] custom-bg group-hover:duration-300 absolute w-full top-0 h-full justify-center">
                      <button
                        // onClick={() => handleClick(item.id)}
                        className="bg-[#F2F2F2] rounded-[4px] py-[8px] px-[35px] max-w-[100px] w-full border-[1px] border-white hover:bg-transparent duration-300 text-[#333] font-interTight text-[14px] font-semibold hover:text-white mx-auto hidden group-hover:block"
                      >
                        Use
                      </button>
                    </div>
                  </div>
                  <div className="pb-4 lg:pb-6 px-2 sm:px-3 lg:px-[17px]">
                    <p className="leading-[160%]">{item.text1}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Aisearch;
