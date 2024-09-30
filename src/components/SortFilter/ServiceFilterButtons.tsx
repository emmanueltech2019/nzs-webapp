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
    <div className="flex p-4 my-4 gap-2">
      {filters.map((filter, index) => (
        <Link
          key={index}
          href={filter.url}
          className={`${
            filter.name==active ? "bg-[#006838] text-[#fff]" : "bg-[#EAF2FF]"
          } px-2 py-[6px] rounded-[12px] text-[10px] leading-[13.62px] text-[#006838] font-[550] uppercase`}
        >
          {filter.name}
        </Link>
      ))}
    </div>
  );
};

export default ServiceFilterButtons;
