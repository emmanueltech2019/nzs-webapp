// "use client";
// import Image from 'next/image'
// import Link from 'next/link'
// import logoTitle from '@/assets/images/logoTitle.png'
// import useToggle from '@/hooks/useToggle'
// import { Icon } from '@iconify/react';


// // constant Types
// type NavbarType = {
//     children: React.ReactNode | JSX.Element | string | Array<React.ReactNode | JSX.Element | string>
// }
// type navLinksType = {
//     title: string,
//     url: string
// }[]


// // arrays
// const links: navLinksType = [
//      {
//         title: 'Shop',
//         url: '/shop'
//     },
//  {
//         title: 'About Us',
//         url: '/about'
//     }, {
//         title: 'Contact',
//         url: '/contact'
//     }

// ];


// // constant styles
// const TbtnIonstyle = "w-[26.91px] h-[3.84px] bg-black rounded-full leading-none"

// const logo = 'https://res.cloudinary.com/wise-solution-inc/image/upload/v1729911544/fulllogo_full_green_1_gg1urs.png'

// // returned JSX.Elements
// const Navbar = ({ children }: NavbarType) => {
//     const [Ts, Tfunc] = useToggle(false);
//     return (
//         <header className='pt-[35.17px] px-[--padding-x] flex justify-between relative'>
//             <Link href='/'>
//                 <div className={`logo-header flex gap-[8px] items-center`}>
//                     <div className={`logo w-[35.05px] xl:w-[35.53px]`}>
//                         <Image src={logo} width={250} height={250} alt='logo-image' />
//                     </div>
//                     <div className={`logo-title w-[122.94px] xl:w-[145.37px]`}>
//                         <Image src={logoTitle} width={100} height={100} alt='logoTItle' />
//                     </div>
//                 </div>
//             </Link>

//             <div className="toggle-button flex lg:hidden items-center py-3">
//                 <button onClick={Tfunc}>
//                     <div className={`transition-all duration-200 ${TbtnIonstyle} ${Ts ? "rotate-45 -mb-[3.84px]" : ''}`}></div>
//                     <div className={`${TbtnIonstyle} my-1 ${Ts ? "hidden" : "block"}`}></div>
//                     <div className={`transition-all duration-200 ${TbtnIonstyle} ${Ts ? "-rotate-45" : ''}`}></div>
//                 </button>
//             </div>
//             <div className={`nav hidden lg:flex items-center`}>
//                 <ul className={`flex gap-[29px]`}>
//                     {links.map(({ title, url }, index) => (
//                         <li key={title + index} className={`nav-link`}><Link href={url} className='hover:font-semibold text-black text-xs border-b-2 border-transparent hover:border-b-[--foreground-orange] transition-all duration-200'>{title}</Link></li>
//                     ))}
//                 </ul>
//             </div>
//             <div className={`buttons hidden lg:flex gap-5`}>
//                 <button className='text-[11.6px] leading-[17.4px] flex gap-1 items-center cursor-pointer'>
//                     <Icon icon={`fontisto:world-o`} className='' />
//                     <span>Eng</span>
//                     <Icon icon={`bi:chevron-down`} className='' />
//                 </button>
//                 {children}
//             </div>

//             <div className={`nav-bar-container top-full left-0 z-50 absolute w-full bg-white overflow-hidden transition-all duration-300 translate-y-1 ${Ts ? 'max-h-[1000px]' : 'max-h-0'}`}>
//                 <div className="content flex flex-col items-end  py-11 px-9">
//                     <button className='text-[11.6px] leading-[17.4px] flex gap-1 items-center cursor-pointer mb-7'>
//                         <Icon icon={`fontisto:world-o`} className='font-semibold' />
//                         <span>Eng</span>
//                         <Icon icon={`bi:chevron-down`} className='font-semibold' />
//                     </button>
//                     <div className='mb-16'>
//                         {children}
//                     </div>
//                     <ul className={`flex flex-col gap-[29px] pb-16 items-end`}>
//                         {links.map(({ title, url }, index) => (
//                             <li key={title + index} className={`nav-link`}><Link href={url} className='hover:font-semibold text-black text-xl'>{title}</Link></li>
//                         ))}
//                     </ul>
//                 </div>
//             </div>
//         </header>
//     )
// }

// export default Navbar;
"use client";
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Icon } from '@iconify/react';
import logoTitle from '@/assets/images/logoTitle.png';

// Types
type NavbarType = {
    children?: React.ReactNode | JSX.Element | string | Array<React.ReactNode | JSX.Element | string>;
};

type NavLinksType = {
    title: string;
    url: string;
}[];

// Constants
const links: NavLinksType = [
    { title: 'Shop', url: '/shop' },
    { title: 'About Us', url: '/about' },
    { title: 'Contact', url: '/contact' }
];

const logo = 'https://res.cloudinary.com/wise-solution-inc/image/upload/v1729911544/fulllogo_full_green_1_gg1urs.png';

const Navbar = ({ children }: NavbarType) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const pathname = usePathname();

    // Handle scroll effect for sticky navbar
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close mobile menu when route changes
    useEffect(() => {
        setIsOpen(false);
    }, [pathname]);

    // Prevent scrolling when mobile menu is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [isOpen]);

    return (
        <header 
            className={`sticky top-0 z-50 w-full transition-all duration-300 ${
                isScrolled ? 'bg-white/90 backdrop-blur-md shadow-sm py-4' : 'bg-white py-6'
            } px-[--padding-x] sm:px-8 lg:px-12`}
        >
            <div className="flex justify-between items-center max-w-7xl mx-auto">
                
                {/* --- LOGO --- */}
                <Link href="/" className="relative z-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#006838] rounded-sm">
                    <div className="flex gap-2 items-center hover:opacity-90 transition-opacity">
                        <div className="w-[35px] xl:w-[40px]">
                            <Image src={logo} width={250} height={250} alt="Logo Icon" priority className="w-full h-auto object-contain" />
                        </div>
                        <div className="w-[122px] xl:w-[145px]">
                            <Image src={logoTitle} width={300} height={100} alt="Logo Title" priority className="w-full h-auto object-contain" />
                        </div>
                    </div>
                </Link>

                {/* --- DESKTOP NAVIGATION --- */}
                <nav className="hidden lg:flex items-center">
                    <ul className="flex gap-8 xl:gap-12">
                        {links.map(({ title, url }, index) => {
                            const isActive = pathname === url || (pathname.startsWith(url) && url !== '/');
                            return (
                                <li key={title + index}>
                                    <Link 
                                        href={url} 
                                        className={`text-sm font-medium transition-all duration-300 relative group py-2
                                            ${isActive ? 'text-[#006838]' : 'text-gray-700 hover:text-[#006838]'}
                                        `}
                                    >
                                        {title}
                                        {/* Animated underline */}
                                        <span className={`absolute bottom-0 left-0 h-[2px] bg-[--foreground-orange] transition-all duration-300 
                                            ${isActive ? 'w-full' : 'w-0 group-hover:w-full'}
                                        `}></span>
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </nav>

                {/* --- DESKTOP ACTIONS --- */}
                <div className="hidden lg:flex items-center gap-6">
                    <button className="flex items-center gap-1.5 text-sm font-medium text-gray-700 hover:text-black transition-colors px-2 py-1 rounded-md hover:bg-gray-100">
                        <Icon icon="fontisto:world-o" className="text-lg" />
                        <span>Eng</span>
                        <Icon icon="bi:chevron-down" className="text-[10px] mt-0.5" />
                    </button>
                    <div className="flex items-center gap-4">
                        {children}
                    </div>
                </div>

                {/* --- MOBILE TOGGLE BUTTON --- */}
                <button 
                    onClick={() => setIsOpen(!isOpen)}
                    className="lg:hidden relative z-50 p-2 text-gray-800 focus:outline-none"
                    aria-label="Toggle navigation menu"
                    aria-expanded={isOpen}
                >
                    <div className="w-6 flex flex-col items-end gap-1.5">
                        <span className={`block h-[2px] bg-black transition-all duration-300 ease-in-out ${isOpen ? 'w-6 rotate-45 translate-y-[8px]' : 'w-6'}`}></span>
                        <span className={`block h-[2px] bg-black transition-all duration-300 ease-in-out ${isOpen ? 'w-0 opacity-0' : 'w-5'}`}></span>
                        <span className={`block h-[2px] bg-black transition-all duration-300 ease-in-out ${isOpen ? 'w-6 -rotate-45 -translate-y-[8px]' : 'w-4'}`}></span>
                    </div>
                </button>

            </div>

            {/* --- MOBILE OVERLAY & MENU --- */}
            <div className={`fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-300 ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`} onClick={() => setIsOpen(false)}></div>
            
            <div className={`absolute top-full left-0 w-full bg-white border-t border-gray-100 shadow-xl z-40 lg:hidden overflow-hidden transition-all duration-300 ease-in-out transform origin-top ${isOpen ? 'scale-y-100 opacity-100' : 'scale-y-0 opacity-0'}`}>
                <div className="flex flex-col p-6 sm:p-8">
                    
                    <ul className="flex flex-col gap-6 mb-8 mt-4">
                        {links.map(({ title, url }, index) => {
                            const isActive = pathname === url;
                            return (
                                <li key={title + index} className="w-full">
                                    <Link 
                                        href={url} 
                                        className={`block text-2xl font-medium transition-colors
                                            ${isActive ? 'text-[#006838]' : 'text-gray-800 hover:text-gray-500'}
                                        `}
                                    >
                                        {title}
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>

                    <div className="h-[1px] w-full bg-gray-100 mb-8"></div>

                    <div className="flex flex-col gap-6 items-start">
                        <button className="flex items-center gap-2 text-lg font-medium text-gray-700">
                            <Icon icon="fontisto:world-o" />
                            <span>English</span>
                            <Icon icon="bi:chevron-down" className="text-sm" />
                        </button>
                        <div className="w-full flex justify-start">
                            {children}
                        </div>
                    </div>

                </div>
            </div>
        </header>
    );
};

export default Navbar;