import React, { useState } from 'react'
import Image from 'next/image'
import img1 from './img/image.png'
import img2 from './img/image copy.png'
import userimg1 from './img/image copy 2.png'
import userimg2 from './img/image copy 3.png'
import { div } from 'framer-motion/client'
import { Icon } from '@iconify/react/dist/iconify.js'
import { Rubik } from "next/font/google"



const rubik = Rubik({
  display: "swap",
  subsets: ["latin"],
  // variable: '--font-poppins',
  weight: ['300', '400', '500', '600', '700', '800', '900'],
})


const Read = () => {

  const [textState, setTextState] = useState(false);

  const reviews = [
    {
      productImage: img1,
      title: "Amazing Shoe",
      price: "₦ 12.00",
      userProfile: userimg2,
      username: "Monye Fubara",
      rating: "4.8",
      time: "1 hr ago",
      review: "Their timely and reliable delivery service helped us streamline our operations and meet customer demands faster than ever. With real-time tracking and exceptional customer support, we never have to worry about where our shipments are. ",
    },
    
    {
      productImage: img2,
      title: "Amazing Shoe",
      price: "₦ 12.00",
      userProfile: userimg1,
      username: "Kolawole Folarin",
      rating: "4.8",
      time: "1 hr ago",
      review: "Their timely and reliable delivery service helped us streamline our operations and meet customer demands faster than ever. With real-time tracking and exceptional customer support, we never have to worry about where our shipments are. ",

    },
    {
      productImage: img1,
      title: "Amazing Shoe",
      price: "₦ 12.00",
      userProfile: userimg2,
      username: "Monye Fubara",
      rating: "4.8",
      time: "1 hr ago",
      review: "Their timely and reliable delivery service helped us streamline our operations and meet customer demands faster than ever. With real-time tracking and exceptional customer support, we never have to worry about where our shipments are. ",

    },
  ]

 

  return (
    <div className='md:max-w-[90%] m-auto'>
      <div className='grid gap-10'>
        {
          reviews.map((review, index) => (
            <div key={index} className='bg-[#EAF2FF] py-[10px] px-3 rounded-2xl h-auto md:h-[376px]'>
              {/* product img */}
              <div>
                <Image src={review.productImage} className='rounded-lg h-[124px] md:h-[186px] object-cover' alt="alt" />
              </div>

              {/* review card head */}
              <div className='flex justify-between p-[5px]'>
                <div className='font-sans text-[#1F2024]'>
                  <p className='text-[12px] font-normal'>{review.title}</p>
                  <h2 className='font-extrabold text-[14px]'>{review.price}</h2>
                </div>

                {/* view more button */}
                <div className='flex items-center gap-1'>
                  <button className='bg-[#EBEDEB] font-sans text-[9px] text-[#0C1F1F] font-normal py-1 px-4 rounded-[15px]'>View more</button>
                  <Icon
                    icon="tabler:chevron-down"
                    // onClick={() => handleAccordionToggle(index)}
                    className={`text-[#0C1F1F80] text-[14px] cursor-pointer transition-transform duration-500 ease-in-out`} // Rotate arrow for opening/closing effect
                  />
                </div>
              </div>

              {/* review */}
              <div className="flex justify-start gap-3 md:gap-10 p-[5px]">
                {/* profile img */}
                <div className='py-2 block justify-center items-center w-[190px]'>
                  <Image src={review.userProfile} className='h-[40px] w-[40px] rounded-full' alt="alt" />
                </div>

                {/* review text */}
                <div>
                  <div className="flex items-center justify-between w-[90%] gap-2">
                    <div className='flex justify-between gap-9'>
                    <h3 className="text-sm text-[#573926] font-medium">Monye Fubara</h3>
                    <span className="text-sm text-[#707070] font-normal">{review.rating}</span>
                    </div>
                    <p className="text-xs text-[#707070] font-normal">1hr ago</p>
                  </div>
                  <p className={`text-[13px] text-[#573926] font-normal w-full ${rubik.className} antialiased md:w-[95%]`}
                  
                  ></p>

                  {/* like comment and share Icons */}
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-4">
                      <Icon icon="ant-design:like-outlined" className="text-[#D6CCC6] text-[23px]"></Icon>
                      <Icon icon="hugeicons:comment-02" className="text-[#D6CCC6] text-[23px]"></Icon>
                    </div>

                    {/* share */}
                    <div>
                      <Icon icon="ph:share-fat" className="text-[#D6CCC6] text-[23px]"></Icon>
                    </div>
                  </div>
                </div>


              </div>


            </div>
          ))
        }
      </div>
    </div>
  )
}

export default Read