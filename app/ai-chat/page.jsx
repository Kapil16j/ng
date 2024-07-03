"use client";
import AiChatBody from "@/components/ai-chat/AiChatBody";
import AiChatHeader from "@/components/ai-chat/AiChatHeader";
import AiChatSidebar from "@/components/ai-chat/AiChatSidebar";
import { useState } from "react";

const AiChat = () => {
  const [createProposal, setCreateProposal] = useState(false);

  return (
    <div className="h-screen flex">
      <AiChatSidebar setCreateProposal={setCreateProposal} />

      <div className="flex w-full h-full flex-col">
        <AiChatHeader />
        <AiChatBody createProposal={createProposal} />
      </div>
    </div>
  );
};

export default AiChat;
