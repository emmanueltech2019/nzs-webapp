import Image from "next/image"
import Navbar from "@/components/Navbar"
import GetStarted from "@/components/buttons/GetStarted"
import loginBanner from '@/assets/images/login-banner.svg'
import Footer from "@/components/Footer"

const bgImg = "bg-bgImage bg-cover bg-center h-full"

const layout = ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {
    return (
        <>
            <section className={`${bgImg} relative overflow-x-hidden`}>
                <Navbar>
                    <GetStarted url="/" classValue={'bg-[#D8F0E2] text-black pointer-events-none'} />
                </Navbar>

                <div className="Contact-section pt-[83.57px] xl:pt-[96.43px] lg:pb-11 flex flex-col lg:flex-row gap-[34px] lg:items-center">
                    <div className="title pl-[--padding-x] pr-[--padding-x] flex-1">
                        {children}
                    </div>
                    <div className="hero-image flex-1">
                        <div className="pricing-img w-full">
                            <Image src={loginBanner} alt="pricing-img" className={`w-full object-cover`} />
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </>
    )
}
export default layout