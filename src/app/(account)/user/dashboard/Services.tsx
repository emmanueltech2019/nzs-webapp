"use client";
import ServicesCard from "@/components/cards/ServiceCard";
import ServiceFilterButtons from "@/components/SortFilter/ServiceFilterButtons";
import healthImage1 from "../../../../../../assets/images/biochemist.png";
import GridWrapper from "@/components/Grid/GridWrapper";
import { filters } from "@/components/SortFilter/Filters";

const Services = () => {
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
  
    const topRatedTransactions = [
      {
        title: "DHL Logistics",
        subtitle: "Lagos Island",
        rating: 4.8,
        imageUrl: "/dhl.jpg",
        isOpen: false,
      },
    ];
  
    return (
      <div className="min-h-screen ">
        <ServiceFilterButtons active="Logistics" filterArray={filters}/>
        {/* <h2 className="text-lg font-bold mb-2">Near you</h2>
        <div className="flex space-x-4 overflow-x-scroll">
          {nearYouTransactions.map((transaction, index) => (
            <ServicesCard key={index} {...transaction} />
          ))}
        </div> */}
        {/* <GridWrapper title="Near You">
        {nearYouTransactions.map((transaction, index) => (
          <div className="md:w-[35%] flex-shrink-0">
              <ServicesCard key={index} {...transaction} />
          </div>
          ))}
        </GridWrapper> */}
      </div>
    );
  };

  export default Services;