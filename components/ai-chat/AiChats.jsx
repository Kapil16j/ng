import React from "react";
import { FaceIcon, SaveIcon } from "../common/Icon";

const AiChats = ({ chatsData, handleFav }) => {
  return (
    <div className="flex flex-col gap-2 h-full overflow-auto">
      {chatsData.map((item, index) => (
        <div
          className="w-full flex gap-1 p-[11px_8px_16px] justify-center items-start"
          key={index}
        >
          <div className="mt-1">
            <FaceIcon />
          </div>
          <div className="w-full flex flex-col gap-1">
            <div className="flex justify-between items-center gap-3">
              <p className="text-base text-carbonColor font-normal font-interTight leading-[130%] line-clamp-1">
                {item.heading}
              </p>
              <p className="text-[11px] text-trolleyGrey font-normal font-interTight leading-[130%]">
                {item.time}
              </p>
            </div>
            <div className="flex justify-between items-end gap-3">
              <p className="w-full text-sm text-trolleyGrey font-interTight text-start leading-[130%] line-clamp-2">
                {item.subheading}
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
