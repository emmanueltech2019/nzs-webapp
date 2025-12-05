import Image from "next/image"
import Navbar from "@/components/Navbar"
import playBtn from '@/assets/icons/playBtn.svg'
import Apple from "@/assets/icons/Apple.svg"
import Andriod from '@/assets/icons/Andriod.svg'
import dashedArrow from '@/assets/images/dashedArrow.svg'
import GetStarted from "@/components/buttons/GetStarted"
import aboutBanner from '@/assets/images/about-banner.svg'

const icon1Styles = "w-[34.8px] h-[34.8px] flex justify-center items-center rounded-[3.63px] border-[0.36px] border-[----foreground-green]"
const bgImg = "bg-bgImage bg-cover bg-center h-full"

const About = () => {
    return (
        <section className={` relative overflow-x-hidden`}>
            <Navbar>
                <div className={'flex gap-5'}>
                    <GetStarted url={'/shop'} />
                </div>
            </Navbar>

        

            {/* <div className="dashedArrow absolute -left-0 bottom-0 w-[128.68px] lg:w-[433.21px] -translate-x-1/3 md:-translate-x-0 lg:translate-x-[60%] -translate-y-full lg:-translate-y-1/2">
                <Image src={dashedArrow} alt="dashed arrow" className={`object-cover`} />
            </div> */}
        </section>
    )
}

export default About