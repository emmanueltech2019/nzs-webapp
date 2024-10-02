import { Icon } from "@iconify/react/dist/iconify.js"
import Image from "next/image"
import { FC } from "react"
import producImage from '@/assets/images/product-profile.png'
import ProductProfileTab from "@/components/tabs/ProductProfileTab"

type pagePropsType = {

}


const page:FC<pagePropsType> = () => {
  return (
    <div>
        <button>
            <Icon icon='mingcute:close-fill' className="text-[#2F3036]" />
        </button>
        <div className="product-image">
          <Image src={producImage} alt='product image' className="w-full" />
        </div>
        <ProductProfileTab activeTab="" setActiveTab={() => {}} />
    </div>
  )
}

export default page