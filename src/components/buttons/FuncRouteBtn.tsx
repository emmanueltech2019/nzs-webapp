
type funcbtntype = {
  classValue?: string;
  text: string;
  func?: () => void;
};
function FuncRouteBtn({ text, func, classValue }: funcbtntype) {
  return (
    <button
      className={`rounded-[12px] py-4 md:py-4 px-4 text-[#FFFFFF] text-sm md:text-base font-semibold leading-[14.52px] text-center block w-[100%] bg-[#006838] m-auto my-1 ${
        classValue ? classValue : ""
      }`}
      onClick={func}
    >
      {text}
    </button>
  );
}

export default FuncRouteBtn;
