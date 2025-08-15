// import { useEffect, useState, FC } from 'react'
// import axios from "@/utils/axios";
// import { showToast } from "@/utils/alert";
// import useToggle from '@/hooks/useToggle'
// import Accordion from './Accordion'
// import {ProfileInfo} from './Main'
// import interFont from '@/fonts/Inter'
// import openSansFont from '@/fonts/OpenSans'
// import { useRouter } from "next/navigation";
// import general_type from './general.types';



// const sector = [
//     { item: 'Health', state: false },
//     { item: 'Hospitality', state: false },
//     { item: 'Education', state: false },
//     { item: 'Legal', state: false },
//     { item: 'Logistics', state: false },
// ]
// const category = [
//     { item: 'Clothing & Footwear', state: false },
//     { item: 'Tailoring & Custom Designs', state: false },
//     { item: 'Textile Materials', state: false },
//     { item: 'Fashion Accessories & Jewelry', state: false },
// ]


// const BusinessDescription:FC<general_type> = ({handleBtnFunc, setCount, setSection}) => {
//     const [a, aFunc] = useToggle(true)
//     const [b, bFunc] = useToggle(true)

//     const [sectorState, setSectorState] = useState(sector)
//     const handleSector = (a: string) => {
//         setSectorState(prev => prev.map(({ item, state }, i) => ({ item, state: item == a ? !state : state })))
//     }

//     const [categoryState, setCategoryState] = useState(category)
//     const handleCategory = (a: string) => {
//         setCategoryState(prev => prev.map(({ item, state }, i) => ({ item, state: item == a ? !state : state })))
//     }

//     const handleAPI = async () => {
//         const userToken = localStorage.getItem("userToken");
//         if (!userToken) {
//             showToast('error', 'User token not found');
//             return;
//         }
    
//         let sectors = sectorState.filter(s => s.state).map(({ item }) => item);
//         let categories = categoryState.filter(c => c.state).map(({ item }) => item);
    
//         if (sectors.length && categories.length) { // Both need to be non-empty
//             try {
//                 const res = await axios({
//                     method: "PUT",
//                     url: "/business/select-sectors-categories",
//                     data: { sectors, categories },
//                     headers: {
//                         Authorization: `Bearer ${userToken}`,
//                     },
//                 });
//                 console.log(res.data);
//                 showToast('success', res.data.message);
//                 setSection(2);
//             } catch (err) {
//                 console.error(err);
//                 // showToast('error', err.message || 'An error occurred');
//             }
//         } else {
//             showToast('error', 'Please select both sectors and categories');
//         }
//     };
    
//     // const handleAPI = async () => {
//     //     // const userToken = localStorage.getItem("userToken") || ''
//     //     // const tr = JSON.parse(userToken)

//     //     let sectors = sectorState.filter(s => s.state).map(({ item }) => item)
//     //     let categories = categoryState.filter(c => c.state).map(({ item }) => item)
//     //     // (sectorState.filter(s => s.state).length == 0 || categoryState.filter(c => c.state).length == 0)
//     //     if (sectors.length || categories.length) {
//     //         axios({
//     //             method: "PUT",
//     //             url: "/business/select-sectors-categories",
//     //             data: {
//     //                 sectors: sectors,
//     //                 categories: categories,
//     //             },
//     //             headers: {
//     //                 Authorization: `Bearer ${localStorage.getItem("userToken")}`,
//     //             },
//     //         }).then(res => {
//     //             console.log(res.data)
//     //             showToast('success', res.data.message)
//     //             setSection(2)
//     //         }).catch(err => {
//     //             console.log(err)
//     //             showToast('error', err.message)
//     //         })
//     //     } else {
//     //         showToast('error', 'Please select sectors and categories')
//     //         return
//     //     }
//     // }
//     useEffect(() => {
//         setCount(25);
//         handleBtnFunc(handleAPI)
//         return () => {
//             handleBtnFunc(() => console.log('default'))
//         }
//     },[sectorState, categoryState])
//     return (
//         <div className='py-3'>
//             <div className="py-5">
//                 <h2 className={`font-black text-[#1F2024] text-xl pb-2 ${interFont}`}>Select the right profile for your business.</h2>
//                 <p className={`text-[#71727A] ${openSansFont}`}>
//                     We provide multiple options so feel free to get
//                     super-specific!
//                 </p>
//             </div>

//             <Accordion title='Sector' subTitle='Select up to 2 options' onClick={aFunc} state={a} batch={11}>
//                 <div className='flex gap-2 flex-wrap'>
//                     {sectorState.map(({ item, state }) => (
//                         <button key={item} className={`px-4 py-[6px] text-3 rounded-2xl ${state ? 'bg-[--foreground-green] text-white' : 'bg-[#EAF2FF] text-[--foreground-green]'}`} onClick={() => handleSector(item)}>{item}</button>
//                     ))}
//                 </div>
//             </Accordion>
//             <Accordion title='Category' subTitle='Select up up to' onClick={bFunc} state={b} batch={10}>
//                 <div className='flex gap-3 flex-wrap'>
//                     {categoryState.map(({ item, state }) => (
//                         <button key={item} className={`px-4 py-[6px] text-3 rounded-2xl ${state ? 'bg-[--foreground-green] text-white' : 'bg-[#EAF2FF] text-[--foreground-green]'}`} onClick={() => handleCategory(item)}>{item}</button>
//                     ))}
//                 </div>
//             </Accordion>
//             <ProfileInfo />
//         </div>
//     )
// }

// export default BusinessDescription



import { useEffect, useState, FC } from 'react'
import axios from "@/utils/axios";
import { showToast } from "@/utils/alert";
import useToggle from '@/hooks/useToggle'
import Accordion from './Accordion'
import { ProfileInfo } from './Main'
import interFont from '@/fonts/Inter'
import openSansFont from '@/fonts/OpenSans'
import { useRouter } from "next/navigation";
import general_type from './general.types';

const sector = [
    { item: 'E-Commerce', state: false },
    { item: 'health', state: false },
    { item: 'hospitality', state: false },
    { item: 'education', state: false },
    { item: 'legal', state: false },
    { item: 'logistics', state: false },
    { item: 'Utility', state: false },
];
const category = [
    { item: 'Clothing & Footwear', state: false },
    { item: 'Tailoring & Custom Designs', state: false },
    { item: 'Textile Materials', state: false },
    { item: 'Fashion Accessories & Jewelry', state: false },
];
const sectorCategories: Record<string, { item: string; state: boolean }[]> = {
  "E-Commerce": [
    { item: 'Fashion & Apparel', state: false },
    { item: 'Electronics & Gadgets', state: false },
    { item: 'Beauty & Personal Care', state: false },
    { item: 'Home & Kitchen', state: false },
    { item: 'Groceries & Foodstuff', state: false },
    { item: 'Sports & Fitness', state: false },
    { item: 'Books & Stationery', state: false },
    { item: 'Automotive Accessories', state: false },
    { item: 'Kids & Baby Products', state: false },
    { item: 'Miscellaneous / General Store', state: false },
  ],
  "health": [
    { item: 'Pharmacies', state: false },
    { item: 'Clinics & Medical Centers', state: false },
    { item: 'Laboratories & Diagnostics', state: false },
    { item: 'Mental Health Services', state: false },
    { item: 'Dental Care', state: false },
    { item: 'Physiotherapy & Rehabilitation', state: false },
    { item: 'Eye Care & Optometry', state: false },
    { item: 'Alternative Medicine', state: false },
    { item: 'Health Equipment & Supplies', state: false },
  ],
  "hospitality": [
    { item: 'Hotels & Resorts', state: false },
    { item: 'Restaurants & Cafés', state: false },
    { item: 'Event Venues', state: false },
    { item: 'Travel & Tours', state: false },
    { item: 'Bars & Lounges', state: false },
    { item: 'Catering Services', state: false },
    { item: 'Short-let Apartments', state: false },
    { item: 'Conference & Meeting Facilities', state: false },
  ],
  "education": [
    { item: 'Schools', state: false },
    { item: 'Universities & Colleges', state: false },
    { item: 'Online Learning', state: false },
    { item: 'Vocational Training', state: false },
    { item: 'Language Schools', state: false },
    { item: 'Professional Certification Bodies', state: false },
    { item: 'Libraries & Study Centers', state: false },
    { item: 'Educational Supplies & Bookstores', state: false },
  ],
  "legal": [
    { item: 'Law Firms', state: false },
    { item: 'Notary Services', state: false },
    { item: 'Corporate & Business Law', state: false },
    { item: 'Family Law', state: false },
    { item: 'Criminal Defense', state: false },
    { item: 'Immigration Services', state: false },
    { item: 'Intellectual Property & Trademark', state: false },
    { item: 'Legal Aid & Advocacy', state: false },
  ],
  "logistics": [
    { item: 'Courier & Delivery', state: false },
    { item: 'Warehousing & Storage', state: false },
    { item: 'Freight Forwarding', state: false },
    { item: 'Moving & Relocation', state: false },
    { item: 'Vehicle Hire & Transport', state: false },
    { item: 'Supply Chain Management', state: false },
    { item: 'Cold Chain Logistics', state: false },
    { item: 'E-commerce Fulfillment Centers', state: false },
  ],
  "Utility": [
    { item: 'Electricity Services', state: false },
    { item: 'Water Supply & Treatment', state: false },
    { item: 'Waste Management & Recycling', state: false },
    { item: 'Internet Providers', state: false },
    { item: 'Gas Supply & Installation', state: false },
    { item: 'Renewable Energy Solutions (Solar, Wind)', state: false },
    { item: 'Home Repair & Maintenance Services', state: false },
    { item: 'Security & Surveillance Systems', state: false },
  ],
};

const BusinessDescription: FC<general_type> = ({ handleBtnFunc, setCount, setSection }) => {
  const [a, aFunc] = useToggle(true);
  const [b, bFunc] = useToggle(true);

  const [sectorState, setSectorState] = useState(sector);
  const [categoryState, setCategoryState] = useState<{ item: string; state: boolean }[]>([]);

  const handleSector = (selectedItem: string) => {
    setSectorState(prev =>
      prev.map(({ item }) => ({
        item,
        state: item === selectedItem,
      }))
    );

    setCategoryState(sectorCategories[selectedItem] || []);
  };

  const handleCategory = (selectedItem: string) => {
    setCategoryState(prev =>
      prev.map(({ item, state }) => ({
        item,
        state: item === selectedItem ? !state : state,
      }))
    );
  };

  const handleAPI = async () => {
    const userToken = localStorage.getItem("userToken");
    if (!userToken) {
      showToast('error', 'User token not found');
      return;
    }

    const selectedSector = sectorState.find(s => s.state)?.item || "";
    const categories = categoryState.filter(c => c.state).map(({ item }) => item);

    if (selectedSector && categories.length) {
      try {
        const res = await axios({
          method: "PUT",
          url: "/business/select-sectors-categories",
          data: {
            sectors: selectedSector,
            categories,
            businessId: localStorage.getItem('addNewBusiness')
          },
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        });
        localStorage.setItem('addNewBusiness', res.data.profile._id);
        showToast('success', res.data.message);
        setSection(2);
      } catch (err) {
        console.error(err);
        showToast('error', 'An error occurred');
      }
    } else {
      showToast('error', 'Please select both a sector and categories');
    }
  };

  useEffect(() => {
    setCount(25);
    handleBtnFunc(handleAPI);
    return () => {
      handleBtnFunc(() => console.log('default'));
    };
  }, [sectorState, categoryState]);

  return (
    <div className='py-3'>
      <div className="py-5">
        <h2 className={`font-black text-[#1F2024] text-xl pb-2 ${interFont}`}>
          Select the right profile for your business.
        </h2>
        <p className={`text-[#71727A] ${openSansFont}`}>
          We provide multiple options so feel free to get super-specific!
        </p>
      </div>

      <Accordion title='Sector' subTitle='Select one option' onClick={aFunc} state={a} batch={sectorState.length}>
        <div className='flex gap-2 flex-wrap'>
          {sectorState.map(({ item, state }) => (
            <button
              key={item}
              className={`px-4 py-[6px] text-3 rounded-2xl ${state ? 'bg-[--foreground-green] text-white' : 'bg-[#EAF2FF] text-[--foreground-green]'}`}
              onClick={() => handleSector(item)}
            >
              {item}
            </button>
          ))}
        </div>
      </Accordion>

      {categoryState.length > 0 && (
        <Accordion title='Category' subTitle='Select multiple options' onClick={bFunc} state={b} batch={categoryState.length}>
          <div className='flex gap-3 flex-wrap'>
            {categoryState.map(({ item, state }) => (
              <button
                key={item}
                className={`px-4 py-[6px] text-3 rounded-2xl ${state ? 'bg-[--foreground-green] text-white' : 'bg-[#EAF2FF] text-[--foreground-green]'}`}
                onClick={() => handleCategory(item)}
              >
                {item}
              </button>
            ))}
          </div>
        </Accordion>
      )}

      <ProfileInfo />
    </div>
  );
};

export default BusinessDescription;