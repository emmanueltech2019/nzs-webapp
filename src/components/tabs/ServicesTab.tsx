import React, {FC} from 'react'
import { Inter } from 'next/font/google';

const inter = Inter({
  display: "swap",
  subsets: ["latin"],
  // variable: '--font-poppins',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
})
interface ServicesTabProps{
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const ServicesTab: FC<ServicesTabProps> = ({ activeTab, setActiveTab }) => {

  return (
    <div className='flex items-center w-full md:w-[90%] md:mx-[40px] border-b-[2px] '>
      <button onClick={() => setActiveTab('ROUTES')} className={`font-sans text-xs text-center uppercase w-full p-4 transition duration-700 ${activeTab === 'ROUTES' ? 'bg-[#EAF2FF] border-b-4 border-[#006838] text-[#71727A] font-bold' : `border-b-[#0C1F1F33] ${inter.className} antialiased`}`}>
        Routes 
      </button>
      <button onClick={() => setActiveTab('REVEIWS')} className={`font-sans text-xs text-center uppercase w-full p-4 transition duration-700 ${activeTab === 'REVEIWS' ? 'bg-[#EAF2FF] border-b-4 border-[#006838] text-[#71727A] font-bold' : `border-b-[#0C1F1F33] ${inter.className} antialiased`}`}>
        Reviews
      </button>
    </div>
  )
}

export default ServicesTab