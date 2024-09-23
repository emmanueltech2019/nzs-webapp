"use client";
import { useContextStore } from "@/context/SubscriptionContext";
import Image from "next/image";
import Box from "@/components/Box";
import FuncRouteBtn from "@/components/buttons/FuncRouteBtn";
import { useRouter } from "next/navigation";

type layerType = {
  children: React.ReactNode;
};
type handleRouteType = (
  route: string,
  active: boolean,
  message: string
) => void;

const Layer = ({ children }: layerType) => {
  const { progressbar, img } = useContextStore();
  
  const router = useRouter();
  const handleRoute: handleRouteType = (route, active, message) => {
    console.log(active, route);
    if (active) router.push(`${route}`);
    else alert(message);
  };

  const { next, isActive, message } = useContextStore()
  return (
    <div className="">
      <section className="flex flex-col lg:flex-row min-h-screen p-3">
        <div className="col flex-[1.2] flex flex-col justify-between md:justify-evenly px-3 md:ps-[150px]">
          {/* box */}
          <div className="hidden lg:block">
            <Box />
          </div>

          <div className="">
            <div className="bar mt-[24px] rounded-full bg-[#E8E9F1] w-full md:w-[305px] h-[6px] md:h-[7px]">
              <div
                className={`progress rounded-full bg-[#006838] h-[6px] md:h-[7px] transition-all duration-300`}
                style={{
                  width: progressbar + "%",
                }}
              ></div>
            </div>
            {/* {
              React.Children.map(children, (child) => 
                React.cloneElement(child as React.ReactElement, { childHandleImg: handleImg, progressbar: handleProgressbar}))
            } */}
            {children}
          </div>

          <button
            className={`rounded-[12px] py-4 md:py-4 px-4 text-[#FFFFFF] text-sm md:text-base font-semibold leading-[14.52px] text-center block w-[100%] bg-[#006838] m-auto my-1 select-none`}
            onClick={() => handleRoute(next, isActive, message)}
          >
            Next
          </button>
        </div>

        {/* image */}
        <div className="col flex-1 hidden lg:flex image overflow-hidden items-center">
          <Image src={img} alt="image-layer" className="w-full object-cover" />
        </div>
      </section>
    </div>
  );
};

export default Layer;
