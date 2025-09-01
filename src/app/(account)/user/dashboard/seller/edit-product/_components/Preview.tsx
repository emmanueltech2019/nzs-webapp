import { FC, useEffect, useState } from "react";
import general_type from "./general.types";
import Circle from "@/components/Circle";
import { Icon } from "@iconify/react/dist/iconify.js";
import axios from "@/utils/axios";
import { showToast } from "@/utils/alert";

const Preview: FC<general_type> = ({
  handleBtnFunc,
  setCount,
  setSection,
  setDisplayCircle,
  setBtnText,
}) => {
  const [productData, setProductData] = useState<any>(null);
  const [uploadCount, setuploadCount] = useState(75);
  useEffect(() => {
    setCount(100);
    if (setDisplayCircle) setDisplayCircle(false);
    if (setBtnText) setBtnText("CONFIRM");

    const data = JSON.parse(localStorage.getItem("productFormData") || "{}");
    setCount(75);
    handleBtnFunc(handleConfirm);
    return () => {
      handleBtnFunc(() => console.log("default"));
    };
  }, [handleBtnFunc, setBtnText, setDisplayCircle, setCount]);

  const handleConfirm = () => {
    window.location.replace("./inventory/");
  };

  return (
    <div className="py-3">
      <section>
        <div>
          <div className="bg-[#F8F9FE] p-4 rounded-lg mt-[2rem]">
            <div className="bg-[#FFFFFF] p-4 flex justify-center">
              <div className="-rotate-90 py-4">
                <Circle count={uploadCount}>
                  <Icon
                    icon="ri:arrow-right-line"
                    className="text-[#006838]"
                    width="32"
                    height="32"
                  />
                </Circle>
              </div>
            </div>
            <div className="flex items-center justify-between border-b-[1px] border-[#0C1F1F0A] mt-4 pb-2">
              <h3 className="text-[16px] text-[#0C1F1F] font-semibold leading-[100%]">
                PRODUCT NAME
              </h3>

              <div className="flex items-center gap-1">
                <button className="bg-[#EAF2FF] text-[10px] rounded-[4px] px-2 py-1">
                  Upload Logo
                </button>
                <Icon
                  icon="bx:chevron-down"
                  className="text-[#0C1F1F80]"
                  width="19"
                  height="19"
                />
              </div>
            </div>

            <div className="mt-2">
              <div className="grid grid-cols-2 gap-5 gap-y-2 text-gray-700 text-sm">
                <div>
                  <p className="text-[#0C1F1F40] text-[12px]">Product Type</p>
                  <p className="text-[#0C1F1F] font-normal text-[12px]">
                    {productData.category?.join(", ") || "N/A"}
                  </p>
                </div>
                <div>
                  <p className="text-[#0C1F1F40] text-[12px]">Added</p>
                  <p className="text-[#0C1F1F] font-normal text-[12px]">
                    September 30, 2024
                  </p>
                </div>
                <div>
                  <p className="text-[#0C1F1F40] text-[12px]">Description</p>
                  <p className="text-[#0C1F1F] font-normal text-[12px]">
                    {productData.description || "N/A"}
                  </p>
                </div>
                <div>
                  <p className="text-[#0C1F1F40] text-[12px]">Product ID</p>
                  <p className="text-[#0C1F1F] font-normal text-[12px]">
                    30045-HA
                  </p>
                </div>
                <div className="col-span-2 mt-2 flex gap-12">
                  <p className="text-[#0C1F1F40] text-[12px]">
                    Purchase Discount
                  </p>
                  <span className="ms-[2rem] bg-[#C5C6CC] text-[16px] text-[#1F2024] font-black px-4 py-1 rounded-[15px]">
                    10%
                  </span>
                </div>
                <div className="col-span-2 flex gap-12">
                  <p className="text-[#0C1F1F40] text-[12px]">
                    Discount Quantity
                  </p>
                  <span className="ms-[2rem] bg-[#C5C6CC] text-[16px] text-[#1F2024] font-black px-4 py-1 rounded-[15px]">
                    45
                  </span>
                </div>
                <div>
                  <p className="text-[#0C1F1F40] text-[12px]">
                    Threshold Quality
                  </p>
                  <p className="text-[#0C1F1F] font-normal text-[12px]">
                    43 Cartons
                  </p>
                </div>
                <div>
                  <p className="text-[#0C1F1F40] text-[12px]">
                    Threshold Price(NGN)
                  </p>
                  <p className="text-[#0C1F1F] font-normal text-[12px]">
                    1,600.00
                  </p>
                </div>
                <div className="col-span-2 flex gap-12">
                  <p className="text-[#0C1F1F40] text-[12px] me-[2rem]">
                    Total Stock
                  </p>
                  <span className="ms-[2rem] bg-[#006838] text-[16px] text-[#FFF] font-medium px-2 py-[6px] rounded-[15px]">
                    43 CARTONS
                  </span>
                </div>
                <div className="col-span-2 flex gap-12">
                  <p className="text-[#0C1F1F40] text-[12px] me-[2rem]">
                    Price (NGN)
                  </p>
                  <span className="ms-[2rem] bg-[#EBEDEB] text-[16px] text-[#1F2024] font-black px-4 py-[6px] rounded-[15px]">
                    1,800.00
                  </span>
                </div>
                <div className="col-span-2 flex gap-12">
                  <p className="text-[#0C1F1F40] text-[12px] me-[3rem]">
                    Stock Sold
                  </p>
                  <span className="ms-[2rem] bg-[#EBEDEB] text-[12px] text-[##000000] font-normal px-4 py-[6px] rounded-[15px]">
                    0 Sold
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Preview;
