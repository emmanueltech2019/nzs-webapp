'use client'
import React, {useState, useEffect, useCallback, useRef} from 'react'
import HealthServicesTab from '@/components/tabs/EducationTab'
import { LayoutProps } from 'framer-motion'
import HealthProfile from './components/HealthProfile';
import HealthSpecialties from './components/HealthSpecialties';
import HealthAppointment from './components/HealthAppointment';
import { FaArrowRight, FaChevronDown } from 'react-icons/fa';
import { Box, CircularProgress } from '@mui/material';

const layout: React.FC<React.PropsWithChildren<LayoutProps>> = ({children}) => {
    const [activeMainTab, setActiveMainTab] = useState('profile'); // Renamed 'active' to 'activeMainTab' for clarity
        const [overallProgress, setOverallProgress] = useState(0);
        const activeContainerRef = useRef<HTMLDivElement>(null);
        const [activeButton, setActiveButton] = useState(false); // For the booking details dropdown
    
        // Define the order of your main tabs for progress calculation
        const mainTabOrder = ['profile', 'specialties', 'appointments'];
    
        // Function to calculate and update overall progress
        const calculateProgress = useCallback((currentTab: string) => {
            const currentTabIndex = mainTabOrder.indexOf(currentTab);
    
            if (currentTabIndex !== -1) {
                // If there are N tabs, there are (N-1) segments of progress from 0% to 100%.
                // So, for 3 tabs, there are 2 segments:
                // profile (index 0) -> 0%
                // specialties (index 1) -> 50%
                // appointments (index 2) -> 100%
                const totalProgressSegments = mainTabOrder.length - 1;
    
                // Avoid division by zero if there's only one tab (though not your case)
                if (totalProgressSegments === 0) {
                    setOverallProgress(100); // If only one step, it's always 100%
                    return;
                }
    
                const progress = (currentTabIndex / totalProgressSegments) * 100;
                setOverallProgress(Math.min(100, Math.round(progress)));
            } else {
                // Fallback for an unknown active tab, though ideally this shouldn't happen
                setOverallProgress(0);
            }
        }, [mainTabOrder]); // Dependency on mainTabOrder
    
        // Effect to update progress whenever the activeMainTab changes
        useEffect(() => {
            calculateProgress(activeMainTab);
        }, [activeMainTab, calculateProgress]);
    
        // Unified handler for the "NEXT" button
        const handleNext = () => {
            const currentTabIndex = mainTabOrder.indexOf(activeMainTab);
    
            if (currentTabIndex < mainTabOrder.length - 1) {
                // If there's a next tab, move to it
                setActiveMainTab(mainTabOrder[currentTabIndex + 1]);
            } else {
                // If it's the last tab ('appointments'), clicking NEXT means completion
                setOverallProgress(100); // Explicitly set to 100% on final click
                console.log('Legal service process completed!');
                // Here you would typically trigger form submission, navigate to a confirmation page, etc.
            }
        };
  return (
    <div>
      {children}
        <div className='md:max-w-[80%] mx-auto'>
            <div className="py-6 px-2">
                {/* Pass activeMainTab and setActiveMainTab to LegalTab */}
                <HealthServicesTab activeTab={activeMainTab} setActiveTab={setActiveMainTab} />
            </div>
            {/* Conditional rendering of components based on activeMainTab */}
            {activeMainTab === 'profile' && <HealthProfile />}
            {activeMainTab === 'specialties' && <HealthSpecialties />}
            {activeMainTab === 'appointments' && <HealthAppointment />}

            {/* Fixed bottom bar with progress and NEXT button */}
            {/* This bar is hidden for 'profile' tab as per your original logic */}
            <div className={`flex-col fixed z-20 bottom-0 md:w-[45%] w-full left-1/2 -translate-x-1/2 mx-auto md:p-5 p-2 gap-2 bg-white ${activeMainTab === 'profile' ? 'hidden' : 'flex'}`}>
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
  )
}

export default layout
