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
  const [businesses, setBusinesses] = useState<Business | null>(null);
  const [businessName, setBusinessName] = useState<string>('');
  const [cartLength, setCartLength] = useState(0);

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
      if (user?.accountType=="seller") {
        axios({
          url:'/business/'+localStorage.getItem('activeBusiness'),
          method:"GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem('userToken')}`,
        }
        }).then((res)=>{
          console.log("res", res)
          setBusinesses(res.data.business[0])
          
          setBusinessName(res.data.business[0].businessName)
        })
      }
      axios({
        method: "GET",
        url: "cart",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
      })
        .then((res) => {
          setCartLength(res.data.cart.items.length);
        })
        .catch((error) => {
          console.log(error);
        });
  }, []);
  return (
    <div className="flex justify-between px-10 py-6 w-full">
      
      {user?.accountType=="seller"?<div className='flex space-x-4'>
        <Image src={businesses?.logoUrl?businesses.logoUrl:"https://res.cloudinary.com/wise-solution-inc/image/upload/v1729906736/Asset_390_y9mpv3.png"} width={30} height={10} alt={businesses?.businessName?businesses.businessName:"No Name"} className='rounded-full'/>
        <h1 className="text-2xl font-[900]">
  {businessName? businessName : "No Business Name"}
</h1>    {/* <h1 className="text-2xl font-[900]">{businesses?.businessName}</h1> */}
      </div>:<h1 className="text-2xl font-[900]">Hi {user?.lastname}!</h1> }
      

      <div className="flex space-x-4">
        {user?.accountType=="seller"?<Link href={"#"}>
        <div className="relative">
          <ShowChartOutlinedIcon className="text-2xl" />
          <span className="absolute top-0 right-0 bg-[#006838] text-white text-xs rounded-full w-3 h-3 flex items-center justify-center">
          {cartLength}
          </span>
        </div>
        </Link>: <Link href={"./dashboard/cart"}>
        <div className="relative">
        <Image src={'https://res.cloudinary.com/wise-solution-inc/image/upload/v1731586826/Group_1000005013_bhe9nv.png'} alt='cart icon' height={100} width={40} className="text-2xl" />
          <span className="absolute top-2 right-3 bg-[#006838] text-white text-xs rounded-full w-3 h-3 flex items-center justify-center">
          {cartLength}
          </span>
        </div>
        </Link>}
        {/* <FiSearch className="text-2xl" /> */}
       
      </div>
    </div>
  );
};

export default Header;
