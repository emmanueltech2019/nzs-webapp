'use client';
import { useState, useRef, useEffect } from "react";
import { useInView } from "framer-motion"


const Counter = () => {

    const customer = 100, business = 500, rated = 4, support = 24
    const [customersCount, setCustomersCount] = useState(0), 
    [businessCount, setBusinessCount] = useState(0), 
    [ratedCount, setRatedCount] = useState(0),
    [supportCount, setSupportCount] = useState(0)
    const incrementCustomersCount = () => { setCustomersCount(prev => prev < customer ? prev + 1 : prev) }, 
    incrementBusinessCount = () => { setBusinessCount(prev => prev < business? prev + 1 : prev) }, 
    incrementRatedCount = () => { setRatedCount(prev => prev < rated? prev + 1 : prev) }, 
    incrementSupportCount = () => { setSupportCount(prev => prev < support? prev + 1 : prev) }
    const customersRef = useRef(null)
    const isInView = useInView(customersRef, { once: true })

    useEffect(() => {
        if (isInView) {
            setInterval(() => {
                incrementCustomersCount()
            },100)
        }
        if(customersCount == customer) {
            return () => {}
        }
    }, [isInView, customersCount]);

    useEffect(() => {
        if (isInView) {
            setInterval(() => {
                incrementBusinessCount()
            },100)
        }
        if(businessCount == business) {
            return () => {}
        }
    }, [isInView, businessCount]);

    useEffect(() => {
        if (isInView) {
            setInterval(() => {
                incrementRatedCount()
            },500)
        }
        if(ratedCount == rated) {
            return () => {}
        }
    }, [isInView, ratedCount]);

    useEffect(() => {
        if (isInView) {
            setInterval(() => {
                incrementSupportCount()
            },200)
        }
        if(supportCount == support) {
            return () => {}
        }
    }, [isInView, supportCount]);


    const bigFont = 'font-semibold text-[46.85px] xl:text-[58px] leading-[70.27px] xl:leading-[87px]'
    const smallFont = 'text-[10.54px] xl:text-[13.05px] leading-[15.81px] xl:leading-[19.58px]'
    const eStyle = 'text-[28.11px] xl:text-[34.8px] leading-[42.16px] xl:leading-[52.2px] text-[#E09527]'
    const lineStyles = 'w-[69.69px] lg:w-0 lg:min-h-[86.28px] border-[0.5px] border-white'
    return (
        <div ref={customersRef} className={`counter-section -mt-1 py-[43px] px-[--padding-x] bg-[--foreground-green] text-[--text-color-light] flex flex-col lg:flex-row items-center justify-between gap-10`}>
            <div className={`text-center`}>
                <div className={`${bigFont}`}>{customersCount}K+</div>
                <div className={`${smallFont}`}>Waiting customer</div>
            </div>
            <div className={`${lineStyles}`}></div>
            <div className={`text-center`}>
                <div className={`${bigFont}`}>{businessCount}+</div>
                <div className={`${smallFont}`}>Businesses</div>
            </div>
            <div className={`${lineStyles}`}></div>
            <div className={`text-center`}>
                <div className={`${bigFont}`}>{ratedCount}.5 <span className={`${eStyle}`}>/5</span></div>
                <div className={`${smallFont}`}>Rated stars on average</div>
            </div>
            <div className={`${lineStyles}`}></div>
            <div className={`text-center`}>
                <div className={`${bigFont}`}>{supportCount} <span className={`${eStyle}`}>/7</span></div>
                <div className={`${smallFont}`}>Customer support</div>
            </div>
        </div>
    )
}
export default Counter