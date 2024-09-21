"use client"
import { useEffect, useState, useRef } from "react";
import { AiChatAiIcon, AiChatExpandIcon, AiChatShrinkIcon, AiChatSparkleIcon, AiChatTranslateIcon, EnterIcons, PauseIcon, PlusIcons } from "../common/Icon";
import AiChatGenerateProposal from "./AiChatGenerateProposal";
import AiChatGrayBtnWithIconLabel from "./AiChatGrayBtnWithIconLabel";
import ProposalCreatorComponent from "./ProposalCreatorComponent";
import { useDispatch, useSelector } from "react-redux";
import { marked } from "marked";  // Parses Markdown to HTML
import { genreatePorposalMessage, getAllMessagesForChat, getProposalText, sendChatMessage } from "@/app/store/actions/dataActions";
import moment from 'moment';
import ChatMessage from "../common/ChatMessage";
import Typewriter from 'typewriter-effect';
import Iconify from "@/app/admin/components/iconify";
import { Button } from "@mui/material";
import { Download } from "@mui/icons-material";
import { unified } from "unified";
import markdown from "remark-parse";
import docx from "remark-docx";
import { saveAs } from "file-saver";


const AiChatBody = ({ active,setActive, createProposal,setCreateProposal, selectedChatId, loading, setLoading }) => {
  const [answer, setAnswer] = useState('');
  const [inputLoading, setInputLoading] = useState(false);
  const [dataFetched, setDataFetched] = useState(false);
  const [typoWriteText, setTypeWriterText] = useState(false);
  const [newProposal, setNewProposal] = useState(null)

  const dispatch = useDispatch();
  const chatContainerRef = useRef(null);

  const allMessages = useSelector((state) => state.data.allChatMessages);

  console.log("selectedChatId??", selectedChatId);

  const userMessages = allMessages?.filter(msg => msg.sentBy === 'USER');
  const systemMessages = allMessages?.filter(msg => msg.sentBy === 'SYSTEM');

  const processor = unified().use(markdown).use(docx, { output: "blob" });

  const sendAnswer = async () => {
    if (answer === "") return null;

    setInputLoading(true);
    const data = {
      "chat_id": parseInt(selectedChatId),
      "message": answer
    };
    console.log("message: ", data);

    try {
      await dispatch(sendChatMessage(data));
      await fetchAllMessagesChat();
      setInputLoading(false);
      // setTypeWriterText(true)
      setAnswer('');
 
    } catch (error) {
      console.error('Error sending answer:', error);
      setInputLoading(false);
    }
  };

  const generateProposal = async () =>{
    setInputLoading(true);

    const data = {
      "chat_id": selectedChatId,
    };
    console.log("generating proposal: ", data)
    try {
      const proposals = await dispatch(genreatePorposalMessage(data));
      console.log(proposals)
      //setNewProposal(JSON.stringify(proposals))
      
      await fetchAllMessagesChat();
      setInputLoading(false);
    } catch (error) {
      console.error('Error sending answer:', error);
      setInputLoading(false);
    }
  }



  const fetchAllMessagesChat = async () => {
    if (!selectedChatId) return; 
        setLoading(true);
    await dispatch(getAllMessagesForChat(selectedChatId)).then(() => {
      setLoading(false);
    });
  };

  useEffect(() => {
    if (selectedChatId) {
      fetchAllMessagesChat().then(() => setDataFetched(true));
    }
  }, [selectedChatId]);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [allMessages]);


  useEffect(() => {
    if (chatContainerRef.current) {
      console.log("Scrolling to bottom", chatContainerRef.current);
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [allMessages, inputLoading]);

  // Function to convert Markdown to DOC
  async function markdownTohtml(markdownText) {
    const htmlContent = await marked(markdownText);

    const html = `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="utf-8">
        </head>
        <body>
            ${htmlContent}
        </body>
        </html>
    `;
    return html;
  }

  const DownloadProposal = async () => {
    setInputLoading(true);
    const data = {
      "chat_id": selectedChatId,
    };
    console.log("generating proposal: ", data)
    try {
      const proposals = await dispatch(getProposalText(data));
      console.log("proposal text is : ",proposals)
      if(!proposals){
        toast.error("There were no proposals generated for this chat.")
        return ;
      }
      setNewProposal(proposals.data)
      const doc = await processor.process(proposals.data);
      const blob = await doc.result;
      saveAs(blob, "proposal.docx");

      setInputLoading(false);
    } catch (error) {
      console.error('Error sending answer:', error);
      setInputLoading(false);
    }
  }


  return (
    <div className="w-full h-full overflow-auto bg-[#FAFAFA] pt-8 px-4 md:pl-8 md:pr-5 scroll-ml-2">
      <div className={`w-full ${createProposal ? "h-[calc(100%-74px)]" : "h-[calc(100%-74px)] sm:h-[calc(100%-120px)]"} flex-grow overflow-auto`} ref={chatContainerRef}>
        {loading ? (
          <div className="flex items-center justify-center h-full">
            <div role="status">
              <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
              </svg>
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        ) : !createProposal ? (
          <>
            {dataFetched && allMessages?.length === 0 ? (
              <div className="flex items-center justify-center h-full">
                <p></p>
              </div>
            ) : (
              <div className="max-w-[992px] w-full">
                <div className="flex flex-col gap-[34px]">
                  <div className="font-bold text-xl text-gray-500">Let AI help you create your proposal.</div>
                  {allMessages?.map((item, i) => (
                    <div key={i} className={`pl-3 sm:pl-[15px] md:pl-[22px] relative ${item.sentBy === "USER" ? "text-right" : ""}`}>
                      {item.sentBy === "SYSTEM" && (
                        <div className="absolute z-50 top-0 left-0">
                          <AiChatAiIcon />
                        </div>
                      )}
                      <div className={`flex gap-3 ${item.sentBy === "USER" ? "justify-end" : ""} pl-[25px] md:pl-10 items-center`}>
                        <span className="font-interTight tracking-[2px] font-bold text-[#333]">
                          {item.sentBy === "USER" ? "You" : "AI"}
                        </span>
                        <p className="text-[11px] flex items-center gap-[3px] text-[#333] font-interTight leading-[130%]">
                          {item.text2}
                          <span className="h-[2px] w-[2px] bg-[#333] flex"></span>
                          <span>{moment(item.created_at).format('MMMM Do YYYY, h:mm:ss a')}</span>
                        </p>
                      </div>
                      <div className={`rounded max-w-[970px] py-4 md:py-6 text-base mt-1 px-6 md:pl-[29px] md:pr-[33px] w-full ${item.sentBy === "USER" ? "bg-white leading-[160%] text-right" : "bg-[#E3E8F2]"}`}>
                        {item.message.split('\n').map((line, index) => {
                          // Use a regular expression to find text enclosed in **
                          let formattedLine = line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

                          // Check if the line starts with a '-'
                          if (line.trim().startsWith('-')) {
                            formattedLine = '<span style="padding-left: 2em; display: inline-block;">•' + line.substring(1).trim() + '</span>';
                          }

                          return (
                            <>
                              {/* {(item.sentBy === "SYSTEM" && i === allMessages.length - 1 &&  typoWriteText == true) ?
                              <Typewriter
                              onInit={(typewriter) => {
                                typewriter
                                  .typeString(formattedLine)
                                  .callFunction(() => {
                                    console.log('Text typing complete!');
                                    // setTypeWriterText(false)
                                    // Any other logic you want to execute after typing is complete
                                  })
                                  .start();
                              }}
                              options={{
                                autoStart: true,
                                loop: false,
                                html: true, // Enable HTML tags in strings
                                cursor: ''
                              }}
                            />
                                : */}

                                <p
                                  key={index}
                                  className="leading-[160%]"
                                  dangerouslySetInnerHTML={{ __html: formattedLine }}
                                ></p>
                              {/* } */}
                            </>

                          );
                        })}
                      </div>
                    </div>
                  ))}

                </div>
              </div>
            )}
          </>
        ) : (
          <ProposalCreatorComponent setActive={setActive} setCreateProposal={setCreateProposal}/>
        )}
      </div>

      {/* Input loader */}
      {inputLoading && (
        <div className="flex items-center justify-center mt-2">
          <div role="status">
            <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
              <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
            </svg>
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      )}

      {/* Chat input and buttons */}
      <div className="py-2 max-w-[992px] w-full flex flex-col gap-[13px]">
        {!createProposal && (
          <div className="max-sm:hidden flex items-center justify-between">
            <div className="max-sm:hidden flex items-center justify-start gap-3">
              <AiChatGrayBtnWithIconLabel icon={<AiChatTranslateIcon />} label="Translate" />
              <AiChatGrayBtnWithIconLabel icon={<AiChatSparkleIcon />} label="Improve" />
              <AiChatGrayBtnWithIconLabel icon={<AiChatExpandIcon />} label="Make longer" />
              <AiChatGrayBtnWithIconLabel icon={<AiChatShrinkIcon />} label="Make shorter" />
            </div>
            <div className="flex items-center">
              <Button onClick={()=>generateProposal()} disabled={inputLoading}>Generate Proposal</Button>
              <div>
                 <button className="border px-1" onClick={()=>DownloadProposal()} disabled={inputLoading}><Download /></button>
              </div>
            </div>
          </div>
        )}

        <div className="bg-white py-[10px] px-3 md:px-6 rounded shadow-[0px_2px_4.4px_0px_rgba(30,31,34,0.05)]">
          <div className="flex items-center gap-2 sm:gap-[23px]">
            <div className="p-[6px] bg-[#E3E8F2] h-9 w-9 rounded cursor-pointer">
              <PlusIcons />
            </div>
            <input
              type="text"
              placeholder="Ask questions, or type ‘/’ for commands"
              className="text-black pl-1 text-[18px] w-full outline-none leading-[140%] font-interTight"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}

            />

            {!inputLoading ?
              <div className="cursor-pointer" onClick={() => sendAnswer()}>
                <EnterIcons />
              </div>
              :
              <>

              </>
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default AiChatBody;
