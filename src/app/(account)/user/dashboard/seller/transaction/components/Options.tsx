import React from "react";

interface OptionsProps {
  optionsArray: string[];
  active: string;
  setActive: (option: string) => void;
}

const Options: React.FC<OptionsProps> = ({ optionsArray, active, setActive }) => {
  return (
    <div>
      <div className="flex flex-grow flex-wrap items-center gap-[10px] px-4 my-2">
        {optionsArray.map((option, index) => (
          <div
            key={index}
            onClick={() => setActive(option)}
            className={`flex flex-inline items-center justify-between px-2 py-[6px] rounded-xl cursor-pointer ${
              active === option
                ? "bg-[#006838] text-[#fff]"
                : "bg-[#EAF2FF] text-[#006838]"
            } transition-all duration-300 ease-in`}
          >
            <p className="text-[12px] font-semibold">{option}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Options;
