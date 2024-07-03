"use client";

import { useState } from "react";
import { AutoSaveTickIcon } from "../common/Icon";

const AiChatHeader = () => {
  const [autoSave, setAutoSave] = useState(false);

  return (
    <div className="w-full max-lg:px-4 h-[90px] bg-[#F2F2F2] flex items-center justify-start gap-2">
      <AutoSaveTickIcon />
      <span className="text-sm leading-[130%] text-[#333] font-interTight">
        Autosave on
      </span>
    </div>
  );
};

export default AiChatHeader;
