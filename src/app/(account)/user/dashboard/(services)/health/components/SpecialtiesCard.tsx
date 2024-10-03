import ProgressBar from "@/components/buttons/ProgressButton";
import React, { useState } from "react";
import ArrowOutwardOutlinedIcon from '@mui/icons-material/ArrowOutwardOutlined';
interface Doctor {
  id: number;
  name: string;
  title: string;
  booked: boolean;
}

const doctors: Doctor[] = [
  { id: 1, name: "Asma'u Musa", title: "MD FACS.", booked: false },
  { id: 2, name: "Adaeze Ezeoke", title: "MD FACS.", booked: true },
  { id: 3, name: "Seyi Oyedepo", title: "MD FACS.", booked: false },
  { id: 4, name: "Ummi Yahaya", title: "MD FACS.", booked: false },
];

const specialties = [
  {name:"Obstetrics/Gynecology", available: false, progress: 10}
  ,
  {
    name: "Anesthesiology",
    description:
      "Anesthesiology is a branch of medicine that focuses on providing pain relief and ensuring patient comfort and safety during surgeries or other medical procedures.",
    available: true,
  },
  {
    name: "Family Medicine",
    description: "",
    available: false,
    progress: 80,
  },
  {
    name: "Dermatology",
    description: "",
    available: false,
    progress: 75,
  },
];

const SpecialtiesCard: React.FC = () => {
  const [openSpecialty, setOpenSpecialty] = useState<string | null>(null);

  const handleToggle = (specialtyName: string) => {
    if (openSpecialty === specialtyName) {
      setOpenSpecialty(null); // Close if already open
    } else {
      setOpenSpecialty(specialtyName); // Open the clicked one
    }
  };

  return (
    <div className=" bg-white  p-6 mt-8">
      {/* Consultation Price */}
      <div className="text-center mb-4">
        <p className="text-gray-500 text-sm">Consultation:</p>
        <p className="text-2xl font-bold">N 35,000.00</p>
      </div>

      {/* Specialties Section */}
      <div className="border p-4 rounded-lg bg-[#f5f6f6] rounded-lg">
        <div className="flex justify-between items-center ">
          <h2 className="text-2xl font-semibold">OUR SPECIALTIES</h2>
          <button className="bg-[#ECEDEE] rounded-full p-3">.
            <ArrowOutwardOutlinedIcon style={{fontSize:"25px"}}/>
          </button>
        </div>
        <div className="text-sm text-gray-400 mt-1 flex justify-between">
          <p>Total Services (20)</p>
          <p>Updated 3 Weeks ago</p>
        </div>

        {/* Dropdown for Specialties */}
        <div className="mt-4">
          {specialties.map((specialty) => (
            <div key={specialty.name} className="mb-4 bg-white p-3 rounded-lg">
              {/* Specialty Header */}
              <div
                className="flex justify-between items-center cursor-pointer"
                onClick={() => handleToggle(specialty.name)}
              >
                <p className="font-semibold">{specialty.name}</p>
                <p className="text-sm bg-gray-200 px-3 py-1 rounded-full">
                  {specialty.available ? "Available" : specialty.progress + "% Booked"}
                </p>
              </div>

              {/* Specialty Description (Collapsible) */}
              {openSpecialty === specialty.name && (
                <>
              <p className="text-[#71727A]">Anesthesiology is a branch of medicine that focuses on providing pain relief and ensuring patient comfort and safety during surgeries or other medical procedures.</p>
                <div className="bg-white p-3 mt-2 rounded-md">
                  <div className="mt-4">
          {doctors.map((doctor) => (
            <div
              key={doctor.id}
              className="flex justify-between items-center py-2"
            >
              <div>
                <p className="font-semibold">{doctor.name}</p>
                <p className="text-gray-400 text-sm">{doctor.title}</p>
              </div>
              <button
                className={`${
                  doctor.booked
                    ? "text-green-500 border-green-500"
                    : "text-gray-400 border-gray-300"
                } border px-4 py-1 rounded-md text-sm`}
              >
                {doctor.booked ? "BOOK NOW" : "BOOK NOW"}
              </button>
            </div>
          ))}
        </div>
                  {/* {specialty.description ? (
                    <p className="text-gray-500 text-sm">
                      {specialty.description}
                    </p>
                  ) : (
                    <p className="text-sm bg-[]">
                      {specialty.progress}% Booked
                    </p>
                  )} */}
                </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Doctor's List */}
      {/* {openSpecialty === "Anesthesiology" && (
        <div className="mt-4">
          {doctors.map((doctor) => (
            <div
              key={doctor.id}
              className="flex justify-between items-center py-2"
            >
              <div>
                <p className="font-semibold">{doctor.name}</p>
                <p className="text-gray-400 text-sm">{doctor.title}</p>
              </div>
              <button
                className={`${
                  doctor.booked
                    ? "text-green-500 border-green-500"
                    : "text-gray-400 border-gray-300"
                } border px-4 py-1 rounded-md text-sm`}
              >
                {doctor.booked ? "BOOK NOW" : "BOOK NOW"}
              </button>
            </div>
          ))}
        </div>
      )} */}

      {/* Booking Details Button */}
      <div className="mt-6 flex space-x-2 h-28 justify-center items-center ">
        <button className="w-full bg-[#006838] text-center text-white py-6 rounded-md  px-3">
          Next
        </button>
        <div>
        <ProgressBar progress={50}/>

        </div>
      </div>
    </div>
  );
};

export default SpecialtiesCard;
