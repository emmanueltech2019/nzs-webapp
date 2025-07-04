'use client'
import { Icon } from "@iconify/react/dist/iconify.js"
import Image from "next/image"
import { useParams } from "next/navigation"
import { FC, useState } from "react"
import openSansFont from "@/fonts/OpenSans"
import { useRouter } from "next/navigation"
import Profile from "../../logistics/company-profile/components/Profile"
import Routes from "../../logistics/company-profile/components/Routes"
import HealthServicesTab from "@/components/tabs/HealthServicesTab"
import HealthProfile from "../components/HealthProfile"
import HealthSpecialties from "../components/HealthSpecialties"
import HealthAppointment from "../components/HealthAppointment"


const page: FC = () => {
  const [active, setActive] = useState('profile')
  const router = useRouter()
  const params = useParams()

  const handleBack = () => {
    if (window.history.length > 1) {
      router.back();
    } else {
      router.push('/user/dashboard');
    }
  };

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

  const id = params.id;

  const idFormat = Number(id);

  console.log(idFormat)

  const newData = nearYouTransactions[idFormat]
  if(isNaN(idFormat) || idFormat < 0 || idFormat >= nearYouTransactions.length || !newData) {
    return <div>Item not found or invalid index!</div>
  }
  return (
    <div className={`${openSansFont} md:max-w-[80%] mx-auto`}>
      <button className="py-[30px] ms-[1rem] cursor-pointer" onClick={handleBack}>
        <Icon icon='mingcute:close-fill' className="text-2xl text-[#2F3036]" />
      </button>
      <div className="product-image max-h-[534px] overflow-hidden">
        <img src={newData.imageUrl} alt='product image' className="w-full h-[400px] object-cover" />
      </div>
      <div className="py-6 px-2">
        <HealthServicesTab activeTab={active} setActiveTab={setActive} />
      </div>
      {active == 'profile' && <HealthProfile />}
      {active == 'specialties' && <HealthSpecialties />}
      {active == 'appointments' && <HealthAppointment />}
    </div>
  )
}

export default page
