// import { FC, useEffect, useState } from "react";
// import general_type from "./general.types";
// import openSansFont from "@/fonts/OpenSans";
// import useForm from "@/hooks/useForm";
// import Accordion from "./Accordion";
// import useToggle from "@/hooks/useToggle";
// import axios from "@/utils/axios";
// import { showToast } from "@/utils/alert";

// const mainState = [
//   { item: "KILOGRAMS (KG)", state: false },
//   { item: "GRAMS (G)", state: false },
//   { item: "TONNES (T)", state: false },
//   { item: "POUNDS (LBS)", state: false },
//   { item: "OUNCES (OZ)", state: false },
// ];
// const QualityTypeState = [
//   { item: "WEIGHT", state: false },
//   { item: "VOLUME", state: false },
//   { item: "UNIT", state: false },
//   { item: "LENGTH", state: false },
//   { item: "AREA", state: false },
//   { item: "SPECIALIZED", state: false },
//   { item: "OTHER", state: false },
// ];

// const ProductSpec: FC<general_type> = ({
//   handleBtnFunc,
//   setCount,
//   setSection,
// }) => {
//   const [uploadCount, setuploadCount] = useState(0);
//   const [file, setFile] = useState<File | null>(null);
//   const [unit, setUnit] = useState<string>(""); 
//   const [quantity, setQuantity] = useState<string>("");
//   const [states, setState] = useState(mainState);
//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//   setQuantity(e.target.value);
//   };

//   const handleChange2 = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setUnit(e.target.value);
//   };

//   const handleStates = (a: string) => {
//     setState((prev) =>
//       prev.map(({ item, state }, i) => ({
//         item,
//         state: item == a ? !state : state,
//       }))
//     );
//   };
//   const [qualityType, setQualityType] = useState(QualityTypeState);
//   const handleQuantityType = (a: string) => {
//     setQualityType((prev) =>
//       prev.map(({ item, state }, i) => ({
//         item,
//         state: item == a ? !state : state,
//       }))
//     );
//   };

//   const [registeredBusinessName, setRegisteredBusinessName] = useForm("");
//   const [description, setDescription] = useForm("");

//   const [a, aFunc] = useToggle(true);
//   const [b, bFunc] = useToggle(true);
  
//   const handleAPI = async () => {
//     const selectedQuantityType = qualityType
//       .filter(({ state }) => state)
//       .map(({ item }) => item);
//     const selectedUnitType = states
//       .filter(({ state }) => state)
//       .map(({ item }) => item);

//     axios({
//       method: "PUT",
//       url: `/products/vendor/add-product-spec/${localStorage.getItem(
//         "addProductActive"
//       )}`,
//       data: {
//         quantityType: selectedQuantityType[0],
//         quantityUnit: selectedUnitType[0],
//          unitAmount: parseFloat(unit),
//       quantity: parseFloat(quantity),
//       },
//       headers: {
//         Authorization: `Bearer ${localStorage.getItem("userToken")}`,
//       },
//     })
//       .then((res) => {
//         showToast("success", res.data.message);
//         console.log({
//         quantityType: selectedQuantityType[0],
//         quantityUnit: selectedUnitType[0],
//         unitAmount: unit,
//         quantity,
//       })
//         setSection(3);
//         // window.location.replace("/user/dashboard/seller/inventory")
//       })
//       .catch((err) => {
//         console.error(err);
//         showToast("error", err.message);
//       });
//   };
//   useEffect(() => {
//     setCount(50);
//     handleBtnFunc(handleAPI);
//     return () => {
//       handleBtnFunc(() => console.log("default"));
//     };
//   }, [uploadCount, states, registeredBusinessName, description, unit, quantity]);
//   return (
//     <div className="py-3">
//       <div className="py-5 w-full">

//         <Accordion
//           title="Quantity Type"
//           subTitle=""
//           batch={9}
//           state={a}
//           onClick={aFunc}
//           border={false}
//         >
//           {
//             <div className="flex gap-2 flex-wrap">
//               {qualityType.map(({ item, state }) => (
//                 <button
//                   key={item}
//                   className={`px-4 py-[6px] text-3 rounded-2xl uppercase ${
//                     state
//                       ? "bg-[--foreground-green] text-white"
//                       : "bg-[#EAF2FF] text-[--foreground-green]"
//                   }`}
//                   onClick={() => handleQuantityType(item)}
//                 >
//                   {item}
//                 </button>
//               ))}
//             </div>
//           }
//         </Accordion>

//         <Accordion
//           title="Quantity Unit"
//           subTitle=""
//           batch={9}
//           state={b}
//           onClick={bFunc}
//           border={false}
//         >
//           {
//             <div className="flex gap-2 flex-wrap">
//               {states.map(({ item, state }) => (
//                 <button
//                   key={item}
//                   className={`px-4 py-[6px] text-3 rounded-2xl uppercase ${
//                     state
//                       ? "bg-[--foreground-green] text-white"
//                       : "bg-[#EAF2FF] text-[--foreground-green]"
//                   }`}
//                   onClick={() => handleStates(item)}
//                 >
//                   {item}
//                 </button>
//               ))}
//             </div>
//           }
//         </Accordion>

//         <div className="py-5 flex flex-row gap-4">
//           <div className="w-[80%]">
//             <input
//               type="number"
//               id="unit"
//               name="unit"
//               value={unit}
//               onChange={handleChange2}
//               required
//               className="w-full px-4 py-3 rounded-xl outline-none bg-inherit border-[0.67px] border-[#C5C6CC] placeholder:text-[#8F9098]"
//               placeholder="Unit"
//             />
//             <p className={`text-xs pt-2 text-[#8F9098] ${openSansFont}`}>
//               Unit Amount
//             </p>
//           </div>
//           <div className="w-[15%]">
//             <input
//               type="number"
//               id="quantity"
//               name="quantity"
//               value={quantity}
//               onChange={handleChange}
//               required
//               className="w-full px-4 py-3 rounded-xl outline-none bg-[#EAF2FF] border-[0.67px] border-[#C5C6CC] placeholder:text-[#8F9098]"
//               placeholder="Quantity"
//             />
//             <p className={`text-xs pt-2 text-[#8F9098] ${openSansFont}`}>QTY</p>
//           </div>
//         </div>

//       </div>
//     </div>
//   );
// };

// export default ProductSpec;
import { FC, useEffect, useState } from "react";
import general_type from "./general.types";
import openSansFont from "@/fonts/OpenSans";
import useForm from "@/hooks/useForm";
import Accordion from "./Accordion";
import useToggle from "@/hooks/useToggle";
import axios from "@/utils/axios";
import { showToast } from "@/utils/alert";

// 🔹 Mapping QuantityType -> Top 5 Units
const quantityUnitsMap: Record<string, string[]> = {
  WEIGHT: ["KILOGRAMS (KG)", "GRAMS (G)", "TONNES (T)", "POUNDS (LBS)", "OUNCES (OZ)"],
  VOLUME: ["LITERS (L)", "MILLILITERS (ML)", "CUBIC METERS (M³)", "GALLONS (GAL)", "CUPS"],
  UNIT: ["PIECES (PCS)", "PACKS", "DOZENS (DOZ)", "CARTONS", "SETS"],
  LENGTH: ["MILLIMETERS (MM)", "CENTIMETERS (CM)", "METERS (M)", "KILOMETERS (KM)", "INCHES (IN)"],
  AREA: ["SQUARE METERS (M²)", "SQUARE KILOMETERS (KM²)", "HECTARES (HA)", "ACRES (AC)", "SQUARE FEET (FT²)"],
  SPECIALIZED: ["LITERS PER MINUTE (L/MIN)", "CUBIC CENTIMETERS (CC)", "PERCENTAGE (%)", "UNITS/DOSE", "POINTS"],
  OTHER: ["CUSTOM UNIT"],
};

const QualityTypeState = [
  { item: "WEIGHT", state: false },
  { item: "VOLUME", state: false },
  { item: "UNIT", state: false },
  { item: "LENGTH", state: false },
  { item: "AREA", state: false },
  { item: "SPECIALIZED", state: false },
  { item: "OTHER", state: false },
];

const ProductSpec: FC<general_type> = ({ handleBtnFunc, setCount, setSection }) => {
  const [quantity, setQuantity] = useState<string>("");

  const [states, setState] = useState<{ item: string; state: boolean }[]>([]);
  const [qualityType, setQualityType] = useState(QualityTypeState);
  const [totalStock, setTotalStock] = useState(1);

  const [registeredBusinessName, setRegisteredBusinessName] = useForm("");
  const [description, setDescription] = useForm("");

  const [a, aFunc] = useToggle(true);
  const [b, bFunc] = useToggle(true);

  // 🔹 Handle QTY input
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuantity(e.target.value);
  };

  // 🔹 Handle Quantity Type Selection
  const handleQuantityType = (selectedType: string) => {
    setQualityType((prev) =>
      prev.map(({ item }) => ({
        item,
        state: item === selectedType ? !prev.find((q) => q.item === item)?.state : false, // only one active
      }))
    );

    // 🔹 Reset units dynamically when type changes
    const units = quantityUnitsMap[selectedType] || [];
    setState(units.map((u) => ({ item: u, state: false })));
  };

  // 🔹 Handle Unit Selection (only one at a time)
  const handleStates = (selectedUnit: string) => {
    setState((prev) =>
      prev.map(({ item }) => ({
        item,
        state: item === selectedUnit,
      }))
    );
  };

  // API Call
  const handleAPI = async () => {
    const selectedQuantityType = qualityType.filter(({ state }) => state).map(({ item }) => item);
    const selectedUnitType = states.filter(({ state }) => state).map(({ item }) => item);

    axios({
      method: "PUT",
      url: `/products/vendor/add-product-spec/${localStorage.getItem("addProductActive")}`,
      data: {
        quantityType: selectedQuantityType[0],
        quantityUnit: selectedUnitType[0],
        quantity: parseFloat(quantity),
        totalStock: parseInt(totalStock.toString(), 10),
      },
      headers: {
        Authorization: `Bearer ${localStorage.getItem("userToken")}`,
      },
    })
      .then((res) => {
        showToast("success", res.data.message);
        setSection(3);
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
  }, [states, registeredBusinessName, description, quantity, totalStock]);

  const selectedQuantityType = qualityType.find((q) => q.state);
  const selectedUnit = states.find((s) => s.state);

  return (
    <div className="py-3">
      <div className="py-5 w-full">
        {/* Quantity Type */}
        <Accordion title="Quantity Type" subTitle="" batch={9} state={a} onClick={aFunc} border={false}>
          <div className="flex gap-2 flex-wrap">
            {qualityType.map(({ item, state }) => (
              <button
                key={item}
                className={`px-4 py-[6px] text-3 rounded-2xl uppercase ${
                  state ? "bg-[--foreground-green] text-white" : "bg-[#EAF2FF] text-[--foreground-green]"
                }`}
                onClick={() => handleQuantityType(item)}
              >
                {item}
              </button>
            ))}
          </div>
        </Accordion>

        {/* Quantity Unit (only shows if type is selected & no unit picked yet) */}
        {selectedQuantityType && !selectedUnit && states.length > 0 && (
          <Accordion title="Quantity Unit" subTitle="" batch={9} state={b} onClick={bFunc} border={false}>
            <div className="flex gap-2 flex-wrap">
              {states.map(({ item, state }) => (
                <button
                  key={item}
                  className={`px-4 py-[6px] text-3 rounded-2xl uppercase ${
                    state ? "bg-[--foreground-green] text-white" : "bg-[#EAF2FF] text-[--foreground-green]"
                  }`}
                  onClick={() => handleStates(item)}
                >
                  {item}
                </button>
              ))}
            </div>
          </Accordion>
        )}

        {/* Input for QTY (renamed to Minimum Unit if unit selected) */}
        {selectedQuantityType && selectedUnit && (
          <div className="py-5">
            <input
              type="number"
              id="quantity"
              name="quantity"
              value={quantity}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-xl outline-none bg-[#EAF2FF] border-[0.67px] border-[#C5C6CC] placeholder:text-[#8F9098]"
              placeholder="Enter value"
            />
            <p className={`text-xs pt-2 text-[#8F9098] ${openSansFont}`}>
              Minimum Unit ({selectedUnit.item})
            </p>
          </div>
        )}
        <div className="pb-3">
        <input
          type="number"
          id="totalStock"
          onChange={(e) => setTotalStock(Number(e.target.value))}
          value={totalStock}
          required
          min={1}
          className="w-full px-4 py-3 rounded-xl outline-none bg-inherit border-[0.67px] border-[#C5C6CC] placeholder:text-[#8F9098]"
          placeholder="NGN 0.00"
        />
        <p className={`text-xs pt-2 text-[#8F9098] ${openSansFont}`}>
          Total in stock
        </p>
      </div>
      </div>
    </div>
  );
};

export default ProductSpec;
