import React from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { div } from "framer-motion/client";

const CreateBusinessBar = () => {

    const progressData = [
        {
            id: 1,
            step: "Business Description"
        },
        {
            id: 2,
            step: "Business Info"
        },
        {
            id: 3,
            step: "Payment Info"
        },
        {
            id: 4,
            step: "Preview"
        },
    ]
  return (
    <div>
      <section className="max-w-[600px] mx-auto">
        <header className="flex items-center justify-between w-[65%] py-5">
          <Icon icon="mynaui:chevron-left" className="text-[#D4D6DD]" width="30" height="30" />

          <h2 className=" font-sans text-[16px] md:text-[18px] font-extrabold">Add Business</h2>
        </header>

        <div className="flex justify-between py-2 my-2">
            {
                progressData.map(({id, step}, index) => (
                    <div key={index} className="flex flex-col items-center">
                        <div className="w-[24px] h-[24px] rounded-full bg-[#006838] text-[#fff] px-[9px] py-[5px] text-[10px] font-semibold">{id}</div>
                        <p className="text-[12px] w-[70px] text-center mt-3 font-bold">{step}</p>
                    </div>
                ))
            }
        </div>
      </section>
    </div>
  );
};

export default CreateBusinessBar;
