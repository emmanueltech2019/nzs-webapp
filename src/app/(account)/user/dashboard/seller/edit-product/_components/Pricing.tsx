// import React, { FC, useEffect, useState } from "react";
// import openSansFont from "@/fonts/OpenSans";
// import general_type from "./general.types";
// import useForm from "@/hooks/useForm";
// import axios from "@/utils/axios";
// import { showToast } from "@/utils/alert";
// import { useSearchParams } from "next/navigation";

// const Pricing: FC<general_type> = ({
//   setCount,
//   setSection,
//   handleBtnFunc,
//   setDisplayCircle,
//   setBtnText,
// }) => {
//   const [price, setPrice] = useForm(0);
//   const [discount, setDiscount] = useForm(0);
// const searchParams = useSearchParams();
//   const productId = searchParams.get("id");
//   const handleAPI = async () => {

//     axios({
//       method: "PUT",
//       url: `/products/vendor/add-price-info/${productId}`,
//       data: {
//         price,
//         discount,
//       },
//       headers: {
//         Authorization: `Bearer ${localStorage.getItem("userToken")}`,
//       },
//     })
//       .then((res) => {
//         console.log(res);
//         showToast("success", res.data.message);
//         window.location.replace("./inventory/");
//       })
//       .catch((err) => {
//         console.error(err);
//         showToast("error", err.message);
//       });
//   };

//   useEffect(() => {
//     setCount(75);
//     handleBtnFunc(handleAPI);
//     if (setDisplayCircle) setDisplayCircle(false);
//     if (setBtnText) setBtnText("CONFIRM");
//     return () => {
//       handleBtnFunc(() => console.log("default"));
//     };
//   });
//   return (
//     <div className="py-3">
//       <div className="pb-3">
//         <input
//           type="text"
//           id="businessName"
//           onChange={(e) => setPrice(e)}
//           value={price}
//           required
//           className="w-full px-4 py-3 rounded-xl outline-none bg-inherit border-[0.67px] border-[#C5C6CC] placeholder:text-[#8F9098]"
//           placeholder="NGN 0.00"
//         />
//         <p className={`text-xs pt-2 text-[#8F9098] ${openSansFont}`}>
//           Product Price
//         </p>
//       </div>
//       <div className="border-[0.5px] border-[#D4D6DD] rounded-2xl p-4 mt-3">
//         <h1 className="flex gap-2 items-center pb-6">
//           <span className="flex items-center justify-center rounded-full w-4 h-4 bg-[--foreground-green]">
//             <span className="flex items-center justify-center rounded-full bg-white h-[5px] w-[5px]"></span>
//           </span>
//           <span className={`text-[#71727A] text-sm font-bold ${openSansFont}`}>
//             Discount
//           </span>
//         </h1>

//         <input
//           type="text"
//           id="discount"
//           onChange={(e) => setDiscount(e)}
//           value={discount}
//           required
//           className="w-full px-4 py-3 rounded-xl outline-none bg-inherit border-[0.67px] border-[#C5C6CC] placeholder:text-[#8F9098]"
//           placeholder="% 10"
//         />
//         <span className={`text-[#71727A] text-sm  ${openSansFont}`}>
//           Purchase Discount
//         </span>
//       </div>
//     </div>
//   );
// };

// export default Pricing;
import React, { FC, Suspense, useEffect, useState } from "react";
import openSansFont from "@/fonts/OpenSans";
import general_type from "./general.types";
import useForm from "@/hooks/useForm";
import axios from "@/utils/axios";
import { showToast } from "@/utils/alert";
import { useSearchParams } from "next/navigation";
import { Icon } from "@iconify/react"; 
import Circle from "@/components/Circle";

const Pricing: FC<general_type> = ({
  setCount,
  // setSection,
  // handleBtnFunc,
  // setDisplayCircle,
  setBtnText,
}) => {
  const [price, setPrice] = useState(0);
  const [discount, setDiscount] = useState(0);
  const searchParams = useSearchParams();
  const productId = searchParams.get("id");
  
  const earnAmount = price ? Number(price) - Number(price) * 0.07 : 0;
  const [displayCircle, setDisplayCircle2] = useState(true);
  const [count, setCount2] = useState(75); 
  
  const fetchProductData = async () => {
    if (!productId) return;
    try {
      const response = await axios.get(`/products/vendor/${productId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
        });
      
      const product = response.data; 
      if (product.price !== undefined) setPrice(product.price); 
      if (product.discount !== undefined) setDiscount(product.discount);

    } catch (err) {
      console.error("Error fetching product data:", err);
    }
  };

const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const value = e.target.value;
  setPrice(Number(value)); // convert string input to number
};
const handleDiscountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const value = e.target.value;
  setDiscount(Number(value)); // convert string input to number
};
  const handleAPI = async (e?: React.FormEvent) => {
    e?.preventDefault(); 
    const priceValue = Number(price);
    const discountValue = Number(discount);

    axios({
      method: "PUT",
      url: `/products/vendor/add-price-info/${productId}`,
      data: {
        price: priceValue,
        discount: discountValue,
      },
      headers: {
        Authorization: `Bearer ${localStorage.getItem("userToken")}`,
      },
    })
      .then((res) => {
        console.log(res);
        showToast("success", res.data.message);
        window.location.replace("./inventory/");
      })
      .catch((err) => {
        console.error(err);
        showToast("error", err.response?.data?.message || err.message);
      });
  };

  // useEffect(() => {
  //   fetchProductData(); 
  //   setCount(75);
  //   handleBtnFunc(handleAPI); 
  //   if (setDisplayCircle2) setDisplayCircle2(false);
  //   if (setBtnText) setBtnText("CONFIRM");
    
  //   return () => {
  //     handleBtnFunc(() => console.log("default"));
  //   };
  // }, [productId]); 
  return (
    <Suspense fallback={<div>Loading...</div>}>

    <div className="py-3">
      <form onSubmit={handleAPI}> 
        <div className="pb-3">
          <input
            type="number" 
            id="productPrice"
            onChange={handlePriceChange}
            value={price}
            required
            className="w-full px-4 py-3 rounded-xl outline-none bg-inherit border-[0.67px] border-[#C5C6CC] placeholder:text-[#8F9098]"
            placeholder="NGN 0.00"
          />
          <p className={`text-xs pt-2 text-[#8F9098] ${openSansFont}`}>
            Product Price {price}
          </p>
          <p className={`text-xs pt-2 text-[#8F9098] ${openSansFont}`}>
            {Number(price) > 0 && (
              <span className="text-sm text-[#333]">
                You earn ₦{earnAmount.toLocaleString(undefined, {minimumFractionDigits: 2})}
              </span>
            )}
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
            type="number" 
            id="discount"
            onChange={handleDiscountChange}
            value={discount}
            required
            className="w-full px-4 py-3 rounded-xl outline-none bg-inherit border-[0.67px] border-[#C5C6CC] placeholder:text-[#8F9098]"
            placeholder="% 10"
          />
          <span className={`text-[#71727A] text-sm  ${openSansFont}`}>
            Purchase Discount
          </span>
        </div>
        <div className="flex items-center justify-center pt-3 pb-40 gap-6 w-full">
            <button
                type="submit"
                className="rounded-[12px] py-5 px-4 text-base font-semibold leading-[14.52px] text-center block w-full bg-[--foreground-green] text-white scale-100 hover:scale-90 transition-all duration-500"
            >
                {setBtnText ? "CONFIRM" : "NEXT"} 
            </button>
            <div>
              {displayCircle ? (
                <Circle count={count} size={48}>
                  <Icon
                    icon="akar-icons:arrow-right"
                    className="text-xl text-[--foreground-green] font-extrabold"
                  ></Icon>
                </Circle>
              ) : (
                ""
              )}
            </div>
        </div>
      </form>
    </div>
    </Suspense>
  );
};

export default Pricing;