'use client'
import { Icon } from "@iconify/react/dist/iconify.js"
import Image from "next/image"
import { FC, useState } from "react"
import producImage from '@/assets/images/product-profile.png'
import ProductProfileTab from "@/components/tabs/ProductProfileTab"

type pagePropsType = {

}


const page:FC<pagePropsType> = () => {
  const [active, setActive] = useState('profile')
  return (
    <div>
        <button>.
            <Icon icon='mingcute:close-fill' className="text-[#2F3036]" />
        </button>
        <div className="product-image">
          <Image src={producImage} alt='product image' className="w-full" />
        </div>
        <ProductProfileTab activeTab={active} setActiveTab={setActive} />
        <h1>Libmot Technologies</h1>
        <div></div>
        <p>The perfect T-shirt for when you want to feel comfortable but still stylish. Amazing for all occasions. 
        Made of 100% cotton fabric in four colours. Its modern style gives a lighter look to the outfit. Perfect for the warmest days.</p>
    </div>
  )
}

export default page