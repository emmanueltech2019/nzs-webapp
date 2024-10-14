import React from 'react'
import ServiceFilterButtons from '@/components/SortFilter/ServiceFilterButtons';
import GridWrapper from '@/components/Grid/GridWrapper';
import Link from 'next/link';
import ServicesCard from '@/components/cards/ServiceCard';

const Education = () => {

  const nearYouTransactions = [
    {
      title: "Great Faith Schools",
      subtitle: "Secondary School",
      rating: 4.8,
      distance: "3 KM",
      imageUrl:
        "https://img.freepik.com/free-photo/team-medical-scientist-modern-laboratory-searching-coronavirus-vaccine-wearing-ppe-chemist-researcher-global-pandemic-with-covid-19-checking-sample-biochemistry-lab_482257-8802.jpg?t=st=1727723690~exp=1727727290~hmac=74b27af40b5b01b134d21ea83768778dc681ecb038ea61f7e411de920bb89597&w=1800",
      isOpen: true,
      logo: '',
    },
    {
      title: "Credible High",
      subtitle: "Secondary School",
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
  return (
    <div className='md:w-[87%]'>
      <GridWrapper title="Near You">
        {nearYouTransactions.map((transaction, index) => (
          <Link href="./company?page=education" className="md:w-[42%] flex-shrink-0">
            <ServicesCard key={index} {...transaction} />
          </Link>
        ))}
      </GridWrapper>
    </div>
  )
}

export default Education