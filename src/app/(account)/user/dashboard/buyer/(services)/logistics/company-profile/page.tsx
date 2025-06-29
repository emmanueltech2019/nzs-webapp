'use client'
import { Icon } from "@iconify/react/dist/iconify.js"
import Image from "next/image"
import { FC, useState } from "react"
import producImage from '@/assets/images/product-profile.png'
import ProductProfileTab from "@/components/tabs/ProductProfileTab"
import openSansFont from "@/fonts/OpenSans"
import { useRouter } from "next/navigation"
import Profile from "./components/Profile"
import Routes from "./components/Routes"


const page: FC = () => {
  const [active, setActive] = useState('profile')
  const router = useRouter()
  return (
    <div className={`${openSansFont} md:max-w-[80%] mx-auto`}>
      <button className="py-[30px] ms-[1rem] cursor-pointer" onClick={router.back}>
        <Icon icon='mingcute:close-fill' className="text-2xl text-[#2F3036]" />
      </button>
      <div className="product-image max-h-[534px] overflow-hidden">
        <Image src={producImage} alt='product image' className="w-full h-[400px] object-cover" />
      </div>
      <div className="py-6 px-2">
        <ProductProfileTab activeTab={active} setActiveTab={setActive} />
      </div>
      {active == 'profile' && <Profile />}
      {active == 'routes' && <Routes />}
    </div>
  )
}

export default page
