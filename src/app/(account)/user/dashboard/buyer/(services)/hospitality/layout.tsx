'use client'
import HospitalityTabs from '@/components/tabs/HospitalityTabs'
import { LayoutProps } from 'framer-motion'
import React, { useCallback, useRef, useState, useEffect } from 'react'
import { FaChevronDown, FaArrowRight } from 'react-icons/fa'
import { CircularProgress, Box } from '@mui/material'
import HospitalityProfile from './components/HospitalityProfile'
import HospitalityFacilities from './components/HospitalityFacilities'
import HospitalityBook from './components/HospitalityBook'
import { i } from 'framer-motion/client'
import { subtle } from 'crypto'

const layout:React.FC<React.PropsWithChildren<LayoutProps>> = ({children}) => {
    const [active, setActive] = useState('profile');
    const [overallProgress, setOverallProgress] = useState(0);
    const activeContainerRef = useRef<HTMLDivElement>(null);
    const [activeButton, setActiveButton] = useState(false);
    const [activeBookSubTab, setActiveBookSubTab] = useState('info');

    const mainTabOrder = ['profile', 'facilities', 'book'];
    const bookSubTabOrder = ['info', 'select', 'check'];

    // Define all conceptual steps that *represent progress completion*
    // Now, 'book-check' is the last progress point, leading to 100%

    // Let's refine allProgressPoints to represent the progress *achieved upon landing on a step*
    const allStepsAsProgressPoints = [
        'profile',      // 0% - Start
        'facilities',   // 25% - Landed on facilities
        'book-info',    // 50% - Landed on book-info
        'book-select',  // 75% - Landed on book-select
        'book-check'    // 100% - Landed on book-check
    ];

    const calculateProgress = useCallback((mainTab: string, subTab: string | null = null) => {
        let currentStepIdentifier: string;

        if (mainTab === 'profile') {
            currentStepIdentifier = 'profile';
        } else if (mainTab === 'facilities') {
            currentStepIdentifier = 'facilities';
        } else if (mainTab === 'book') {
            currentStepIdentifier = `book-${subTab || 'info'}`;
        } else {
            currentStepIdentifier = 'profile'; // Fallback
        }

        const currentStepIndex = allStepsAsProgressPoints.indexOf(currentStepIdentifier);

        if (currentStepIndex !== -1) {
            // Calculate progress: (current index / (total progress points - 1)) * 100
            // The -1 is because the first point is 0%, and the last is 100%.
            // If there are 5 points (0, 1, 2, 3, 4), the divisor is 4.
            const totalProgressPoints = allStepsAsProgressPoints.length; // This is 5
            const progress = (currentStepIndex / (totalProgressPoints - 1)) * 100;
            setOverallProgress(Math.min(100, Math.round(progress)));
        } else {
            setOverallProgress(0); // Should ideally not happen if state is always within defined steps
        }
    }, [allStepsAsProgressPoints]);

    useEffect(() => {
        calculateProgress(active, activeBookSubTab);
    }, [active, activeBookSubTab, calculateProgress]);

    const handleNext = () => {
        if (active === 'book') {
            const currentSubTabIndex = bookSubTabOrder.indexOf(activeBookSubTab);
            if (currentSubTabIndex < bookSubTabOrder.length - 1) {
                // Advance sub-tab within 'book'
                setActiveBookSubTab(bookSubTabOrder[currentSubTabIndex + 1]);
            } else {
                // If it's the last sub-tab in 'book' ('check'), and there are no more main tabs to go to,
                // then the form is conceptually complete.
                // We've already handled setting progress to 100% in calculateProgress
                // when activeBookSubTab becomes 'check'.
                const currentMainTabIndex = mainTabOrder.indexOf(active);
                if (currentMainTabIndex < mainTabOrder.length - 1) {
                    // This part would be for if there were MORE main tabs after 'book'.
                    // For this specific scenario, 'book' is the last main tab,
                    // so clicking NEXT from 'book-check' means completion.
                    setActive(mainTabOrder[currentMainTabIndex + 1]); // This line would move to a non-existent tab unless you have a "confirmation" tab
                    setActiveBookSubTab('info'); // Reset for next main tab (if there was one)
                }
                console.log('Form submission completed!');
                // You might want to trigger form submission or navigation here
                // As the progress bar should already be 100% at this point.
            }
        } else {
            // Not in 'book' tab, advance main tab
            const currentMainTabIndex = mainTabOrder.indexOf(active);
            if (currentMainTabIndex < mainTabOrder.length - 1) {
                setActive(mainTabOrder[currentMainTabIndex + 1]);
                // If moving to 'book', reset its sub-tab to 'info'
                if (mainTabOrder[currentMainTabIndex + 1] === 'book') {
                    setActiveBookSubTab('info');
                }
            } else {
                // This else block indicates we've tried to advance beyond the last main tab
                console.log('Attempted to go beyond final main tab. Form should be considered complete.');
                // The progress should already be 100% if the last visible step is 'book-check'
            }
        }
    };

  return (
    <div>
        {children}
        <div className='md:max-w-[80%] mx-auto'>
            <div className="py-6 px-2">
                <HospitalityTabs activeTab={active} setActiveTab={setActive} />
            </div>
            {active == 'profile' && <HospitalityProfile />}
            {active == 'facilities' && <HospitalityFacilities />}
            {active == 'book' && (<HospitalityBook activeSubTab={activeBookSubTab} setActiveSubTab={setActiveBookSubTab} />)}
            <div className={`flex-col fixed z-20 bottom-0 md:w-[45%] w-full left-1/2 -translate-x-1/2 mx-auto md:p-5 p-2 gap-2 bg-white ${active === 'profile' ? 'hidden' : 'flex'}`}>
                <div onClick={() => setActiveButton(!activeButton)} className="flex flex-col md:p-5 p-2 gap-3 rounded-xl bg-[#ebedeb] cursor-pointer">
                    <div className="flex justify-between items-center border-b-[1px] border-gray-300 pb-2">
                        <p className="font-semibold text-black text-sm">BOOKING DETAILS</p>
                        <div className="flex gap-3 items-center">
                            <div className={`rounded-3xl py-1 px-3 flex justify-center items-center text-[10px] ${activeButton ? 'bg-[#006838] text-white' : 'bg-gray-300'}`}>Ready</div> 
                            <FaChevronDown className={`text-sm transition-transform duration-200 ease-in-out text-black ${activeButton ? 'rotate-180' : ''}`} />       
                        </div>
                    </div>
                    <div ref={activeContainerRef} className="flex overflow-hidden transition-height duration-200 flex-col gap-4"
                    style={{
                        height: activeButton ? `${activeContainerRef.current?.scrollHeight}px` : '0px'
                    }}>
                        <div className="flex justify-between">
                            <div className="flex flex-col gap-3">
                                <p className="text-gray-300 text-sm">Booking Type</p>
                                <p className="text-black text-md font-light">Consultation Visit</p>
                            </div>
                            <div className="flex flex-col gap-3 md:w-60 w-40 items-start">
                                <div className='rounded-md py-1 px-3 border-[0.05px] border-[#006838] bg-white text-black text-sm'>
                                    8:00 AM - 11:00 AM
                                </div>
                                <p className="text-md font-light text-black">September 30, 2024</p>
                            </div>
                        </div>
                        <div className="flex justify-between">
                            <div className="flex flex-col gap-3">
                                <p className="text-gray-300 text-sm">Specialty</p>
                                <p className="text-black text-lg font-light">Anesthesiology</p>
                            </div>
                            <div className="flex flex-col gap-3 md:w-60 w-40 items-start">
                                <p className="text-gray-300 text-sm">Location</p>
                                <p className="text-lg font-light text-black">Umahia, Abia</p>
                            </div>
                        </div>
                        <div className="flex justify-between">
                            <div className="flex flex-col gap-3">
                                <p className="text-gray-300 text-sm">Estimted Arrival</p>
                                <p className="text-black text-lg font-light">11 Hours</p>
                            </div>
                            <div className="flex flex-col gap-3 md:w-60 w-40 items-start">
                                <p className="text-gray-300 text-sm">Approximate Distance</p>
                                <p className="text-lg font-light text-black">500 km</p>
                            </div>
                        </div>
                        <div className="flex justify-between items-center">
                            <div className="flex flex-col gap-3">
                                <p className="text-gray-300 text-sm">Service</p>
                            </div>
                            <div className="flex flex-col gap-3 items-start md:w-60 w-40">
                                <div className='rounded-xl py-1 px-3 bg-[#ff3333bf] text-white'>
                                    Consultation Visit
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-between items-center">
                            <div className="flex flex-col gap-3">
                                <p className="text-gray-300 text-sm">Calculating Price (NGN)</p>
                            </div>
                            <div className="flex flex-col gap-3 md:w-60 w-40 items-start">
                                <div className='rounded-xl py-1 px-3 bg-[#d9dbd7] text-black font-bold text-xl'>
                                    3,000.00
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-between items-center">
                            <div className="flex flex-col gap-3">
                                <p className="text-gray-300 text-sm">Provider</p>
                            </div>
                            <div className="flex flex-col gap-3 md:w-60 w-40">
                                <div className='py-1 px-3'>
                                    GilChrist Health 
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={`w-full gap-2 flex items-center`}>
                    <button onClick={handleNext} className="text-white flex items-center justify-center w-full py-4 rounded-xl bg-[--foreground-green] transition-all duration-200 hover:scale-95">
                        NEXT
                    </button>
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative' }}>
                        <CircularProgress size={60} sx={{ color: '#006838' }} variant='determinate' value={overallProgress} />
                        <FaArrowRight className='absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 text-[#006838]' />
                    </Box>
                </div>
            </div>
        </div>
    </div>
  )
}

export default layout
