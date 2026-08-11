// import Link from "next/link"
// import { Icon } from "@iconify/react/dist/iconify.js";

// const faqLinks = [{
//     text: "Are you a merchant",
//     path: "/"
// }, {
//     text: "Are you a merchant",
//     path: "/"
// }, {
//     text: "Sustainability Policy",
//     path: "/"
// }, {
//     text: "Pricing",
//     path: "/"
// }, {
//     text: "Security",
//     path: "/"
// }];

// const resourcesLinks = [{
//     text: "Careers",
//     sub: "HIRING",
//     path: "https://www.linkedin.com/company/naijazone-online-shopping-mall/jobs/"
// }];

// const aboutLinks = [{
//     text: "Shop",
//     path: "/shop"
// },{
//     text: "About",
//     path: "/about"
// },{
//     text: "Contact",
//     path: "/contact"
// }];

// const Footer = () => {
//     const linkTitle = 'text-base font-semibold'
//     const listItem = 'leading-[21.8px] text-sm mt-[21.5px] hover:underline transition-all duration'

//     return (
//         <section className="bg-[--foreground-green] text-white">
//             <div className="Footer-section px-[--padding-x] py-[30px] lg:pt-[62px] lg:pb-[58px] text-base lg:text-[13.05px] lg:leading-normal">
//                 <div className="row flex flex-col lg:flex-row lg:items-center gap-[61px] mb-[60px] md:mb-10">
//                     <div className="col flex-1">
//                         <p className="lg:max-w-[298.72px] mb-[30px] lg:mb-[28.5px]">
//                             Are you a merchant struggling to manage product sales and delivery in Nigeria?
//                         </p>
//                         <Link href={`/contact`} className="border-white border-[0.73px] hover:bg-white hover:text-[--foreground-green] text-center rounded-[20px] text-[15px] lg:text-[13px] py-[15px] lg:py-[13px] px-[26px]  lg:px-[22px] mb-[63px] transition-all duration-200">Contact Us Now</Link>
//                         <div className="social-links flex gap-[18px] text-lg mt-7 lg:mt-14">
//                             <Link href='https://www.facebook.com/Naijazone1' target="_blank"><span><Icon icon="fe:facebook" className="hover:opacity-50 transition-all duration-200" /></span></Link>
//                             <Link href='https://x.com/Naijazone_' target="_blank"><span><Icon icon="hugeicons:new-twitter" className="hover:opacity-50 transition-all duration-200" /></span></Link>
//                             <Link href='https://www.instagram.com/naijazone_/' target="_blank"><span><Icon icon="icon-park-outline:instagram" className="hover:opacity-50 transition-all duration-200" /></span></Link>
//                             <Link href='https://www.linkedin.com/company/naijazone-online-shopping-mall/' target="_blank"><span><Icon icon="uit:linkedin-alt" className="hover:opacity-50 transition-all duration-200" /></span></Link>
//                         </div>
//                     </div>
//                     <div className="col flex-1 grid grid-cols-2 md:grid-cols-3">
//                         {/* <ul>
//                             <h3 className={linkTitle}>FAQs</h3>
//                             {faqLinks.map(({ text, path }, index) => (<li className={listItem} key={index + text}><Link href={path}>{text}</Link></li>))}
//                         </ul> */}
//                         <ul>
//                             <h3 className={linkTitle}>Resources</h3>
//                             {resourcesLinks.map(({ text, path, sub }, index) => (<li className={listItem} key={index + text}><Link href={path}>{text} </Link></li>))}
//                         </ul>
//                         <ul className="mt-[60px] md:mt-0">
//                             <h3 className={linkTitle}>About</h3>
//                             {aboutLinks.map(({ text, path }, index) => (<li className={listItem} key={index + text}><Link href={path} className="flex items-center gap-2">{text}</Link></li>))}
//                         </ul>
//                     </div>
//                 </div>

//                 <div className="stroke h-[2px] lg:h-[0.73px] bg-[#979797] mb-7"></div>

//                 <div className="row flex justify-between flex-col-reverse lg:flex-row gap-2">
//                     <div className="col flex gap-5 md:gap-11 flex-col md:flex-row">
//                         <button className='text-[11.6px] leading-[17.4px] flex gap-1 items-center cursor-pointer'>
//                             <Icon icon={`fontisto:world-o`} className='' />
//                             <span>Eng</span>
//                             <Icon icon={`bi:chevron-down`} className='' />
//                         </button>
//                         <p className="text-[#D9D9D9] text-sm lg:text-base">Copyright 2025 Vintnercorp. All Rights Reserved.</p>
//                     </div>
//                     <div className="col flex gap-[33px]">
//                         <p className="text-[#D9D9D9] flex items-center gap-1">
//                             <span className="block w-[2px] h-[2px] rounded-full bg-[#D9D9D9]"></span>
//                             <Link href="/terms-and-conditions">Terms & Conditions</Link>
//                         </p>
//                         <Link href={'/privacy-policy'}>Privacy Policy</Link>
//                     </div>
//                 </div>
//             </div>
//         </section>
//     )
// }

// export default Footer
"use client";

import Link from "next/link";
import { Icon } from "@iconify/react";

const faqLinks = [
  { text: "Merchant FAQs", path: "/faqs" },
  { text: "Sustainability Policy", path: "/sustainability" },
  { text: "Security & Safety", path: "/security" },
];

const resourcesLinks = [
  {
    text: "Careers",
    sub: "HIRING",
    path: "https://www.linkedin.com/company/naijazone-online-shopping-mall/jobs/",
    isExternal: true,
  },
  { text: "Merchant Portal", path: "/merchant/login", isExternal: false },
  { text: "Documentation", path: "/docs", isExternal: false },
];

const aboutLinks = [
  { text: "Shop", path: "/shop" },
  { text: "About Us", path: "/about" },
  { text: "Contact", path: "/contact" },
];

const socialLinks = [
  { name: "Facebook", icon: "fe:facebook", href: "https://www.facebook.com/Naijazone1" },
  { name: "X", icon: "hugeicons:new-twitter", href: "https://x.com/Naijazone_" },
  { name: "Instagram", icon: "icon-park-outline:instagram", href: "https://www.instagram.com/naijazone_/" },
  { name: "LinkedIn", icon: "uit:linkedin-alt", href: "https://www.linkedin.com/company/naijazone-online-shopping-mall/" },
];

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-[--foreground-green] text-white relative overflow-hidden">
      {/* Decorative Gradient Glow */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-[--padding-x] px-4 sm:px-6 lg:px-8 pt-12 pb-8 lg:pt-16 lg:pb-10 relative z-10">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 mb-12 lg:mb-16">
          
          {/* Merchant Callout Card / Left Column */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div className="bg-white/10 backdrop-blur-md p-6 sm:p-8 rounded-2xl border border-white/15 shadow-inner">
              <span className="text-xs font-semibold tracking-wider text-green-200 uppercase mb-2 block">
                For Merchants & Business
              </span>
              <p className="text-base sm:text-lg text-white font-medium mb-6 leading-relaxed">
                Are you a merchant struggling to manage product sales and delivery in Nigeria?
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-white text-[--foreground-green] hover:bg-gray-100 font-semibold rounded-full text-sm py-3 px-6 transition-all duration-300 transform hover:-translate-y-0.5 shadow-md"
              >
                <span>Contact Us Now</span>
                <Icon icon="bi:arrow-right" className="text-base" />
              </Link>
            </div>

            {/* Social Media Links */}
            <div className="mt-8">
              <p className="text-xs font-medium text-white/70 uppercase tracking-wider mb-3">
                Connect With Us
              </p>
              <div className="flex items-center gap-3">
                {socialLinks.map((social) => (
                  <Link
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.name}
                    className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 flex items-center justify-center text-lg text-white transition-all duration-300 hover:scale-110"
                  >
                    <Icon icon={social.icon} />
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Navigation Links Grid */}
          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-2 gap-8 pt-2">
            
            {/* About Links */}
            <div>
              <h3 className="text-base font-bold text-white tracking-wide uppercase mb-5 border-b border-white/10 pb-2">
                About
              </h3>
              <ul className="space-y-3.5">
                {aboutLinks.map(({ text, path }) => (
                  <li key={text}>
                    <Link
                      href={path}
                      className="group inline-flex items-center text-sm text-white/80 hover:text-white transition-colors duration-200"
                    >
                      <span className="group-hover:translate-x-1 transition-transform duration-200">
                        {text}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources Links */}
            <div>
              <h3 className="text-base font-bold text-white tracking-wide uppercase mb-5 border-b border-white/10 pb-2">
                Resources
              </h3>
              <ul className="space-y-3.5">
                {resourcesLinks.map(({ text, path, sub, isExternal }) => (
                  <li key={text}>
                    <Link
                      href={path}
                      target={isExternal ? "_blank" : "_self"}
                      rel={isExternal ? "noopener noreferrer" : ""}
                      className="group inline-flex items-center gap-2 text-sm text-white/80 hover:text-white transition-colors duration-200"
                    >
                      <span className="group-hover:translate-x-1 transition-transform duration-200">
                        {text}
                      </span>
                      {sub && (
                        <span className="bg-amber-400 text-gray-900 text-[10px] font-extrabold px-2 py-0.5 rounded-full animate-pulse">
                          {sub}
                        </span>
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* FAQs Links */}
            {/* <div>
              <h3 className="text-base font-bold text-white tracking-wide uppercase mb-5 border-b border-white/10 pb-2">
                Help & Support
              </h3>
              <ul className="space-y-3.5">
                {faqLinks.map(({ text, path }) => (
                  <li key={text}>
                    <Link
                      href={path}
                      className="group inline-flex items-center text-sm text-white/80 hover:text-white transition-colors duration-200"
                    >
                      <span className="group-hover:translate-x-1 transition-transform duration-200">
                        {text}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div> */}

          </div>
        </div>

        {/* Divider */}
        <div className="h-[1px] w-full bg-white/15 mb-6" />

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs sm:text-sm text-white/80">
          
          <div className="flex items-center gap-4 flex-wrap justify-center md:justify-start">
            <button className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-xs font-medium cursor-pointer">
              <Icon icon="fontisto:world-o" className="text-sm" />
              <span>English (NG)</span>
              <Icon icon="bi:chevron-down" className="text-[10px]" />
            </button>
            <p className="text-white/70">
              © {new Date().getFullYear()} Vintnercorp. All Rights Reserved.
            </p>
          </div>

          {/* Legal Links & Back To Top */}
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-4">
              <Link href="/terms-and-conditions" className="hover:text-white hover:underline transition-all">
                Terms & Conditions
              </Link>
              <span className="w-1 h-1 rounded-full bg-white/40" />
              <Link href="/privacy-policy" className="hover:text-white hover:underline transition-all">
                Privacy Policy
              </Link>
            </div>

            <button
              onClick={scrollToTop}
              aria-label="Back to top"
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-all hover:scale-110"
            >
              <Icon icon="bi:arrow-up" className="text-sm" />
            </button>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;