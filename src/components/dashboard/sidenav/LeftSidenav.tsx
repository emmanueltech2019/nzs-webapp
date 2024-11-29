'use client'
import React, { useEffect, useState } from 'react'
import Box from '../../Box'
import { links, linksSeller } from './NavlinkObj'
import Link from 'next/link'
import { Icon } from '@iconify/react/dist/iconify.js'
import { usePathname } from 'next/navigation'
import axios from "@/utils/axios";
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
interface User {
  firstname: string;
  lastname: string;
  email: string;
  accountType: "buyer" | "seller";
}


const LeftSidenav = () => {
  const pathname = usePathname()
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (!localStorage.getItem("userToken")) {
      console.error("User token is missing.");
      return;
    }

    axios({
      method: "GET",
      url: "/users/profile", 
      headers: {
        Authorization: `Bearer ${localStorage.getItem("userToken")}`,
      },
    })
      .then((res) => {
        console.log(res.data.user); 
        setUser(res.data.user); 
      })
      .catch((error) => {
        console.error("Error fetching profile:", error);
      });
  }, []);
  return (
    <>
     {/* <div className='bg-[#006838] fixed z-[10000] text-[#D4D6DD] bottom-24 rounded-e-full left-0  p-5'>
      <SearchOutlinedIcon fontSize={'medium'}/>
      </div> */}
    <div className=' bg-[#006838] text-[#D4D6DD] flex justify-between items-center md:flex-col flex-row md:sticky fixed md:top-0 bottom-0 md:h-screen overflow-y-auto md:max-h-[1200px] md:min-w-[23vw] md:max-w-[241px] w-screen md:py-[70px] py-4 md:ps-[35px]'>
      <div className="box flex-1 self-start hidden lg:flex">
        <Box />
      </div>

      <nav className='md:mt-[57px] flex-[3] w-full'>
      {user?.accountType == "buyer" ? (
  <ul className="flex flex-row lg:flex-col h-full md:w-fit w-screen px-5 justify-between lg:justify-around">
    <li className="cursor-pointer text-[#D4D6DD]">
      <Link href="/user/dashboard">
        <div
          className={`flex md:flex-row flex-col items-center gap-[10px] pr-4 lg:border-transparent ${
            pathname.startsWith('/user/dashboard') ? 'lg:border-[#D4D6DD]' : ''
          }`}
        >
          <Icon
            icon="mdi:cart-variant"
            className={`text-[30px] ${
              pathname.startsWith('/user/dashboard') ? 'text-[#D4D6DD]' : 'text-[#D4D6DD]'
            }`}
          ></Icon>
          <p
            className={`text-[14px] leading-[22.99px] lg:block font-[400] ${
              pathname.startsWith('/user/dashboard') ? 'text-[#D4D6DD]' : 'text-inherit'
            }`}
          >
            Explore
          </p>
        </div>
      </Link>
    </li>
    <li className="cursor-pointer text-[#D4D6DD]">
      <Link href="">
        <div
          className={`flex md:flex-row flex-col items-center gap-[10px] pr-4 lg:border-transparent ${
            pathname.startsWith('/user/dashboard/transaction') ? 'lg:border-[#D4D6DD]' : ''
          }`}
        >
          <Icon
            icon="ep:search"
            className={`text-[30px] ${
              pathname.startsWith('/user/dashboard/transaction') ? 'text-[#D4D6DD]' : 'text-[#D4D6DD]'
            }`}
          ></Icon>
          <p
            className={`text-[14px] leading-[22.99px] lg:block font-[400] ${
              pathname.startsWith('/user/dashboard/transaction') ? 'text-[#D4D6DD]' : 'text-inherit'
            }`}
          >
            Search
          </p>
        </div>
      </Link>
    </li>
    <li className="cursor-pointer text-[#D4D6DD]">
      <Link href="/user/dashboard/transaction">
        <div
          className={`flex md:flex-row flex-col items-center gap-[10px] pr-4 lg:border-transparent ${
            pathname.startsWith('/user/dashboard/transaction') ? 'lg:border-[#D4D6DD]' : ''
          }`}
        >
          <Icon
            icon="ep:menu"
            className={`text-[30px] ${
              pathname.startsWith('/user/dashboard/transaction') ? 'text-[#D4D6DD]' : 'text-[#D4D6DD]'
            }`}
          ></Icon>
          <p
            className={`text-[14px] leading-[22.99px] lg:block font-[400] ${
              pathname.startsWith('/user/dashboard/transaction') ? 'text-[#D4D6DD]' : 'text-inherit'
            }`}
          >
            Transaction
          </p>
        </div>
      </Link>
    </li>
    <li className="cursor-pointer text-[#D4D6DD]">
      <Link href="/user/dashboard/settings">
        <div
          className={`flex md:flex-row flex-col items-center gap-[10px] pr-4 lg:border-transparent ${
            pathname.startsWith('/user/dashboard/settings') ? 'lg:border-[#D4D6DD]' : ''
          }`}
        >
          <Icon
            icon="ri:settings-5-fill"
            className={`text-[30px] ${
              pathname.startsWith('/user/dashboard/settings') ? 'text-[#D4D6DD]' : 'text-[#D4D6DD]'
            }`}
          ></Icon>
          <p
            className={`text-[14px] leading-[22.99px] lg:block font-[400] ${
              pathname.startsWith('/user/dashboard/settings') ? 'text-[#D4D6DD]' : 'text-inherit'
            }`}
          >
            Settings
          </p>
        </div>
      </Link>
    </li>
  </ul>
) : <ul className='flex flex-row lg:flex-col h-full  md:w-fit w-screen px-5 justify-between lg:justify-around'>
{
  linksSeller.map(({text, icon, link}, index) => {
    const activeLink = pathname.startsWith(link)
    return (
      <li key={index} className='cursor-pointer text-[#D4D6DD]'>
        <Link href={link}>
          <div className={`flex md:flex-row flex-col items-center gap-[10px] pr-4  ${activeLink ? 'lg:border-[#D4D6DD]': 'lg:border-transparent'}`}>
            <Icon icon={icon} className={`text-[30px] ${activeLink ? 'text-[#D4D6DD]': 'text-[#D4D6DD]'}`}></Icon>
            <p className={`text-[14px] leading-[22.99px] lg:block font-[400] ${activeLink ? 'text-[#D4D6DD]': 'text-inherit'}`}>{text}</p>
          </div>
        </Link>
      </li>
    )
  })
}
 <li  className='cursor-pointer text-[#D4D6DD] md:hidden block'>
        <Link href={'/user/dashboard/settings'}>
          <div className={`flex md:flex-row flex-col items-center gap-[10px] pr-4  `}>
            <SettingsOutlinedIcon className={`text-[30px]`}/>
            <p className={`text-[14px] leading-[22.99px] lg:block font-[400] `}>Settings</p>
          </div>
        </Link>
      </li>
<li  className='cursor-pointer text-[#D4D6DD] hidden md:block'>
        <Link href={'/user/dashboard/seller/wallet'}>
          <div className={`flex md:flex-row flex-col items-center gap-[10px] pr-4  `}>
            <AccountBalanceWalletOutlinedIcon className={`text-[30px]`}/>
            <p className={`text-[14px] leading-[22.99px] lg:block font-[400] `}>Wallet</p>
          </div>
        </Link>
      </li>
</ul>}
{/* 
        {user?.accountType == "buyer" ? <ul className='flex flex-row lg:flex-col h-full  md:w-fit w-screen px-5 justify-between lg:justify-around'>
          {
            links.map(({text, icon, link}, index) => {
              const activeLink = pathname.startsWith(link)
              return (
                // <li key={index} className='cursor-pointer text-[#fff]'>
                //   <Link href={link}>
                //     <div className={`flex items-center gap-[10px] pr-4 border-e-4 ${activeLink ? 'border-[#fff]': 'border-transparent'}`}>
                //       <Icon icon={icon} className={`text-[34px] ${activeLink ? 'text-[#fff]': 'text-[#D4D6DD]'}`}></Icon>
                //       <p className={`text-[19px] leading-[22.99px] font-[400]  ${activeLink ? 'text-[#fff]': 'text-inherit'}`}>{text}</p>
                //     </div>
                //   </Link>
                // </li>
                <li key={index} className='cursor-pointer text-[#D4D6DD]'>
                  <Link href={link}>
                    <div className={`flex md:flex-row flex-col items-center gap-[10px] pr-4  ${activeLink ? 'lg:border-[#D4D6DD]': 'lg:border-transparent'}`}>
                      <Icon icon={icon} className={`text-[30px] ${activeLink ? 'text-[#D4D6DD]': 'text-[#D4D6DD]'}`}></Icon>
                      <p className={`text-[14px] leading-[22.99px] lg:block font-[400] ${activeLink ? 'text-[#D4D6DD]': 'text-inherit'}`}>{text}</p>
                    </div>
                  </Link>
                </li>
              )
            })
          }
        </ul>: <ul className='flex flex-row lg:flex-col h-full  md:w-fit w-screen px-5 justify-between lg:justify-around'>
          {
            linksSeller.map(({text, icon, link}, index) => {
              const activeLink = pathname.startsWith(link)
              return (
                <li key={index} className='cursor-pointer text-[#D4D6DD]'>
                  <Link href={link}>
                    <div className={`flex md:flex-row flex-col items-center gap-[10px] pr-4  ${activeLink ? 'lg:border-[#D4D6DD]': 'lg:border-transparent'}`}>
                      <Icon icon={icon} className={`text-[30px] ${activeLink ? 'text-[#D4D6DD]': 'text-[#D4D6DD]'}`}></Icon>
                      <p className={`text-[14px] leading-[22.99px] lg:block font-[400] ${activeLink ? 'text-[#D4D6DD]': 'text-inherit'}`}>{text}</p>
                    </div>
                  </Link>
                </li>
              )
            })
          }
           <li  className='cursor-pointer text-[#D4D6DD] md:hidden block'>
                  <Link href={'/user/dashboard/settings'}>
                    <div className={`flex md:flex-row flex-col items-center gap-[10px] pr-4  `}>
                      <SettingsOutlinedIcon className={`text-[30px]`}/>
                      <p className={`text-[14px] leading-[22.99px] lg:block font-[400] `}>Settings</p>
                    </div>
                  </Link>
                </li>
          <li  className='cursor-pointer text-[#D4D6DD] hidden md:block'>
                  <Link href={'/wallet'}>
                    <div className={`flex md:flex-row flex-col items-center gap-[10px] pr-4  `}>
                      <AccountBalanceWalletOutlinedIcon className={`text-[30px]`}/>
                      <p className={`text-[14px] leading-[22.99px] lg:block font-[400] `}>Wallet</p>
                    </div>
                  </Link>
                </li>
        </ul>}
        */}
      </nav>
     
      <div className='empty_element flex-1 flex flex-col justify-end self-start'></div>
    </div>
    </>
  )
}

export default LeftSidenav