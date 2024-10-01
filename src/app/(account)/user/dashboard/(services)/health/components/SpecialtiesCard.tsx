import ProgressBar from "@/components/buttons/ProgressButton";
import React, { useState } from "react";

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
    <div className="max-w-md mx-auto bg-white shadow-md rounded-lg p-6 mt-8">
      {/* Consultation Price */}
      <div className="text-center mb-4">
        <p className="text-gray-500 text-sm">Consultation:</p>
        <p className="text-2xl font-bold">N 35,000.00</p>
      </div>

      {/* Specialties Section */}
      <div className="border p-4 rounded-lg">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold">OUR SPECIALTIES</h2>
          <button className="text-gray-400">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
        <div className="text-sm text-gray-400 mt-1">
          <p>Total Services (20)</p>
          <p>Updated 3 Weeks ago</p>
        </div>

        {/* Dropdown for Specialties */}
        <div className="mt-4">
          {specialties.map((specialty) => (
            <div key={specialty.name} className="mb-4">
              {/* Specialty Header */}
              <div
                className="flex justify-between items-center cursor-pointer"
                onClick={() => handleToggle(specialty.name)}
              >
                <p className="font-semibold">{specialty.name}</p>
                <p className="text-sm text-gray-400">
                  {specialty.available ? "Available" : specialty.progress + "% Booked"}
                </p>
              </div>

              {/* Specialty Description (Collapsible) */}
              {openSpecialty === specialty.name && (
                <div className="bg-gray-100 p-3 mt-2 rounded-md">
                  {specialty.description ? (
                    <p className="text-gray-500 text-sm">
                      {specialty.description}
                    </p>
                  ) : (
                    <p className="text-sm text-yellow-500">
                      {specialty.progress}% Booked
                    </p>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Doctor's List */}
      {openSpecialty === "Anesthesiology" && (
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
      )}

      {/* Booking Details Button */}
      <div className="mt-6">
        <button className="w-full bg-green-500 text-white py-3 rounded-md flex justify-between items-center px-4">
          <span>NEXT</span>
        </button>
        <ProgressBar progress={50}/>
      </div>
    </div>
  );
};

export default SpecialtiesCard;
