// import React, { FC, useState } from 'react';
// import { Icon } from '@iconify/react';
// import { CartItemT } from '@/types/Product.types';
// import axios from "@/utils/axios";
// import { showToast } from '@/utils/alert';
// import Image from 'next/image';


// interface BagProps {
//     item: CartItemT;
//     quantity: number;
//     setQuantity: (newQuantity: number) => void;
// }

// const BagItem: FC<BagProps> = ({ item }) => {
//   const updateCart  = (id: string, action: string) =>{
//     const userToken = localStorage.getItem("userToken") || "";
//      const tr = JSON.parse(userToken);
//     axios({
//       method: "PUT",
//       url: "cart/update/",
//       data:{productId:id, action},
//       headers: {
//         Authorization: `Bearer ${localStorage.getItem("userToken")}`,
//       },
//     })
//       .then((res) => {
//         showToast("success","Item updated")
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   }
//   return (
//     <div className="flex items-center justify-between border-b py-4">
//       {/* Image Placeholder */}
//       <div className="flex items-center">
//         <div className="w-[100px] h-[100px] bg-gray-200 rounded-md mr-4 flex items-center justify-center">
//           <Image src={item.productId?.images?.[0]} width={100} height={100} alt='' className="text-gray-400 text-2xl" />
//         </div>
//         {/* Item Details */}
//         <div>
//           <h3 className="font-semibold">{item.productId.name}</h3>
//           {/* <p className="text-sm text-gray-500">{item.color} / {item.size}</p> */}
//           {/* Quantity Selector */}
//         <div className="flex items-center  rounded-full">
//           <button 
//           onClick={()=>updateCart(item.productId._id, "minus")}
//             className=" py-1 text-gray-600"
//           >
//             <span className='px-2 py-[1px] border bg-[#EAF2FF] text-[#006838] rounded-full'>-</span>
//           </button>
//           <span className="px-3">{item.quantity}</span>
//           <button 
//             onClick={()=>updateCart(item.productId._id, "plus")}
//             className=" py-1 text-gray-600"
//           >
//           <span className='px-2 py-[2px] border bg-[#EAF2FF] text-[#006838] rounded-full'>+</span>
//           </button>
//         </div>
//         </div>
//       </div>

//       {/* Quantity and Price */}
//       <div className="flex items-center space-x-4">
        
//         {/* Price */}
//         <span className="font-extrabold">₦ {item.price}</span>
//       </div>
//     </div>
//   );
// };


// export default BagItem;
import React, { FC } from 'react';
import { Icon } from '@iconify/react';
import { CartItemT } from '@/types/Product.types';
import axios from "@/utils/axios";
import { showToast } from '@/utils/alert';
import Image from 'next/image';
import Swal from 'sweetalert2';

interface BagProps {
    item: CartItemT;
    quantity: number;
    setQuantity: (newQuantity: number) => void;
}

const BagItem: FC<BagProps> = ({ item }) => {
  const updateCart = (id: string, action: string) => {
    // const userToken = localStorage.getItem("userToken") || "";
    // const tr = JSON.parse(userToken);
    axios({
      method: "PUT",
      url: "cart/update/",
      data: { productId: id, action },
      headers: {
        Authorization: `Bearer ${localStorage.getItem("userToken")}`,
      },
    })
      .then(() => {
        showToast("success", "Item updated");
      })
      .catch((error) => {
         if(error.response.data.message==="Unauthorized access"){
                          Swal.fire({
                            title: "Session Expired",
                            text: "Your session has expired. Please log in again.",
                            icon: "warning",
                            confirmButtonText: "OK",
                          }).then(() => {
                            localStorage.clear();
                            window.location.replace("/auth/login");
                          });
                          return;
                        }
        console.error(error);
      });
  };

  return (
    <div className="flex items-center justify-between border-b py-4">
      <div className="flex items-center">
        <div className="w-[100px] h-[100px] bg-gray-200 rounded-md mr-4 flex items-center justify-center">
          <Image
            src={item.productId?.images?.[0] || 'https://res.cloudinary.com/wise-solution-inc/image/upload/v1729911544/fulllogo_full_green_1_gg1urs.png'} // fallback if image is missing
            width={100}
            height={100}
            alt={item.productId?.name || 'Product image'}
            className="text-gray-400 text-2xl"
          />
        </div>
        <div>
          {/* <h3 className="font-semibold">{item.productId.name}</h3> */}
          <div className="flex items-center rounded-full">
            <button
              onClick={() => updateCart(item.productId._id, "minus")}
              className="py-1 text-gray-600"
            >
              <span className='px-2 py-[1px] border bg-[#EAF2FF] text-[#006838] rounded-full'>-</span>
            </button>
            <span className="px-3">{item.quantity}</span>
            <button
              onClick={() => updateCart(item.productId._id, "plus")}
              className="py-1 text-gray-600"
            >
              <span className='px-2 py-[2px] border bg-[#EAF2FF] text-[#006838] rounded-full'>+</span>
            </button>
          </div>
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <span className="font-extrabold">₦ {item.price}</span>
      </div>
    </div>
  );
};

export default BagItem;
