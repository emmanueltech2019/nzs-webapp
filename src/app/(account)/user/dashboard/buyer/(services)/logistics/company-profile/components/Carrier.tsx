import React from 'react'
import { Icon } from '@iconify/react/dist/iconify.js'
import ServicesCard from '@/components/cards/ServiceCard';
import GridWrapper from '@/components/Grid/GridWrapper';
import { isObject } from 'util';

const Carrier = () => {
    const carrier = ['CARGO BUS', 'REEFER', 'MINI', 'TRICYCLE', 'PICKUP', 'CAR', 'TRUCK', 'VAN', 'BIKE', 'SEMI-TRAILER', 'BOX TRUCK', 'FLATBED']
    const nearYouTransactions = [
    {
      title: "Mack Long-Haul 360",
      subtitle: "Capacity: 12 tons",
      rating: 4.8,
      distance: "3 KM",
      imageUrl:
        "https://img.freepik.com/free-photo/african-woman-biochemist-researcher-checking-manifestations-vaccine-working-modern-equipped-laboratory-multiethnic-doctors-examining-virus-evolution-using-high-tech-researching-diagnosis_482257-3747.jpg?t=st=1727723519~exp=1727727119~hmac=acdf6e3feed183a639164fb8d864532378ad708447a612919f4c9011c3da4765&w=1800",
      select: true,
      isOpen: false
    },
    {
      title: "Benz 342",
      subtitle: "Capacity: 6 ton",
      rating: 4.8,
      distance: "3 KM",
      imageUrl:
        "https://img.freepik.com/free-photo/team-medical-scientist-modern-laboratory-searching-coronavirus-vaccine-wearing-ppe-chemist-researcher-global-pandemic-with-covid-19-checking-sample-biochemistry-lab_482257-8802.jpg?t=st=1727723690~exp=1727727290~hmac=74b27af40b5b01b134d21ea83768778dc681ecb038ea61f7e411de920bb89597&w=1800",
      select: true,
      isOpen: false
    },
    {
      title: "Mt. Everest Hospital",
      subtitle: "Hospital",
      distance: "3 KM",
      rating: 4.8,
      imageUrl:
        "https://img.freepik.com/free-photo/team-medical-scientist-modern-laboratory-searching-coronavirus-vaccine-wearing-ppe-chemist-researcher-global-pandemic-with-covid-19-checking-sample-biochemistry-lab_482257-8802.jpg?t=st=1727723690~exp=1727727290~hmac=74b27af40b5b01b134d21ea83768778dc681ecb038ea61f7e411de920bb89597&w=1800",
      select: true,
      isOpen: false
    },
    {
      title: "GilChrist Health",
      subtitle: "Maternity Clinic",
      rating: 4.8,

      distance: "3 KM",
      imageUrl:
        "https://img.freepik.com/free-photo/african-woman-biochemist-researcher-checking-manifestations-vaccine-working-modern-equipped-laboratory-multiethnic-doctors-examining-virus-evolution-using-high-tech-researching-diagnosis_482257-3747.jpg?t=st=1727723519~exp=1727727119~hmac=acdf6e3feed183a639164fb8d864532378ad708447a612919f4c9011c3da4765&w=1800",
      select: true,
      isOpen: false
    },
    {
      title: "Mt. Everest Hospital",
      subtitle: "Hospital",
      distance: "3 KM",
      rating: 4.8,
      imageUrl:
        "https://img.freepik.com/free-photo/team-medical-scientist-modern-laboratory-searching-coronavirus-vaccine-wearing-ppe-chemist-researcher-global-pandemic-with-covid-19-checking-sample-biochemistry-lab_482257-8802.jpg?t=st=1727723690~exp=1727727290~hmac=74b27af40b5b01b134d21ea83768778dc681ecb038ea61f7e411de920bb89597&w=1800",
      select: true,
      isOpen: false
    },
    {
      title: "Mt. Everest Hospital",
      subtitle: "Hospital",
      distance: "3 KM",
      rating: 4.8,
      imageUrl:
        "https://img.freepik.com/free-photo/team-medical-scientist-modern-laboratory-searching-coronavirus-vaccine-wearing-ppe-chemist-researcher-global-pandemic-with-covid-19-checking-sample-biochemistry-lab_482257-8802.jpg?t=st=1727723690~exp=1727727290~hmac=74b27af40b5b01b134d21ea83768778dc681ecb038ea61f7e411de920bb89597&w=1800",
      select: true,
      isOpen: false
    },
  ];
  return (
    <div className='mb-60'>
        <section className="locations">
            <div className="row flex justify-between items-center">
                <div className="col">
                    <h2 className='text-[#1F2024]'>Carrier</h2>
                    <p className='text-[#71727A] text-sm tracking-wide'>Available in Nigeria</p>
                </div>
                <div className="col">
                    <div className='w-6 h-6 rounded-full flex items-center justify-center text-sm bg-[--foreground-green] text-white leading-[0]'>9</div>
                </div>
            </div>

            <div className="flex flex-wrap gap-2 my-5">
            {carrier.map(state => (<div className='px-3 py-[6px] text-[--foreground-green] bg-[#EAF2FF] text-sm uppercase tracking-wider rounded-2xl'>{state}</div>))}
            </div>

            <div className="row flex justify-between items-center">
                <div className="col">
                    <h2 className='text-[#1F2024]'>Trucks</h2>
                    <p className='text-[#71727A] text-sm tracking-wide'>Road-ready options</p>
                </div>
                <div className="col">
                    <div className='w-6 h-6 rounded-full flex items-center justify-center text-sm bg-[--foreground-green] text-white leading-[0]'>9</div>
                </div>
            </div>
            <GridWrapper title=''>
                {nearYouTransactions.map((transaction, index) => (
                  <div className="md:w-[38%] flex-shrink-0">
                    <ServicesCard key={index} {...transaction} />
                  </div>
                ))}
            </GridWrapper>
        </section>
    </div>
  )
}

export default Carrier
