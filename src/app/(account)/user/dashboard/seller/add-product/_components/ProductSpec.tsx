import { FC, useEffect, useState } from "react";
import general_type from "./general.types";
import openSansFont from "@/fonts/OpenSans";
import useForm from "@/hooks/useForm";
import Accordion from "./Accordion";
import useToggle from "@/hooks/useToggle";
import axios from "@/utils/axios";
import { showToast } from "@/utils/alert";

const mainState = [
  { item: "KILOGRAMS (KG)", state: false },
  { item: "GRAMS (G)", state: false },
  { item: "TONNES (T)", state: false },
  { item: "POUNDS (LBS)", state: false },
  { item: "OUNCES (OZ)", state: false },
];
const QualityTypeState = [
  { item: "WEIGHT", state: false },
  { item: "VOLUME", state: false },
  { item: "UNIT", state: false },
  { item: "LENGTH", state: false },
  { item: "AREA", state: false },
  { item: "SPECIALIZED", state: false },
  { item: "OTHER", state: false },
];

const ProductSpec: FC<general_type> = ({
  handleBtnFunc,
  setCount,
  setSection,
}) => {
  const [uploadCount, setuploadCount] = useState(0);
  const [file, setFile] = useState<File | null>(null);
  const [unit, setUnit] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [states, setState] = useState(mainState);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value); // Convert string to number
    setQuantity(isNaN(value) ? 0 : value); // Handle NaN case if input is invalid
  };
  const handleChange2 = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value); // Convert string to number
    setUnit(isNaN(value) ? 0 : value); // Handle NaN case if input is invalid
  };
  const handleStates = (a: string) => {
    setState((prev) =>
      prev.map(({ item, state }, i) => ({
        item,
        state: item == a ? !state : state,
      }))
    );
  };
  const [qualityType, setQualityType] = useState(QualityTypeState);
  const handleQuantityType = (a: string) => {
    setQualityType((prev) =>
      prev.map(({ item, state }, i) => ({
        item,
        state: item == a ? !state : state,
      }))
    );
  };

  const [registeredBusinessName, setRegisteredBusinessName] = useForm("");
  const [description, setDescription] = useForm("");

  const [a, aFunc] = useToggle(true);
  const [b, bFunc] = useToggle(true);
  
  const handleAPI = async () => {
    const selectedQuantityType = qualityType
      .filter(({ state }) => state)
      .map(({ item }) => item);
    const selectedUnitType = states
      .filter(({ state }) => state)
      .map(({ item }) => item);

    axios({
      method: "PUT",
      url: `/products/vendor/add-product-spec/${localStorage.getItem(
        "addProductActive"
      )}`,
      data: {
        quantityType: selectedQuantityType[0],
        quantityUnit: selectedUnitType[0],
        unitAmount: unit,
        quantity,
      },
      headers: {
        Authorization: `Bearer ${localStorage.getItem("userToken")}`,
      },
    })
      .then((res) => {
        showToast("success", res.data.message);
        setSection(3);
        // window.location.replace("/user/dashboard/seller/inventory")
      })
      .catch((err) => {
        console.error(err);
        showToast("error", err.message);
      });
  };
  useEffect(() => {
    setCount(50);
    handleBtnFunc(handleAPI);
    return () => {
      handleBtnFunc(() => console.log("default"));
    };
  }, [uploadCount, states, registeredBusinessName, description]);
  return (
    <div className="py-3">
      <div className="py-5 w-full">
        {/* <div className="bg-[#F8F9FE] p-4 rounded-lg">
                    <div className="bg-white rounded-lg min-h-[97px] justify-center items-center flex">
                        <input type="file" name="logo" id="logo" accept="image/*" className='hidden' onChange={(e:any) => setFile(e.target.files[0])} />
                        <label htmlFor="logo">
                            <Circle size={48} count={uploadCount} period={100}>
                                <Icon icon='akar-icons:arrow-up' className='text-xl text-[--foreground-green] font-extrabold'></Icon>
                            </Circle>
                        </label>
                    </div>
                    <div className='flex py-2 items-center gap-2'>
                        <h3 className={`${poppinsFont} mr-auto`}>YOUR LOGO</h3>
                        <label htmlFor={'logo'} className={`py-1 px-2 text-sm text-[#0C1F1F] bg-[#EAF2FF] rounded-[4px] ${openSansFont}`}>Upload Logo</label>
                        <Icon icon={`bi:chevron-down`} className='font-extrabold text-[#0C1F1F80]' />
                    </div>
                </div> */}

        <Accordion
          title="Quantity Type"
          subTitle=""
          batch={9}
          state={a}
          onClick={aFunc}
          border={false}
        >
          {
            <div className="flex gap-2 flex-wrap">
              {qualityType.map(({ item, state }) => (
                <button
                  key={item}
                  className={`px-4 py-[6px] text-3 rounded-2xl uppercase ${
                    state
                      ? "bg-[--foreground-green] text-white"
                      : "bg-[#EAF2FF] text-[--foreground-green]"
                  }`}
                  onClick={() => handleQuantityType(item)}
                >
                  {item}
                </button>
              ))}
            </div>
          }
        </Accordion>

        <Accordion
          title="Quantity Unit"
          subTitle=""
          batch={9}
          state={b}
          onClick={bFunc}
          border={false}
        >
          {
            <div className="flex gap-2 flex-wrap">
              {states.map(({ item, state }) => (
                <button
                  key={item}
                  className={`px-4 py-[6px] text-3 rounded-2xl uppercase ${
                    state
                      ? "bg-[--foreground-green] text-white"
                      : "bg-[#EAF2FF] text-[--foreground-green]"
                  }`}
                  onClick={() => handleStates(item)}
                >
                  {item}
                </button>
              ))}
            </div>
          }
        </Accordion>

        <div className="py-5 flex flex-row gap-4">
          <div className="w-[80%]">
            <input
              type="number"
              id="unit"
              name="unit"
              value={unit}
              onChange={handleChange2}
              required
              className="w-full px-4 py-3 rounded-xl outline-none bg-inherit border-[0.67px] border-[#C5C6CC] placeholder:text-[#8F9098]"
              placeholder="Unit"
            />
            <p className={`text-xs pt-2 text-[#8F9098] ${openSansFont}`}>
              Unit Amount
            </p>
          </div>
          <div className="w-[15%]">
            <input
              type="number"
              id="quantity"
              name="quantity"
              value={quantity}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-xl outline-none bg-[#EAF2FF] border-[0.67px] border-[#C5C6CC] placeholder:text-[#8F9098]"
              placeholder="Quantity"
            />
            <p className={`text-xs pt-2 text-[#8F9098] ${openSansFont}`}>QTY</p>
          </div>
        </div>

        {/* <Accordion title='State' subTitle='Available in Nigeria' batch={9} state={a} onClick={aFunc} border={false}>
                    {<div className='flex gap-2 flex-wrap'>
                        {states.map(({ item, state }) => (
                            <button key={item} className={`px-4 py-[6px] text-3 rounded-2xl uppercase ${state ? 'bg-[--foreground-green] text-white' : 'bg-[#EAF2FF] text-[--foreground-green]'}`} onClick={() => handleStates(item)}>{item}</button>
                        ))}
                    </div>}
                </Accordion> */}

        {/* <ProfileInfo /> */}
      </div>
    </div>
  );
};

export default ProductSpec;
