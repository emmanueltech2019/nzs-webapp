import Image from "next/image";
import { Icon } from "@iconify/react/dist/iconify.js";

type Customer = {
  name: string;
  amount: string;
  change: string;
  image: string;
  changeColor: string;
};

type ToplistProps = {
  customers: Customer[];
};


const Toplist: React.FC<ToplistProps> = ({ customers }) => {
  return (
    <div className="bg-white p-3 rounded-lg shadow-sm font-sans">
      <div className="flex items-center justify-between mb-3">
      <h2 className="text-[16px] text-[#2C2C2C] font-normal">My Best Customers!</h2> <Icon icon="tabler:star-filled" className="text-[#FFBB5B] bg-[#006838] p-1 rounded-[4.36px]" width="24" height="24" />
      </div>
      <div className="space-y-4">
        {customers.map((customer, index) => (
          <div key={index} className="flex items-center justify-between border-b-[1px] border-[#E8E9FF] py-3">
            <div className="flex items-center gap-3 ">
              <div className="rounded-full bg-slate-500 w-[40px] h-[40px]">
              <Image
                src={customer.image}
                alt=""
                width={40}
                height={40}
                className="rounded-full object-cover"
              />
              </div>
              <div className="text-[15px] text-[#573926] font-medium">{customer.name}</div>
            </div>
            <div className="text-right">
              <div className="text-sm text-[#2C2C2C] font-semibold">{customer.amount}</div>
              <div className={`text-sm font-semibold ${customer.changeColor}`}>{customer.change}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Toplist;