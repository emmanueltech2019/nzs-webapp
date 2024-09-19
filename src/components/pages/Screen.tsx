import Image from "next/image";
import Box from "@/components/Box";


type screentype = {
  image: any;
  children: React.ReactNode;
  progressbar?: any;
};
const Screen = ({ image, children, progressbar }: screentype) => {
  return (
    <section className="flex flex-col lg:flex-row min-h-screen">
      <div className="col flex-[1.2] flex flex-col justify-evenly px-3 md:ps-[150px]">
        {/* box */}
        <div className="hidden lg:block">
          <Box />
        </div>

        <div className="">
          <div className="bar rounded-full bg-[#E8E9F1] w-full md:ww-[305px] h-[8px] md:h-[7px]">
            <div
              className={`progress rounded-full bg-[#006838] w-[${progressbar}] h-[8px] md:h-[7px]`}
            ></div>
          </div>
          {children}
        </div>
      </div>

      {/* image */}
      <div className="col flex-1 hidden lg:block image overflow-hidden">
        <Image
          src={image}
          alt="image-layer"
          className="w-full h-full object-cover"
        />
      </div>
    </section>
  );
};

export default Screen;
