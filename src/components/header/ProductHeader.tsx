import Link from 'next/link';
import { FC, useEffect, useState } from 'react';
import { FiSearch, FiShoppingBag } from 'react-icons/fi';
import axios from "@/utils/axios";
import Image from 'next/image';
import ShowChartOutlinedIcon from '@mui/icons-material/ShowChartOutlined';
interface User {
  firstname: string;
  lastname: string;
  email: string;
  accountType: "buyer" | "seller";
}
type Business = {
  id: string;
  businessName: string;
  logoUrl: string;
};
const Header: FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [businesses, setBusinesses] = useState<Business[]>([]);

  useEffect(() => {
    if (!localStorage.getItem("userToken")) {
      console.error("User token is missing.");
      return;
    }

    axios({
      method: "GET",
      url: "/users/profile", 
      headers: {
        Authorization: `Bearer ${localStorage.getItem("userToken")}`,
      },
    })
      .then((res) => {
        console.log(res.data.user); 
        setUser(res.data.user); 
        // setBusinesses(res.data.businesses)
      })
      .catch((error) => {
        console.error("Error fetching profile:", error);
      });
      axios({
        url:'/business/'+localStorage.getItem('addNewBusiness'),
        method:"GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem('userToken')}`,
      }
      }).then((res)=>{
        setBusinesses(res.data.business)
      })
  }, []);
  return (
    <div className="flex justify-between px-10 py-6 w-full">
      {/* <h1 className="text-2xl font-[900]">Hi {user?.lastname}!</h1> */}
      <div className='flex space-x-4'>
        <Image src={businesses[0]?.businessName?businesses[0].businessName:"https://res.cloudinary.com/wise-solution-inc/image/upload/v1729906736/Asset_390_y9mpv3.png"} width={30} height={10} alt={businesses[0]?.businessName?businesses[0].businessName:"No Name"}/>
      <h1 className="text-2xl font-[900]">{businesses[0]?.businessName?businesses[0].businessName:"No Name"}</h1>

      </div>

      <div className="flex space-x-4">
        {user?.accountType=="seller"?<Link href={"#"}>
        <div className="relative">
          <ShowChartOutlinedIcon className="text-2xl" />
          <span className="absolute top-0 right-0 bg-[#006838] text-white text-xs rounded-full w-3 h-3 flex items-center justify-center">
            9
          </span>
        </div>
        </Link>: <Link href={"./dashboard/cart"}>
        <div className="relative">
          <Image src={'https://res.cloudinary.com/wise-solution-inc/image/upload/v1731586826/Group_1000005013_bhe9nv.png'} alt='cart icon' height={100} width={40} className="text-2xl" />
          <span className="absolute top-0 right-0 bg-[#006838] text-white text-xs rounded-full w-3 h-3 flex items-center justify-center">
            9
          </span>
        </div>
        </Link>}
        {/* <FiSearch className="text-2xl" /> */}
       
      </div>
    </div>
  );
};

export default Header;
