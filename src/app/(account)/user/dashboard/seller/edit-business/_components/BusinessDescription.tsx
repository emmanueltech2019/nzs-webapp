'use client'
import { useEffect, useState, FC } from 'react'
import axios from "@/utils/axios";
import { showToast } from "@/utils/alert";
import useToggle from '@/hooks/useToggle'
import Accordion from './Accordion'
import interFont from '@/fonts/Inter'
import openSansFont from '@/fonts/OpenSans'
import general_type from './general.types';

const sectorList = [
  { item: 'E-Commerce', state: false },
  { item: 'health', state: false },
  { item: 'hospitality', state: false },
  { item: 'education', state: false },
  { item: 'legal', state: false },
  { item: 'logistics', state: false },
  { item: 'Utility', state: false },
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
};

interface BusinessDescriptionProps extends general_type {
  sector?: string; // ✅ optional prop
}

const BusinessDescription: FC<BusinessDescriptionProps> = ({ handleBtnFunc, setCount, setSection, sector }) => {
  const [a, aFunc] = useToggle(true);
  const [b, bFunc] = useToggle(true);

  const [sectorState, setSectorState] = useState(sectorList);
  const [categoryState, setCategoryState] = useState<{ item: string; state: boolean }[]>([]);

  // ✅ handle selecting a sector
  const handleSector = (selectedItem: string) => {
    setSectorState(prev =>
      prev.map(({ item }) => ({
        item,
        state: item === selectedItem,
      }))
    );
    setCategoryState(sectorCategories[selectedItem] || []);
  };

  // ✅ handle selecting categories
  const handleCategory = (selectedItem: string) => {
    setCategoryState(prev =>
      prev.map(({ item, state }) => ({
        item,
        state: item === selectedItem ? !state : state,
      }))
    );
  };

  // ✅ handle API call
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
            businessId: localStorage.getItem('addNewBusiness'),
            state: 'a', city: 'a', street: 'a', zip: '0', town: 'a', address: 'a', townId:1, cityId:1
          },
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        });
        localStorage.setItem('addNewBusiness', res.data.profile._id);
        showToast('success', res.data.message);
        setTimeout(() => setSection(2), 3000);
      } catch (err) {
        console.error(err);
        showToast('error', 'An error occurred');
      }
    } else {
      showToast('error', 'Please select both a sector and category');
    }
  };

  // ✅ Auto-select E-Commerce when passed as param
  useEffect(() => {
    if (sector && sector === "E-Commerce") {
      // Auto-select and show only E-Commerce
      setSectorState([{ item: "E-Commerce", state: true }]);
      setCategoryState(sectorCategories["E-Commerce"]);
    } else if (sector) {
      // (optional) handle other sectors if passed
      handleSector(sector);
    }
  }, [sector]);

  // ✅ Register button action and count
  useEffect(() => {
    setCount(25);
    handleBtnFunc(handleAPI);
    return () => handleBtnFunc(() => console.log('default'));
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
    </div>
  );
};

export default BusinessDescription;
