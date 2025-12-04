import Image from "next/image"
import ourTeamImg from '@/assets/images/our-team-banner.svg'
import a1 from '@/assets/images/our-team/a1.svg'
import a2 from '@/assets/images/our-team/a2.svg'
import a3 from '@/assets/images/our-team/a3.svg'
import a4 from '@/assets/images/our-team/a4.svg'
import a5 from '@/assets/images/our-team/a5.svg'

const OurTeam = () => {
    return (
        <section className='pt-20'>
            <h1 className='text-2xl lg:text-[46.4px] leading-[36px] lg:leading-[69.6px] pb-5 flex flex-col text-center font-semibold'><span>Our Team of High-value </span> <span>Thinkers & Builders</span></h1>
            <div className="our-team-section flex items-center flex-col lg:flex-row">
                <div className="col flex-1">
                    <div className="our-team-image">
                        <Image src={ourTeamImg} alt="our-team-image" className="object-cover w-full" />
                    </div>
                </div>
                <div className="col flex-1 px-[--padding-x] lg:pl-0">
                    <h1 className="text-xl lg:text-2xl mb-5 lg:mb-14">Absolute Problem-Crushers</h1>
                    <p className="mb-11">Naijazone is a proudly Nigerian-owned company, born out of a deep understanding of the unique challenges and opportunities within our market.</p>
                    <div className="team-images max-h-10 flex gap-2 mb-7 items-center">
                        <div className="team-img">
                            <Image src={a1} alt="" className="w-full object-cover" />
                        </div>
                        <div className="flex h-8 items-center gap-2 relative">
                            <div className="team-img opacity-50">
                                <Image src={a2} alt="" className="w-full h-8 object-cover" />
                            </div>
                            <div className="team-img opacity-50">
                                <Image src={a3} alt="" className="w-full h-8 object-cover" />
                            </div>
                            <div className="team-img opacity-50">
                                <Image src={a4} alt="" className="w-full h-8 object-cover" />
                            </div>
                            <div className="team-img opacity-50">
                                <Image src={a5} alt="" className="w-full h-8 object-cover" />
                            </div>
                        </div>
                    </div>
                    <h3 className="pb-7"><span className="font-semibold">Chioma Millian Nsofor  -</span>Co Founder</h3>
                    <p className="pb-5 lg:pb-0">With over a decade of experience in e-commerce and logistics, I founded Naijazone with a vision to revolutionize the way businesses and consumers interact in Nigeria. </p>
                </div>
            </div>
        </section>
    )
}

export default OurTeam