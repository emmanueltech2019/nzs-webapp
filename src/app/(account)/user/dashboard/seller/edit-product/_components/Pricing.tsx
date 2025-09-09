import React, { FC, useEffect, useState } from "react";
// import interFont from '@/fonts/Inter'
import openSansFont from "@/fonts/OpenSans";
import general_type from "./general.types";
import useForm from "@/hooks/useForm";
// import { Icon } from '@iconify/react/dist/iconify.js'
// import { ProfileInfo } from './Main'
import axios from "@/utils/axios";
import { showToast } from "@/utils/alert";

const Pricing: FC<general_type> = ({
  setCount,
  setSection,
  handleBtnFunc,
  setDisplayCircle,
  setBtnText,
}) => {
  const [price, setPrice] = useForm(0);
  const [discount, setDiscount] = useForm(0);

  // const handleConfirm = () => {
  //   window.location.replace("./inventory/");
  // };
  // const [accountType, setAccountType] = useState([
  //     { item: 'Savings', state: false },
  //     { item: 'Current', state: false },
  // ])
  // const handleClick = (a: any) => setAccountType(prev => prev.map(({ item, state }) => ({ item, state: item == a ? !state : state })));
  const handleAPI = async () => {
    // const selectedAccountType = accountType.find(({ state }) => state)?.item || null;
    // setSection(4);
    axios({
      method: "PUT",
      url: `/products/vendor/add-price-info/${localStorage.getItem(
        "addProductActive"
      )}`,
      data: {
        price,
        discount,
      },
      headers: {
        Authorization: `Bearer ${localStorage.getItem("userToken")}`,
      },
    })
      .then((res) => {
        console.log(res);
        showToast("success", res.data.message);
        // setSection(4);
        window.location.replace("./inventory/");
      })
      .catch((err) => {
        console.error(err);
        showToast("error", err.message);
      });
  };

  useEffect(() => {
    setCount(75);
    handleBtnFunc(handleAPI);
    if (setDisplayCircle) setDisplayCircle(false);
    if (setBtnText) setBtnText("CONFIRM");
    return () => {
      handleBtnFunc(() => console.log("default"));
    };
  });
  return (
    <div className="py-3">
      {/* <div className="py-5">
                <h2 className={`font-black text-[#1F2024] text-xl pb-2 ${interFont}`}>Select the right profile for your business.</h2>
                <p className={`text-[#71727A] ${openSansFont} pb-2`}>
                    We provide multiple options so feel free to get
                    super-specific!
                </p>
            </div>  */}
      <div className="pb-3">
        <input
          type="text"
          id="businessName"
          onChange={(e) => setPrice(e)}
          value={price}
          required
          className="w-full px-4 py-3 rounded-xl outline-none bg-inherit border-[0.67px] border-[#C5C6CC] placeholder:text-[#8F9098]"
          placeholder="NGN 0.00"
        />
        <p className={`text-xs pt-2 text-[#8F9098] ${openSansFont}`}>
          Product Price
        </p>
      </div>
      <div className="border-[0.5px] border-[#D4D6DD] rounded-2xl p-4 mt-3">
        <h1 className="flex gap-2 items-center pb-6">
          <span className="flex items-center justify-center rounded-full w-4 h-4 bg-[--foreground-green]">
            <span className="flex items-center justify-center rounded-full bg-white h-[5px] w-[5px]"></span>
          </span>
          <span className={`text-[#71727A] text-sm font-bold ${openSansFont}`}>
            Discount
          </span>
        </h1>

        <input
          type="text"
          id="discount"
          onChange={(e) => setDiscount(e)}
          value={discount}
          required
          className="w-full px-4 py-3 rounded-xl outline-none bg-inherit border-[0.67px] border-[#C5C6CC] placeholder:text-[#8F9098]"
          placeholder="% 10"
        />
        <span className={`text-[#71727A] text-sm  ${openSansFont}`}>
          Purchase Discount
        </span>
      </div>
      {/* <ProfileInfo /> */}
    </div>
  );
};

export default Pricing;
