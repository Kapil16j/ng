const AiChatGrayBtnWithIconLabel = ({ icon, label }) => {
  return (
    <button className="p-[6px_12px] flex items-center justify-center gap-[10px] bg-[#ededed] rounded">
      {icon}
      <span className="text-sm font-interTight text-[#828282]">{label}</span>
    </button>
  );
};

export default AiChatGrayBtnWithIconLabel;
