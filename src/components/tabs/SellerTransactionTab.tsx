import React, {FC} from 'react'
import { Inter } from 'next/font/google';

const inter = Inter({
  display: "swap",
  subsets: ["latin"],
  // variable: '--font-poppins',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
})
interface SellerTabProps{
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const SellerTransactionTab: FC<SellerTabProps> = ({ activeTab, setActiveTab }) => {

  return (
    <div className='flex items-center w-full md:w-[90%] md:mx-[40px] border-b-[2px] '>
      <button onClick={() => setActiveTab('Orders')} className={`font-sans text-xs text-center uppercase w-full p-4 transition duration-700 ${activeTab === 'Orders' ? 'bg-[#EAF2FF] border-b-4 border-[#006838] text-[#71727A] font-bold' : `border-b-[#0C1F1F33] ${inter.className} antialiased`}`}>
        Orders
      </button>
      <button onClick={() => setActiveTab('Reviews')} className={`font-sans text-xs text-center uppercase w-full p-4 transition duration-700 ${activeTab === 'Reviews' ? 'bg-[#EAF2FF] border-b-4 border-[#006838] text-[#71727A] font-bold' : `border-b-[#0C1F1F33] ${inter.className} antialiased`}`}>
        Reviews
      </button>
    </div>
  )
}

export default SellerTransactionTab