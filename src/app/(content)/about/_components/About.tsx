import Image from "next/image"
import Navbar from "@/components/Navbar"
import playBtn from '@/assets/icons/playBtn.svg'
import Apple from "@/assets/icons/Apple.svg"
import Andriod from '@/assets/icons/Andriod.svg'
import dashedArrow from '@/assets/images/dashedArrow.svg'
import GetStarted from "@/components/buttons/GetStarted"
import aboutBanner from '@/assets/images/PLACE BANNNER.svg'

const icon1Styles = "w-[34.8px] h-[34.8px] flex justify-center items-center rounded-[3.63px] border-[0.36px] border-[----foreground-green]"
const bgImg = "bg-bgImage bg-cover bg-center h-full"

const About = () => {
    return (
        <section className={`${bgImg} relative overflow-x-hidden`}>
            <Navbar>
                <div className={'flex gap-5'}>
                    <GetStarted url={'/shop'} />
                </div>
            </Navbar>

            <div className="pricing-section pt-[83.57px] xl:pt-[96.43px] flex flex-col lg:flex-row gap-[34px] lg:items-center">
                <div className="hero-title pl-[--padding-x] pr-[--padding-x] flex-1">
                    <div className="flex md:gap-[36.97px] justify-between md:justify-start mb-[25.57px] lg:mb-0">
                        <h2 className="flex items-center gap-2 text-black text-sm font-normal">Download App
                            <span className={icon1Styles}><Image src={Apple} alt="apple icon" className="w-[19.58px] object-cover" /></span>
                            <span className={icon1Styles}><Image src={Andriod} alt="andriod icon" className="w-[19.58px] object-cover" /></span>
                        </h2>
                        {/* <h2 className="flex items-center gap-2 text-black text-sm font-normal">
                            <span><Image src={playBtn} alt="apple icon" className="w-[19.58px] object-cover" /></span>
                            Watch Video
                        </h2> */}
                    </div>

                    <div>
                        <h1 className="text-black text-[35px] lg:text-[58px] leading-[52.5px] lg:leading-[87px] font-semibold mb-5">
                        You <span className="text-[--text-color-orange]">Need</span> to Know.
                        </h1>

                        <p className="text-base lg:text-lg mb-8 max-w-[475.62px]">We envision a future where every Nigerian merchant, regardless of size, can efficiently manage and grow their business, and where every consumer can easily access reliable services. By bridging the gap between products, services, and the people who need them, Naijazone aims to foster a thriving, interconnected economy that benefits everyone.</p>

                        <div className="pb-10">
                            <GetStarted url="/shop" />
                        </div>
                    </div>
                </div>
                <div className="hero-image flex-[1.5]">
                    <div className="pricing-img w-full">
                        <Image src={aboutBanner} alt="pricing-img" className={`w-full object-cover`} />
                    </div>
                </div>
            </div>

            <div className="dashedArrow absolute -left-0 bottom-0 w-[128.68px] lg:w-[433.21px] -translate-x-1/3 md:-translate-x-0 lg:translate-x-[60%] -translate-y-full lg:-translate-y-1/2">
                <Image src={dashedArrow} alt="dashed arrow" className={`object-cover`} />
            </div>
        </section>
    )
}

export default About