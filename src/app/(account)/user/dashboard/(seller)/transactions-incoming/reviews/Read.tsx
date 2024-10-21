import React from 'react'
import Image from 'next/image'
import img1 from './img/image.png'
import img2 from './img/image copy.png'
import userimg1 from './img/image copy 2.png'
import userimg2 from './img/image copy 3.png'


const Read = () => {

  const reviews = [
    {
      productImage: img1,
      title: "Amazing Shoe",
      price: "₦ 12.00",
      userProfile: userimg2,
      username: "Monye Fubara",
      rating: "4.8",
      time: "1 hr ago",
      review: "Their timely and reliable delivery service helped us streamline our operations...",

    }
  ]

  return (
    <div>
      <div>

      </div>
    </div>
  )
}

export default Read