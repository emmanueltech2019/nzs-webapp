"use client";
import React, { useState } from "react";
import ServicesCard from "@/components/cards/ServiceCard";
import ServiceFilterButtons from "@/components/SortFilter/ServiceFilterButtons";
import healthImage1 from "../../../../../../assets/images/biochemist.png";
import GridWrapper from "@/components/Grid/GridWrapper";
import { filters } from "@/components/SortFilter/Filters";
import { div } from "framer-motion/client";
import Logistics from "./buyer/(services)/logistics/components/Logistics";
import Health from "./buyer/(services)/health/components/Health";
import Hospitality from "./buyer/(services)/hospitality/components/Hospitality";
import Legal from "@/app/(account)/user/dashboard/buyer/(services)/legal/components/Legal"

const Services = () => {
  const [active, setActive] = useState("General");
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

  return (
    <div className="min-h-screen p-1 mb-[4rem]">
      <div className="overflow-x-auto">
        <ServiceFilterButtons
          active={active}
          filterArray={filters}
          setActive={setActive}
        />
      </div>
      {active === "General" && (
        <div>
          <GridWrapper title="Near You">
            {nearYouTransactions.map((transaction, index) => (
              <div className="md:w-[38%] flex-shrink-0">
                <ServicesCard key={index} {...transaction} />
              </div>
            ))}
          </GridWrapper>
          <GridWrapper title="Top Rated">
            {topRatedTransactions.map((transaction, index) => (
              <div className="md:w-[39%] flex-shrink-0">
                <ServicesCard key={index} {...transaction} />
              </div>
            ))}
          </GridWrapper>
        </div>
      )}

      {
        active === "Logistics" && (
          <div className="p-2">
            <Logistics />
          </div>
        )
      }
      {
        active === "Health" && (
          <div className="p-2">
            <div>
              <GridWrapper title="Near You">
                {nearYouTransactions.map((transaction, index) => (
                  <div className="md:w-[38%] flex-shrink-0">
                    <ServicesCard key={index} {...transaction} profileLink={`/user/dashboard/buyer/health/${index}`} />
                  </div>
                ))}
              </GridWrapper>
              <GridWrapper title="Top Rated">
                {topRatedTransactions.map((transaction, index) => (
                  <div className="md:w-[39%] flex-shrink-0">
                    <ServicesCard key={index} {...transaction} profileLink={`/user/dashboard/buyer/health/${index}`} />
                  </div>
                ))}
              </GridWrapper>
            </div>
          </div>
        )
      }
      {
        active === "Hospitality" && (
          <>
            {nearYouTransactions.map((transaction, index) => (
              <Hospitality key={index} {...transaction} />
            ))}
          </>
        )
      }
      {
        active === "Legal" && (
          <div className="p-2">
            <div>
              <GridWrapper title="Near You">
                {nearYouTransactions.map((transaction, index) => (
                  <div className="md:w-[38%] flex-shrink-0">
                    <ServicesCard key={index} {...transaction} profileLink={`/user/dashboard/buyer/legal/${index}`} />
                  </div>
                ))}
              </GridWrapper>
              <GridWrapper title="Top Rated">
                {topRatedTransactions.map((transaction, index) => (
                  <div className="md:w-[39%] flex-shrink-0">
                    <ServicesCard key={index} {...transaction} profileLink={`/user/dashboard/buyer/legal/${index}`} />
                  </div>
                ))}
              </GridWrapper>
            </div>
          </div>
        )
      }
      {
        active === "Education" && (
          <div className="p-2">
            <div>
              <GridWrapper title="Near You">
                {nearYouTransactions.map((transaction, index) => (
                  <div className="md:w-[38%] flex-shrink-0">
                    <ServicesCard key={index} {...transaction} profileLink={`/user/dashboard/buyer/education/${index}`} />
                  </div>
                ))}
              </GridWrapper>
              <GridWrapper title="Top Rated">
                {topRatedTransactions.map((transaction, index) => (
                  <div className="md:w-[39%] flex-shrink-0">
                    <ServicesCard key={index} {...transaction} profileLink={`/user/dashboard/buyer/education/${index}`} />
                  </div>
                ))}
              </GridWrapper>
            </div>
          </div>
        )
      }
    </div>
  );
};

export default Services;
