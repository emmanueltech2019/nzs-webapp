import Image from "next/image"
import Apple from "@/assets/icons/Apple.svg"
import Andriod from '@/assets/icons/Andriod.svg'
import simplifyDashboard from '@/assets/images/simplify-dashboard.png'
import playBtn from '@/assets/icons/playBtn.svg'
import GetStarted from "@/components/buttons/GetStarted"

import money1 from '@/assets/images/money1.png'
import money2 from '@/assets/images/money2.png'


// constant Styles
const icon1Styles = "w-[34.8px] h-[34.8px] flex justify-center items-center rounded-[3.63px] border-[0.36px] border-[----foreground-green]"
const bgImg = "bg-bgWorldMap bg-no-repeat"

const Simplify = () => {
    return (
        <div className={`relative overflow-hidden`}>
            <div className='pl-[--padding-x] lg:px-[--padding-x] mt-[30px] lg:mt-10 mb-[60px] lg:mb-[147px] '>
                <div className="stroke relative h-[2px] lg:h-[0.73px] bg-black">
                    <div className="stroke-2 h-[9px] lg:h-[5.08px] w-[89%] bg-[--foreground-light-green] rounded-[20px] rounded-r-none lg:rounded-[7.25px] absolute right-0 top-0 -translate-y-1/2"></div>
                </div>
            </div>
            <section className={`${bgImg} relative simplify-section flex flex-col lg:flex-row lg:items-center overflow-hidden`}>
                <div className="simplify-title pl-[--padding-x] pr-[--padding-x] flex-1 z-10">
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
                            <div>Simplify <span className="text-[--foreground-orange]">All </span></div>
                            <div>Your Bulk Sales</div>
                            <div>& Purchases</div>
                        </h1>

                        <p className="text-sm lg:text-base mb-8 max-w-[475.62px]">Are you a merchant struggling to manage product sales and delivery in Nigeria? A consumer frustrated by the lack of reliable information on essential services in your area? We tackle these challenges head-on, providing a seamless experience for both vendors and consumers.</p>

                        <GetStarted url="/" />
                    </div>
                </div>
                <div className="simplify-image flex-[1] relative z-10">
                    <div className="simplifyDashboard-img w-full lg:w-[150%] lg:-ml-[30%] -mb-[10%] lg:-mb-[30%]">
                        <Image src={simplifyDashboard} alt="nigeria" className={`w-full object-cover`} />
                    </div>

                    
                </div>

                <div className="money-img absolute bottom-0 left-0 z-0 h-1/2 w-full px-[--padding-x]">
                    <Image src={money1} alt=" money-img" className="object-cover w-full" />
                </div>
            </section>
            <div className="money-img absolute bottom-0 right-0 h-1/3 md:h-auto lg:w-1/2 z-20">
                    <Image src={money2} alt=" money-img" className="object-cover w-full" />
            </div>
        </div>
    )
}
export default Simplify