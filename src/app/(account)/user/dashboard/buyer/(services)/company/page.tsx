"use client"
import Review from '@/components/cards/Review';
import ServicesCard from '@/components/cards/ServiceCard';
import GridWrapper from '@/components/Grid/GridWrapper';
import ProfileHeader from '@/components/header/ProfileHeader';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { Suspense, useState } from 'react';
import Logo from "@/assets/images/logo.png"
import StarIcon from '@mui/icons-material/Star';
import TroubleshootIcon from '@mui/icons-material/Troubleshoot';
import AssistWalkerIcon from '@mui/icons-material/AssistWalker';
import SpecialtiesCard from '../health/components/SpecialtiesCard';

const Main = () => {
  const [activeTab, setActiveTab] = useState('Profile');
  const nearYouTransactions = [
    {
      title: "GilChrist Health",
      subtitle: "Maternity Clinic",
      rating: 4.8,
      distance: "3 KM",
      imageUrl:
        "https://img.freepik.com/free-photo/african-woman-biochemist-researcher-checking-manifestations-vaccine-working-modern-equipped-laboratory-multiethnic-doctors-examining-virus-evolution-using-high-tech-researching-diagnosis_482257-3747.jpg?t=st=1727723519~exp=1727727119~hmac=acdf6e3feed183a639164fb8d864532378ad708447a612919f4c9011c3da4765&w=1800",
      isOpen: true,
    },
    {
      title: "Mt. Everest Hospital",
      subtitle: "Hospital",
      rating: 4.8,
      distance: "3 KM",
      imageUrl:
        "https://img.freepik.com/free-photo/team-medical-scientist-modern-laboratory-searching-coronavirus-vaccine-wearing-ppe-chemist-researcher-global-pandemic-with-covid-19-checking-sample-biochemistry-lab_482257-8802.jpg?t=st=1727723690~exp=1727727290~hmac=74b27af40b5b01b134d21ea83768778dc681ecb038ea61f7e411de920bb89597&w=1800",
      isOpen: true,
    },
    {
      title: "Mt. Everest Hospital",
      subtitle: "Hospital",
      distance: "3 KM",
      rating: 4.8,
      imageUrl:
        "https://img.freepik.com/free-photo/team-medical-scientist-modern-laboratory-searching-coronavirus-vaccine-wearing-ppe-chemist-researcher-global-pandemic-with-covid-19-checking-sample-biochemistry-lab_482257-8802.jpg?t=st=1727723690~exp=1727727290~hmac=74b27af40b5b01b134d21ea83768778dc681ecb038ea61f7e411de920bb89597&w=1800",
      isOpen: true,
    },
    {
      title: "GilChrist Health",
      subtitle: "Maternity Clinic",
      rating: 4.8,

      distance: "3 KM",
      imageUrl:
        "https://img.freepik.com/free-photo/african-woman-biochemist-researcher-checking-manifestations-vaccine-working-modern-equipped-laboratory-multiethnic-doctors-examining-virus-evolution-using-high-tech-researching-diagnosis_482257-3747.jpg?t=st=1727723519~exp=1727727119~hmac=acdf6e3feed183a639164fb8d864532378ad708447a612919f4c9011c3da4765&w=1800",
      isOpen: true,
    },
    {
      title: "Mt. Everest Hospital",
      subtitle: "Hospital",
      distance: "3 KM",
      rating: 4.8,
      imageUrl:
        "https://img.freepik.com/free-photo/team-medical-scientist-modern-laboratory-searching-coronavirus-vaccine-wearing-ppe-chemist-researcher-global-pandemic-with-covid-19-checking-sample-biochemistry-lab_482257-8802.jpg?t=st=1727723690~exp=1727727290~hmac=74b27af40b5b01b134d21ea83768778dc681ecb038ea61f7e411de920bb89597&w=1800",
      isOpen: true,
    },
    {
      title: "Mt. Everest Hospital",
      subtitle: "Hospital",
      distance: "3 KM",
      rating: 4.8,
      imageUrl:
        "https://img.freepik.com/free-photo/team-medical-scientist-modern-laboratory-searching-coronavirus-vaccine-wearing-ppe-chemist-researcher-global-pandemic-with-covid-19-checking-sample-biochemistry-lab_482257-8802.jpg?t=st=1727723690~exp=1727727290~hmac=74b27af40b5b01b134d21ea83768778dc681ecb038ea61f7e411de920bb89597&w=1800",
      isOpen: true,
    },
  ];
  const searchParams = useSearchParams(); // Get search parameters from the URL
  const pageValue = searchParams.get('page');
  console.log(pageValue)

  return (
    <Suspense fallback={<div>Loading...</div>}>
      {pageValue == "hospitality" ? <>
        <div className="w-full">


          {/* <TabNavigation /> */}
          <div className="flex border-b bg-[#F8F9FE] mb-5 rounded-full p-1 ">
            {['Profile', 'Facilities', 'Book'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 text-center py-2 ${activeTab === tab ? 'bg-white shadow-md  font-semibold rounded-full' : 'text-gray-500'
                  }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className={`px-4 ${activeTab == "Profile" ? '' : 'hidden'}`}>
            <div className='flex justify-between items-center pr-5'>
              <h1 className='font-extrabold text-2xl '>GilChrist Health</h1>
              <Image src={Logo} alt='' className='w-10' />
            </div>
            <div className=' w-full'>
              <ProfileHeader
                title="GilChrist Health"
                location="Bugis Junction"
                address="200 Victoria St, Port Harcourt 200261"
                distance="3 Km"
                rating={4.5}
                imageUrl="/hospital.jpg"
              />
              <div className='flex justify-items-stretch space-x-5 w-[50vw]'>
                <span className="bg-gray-100 text-gray-700 px-5 py-2 text-center rounded-lg mr-2 "><AssistWalkerIcon />  {` `} Maternity</span>
                <span className="bg-gray-100 text-gray-700 px-5 py-2 rounded-lg mr-2"><TroubleshootIcon /> {` `} Diagnostics</span>
                <span className="bg-gray-100 text-gray-700 px-5 py-2 rounded-lg mr-2">
                  <span className=" flex items-center">
                    <StarIcon style={{ color: "#FFD33C" }} />
                    4.5
                  </span>
                </span>

              </div>
            </div>
            <p className="text-gray-600 mb-4 py-6">
              We’re a leading medical practice in Nigeria, dedicated to providing high-quality, patient-centered care across a range of specialties. Established with the vision of delivering world-class healthcare, we have grown into one of the most trusted names in the medical field.         </p>

            {/* Similar Facilities Section */}
            <GridWrapper title="Similar Services">
              {nearYouTransactions.map((transaction, index) => (
                <div className="md:w-[42%] flex-shrink-0">
                  <ServicesCard key={index} {...transaction} />
                </div>
              ))}
            </GridWrapper>

            {/* Review Section */}
            <div className="mb-4">
              <Review
                name="Monye Fubara"
                time="1 hr ago"
                reviewText="GilChrist Health’s modern facility is designed to offer comfort, convenience, and cutting-edge medical care."
              />
            </div>

            {/* Add a Review Button */}
            <div className="flex justify-center my-5">
              <button className="bg-[#006838] w-full text-white px-6 py-2 rounded-full">Add A Review</button>
            </div>
          </div>

          <div className={`px-4 ${activeTab == "Specialties" ? '' : 'hidden'}`}>
            <SpecialtiesCard />
          </div>
          <div className={`px-4 ${activeTab == "Appointments" ? '' : 'hidden'}`}>
          </div>
        </div>
      </> :


        pageValue == "health" ? <>
          <div className="w-full">


            {/* <TabNavigation /> */}
            <div className="flex border-b bg-[#F8F9FE] mb-5 rounded-full mb-4 p-1 ">
              {['Profile', 'Specialties', 'Appointments'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 text-center py-2 ${activeTab === tab ? 'bg-white shadow-md  font-semibold rounded-full' : 'text-gray-500'
                    }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            <div className={`px-4 ${activeTab == "Profile" ? '' : 'hidden'}`}>
              <div className='flex justify-between items-center pr-5'>
                <h1 className='font-extrabold text-2xl '>GilChrist Health</h1>
                <Image src={Logo} alt='' className='w-10' />
              </div>
              <div className=' w-full'>
                <ProfileHeader
                  title="GilChrist Health"
                  location="Bugis Junction"
                  address="200 Victoria St, Port Harcourt 200261"
                  distance="3 Km"
                  rating={4.5}
                  imageUrl="/hospital.jpg"
                />
                <div className='flex justify-items-stretch space-x-5 w-[50vw]'>
                  <span className="bg-gray-100 text-gray-700 px-5 py-2 text-center rounded-lg mr-2 "><AssistWalkerIcon />  {` `} Maternity</span>
                  <span className="bg-gray-100 text-gray-700 px-5 py-2 rounded-lg mr-2"><TroubleshootIcon /> {` `} Diagnostics</span>
                  <span className="bg-gray-100 text-gray-700 px-5 py-2 rounded-lg mr-2">
                    <span className=" flex items-center">
                      <StarIcon style={{ color: "#FFD33C" }} />
                      4.5
                    </span>
                  </span>

                </div>
              </div>
              <p className="text-gray-600 mb-4 py-6">
                We’re a leading medical practice in Nigeria, dedicated to providing high-quality, patient-centered care across a range of specialties. Established with the vision of delivering world-class healthcare, we have grown into one of the most trusted names in the medical field.         </p>

              {/* Similar Facilities Section */}
              <GridWrapper title="Similar Services">
                {nearYouTransactions.map((transaction, index) => (
                  <div className="md:w-[42%] flex-shrink-0">
                    <ServicesCard key={index} {...transaction} />
                  </div>
                ))}
              </GridWrapper>

              {/* Review Section */}
              <div className="mb-4">
                <Review
                  name="Monye Fubara"
                  time="1 hr ago"
                  reviewText="GilChrist Health’s modern facility is designed to offer comfort, convenience, and cutting-edge medical care."
                />
              </div>

              {/* Add a Review Button */}
              <div className="flex justify-center my-5">
                <button className="bg-[#006838] w-full text-white px-6 py-2 rounded-full">Add A Review</button>
              </div>
            </div>

            <div className={`px-4 ${activeTab == "Specialties" ? '' : 'hidden'}`}>
              <SpecialtiesCard />
            </div>
            <div className={`px-4 ${activeTab == "Appointments" ? '' : 'hidden'}`}>
            </div>
          </div>
        </> :


          pageValue == "logistics" ? <>
            <div className="w-full">

              {/* <TabNavigation /> */}
              <div className="flex border-b bg-[#F8F9FE] mb-5 rounded-full mb-4 p-1 ">
                {['Profile', 'Routes', 'Carrier Info', 'Load Info'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`flex-1 text-center py-2 ${activeTab === tab ? 'bg-white shadow-md  font-semibold rounded-full' : 'text-gray-500'
                      }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              <div className={`px-4 ${activeTab == "Profile" ? '' : 'hidden'}`}>
                <div className='flex justify-between items-center pr-5'>
                  <h1 className='font-extrabold text-2xl '>GilChrist Health</h1>
                  <Image src={Logo} alt='' className='w-10' />
                </div>
                <div className=' w-full'>
                  <ProfileHeader
                    title="GilChrist Health"
                    location="Bugis Junction"
                    address="200 Victoria St, Port Harcourt 200261"
                    distance="3 Km"
                    rating={4.5}
                    imageUrl="/hospital.jpg"
                  />
                  <div className='flex justify-items-stretch space-x-5 w-[50vw]'>
                    <span className="bg-gray-100 text-gray-700 px-5 py-2 text-center rounded-lg mr-2 "><AssistWalkerIcon />  {` `} Maternity</span>
                    <span className="bg-gray-100 text-gray-700 px-5 py-2 rounded-lg mr-2"><TroubleshootIcon /> {` `} Diagnostics</span>
                    <span className="bg-gray-100 text-gray-700 px-5 py-2 rounded-lg mr-2">
                      <span className=" flex items-center">
                        <StarIcon style={{ color: "#FFD33C" }} />
                        4.5
                      </span>
                    </span>

                  </div>
                </div>
                <p className="text-gray-600 mb-4 py-6">
                  We’re a leading medical practice in Nigeria, dedicated to providing high-quality, patient-centered care across a range of specialties. Established with the vision of delivering world-class healthcare, we have grown into one of the most trusted names in the medical field.         </p>

                {/* Similar Facilities Section */}
                <GridWrapper title="Similar Services">
                  {nearYouTransactions.map((transaction, index) => (
                    <div className="md:w-[42%] flex-shrink-0">
                      <ServicesCard key={index} {...transaction} />
                    </div>
                  ))}
                </GridWrapper>

                {/* Review Section */}
                <div className="mb-4">
                  <Review
                    name="Monye Fubara"
                    time="1 hr ago"
                    reviewText="GilChrist Health’s modern facility is designed to offer comfort, convenience, and cutting-edge medical care."
                  />
                </div>

                {/* Add a Review Button */}
                <div className="flex justify-center my-5">
                  <button className="bg-[#006838] w-full text-white px-6 py-2 rounded-full">Add A Review</button>
                </div>
              </div>

              <div className={`px-4 ${activeTab == "Specialties" ? '' : 'hidden'}`}>
                <SpecialtiesCard />
              </div>
              <div className={`px-4 ${activeTab == "Appointments" ? '' : 'hidden'}`}>
              </div>
            </div>
          </> :


            pageValue == "education" ? <>
              <div className="w-full">


                {/* <TabNavigation /> */}
                <div className="flex border-b bg-[#F8F9FE] mb-5 rounded-full mb-4 p-1 ">
                  {['Profile', 'Facilities', 'Study', 'Enroll'].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`flex-1 text-center py-2 ${activeTab === tab ? 'bg-white shadow-md  font-semibold rounded-full' : 'text-gray-500'
                        }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>

                <div className={`px-4 ${activeTab == "Profile" ? '' : 'hidden'}`}>
                  <div className='flex justify-between items-center pr-5'>
                    <h1 className='font-extrabold text-2xl '>GilChrist Health</h1>
                    <Image src={Logo} alt='' className='w-10' />
                  </div>
                  <div className=' w-full'>
                    <ProfileHeader
                      title="GilChrist Health"
                      location="Bugis Junction"
                      address="200 Victoria St, Port Harcourt 200261"
                      distance="3 Km"
                      rating={4.5}
                      imageUrl="/hospital.jpg"
                    />
                    <div className='flex justify-items-stretch space-x-5 w-[50vw]'>
                      <span className="bg-gray-100 text-gray-700 px-5 py-2 text-center rounded-lg mr-2 "><AssistWalkerIcon />  {` `} Maternity</span>
                      <span className="bg-gray-100 text-gray-700 px-5 py-2 rounded-lg mr-2"><TroubleshootIcon /> {` `} Diagnostics</span>
                      <span className="bg-gray-100 text-gray-700 px-5 py-2 rounded-lg mr-2">
                        <span className=" flex items-center">
                          <StarIcon style={{ color: "#FFD33C" }} />
                          4.5
                        </span>
                      </span>

                    </div>
                  </div>
                  <p className="text-gray-600 mb-4 py-6">
                    We’re a leading medical practice in Nigeria, dedicated to providing high-quality, patient-centered care across a range of specialties. Established with the vision of delivering world-class healthcare, we have grown into one of the most trusted names in the medical field.         </p>

                  {/* Similar Facilities Section */}
                  <GridWrapper title="Similar Services">
                    {nearYouTransactions.map((transaction, index) => (
                      <div className="md:w-[42%] flex-shrink-0">
                        <ServicesCard key={index} {...transaction} />
                      </div>
                    ))}
                  </GridWrapper>

                  {/* Review Section */}
                  <div className="mb-4">
                    <Review
                      name="Monye Fubara"
                      time="1 hr ago"
                      reviewText="GilChrist Health’s modern facility is designed to offer comfort, convenience, and cutting-edge medical care."
                    />
                  </div>

                  {/* Add a Review Button */}
                  <div className="flex justify-center my-5">
                    <button className="bg-[#006838] w-full text-white px-6 py-2 rounded-full">Add A Review</button>
                  </div>
                </div>

                <div className={`px-4 ${activeTab == "Specialties" ? '' : 'hidden'}`}>
                  <SpecialtiesCard />
                </div>
                <div className={`px-4 ${activeTab == "Appointments" ? '' : 'hidden'}`}>
                </div>
              </div>
            </> :


              pageValue == "legal" ? <>
                <div className="w-full">

                  {/* <TabNavigation /> */}
                  <div className="flex border-b bg-[#F8F9FE] mb-5 rounded-full mb-4 p-1 ">
                    {['Profile', 'Specialties', 'Appointments'].map((tab) => (
                      <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`flex-1 text-center py-2 ${activeTab === tab ? 'bg-white shadow-md  font-semibold rounded-full' : 'text-gray-500'
                          }`}
                      >
                        {tab}
                      </button>
                    ))}
                  </div>

                  <div className={`px-4 ${activeTab == "Profile" ? '' : 'hidden'}`}>
                    <div className='flex justify-between items-center pr-5'>
                      <h1 className='font-extrabold text-2xl '>GilChrist Health</h1>
                      <Image src={Logo} alt='' className='w-10' />
                    </div>
                    <div className=' w-full'>
                      <ProfileHeader
                        title="GilChrist Health"
                        location="Bugis Junction"
                        address="200 Victoria St, Port Harcourt 200261"
                        distance="3 Km"
                        rating={4.5}
                        imageUrl="/hospital.jpg"
                      />
                      <div className='flex justify-items-stretch space-x-5 w-[50vw]'>
                        <span className="bg-gray-100 text-gray-700 px-5 py-2 text-center rounded-lg mr-2 "><AssistWalkerIcon />  {` `} Maternity</span>
                        <span className="bg-gray-100 text-gray-700 px-5 py-2 rounded-lg mr-2"><TroubleshootIcon /> {` `} Diagnostics</span>
                        <span className="bg-gray-100 text-gray-700 px-5 py-2 rounded-lg mr-2">
                          <span className=" flex items-center">
                            <StarIcon style={{ color: "#FFD33C" }} />
                            4.5
                          </span>
                        </span>

                      </div>
                    </div>
                    <p className="text-gray-600 mb-4 py-6">
                      We’re a leading medical practice in Nigeria, dedicated to providing high-quality, patient-centered care across a range of specialties. Established with the vision of delivering world-class healthcare, we have grown into one of the most trusted names in the medical field.         </p>

                    {/* Similar Facilities Section */}
                    <GridWrapper title="Similar Services">
                      {nearYouTransactions.map((transaction, index) => (
                        <div className="md:w-[42%] flex-shrink-0">
                          <ServicesCard key={index} {...transaction} />
                        </div>
                      ))}
                    </GridWrapper>

                    {/* Review Section */}
                    <div className="mb-4">
                      <Review
                        name="Monye Fubara"
                        time="1 hr ago"
                        reviewText="GilChrist Health’s modern facility is designed to offer comfort, convenience, and cutting-edge medical care."
                      />
                    </div>

                    {/* Add a Review Button */}
                    <div className="flex justify-center my-5">
                      <button className="bg-[#006838] w-full text-white px-6 py-2 rounded-full">Add A Review</button>
                    </div>
                  </div>

                  <div className={`px-4 ${activeTab == "Specialties" ? '' : 'hidden'}`}>
                    <SpecialtiesCard />
                  </div>
                  <div className={`px-4 ${activeTab == "Appointments" ? '' : 'hidden'}`}>
                  </div>
                </div>
              </> : ''

      }

    </Suspense>
  );
};
const FacilityPage = () => (
  <Suspense fallback={<div>loading...</div>}>
    <Main />
  </Suspense>
)
export default FacilityPage;


