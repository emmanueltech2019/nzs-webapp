import Link from "next/link";


interface ServiceFilterButtonsProps {
    active: string;
}

  const ServiceFilterButtons: React.FC<ServiceFilterButtonsProps> = ({ active }) => {
  const filters = [
    { name: "General", url: "./services" },
    { name: "Logistics", url: "./logistics" },
    { name: "Health", url: "./health" },
    { name: "Hospitality", url: "./hospitality" },
    { name: "Legal", url: "./legal" },
    { name: "Education", url: "./education" },
  ];

  return (
    <div className="flex space-x-2 my-4">
      {filters.map((filter, index) => (
        <Link
          key={index}
          href={filter.url}
          className={`${
            filter.name==active ? "bg-[#006838] text-[#fff]" : "bg-[#EAF2FF]"
          } px-4 py-2 rounded-full text-sm text-[#006838]`}
        >
          {filter.name}
        </Link>
      ))}
    </div>
  );
};

export default ServiceFilterButtons;
