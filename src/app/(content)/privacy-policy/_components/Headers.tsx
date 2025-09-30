import Image from "next/image"
import Navbar from "@/components/Navbar"
import dashedArrow from '@/assets/images/dashedArrow.svg'
import GetStarted from "@/components/buttons/GetStarted"

const bgImg = "bg-bgImage bg-cover bg-center h-full"

const About = () => {
    return (
        <section className={`${bgImg} relative overflow-x-hidden`}>
            <Navbar>
                <div className={'flex gap-5'}>
                    <GetStarted url={'/auth/login'} />
                </div>
            </Navbar>

            <div className="h-10"></div>

            <div className="dashedArrow absolute -left-0 bottom-0 w-[128.68px] lg:w-[433.21px] -translate-x-1/3 md:-translate-x-0 lg:translate-x-[60%] -translate-y-full lg:-translate-y-1/2">
                <Image src={dashedArrow} alt="dashed arrow" className={`object-cover`} />
            </div>
        </section>
    )
}

export default About