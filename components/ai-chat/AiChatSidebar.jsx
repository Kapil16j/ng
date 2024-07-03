"use client";

import { useEffect, useState } from "react";

import AiChats from "./AiChats";
import { chatCardsData } from "../common/Helper";
import {
  FilterIcon,
  KebabmenuIcon,
  MessagesIcon,
  NewProposalIcon,
  SaveIcon3,
  SearchIcon,
} from "../common/Icon";

const AiChatSidebar = ({ setCreateProposal }) => {
  const [active, setActive] = useState("chats");
  const [allChats, setAllChats] = useState(chatCardsData);
  const [favChats, setFavChats] = useState([]);

  useEffect(() => {
    const favs = allChats.filter((chat) => chat.isFav);
    setFavChats(favs);
  }, [allChats]);

  // To handle fav of a chat
  const handleFav = (chat) => {
    const isFav = favChats.some((item) => item.id === chat.id);
    const updatedFavChats = isFav
      ? favChats.filter((item) => item.id !== chat.id)
      : [...favChats, chat];

    setFavChats(updatedFavChats);

    const updatedAllChats = allChats.map((item) =>
      item.id === chat.id ? { ...item, isFav: !isFav } : item
    );
    setAllChats(updatedAllChats);
  };

  return (
    <div className="max-lg:hidden w-[366px] h-full px-4 flex gap-4 flex-col bg-whiteSmoke">
      {/* My proposal and new proposal creator btn */}
      <div className="mt-[59px] w-full mx-auto flex justify-between">
        <p className="text-zinc-800 text-2xl font-mediu">My Proposals</p>
        <div className="flex  gap-2.5">
          <button
            onClick={() => setCreateProposal((prev) => !prev)}
            className="group"
          >
            <NewProposalIcon />
          </button>
          <button>
            <KebabmenuIcon />
          </button>
        </div>
      </div>

      {/* Nav tabs */}
      <div className="flex w-full bg-superSilver border-[#E2E2E2] border-[0.6px] rounded mx-auto justify-center gap-1 p-1">
        <button
          onClick={() => setActive("chats")}
          className={`${
            active === "chats"
              ? "bg-white text-retroBlue"
              : "bg-superSilver text-carbonColor"
          } rounded w-full h-[40px] flex items-center justify-center gap-[6px] text-[14px] font-normal text-carbonColor`}
        >
          <span className="flex-shrink-0">
            <MessagesIcon icon={active} />
          </span>
          CHATS
          <span
            className={`${
              active === "chats" ? "bg-[#E3E8F2]" : "bg-kinglyCloud"
            }  text-[14px] font-normal flex items-center justify-center  p-[1px_4px] rounded `}
          >
            {allChats.length}
          </span>
        </button>
        <button
          onClick={() => setActive("saved")}
          className={`${
            active === "saved" ? "bg-white text-retroBlue" : " text-carbonColor"
          } rounded w-full h-[40px] flex items-center justify-center gap-[6px] text-[14px] font-normal text-carbonColor`}
        >
          <span className="flex-shrink-0">
            <SaveIcon3 icon={active} />
          </span>
          SAVED
          <span
            className={`${
              active === "saved" ? "bg- kinglyCloud" : "bg-[#E3E8F2]"
            }  text-sm font-normal flex items-center justify-center  p-[1px_4px] rounded `}
          >
            {favChats.length}
          </span>
        </button>
      </div>

      {/* Search bar */}
      <div className="flex items-center gap-2 w-full">
        <div className="px-2 h-8 gap-2 w-full rounded bg-titaniumWhite  items-center flex">
          <SearchIcon />
          <input
            type="search"
            className="font-interTight w-full bg-transparent text-[#575B65] outline-none font-normal text-[14px]"
            placeholder="Search..."
          />
        </div>
        <div className=" hover:cursor-pointer">
          <FilterIcon />
        </div>
      </div>

      {/* Ai chats */}
      <AiChats
        chatsData={active == "chats" ? allChats : favChats}
        handleFav={handleFav}
      />
    </div>
  );
};

export default AiChatSidebar;
