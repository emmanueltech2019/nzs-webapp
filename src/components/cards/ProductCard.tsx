import Image from "next/image";
import productMockup from "../../assets/images/productMockup.png"
import Link from "next/link";

interface CardProps {
    title: string;
    price: string;
  }
  
  const Card: React.FC<CardProps> = ({ title, price }) => {
    return (
      <Link href={"./dashboard/Product"}>
        <div className="bg-blue-50 rounded-lg shadow-md p-0 flex flex-col justify-between h-fit pb-5">
          <div className="flex-grow flex items-center justify-center">
            <Image src={productMockup} alt={title} className="h-fit w-[45vw] md:w-[25vw] object-cover rounded-t-lg"/>
          </div>
          <div className="text-left mt-4 px-2">
            <h3 className="text-sm">{title}</h3>
            <p className="text-sm font-bold text-black mt-1">{price}</p>
          </div>
        </div>
      </Link>
    );
  };
  
  export default Card;
  