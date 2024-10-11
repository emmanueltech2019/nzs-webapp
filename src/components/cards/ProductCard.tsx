import Image from "next/image";
import Link from "next/link";

interface CardProps {
    title: string;
    price: string;
    image?: any
  }
  
  const Card: React.FC<CardProps> = ({ title, price, image }) => {
    return (
      <Link href={"./dashboard/Product"}>
        <div className="bg-[#F8F9FE] rounded-2xl w-full  h-[240px]">
          <div className="flex-grow flex items-center justify-center">
            <Image src={image} alt={title} className="rounded-t-2xl h-[120px] md:h-[160px] w-full object-cover"/>
          </div>
          <div className="text-left mt-4 p-4">
            <h3 className="font-normal text-xs text-[#71727A]">{title}</h3>
            <p className="font-extrabold font-sans text-sm text-[#1F2024]">{price}</p>
          </div>
        </div>
      </Link>
    );
  };
  
  export default Card;
  