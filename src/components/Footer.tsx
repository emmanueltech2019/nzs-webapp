import Link from "next/link"
import { Icon } from "@iconify/react/dist/iconify.js";

const faqLinks = [{
    text: "Are you a merchant",
    path: "/"
}, {
    text: "Are you a merchant",
    path: "/"
}, {
    text: "Sustainability Policy",
    path: "/"
}, {
    text: "Pricing",
    path: "/"
}, {
    text: "Security",
    path: "/"
}];

const resourcesLinks = [{
    text: "Are you a merchant",
    path: "/"
}, {
    text: "Are you a merchant",
    path: "/"
}, {
    text: "Are you a merchant",
    path: "/"
}, {
    text: "Are you a merchant",
    path: "/"
}, {
    text: "Are you a merchant",
    path: "/"
}];

const aboutLinks = [{
    text: "Company",
    path: "/"
}, {
    text: "Careers",
    sub: "HIRING",
    path: "/"
}, {
    text: "For Sales Manager",
    path: "/"
}, {
    text: "For Logistics Services",
    path: "/"
}, {
    text: "Other Services",
    path: "/"
}, {
    text: "Blog",
    path: "/"
}];

const Footer = () => {
    const linkTitle = 'text-base font-semibold'
    const listItem = 'leading-[21.8px] text-sm mt-[21.5px] hover:underline transition-all duration'

    return (
        <section className="bg-[--foreground-green] text-white">
            <div className="Footer-section px-[--padding-x] py-[30px] lg:pt-[62px] lg:pb-[58px] text-base lg:text-[13.05px] lg:leading-normal">
                <div className="row flex flex-col lg:flex-row lg:items-center gap-[61px] mb-[60px] md:mb-10">
                    <div className="col flex-1">
                        <p className="lg:max-w-[298.72px] mb-[30px] lg:mb-[28.5px]">
                            Are you a merchant struggling to manage product sales and delivery in Nigeria?
                        </p>
                        <Link href={`/`} className="border-white border-[0.73px] hover:bg-white hover:text-[--foreground-green] text-center rounded-[20px] text-[15px] lg:text-[13px] py-[15px] lg:py-[13px] px-[26px]  lg:px-[22px] mb-[63px] transition-all duration-200">Contact Us Now</Link>
                        <div className="social-links flex gap-[18px] text-lg mt-7 lg:mt-14">
                            <Link href='/'><span><Icon icon="fe:facebook" className="hover:opacity-50 transition-all duration-200" /></span></Link>
                            <Link href='/'><span><Icon icon="hugeicons:new-twitter" className="hover:opacity-50 transition-all duration-200" /></span></Link>
                            <Link href='/'><span><Icon icon="icon-park-outline:instagram" className="hover:opacity-50 transition-all duration-200" /></span></Link>
                            <Link href='/'><span><Icon icon="uit:linkedin-alt" className="hover:opacity-50 transition-all duration-200" /></span></Link>
                        </div>
                    </div>
                    <div className="col flex-1 grid grid-cols-2 md:grid-cols-3">
                        <ul>
                            <h3 className={linkTitle}>FAQs</h3>
                            {faqLinks.map(({ text, path }, index) => (<li className={listItem} key={index + text}><Link href={path}>{text}</Link></li>))}
                        </ul>
                        <ul>
                            <h3 className={linkTitle}>Resources</h3>
                            {resourcesLinks.map(({ text, path }, index) => (<li className={listItem} key={index + text}><Link href={path}>{text}</Link></li>))}
                        </ul>
                        <ul className="mt-[60px] md:mt-0">
                            <h3 className={linkTitle}>About</h3>
                            {aboutLinks.map(({ text, path, sub }, index) => (<li className={listItem} key={index + text}><Link href={path} className="flex items-center gap-2">{text} {sub && <span className="block text-[--foreground-green] font-semibold p-[4px] bg-[--foreground-orange] rounded-[5.44px]">{sub}</span>}</Link></li>))}
                        </ul>
                    </div>
                </div>

                <div className="stroke h-[2px] lg:h-[0.73px] bg-[#979797] mb-7"></div>

                <div className="row flex justify-between flex-col-reverse lg:flex-row gap-2">
                    <div className="col flex gap-5 md:gap-11 flex-col md:flex-row">
                        <button className='text-[11.6px] leading-[17.4px] flex gap-1 items-center cursor-pointer'>
                            <Icon icon={`fontisto:world-o`} className='' />
                            <span>Eng</span>
                            <Icon icon={`bi:chevron-down`} className='' />
                        </button>
                        <p className="text-[#D9D9D9] text-sm lg:text-base">Copyright 2024 Vintnercorp. All Rights Reserved.</p>
                    </div>
                    <div className="col flex gap-[33px]">
                        <p className="text-[#D9D9D9] flex items-center gap-1">
                            <span className="block w-[2px] h-[2px] rounded-full bg-[#D9D9D9]"></span>
                            <span>Terms & Conditions</span>
                        </p>
                        <p>Privacy Policy</p>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Footer