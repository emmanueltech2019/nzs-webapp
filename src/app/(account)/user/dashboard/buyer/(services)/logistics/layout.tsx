'use client'
import React, {useState, useEffect, useCallback, useRef} from 'react'
import HealthServicesTab from '@/components/tabs/EducationTab'
import { LayoutProps } from 'framer-motion'
import { FaArrowRight, FaChevronDown } from 'react-icons/fa';
import { Box, CircularProgress } from '@mui/material';
import Profile from './company-profile/components/Profile';
import Routes from './company-profile/components/Routes';
import LogisticsTab from '@/components/tabs/LogisticsTab';
import LoadInfo from './company-profile/components/LoadInfo';
import Carrier from './company-profile/components/Carrier';
import { SimpleCollectedItemsProvider } from './CollectedData';

const layout: React.FC<React.PropsWithChildren<LayoutProps>> = ({children}) => {
    const [active, setActive] = useState('profile'); // Renamed 'active' to 'activeMainTab' for clarity
    const [overallProgress, setOverallProgress] = useState(0);
    const activeContainerRef = useRef<HTMLDivElement>(null);
    const [activeButton, setActiveButton] = useState(false);
    const [activeBookSubTab, setActiveBookSubTab] = useState('pickup');

    const mainTabOrder = ['profile', 'routes', 'load-info', 'carrier'];
    const bookSubTabOrder = ['pickup', 'dropoff'];

    // Define all conceptual steps that *represent progress completion*
    // Now, 'book-check' is the last progress point, leading to 100%

    // Let's refine allProgressPoints to represent the progress *achieved upon landing on a step*
    const allStepsAsProgressPoints = [
        'profile',      // 0% - Start   // 25% - Landed on facilities
        'routes-pickup',    // 50% - Landed on book-info
        'routes-dropoff',  // 75% - Landed on book-select
        'load-info',
        'carrier'    // 100% - Landed on book-check
    ];

    const calculateProgress = useCallback((mainTab: string, subTab: string | null = null) => {
        let currentStepIdentifier: string;

        if (mainTab === 'profile') {
            currentStepIdentifier = 'profile';
        } else if (mainTab === 'routes') {
            currentStepIdentifier = `routes-${subTab || 'pickup'}`;
        } else if (mainTab === 'load-info') {
            currentStepIdentifier = 'load-info';
        } else if (mainTab === 'carrier') {
            currentStepIdentifier = 'carrier';
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
        if (active === 'routes') {
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
                    setActiveBookSubTab('pickup'); // Reset for next main tab (if there was one)
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
                if (mainTabOrder[currentMainTabIndex + 1] === 'routes') {
                    setActiveBookSubTab('pickup');
                }
            } else {
                // This else block indicates we've tried to advance beyond the last main tab
                console.log('Attempted to go beyond final main tab. Form should be considered complete.');
                // The progress should already be 100% if the last visible step is 'book-check'
            }
        }
    };
  return (
    <SimpleCollectedItemsProvider>
        <div>
        {children}
            <div className='md:max-w-[80%] mx-auto'>
                <div className="py-6 px-2">
                    {/* Pass activeMainTab and setActiveMainTab to LegalTab */}
                    <LogisticsTab activeTab={active} setActiveTab={setActive} />
                </div>
                {/* Conditional rendering of components based on activeMainTab */}
                {active === 'profile' && <Profile />}
                {active === 'routes' && <Routes activeTab={activeBookSubTab} setActiveTab={setActiveBookSubTab} />}
                {active === 'load-info' && <LoadInfo />}
                {active === 'carrier' && <Carrier />}

                {/* Fixed bottom bar with progress and NEXT button */}
                {/* This bar is hidden for 'profile' tab as per your original logic */}
                <div className={`flex-col fixed z-20 bottom-0 md:w-[45%] w-full left-1/2 -translate-x-1/2 mx-auto md:p-5 p-2 gap-2 bg-white ${active === 'profile' ? 'hidden' : 'flex'}`}>
                    <div onClick={() => setActiveButton(!activeButton)} className="flex flex-col md:p-5 p-2 gap-3 rounded-xl bg-[#ebedeb] cursor-pointer">
                        <div className="flex justify-between items-center border-b-[1px] border-gray-300 pb-2">
                            <p className="font-semibold text-black text-sm">ROUTE DETAILS</p>
                            <div className="flex gap-3 items-center">
                                <div className={`rounded-3xl py-1 px-3 flex justify-center items-center text-[10px] ${activeButton ? 'bg-[#006838] text-white' : 'bg-gray-300'}`}>Ready</div>
                                <FaChevronDown className={`text-sm transition-transform duration-200 ease-in-out text-black ${activeButton ? 'rotate-180' : ''}`} />
                            </div>
                        </div>
                        <div ref={activeContainerRef} className="flex overflow-hidden transition-height duration-200 flex-col gap-4"
                            style={{
                                height: activeButton ? `${activeContainerRef.current?.scrollHeight}px` : '0px'
                            }}>
                            {/* Booking details content (unchanged from your original code) */}
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
                            {/* Use the overallProgress state here */}
                            <CircularProgress size={60} sx={{ color: '#006838' }} variant='determinate' value={overallProgress} />
                            <FaArrowRight className='absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 text-[#006838]' />
                        </Box>
                    </div>
                </div>
            </div>
        </div>
    </SimpleCollectedItemsProvider>
  )
}

export default layout
