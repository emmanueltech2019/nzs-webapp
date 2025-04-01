import React, { useState } from "react";

interface OptionsProps {
  options: string[];
  onSelect: (selectedOptions: string[]) => void;
}

const Options: React.FC<OptionsProps> = ({ options, onSelect }) => {
  const [selected, setSelected] = useState<string[]>([]);

  const handleSelect = (option: string) => {
    let updatedSelection;
    if (selected.includes(option)) {
      updatedSelection = selected.filter((item) => item !== option);
    } else {
      updatedSelection = [...selected, option];
    }
    setSelected(updatedSelection);
    onSelect(updatedSelection);
  };

  return (
    <div>
      <div className="flex flex-wrap gap-1 gap-y-2 my-[2rem]">
        {options.map((option) => (
          <button
            key={option}
            className={`px-4 py-2 text-[10px] rounded-full leading-[100%] font-semibold transition uppercase 
            ${
              selected.includes(option)
                ? "bg-[#006838] text-white"
                : "bg-[#EAF2FF] text-[#006838]"
            }
          `}
            onClick={() => handleSelect(option)}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Options;
