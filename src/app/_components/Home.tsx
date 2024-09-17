import * as motion from "framer-motion/client"
import Image from "next/image"
import Navbar from "@/components/Navbar"
import Apple from "@/assets/icons/Apple.svg"
import Andriod from '@/assets/icons/Andriod.svg'
import nigeria from '@/assets/images/nigeria.svg'
import iPhone16 from '@/assets/images/iPhone16.svg'
import playBtn from '@/assets/icons/playBtn.svg'
import dashedArrow from '@/assets/images/dashedArrow.svg'
import GetStarted from "@/components/buttons/GetStarted"
import SignIn from "@/components/buttons/SignIn"
import SignUp from "@/components/buttons/SignUp"


// constant Styles
const icon1Styles = "w-[34.8px] h-[34.8px] flex justify-center items-center rounded-[3.63px] border-[0.36px] border-[----foreground-green]"
const bgImg = "bg-bgImage bg-cover bg-center h-full"

const Home = () => {
    return (
        <div className={`${bgImg} relative overflow-x-hidden`}>
            <Navbar>
                {/* butttons */}
                <div className={'flex gap-5'}>
                    <SignIn url={'/auth/login'} />
                    <SignUp url={'/auth/sign-up'} />
                </div>
            </Navbar>

            <section className="hero-section pt-[83.57px] xl:pt-[96.43px] flex flex-col lg:flex-row gap-[34px] lg:items-center">
                <motion.div initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="hero-title pl-[--padding-x] pr-[--padding-x] flex-1">
                    <div className="flex md:gap-[36.97px] justify-between md:justify-start mb-[25.57px] lg:mb-0">
                        <h2 className="flex items-center gap-2 text-black text-sm font-normal">Download App
                            <span className={icon1Styles}><Image src={Apple} alt="apple icon" className="w-[19.58px] object-cover" /></span>
                            <span className={icon1Styles}><Image src={Andriod} alt="andriod icon" className="w-[19.58px] object-cover" /></span>
                        </h2>
                        <h2 className="flex items-center gap-2 text-black text-sm font-normal">
                            <span><Image src={playBtn} alt="apple icon" className="w-[19.58px] object-cover" /></span>
                            Watch Video
                        </h2>
                    </div>

                    <div>
                        <h1 className="text-black text-[35px] lg:text-[58px] leading-[52.5px] lg:leading-[87px] font-semibold mb-5">
                            <div>Simplify <span className="text-[--foreground-orange]">All </span></div>
                            <div>Your Bulk Sales</div>
                            <div>& Purchases</div>
                        </h1>

                        <p className="text-base lg:text-lg mb-8 max-w-[475.62px]">Are you a merchant struggling to manage product sales and delivery in Nigeria? A consumer frustrated by the lack of reliable information on essential services in your area? We tackle these challenges head-on, providing a seamless experience for both vendors and consumers.</p>

                        <GetStarted url="/" />
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    className="hero-image xl:pr-[--padding-x] flex-[1.5]">
                    <div className="nigeria-img">
                        <Image src={nigeria} alt="nigeria" className={`w-full object-cover`} />
                    </div>
                    <div className="iPhone16-img -mt-[80%] lg:-mt-[50%] xl:-mt-[75%]">
                        <Image src={iPhone16} className={`w-full object-cover h-full`} alt="iPhone16" />
                    </div>
                </motion.div>
            </section>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
                className="dashedArrow absolute -left-0 bottom-0 w-[128.68px] lg:w-[433.21px] -translate-x-1/3 md:-translate-x-0 lg:translate-x-[60%] -translate-y-full lg:-translate-y-1/2">
                <Image src={dashedArrow} alt="dashed arrow" className={`object-cover`} />
            </motion.div>
        </div>
    )
}
export default Home