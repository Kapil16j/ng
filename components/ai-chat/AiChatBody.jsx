import { Allchat2card, Allchatcard } from "../common/Helper";
import {
  AiChatAiIcon,
  AiChatExpandIcon,
  AiChatShrinkIcon,
  AiChatSparkleIcon,
  AiChatTranslateIcon,
  EnterIcons,
  PlusIcons,
} from "../common/Icon";
import AiChatGenerateProposal from "./AiChatGenerateProposal";
import AiChatGrayBtnWithIconLabel from "./AiChatGrayBtnWithIconLabel";
import ProposalCreatorComponent from "./ProposalCreatorComponent";

const AiChatBody = ({ createProposal }) => {
  return (
    <div className="w-full h-full overflow-auto bg-[#FAFAFA] pt-8 px-4 md:pl-8 md:pr-5 scroll-ml-2">
      <div
        className={`w-full ${
          createProposal
            ? "h-[calc(100%-74px)]"
            : "h-[calc(100%-74px)] sm:h-[calc(100%-120px)]"
        } flex-grow overflow-auto`}
      >
        {!createProposal ? (
          <>
            <div className="max-w-[992px] w-full">
              <div className="flex flex-col gap-[34px]">
                {Allchatcard.map((item, index) => (
                  <div
                    key={index}
                    className="pl-3 sm:pl-[15px] md:pl-[22px] relative"
                  >
                    <div className="absolute z-50 top-0 left-0">
                      <AiChatAiIcon />
                    </div>
                    <div className=" flex gap-3 pl-[25px] md:pl-10 items-center ">
                      <span className=" font-interTight tracking-[2px] font-bold text-[#333] ">
                        {item.user}
                      </span>
                      <p className=" text-[11px] flex items-center gap-[3px] text-[#333] font-interTight leading-[130%] ">
                        {item.text2}
                        <span className=" h-[2px] w-[2px] bg-[#333] flex "></span>
                        <span>{item.time}</span>
                      </p>
                    </div>
                    <div
                      className={` rounded max-w-[970px] py-4 md:py-6 text-base mt-1 px-6 md:pl-[29px] md:pr-[33px] w-full ${
                        item.user === "You"
                          ? " bg-white leading-[160%]"
                          : "bg-[#E3E8F2]"
                      }`}
                    >
                      <p className="max-w-[908px] w-full text-[#333] font-interTight text-sm md:text-[16px] leading-[130%] ">
                        {item.chat}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Today seperator line */}
              <div className="w-full my-6 flex gap-2 items-center">
                <div className="w-full bg-[#E0E0E0] h-[1.5px] "></div>
                <p className="text-sm font-interTight font-bold text-[#BDBDBD] ">
                  Today
                </p>
                <div className="w-full bg-[#E0E0E0] h-[1.5px] "></div>
              </div>

              {/* Today chats */}
              <div className="flex flex-col gap-[34px]">
                {Allchat2card.map((item, index) => (
                  <div
                    key={index}
                    className="pl-3 sm:pl-5 md:pl-[22px] relative"
                  >
                    <div className="absolute z-50 top-0 left-0">
                      <AiChatAiIcon />
                    </div>
                    <div className=" flex gap-3 md:pl-[29px] pl-10 items-center ">
                      <span className=" font-interTight tracking-[2px] font-bold text-[#333] ">
                        {item.user}
                      </span>
                      <p className=" text-[11px] flex items-center gap-[3px] text-[#333] font-interTight leading-[130%] ">
                        {item.text2}
                        <span className="h-[2px] w-[2px] bg-[#333] flex"></span>
                        <span>{item.time}</span>
                      </p>
                    </div>
                    <div
                      className={` rounded max-w-[970px] py-6 text-[16px] pl-[29px] mt-1 pr-[33px] w-full ${
                        item.user === "You"
                          ? " bg-white leading-[160%]"
                          : "bg-[#E3E8F2]"
                      }`}
                    >
                      <p className=" max-w-[908px] w-full text-[#333] font-interTight text-sm md:text-[16px] leading-[130%] ">
                        {item.chat}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Generate proposal btn */}
            <AiChatGenerateProposal />
          </>
        ) : (
          <ProposalCreatorComponent />
        )}
      </div>

      {/* Chat input and btns */}
      <div className="py-2 max-w-[992px] w-full flex flex-col gap-[13px]">
        {/* Translate, improve, make longer, make shorter btns*/}
        {!createProposal && (
          <div className="max-sm:hidden flex items-center justify-start gap-3">
            <AiChatGrayBtnWithIconLabel
              icon={<AiChatTranslateIcon />}
              label="Translate"
            />
            <AiChatGrayBtnWithIconLabel
              icon={<AiChatSparkleIcon />}
              label="Improve"
            />
            <AiChatGrayBtnWithIconLabel
              icon={<AiChatExpandIcon />}
              label="Make longer"
            />
            <AiChatGrayBtnWithIconLabel
              icon={<AiChatShrinkIcon />}
              label="Make shorter"
            />
          </div>
        )}

        {/* Chat input */}
        <div className=" bg-white py-[10px] px-3 md:px-6 rounded shadow-[0px_2px_4.4px_0px_rgba(30,31,34,0.05)]">
          <div className="flex items-center gap-2 sm:gap-[23px]">
            <div className="p-[6px] bg-[#E3E8F2] h-9 w-9 rounded cursor-pointer ">
              <PlusIcons />
            </div>
            <input
              type="text"
              placeholder="Ask questions, or type ‘/’ for commands"
              className=" text-[#BDBDBD] pl-1 text-[18px] w-full outline-none leading-[140%] font-interTight "
            />
            <div className=" cursor-pointer ">
              <EnterIcons />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AiChatBody;
