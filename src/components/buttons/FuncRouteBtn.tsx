import React from "react";

type funcbtntype = {
  classValue?: string
  text: string
  func: () => any
};
function FuncRouteBtn({text, func}: funcbtntype) {
  return (
    <div>
      <button
        className={`rounded-[12px] py-3 px-4 text-[#FFFFFF] text-xs font-semibold leading-[14.52px] text-center block w-[100%] bg-[#006838] m-auto my-1
        }`}
      >{text}</button>
    </div>
  );
}

export default FuncRouteBtn;
