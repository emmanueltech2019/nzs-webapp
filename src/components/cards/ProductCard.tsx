import Image from "next/image";
import Link from "next/link";

interface CardProps {
    title: string;
    price: number;
    image?: any
  }
  const formatCurrency = (amount:any) => {
  // Handle case where input might be a string
  const numericAmount = Number(amount) || 0; 

  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    minimumFractionDigits: 0, // Change to 2 if you want kobo (e.g., ₦1,500.00)
    maximumFractionDigits: 0, 
  }).format(numericAmount);
};
  
  const Card: React.FC<CardProps> = ({ title, price, image }) => {
    return (
        <div className="bg-[#F8F9FE] rounded-2xl w-full  h-fit border">
          <div className="flex-grow flex items-center justify-center">
            <Image src={image || "https://res.cloudinary.com/wise-solution-inc/image/upload/v1756030371/product-placeholder_xsuq91.png"} alt={title} width="100" height={'100'} className="rounded-t-2xl h-[120px] md:h-[310px] w-full object-cover"/>
          </div>
          <div className="text-left mt-4 p-4">
            <h3 className="font-normal text-[15px] text-[#71727A]">{title}</h3>
            <p className="font-extrabold font-sans text-sm text-[#1F2024]">{formatCurrency(price)} </p>
          </div>
        </div>
    );
  };
  
  export default Card;
  