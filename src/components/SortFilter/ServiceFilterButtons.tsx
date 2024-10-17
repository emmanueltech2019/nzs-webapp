import Link from "next/link";


interface Filter {
  name: string,
  url: string,
}

interface ServiceFilterButtonsProps {
  active: string;
  filterArray: Filter[],
}



const ServiceFilterButtons: React.FC<ServiceFilterButtonsProps> = ({ active, filterArray }) => {


  return (
    <div className="flex p-4 my-1 gap-2 w-full">
      {filterArray.map((filter, index) => (
        <Link
          key={index}
          href={filter.url}
          className={`px-2 py-[6px] rounded-[12px] text-[10px] leading-[13.62px] font-[550] uppercase
          ${filter.name === active ? "bg-[#006838] text-[#fff]" : "bg-[#EAF2FF] text-[#006838]"}`}
        > 
          {filter.name}
        </Link>
      ))}
    </div>
  );

};

export default ServiceFilterButtons;
