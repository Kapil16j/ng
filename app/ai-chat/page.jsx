"use client";
import AiChatBody from "@/components/ai-chat/AiChatBody";
import AiChatHeader from "@/components/ai-chat/AiChatHeader";
import AiChatSidebar from "@/components/ai-chat/AiChatSidebar";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllChats, getAllMessagesForChat, getUser } from "../store/actions/dataActions";
import { toast } from "react-toastify";

const AiChat = () => {
  const [active, setActive] = useState("chats");

  const [createProposal, setCreateProposal] = useState(false);
  const [selectedChatId, setSelectedChatId] = useState('');
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch()

  // async function validateUser() {
  //   try{
  //     const response = await dispatch(getUser())
  //     const user = response.data
  //     console.log("response", response)
  //     if( user.tier?.toLowerCase() != "platinum"){
  //       window.location.href = window.location.origin + user.role == 'admin' ? '/admin/app' : '/dashboard/home'
  //     } 
  //   } catch (error) {
  //     console.log("error", error)
  //     toast.user("Couldn't load ai-chat , something went wrong!")
  //     window.location.href = window.location.origin + user.role == 'admin' ? '/admin/app' : '/dashboard/home'
  //   }
  // }
  // validateUser()
  

  const proposalQuestions = useSelector((state) => state.data.proposalQuestions)

  
  console.log("proposalQuestions??", proposalQuestions)
  // console.log("allChatData123", allChatData)

  const fetchAllMessagesChat = async () => {
    setLoading(true);
    await dispatch(getAllMessagesForChat(selectedChatId)).then(()=>{
      setLoading(false);
    });
  };


  useEffect(() => {

    if (!selectedChatId && proposalQuestions && proposalQuestions.chat_id) {
      setSelectedChatId(proposalQuestions.chat_id);
    }
   
    fetchAllMessagesChat()

   
  }, [selectedChatId,proposalQuestions])




  return (
    <div className="h-screen flex">
      <AiChatSidebar active={active} setActive={setActive} setCreateProposal={setCreateProposal}  selectedChatId={selectedChatId} setSelectedChatId={setSelectedChatId} />

      <div className="flex w-full h-full flex-col">
        <AiChatHeader />
        <AiChatBody active={active} setActive={setActive}  createProposal={createProposal} setCreateProposal={setCreateProposal} loading={loading} setLoading={setLoading} selectedChatId={selectedChatId} setSelectedChatId={setSelectedChatId} fetchAllMessagesChat={fetchAllMessagesChat}/>
      </div>
    </div>
  );
};

export default AiChat;
