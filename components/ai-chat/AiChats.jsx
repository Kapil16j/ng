import React from "react";
import { FaceIcon, SaveIcon } from "../common/Icon";

const AiChats = ({ chatsData, handleFav, selectedChatId, setSelectedChatId }) => {
  const handleSelectedChat = (id) => {
    setSelectedChatId(id);
  };

  return (
    <div className="flex flex-col gap-2 h-full overflow-auto">
      {chatsData
        ?.sort((a, b) => b.id - a.id)
        ?.map((item, index) => (
          <div
            className={`w-full flex gap-1 p-[11px_8px_16px] justify-center items-start cursor-pointer ${item.id === selectedChatId ? "bg-blue-500 rounded-lg" : ""
              }`}
            key={index}
            onClick={() => handleSelectedChat(item.id)}
          >
            <div className="mt-1">
              <FaceIcon />
            </div>
            <div className="w-full flex flex-col gap-1">
              <div className="flex justify-between items-center gap-3">
                <p className={` font-normal leading-[160%] line-clamp-1 ${item.id === selectedChatId ? "text-white" : ""
                  }`}>
                  {item.name}
                </p>
                <p className={`text-[11px] text-trolleyGrey font-normal font-interTight leading-[130%] `}>
                  {item.time}
                </p>
              </div>
              <div className="flex justify-between items-end gap-3">
                <p className={`w-full text-sm  text-start leading-[130%] line-clamp-2  ${item.id === selectedChatId ? "text-white" : ""
                  }`}>
                  {item.description}
                </p>
                <button onClick={() => handleFav(item)}>
                  <SaveIcon isFav={item.isFav} />
                </button>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default AiChats;
