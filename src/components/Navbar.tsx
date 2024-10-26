"use client";
import Image from 'next/image'
import Link from 'next/link'
import logoTitle from '@/assets/images/logoTitle.png'
import useToggle from '@/hooks/useToggle'
import { Icon } from '@iconify/react';


// constant Types
type NavbarType = {
    children: React.ReactNode | JSX.Element | string | Array<React.ReactNode | JSX.Element | string>
}
type navLinksType = {
    title: string,
    url: string
}[]


// arrays
const links: navLinksType = [
 {
        title: 'About Us',
        url: '/about'
    }, {
        title: 'Contact',
        url: '/contact'
    }
];


// constant styles
const TbtnIonstyle = "w-[26.91px] h-[3.84px] bg-black rounded-full leading-none"

const logo = 'https://res.cloudinary.com/wise-solution-inc/image/upload/v1729911544/fulllogo_full_green_1_gg1urs.png'

// returned JSX.Elements
const Navbar = ({ children }: NavbarType) => {
    const [Ts, Tfunc] = useToggle(false);
    return (
        <header className='pt-[35.17px] px-[--padding-x] flex justify-between relative'>
            <Link href='/'>
                <div className={`logo-header flex gap-[19px] items-center`}>
                    <div className={`logo w-[30.05px] xl:w-[35.53px]`}>
                        <Image src={logo} alt='logo-image' />
                    </div>
                    <div className={`logo-title w-[122.94px] xl:w-[145.37px]`}>
                        <Image src={logoTitle} alt='logoTItle' />
                    </div>
                </div>
            </Link>

            <div className="toggle-button flex lg:hidden items-center py-3">
                <button onClick={Tfunc}>
                    <div className={`transition-all duration-200 ${TbtnIonstyle} ${Ts ? "rotate-45 -mb-[3.84px]" : ''}`}></div>
                    <div className={`${TbtnIonstyle} my-1 ${Ts ? "hidden" : "block"}`}></div>
                    <div className={`transition-all duration-200 ${TbtnIonstyle} ${Ts ? "-rotate-45" : ''}`}></div>
                </button>
            </div>
            <div className={`nav hidden lg:flex items-center`}>
                <ul className={`flex gap-[29px]`}>
                    {links.map(({ title, url }, index) => (
                        <li key={title + index} className={`nav-link`}><Link href={url} className='hover:font-semibold text-black text-xs border-b-2 border-transparent hover:border-b-[--foreground-orange] transition-all duration-200'>{title}</Link></li>
                    ))}
                </ul>
            </div>
            <div className={`buttons hidden lg:flex gap-5`}>
                <button className='text-[11.6px] leading-[17.4px] flex gap-1 items-center cursor-pointer'>
                    <Icon icon={`fontisto:world-o`} className='' />
                    <span>Eng</span>
                    <Icon icon={`bi:chevron-down`} className='' />
                </button>
                {children}
            </div>

            <div className={`nav-bar-container top-full left-0 z-50 absolute w-full bg-white overflow-hidden transition-all duration-300 translate-y-1 ${Ts ? 'max-h-[1000px]' : 'max-h-0'}`}>
                <div className="content flex flex-col items-end  py-11 px-9">
                    <button className='text-[11.6px] leading-[17.4px] flex gap-1 items-center cursor-pointer mb-7'>
                        <Icon icon={`fontisto:world-o`} className='font-semibold' />
                        <span>Eng</span>
                        <Icon icon={`bi:chevron-down`} className='font-semibold' />
                    </button>
                    <div className='mb-16'>
                        {children}
                    </div>
                    <ul className={`flex flex-col gap-[29px] pb-16 items-end`}>
                        {links.map(({ title, url }, index) => (
                            <li key={title + index} className={`nav-link`}><Link href={url} className='hover:font-semibold text-black text-xl'>{title}</Link></li>
                        ))}
                    </ul>
                </div>
            </div>
        </header>
    )
}

export default Navbar;