// export default ProductSpec;
import { FC, useEffect, useState } from "react";
import general_type from "./general.types";
import openSansFont from "@/fonts/OpenSans";
import useForm from "@/hooks/useForm";
import Accordion from "./Accordion";
import useToggle from "@/hooks/useToggle";
import axios from "@/utils/axios";
import { showToast } from "@/utils/alert";
import { useSearchParams } from "next/navigation";
  
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
const searchParams = useSearchParams();
  const productId = searchParams.get("id");
  const [states, setState] = useState<{ item: string; state: boolean }[]>([]);
  const [qualityType, setQualityType] = useState(QualityTypeState);

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
      url: `/products/vendor/add-product-spec/${productId}`,
      data: {
        quantityType: selectedQuantityType[0],
        quantityUnit: selectedUnitType[0],
        quantity: parseFloat(quantity),
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
  }, [states, registeredBusinessName, description, quantity]);

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
      </div>
    </div>
  );
};

export default ProductSpec;
// "use client";
// import { FC, useEffect, useState } from "react";
// import general_type from "./general.types";
// import openSansFont from "@/fonts/OpenSans";
// import useForm from "@/hooks/useForm";
// import Accordion from "./Accordion";
// import useToggle from "@/hooks/useToggle";
// import axios from "@/utils/axios";
// import { showToast } from "@/utils/alert";
// import { useParams, useSearchParams } from "next/navigation";

// const quantityUnitsMap: Record<string, string[]> = {
//   WEIGHT: ["KILOGRAMS (KG)", "GRAMS (G)", "TONNES (T)", "POUNDS (LBS)", "OUNCES (OZ)"],
//   VOLUME: ["LITERS (L)", "MILLILITERS (ML)", "CUBIC METERS (M³)", "GALLONS (GAL)", "CUPS"],
//   UNIT: ["PIECES (PCS)", "PACKS", "DOZENS (DOZ)", "CARTONS", "SETS"],
//   LENGTH: ["MILLIMETERS (MM)", "CENTIMETERS (CM)", "METERS (M)", "KILOMETERS (KM)", "INCHES (IN)"],
//   AREA: ["SQUARE METERS (M²)", "SQUARE KILOMETERS (KM²)", "HECTARES (HA)", "ACRES (AC)", "SQUARE FEET (FT²)"],
//   SPECIALIZED: ["LITERS PER MINUTE (L/MIN)", "CUBIC CENTIMETERS (CC)", "PERCENTAGE (%)", "UNITS/DOSE", "POINTS"],
//   OTHER: ["CUSTOM UNIT"],
// };

// const QualityTypeState = [
//   { item: "WEIGHT", state: false },
//   { item: "VOLUME", state: false },
//   { item: "UNIT", state: false },
//   { item: "LENGTH", state: false },
//   { item: "AREA", state: false },
//   { item: "SPECIALIZED", state: false },
//   { item: "OTHER", state: false },
// ];

// const ProductSpec: FC<general_type> = ({ handleBtnFunc, setCount, setSection }) => {
//   // const params = useParams();
//   // const productId = params?.id as string;
//   const searchParams = useSearchParams();
//   const productId = searchParams.get("id");
//   alert(productId);
//   const [quantity, setQuantity] = useState<string>("");
//   const [states, setState] = useState<{ item: string; state: boolean }[]>([]);
//   const [qualityType, setQualityType] = useState(QualityTypeState);

//   const [productName, setProductName] = useForm("");
//   const [description, setDescription] = useForm("");
//   const [image, setImage] = useState<string>("");

//   const [a, aFunc] = useToggle(true);
//   const [b, bFunc] = useToggle(true);

//   // 🔹 Fetch product details when editing
//   useEffect(() => {
    
//     if (!productId) return;

//     axios({
//       method: "GET",
//       url: `/products/${productId}`,
//       headers: {
//         Authorization: `Bearer ${localStorage.getItem("userToken")}`,
//       },
//     })
//       .then((res) => {
//         const product = res.data;

//         // Pre-fill basic fields
//         setProductName(product.name || "");
//         setDescription(product.description || "");
//         setImage(product.image || "");
//         setQuantity(product.quantity?.toString() || "");

//         // Quantity Type
//         setQualityType((prev) =>
//           prev.map((q) => ({
//             ...q,
//             state: q.item === product.quantityType,
//           }))
//         );

//         // Units
//         const units = quantityUnitsMap[product.quantityType] || [];
//         setState(units.map((u) => ({ item: u, state: u === product.quantityUnit })));
//       })
//       .catch((err) => {
//         console.error(err);
//         showToast("error", "Failed to fetch product details");
//       });
//   }, [productId]);

//   // 🔹 Handle Quantity Type Selection
//   const handleQuantityType = (selectedType: string) => {
//     setQualityType((prev) =>
//       prev.map(({ item }) => ({
//         item,
//         state: item === selectedType,
//       }))
//     );
//     const units = quantityUnitsMap[selectedType] || [];
//     setState(units.map((u) => ({ item: u, state: false })));
//   };

//   // 🔹 Handle Unit Selection
//   const handleStates = (selectedUnit: string) => {
//     setState((prev) =>
//       prev.map(({ item }) => ({
//         item,
//         state: item === selectedUnit,
//       }))
//     );
//   };

//   // 🔹 API Update
//   const handleAPI = async () => {
//     const selectedQuantityType = qualityType.find((q) => q.state)?.item;
//     const selectedUnitType = states.find((s) => s.state)?.item;

//     axios({
//       method: "PUT",
//       url: `/products/vendor/update-product-spec/${productId}`,
//       data: {
//         name: productName,
//         description,
//         image,
//         quantityType: selectedQuantityType,
//         quantityUnit: selectedUnitType,
//         quantity: parseFloat(quantity),
//       },
//       headers: {
//         Authorization: `Bearer ${localStorage.getItem("userToken")}`,
//       },
//     })
//       .then((res) => {
//         showToast("success", res.data.message);
//         setSection(3);
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
//   }, [states, quantity, productName, description, image]);

//   const selectedQuantityType = qualityType.find((q) => q.state);
//   const selectedUnit = states.find((s) => s.state);

//   return (
//     <div className="py-3">
//       <div className="py-5 w-full">

//         {/* Product Name */}
//         <div className="mb-4">
//           {/* <label className="block mb-1 text-sm font-medium">Product Name</label> */}
//           <input
//             type="text"
//             value={productName}
//             onChange={setProductName}
//             className="w-full px-4 py-2 rounded-xl bg-[#EAF2FF] border border-[#C5C6CC] outline-none"
//             placeholder="Enter product name"
//           />
//         </div>

//         {/* Description */}
//         <div className="mb-4">
//           <label className="block mb-1 text-sm font-medium">Description</label>
//           <textarea
//             value={description}
//             onChange={setDescription}
//             rows={4}
//             className="w-full px-4 py-2 rounded-xl bg-[#EAF2FF] border border-[#C5C6CC] outline-none"
//             placeholder="Enter description"
//           />
//         </div>

//         {/* Image Upload + Preview */}
//         <div className="mb-6">
//           <label className="block mb-1 text-sm font-medium">Product Image</label>
//           {image && (
//             <img
//               src={image}
//               alt="Product Preview"
//               className="w-32 h-32 object-cover rounded-xl mb-2 border"
//             />
//           )}
//           <input
//             type="text"
//             value={image}
//             onChange={(e) => setImage(e.target.value)}
//             className="w-full px-4 py-2 rounded-xl bg-[#EAF2FF] border border-[#C5C6CC] outline-none"
//             placeholder="Enter image URL"
//           />
//         </div>

//         {/* Quantity Type */}
//         <Accordion title="Quantity Type" batch={9} state={a} onClick={aFunc} border={false}>
//           <div className="flex gap-2 flex-wrap">
//             {qualityType.map(({ item, state }) => (
//               <button
//                 key={item}
//                 className={`px-4 py-[6px] rounded-2xl uppercase ${
//                   state ? "bg-[--foreground-green] text-white" : "bg-[#EAF2FF] text-[--foreground-green]"
//                 }`}
//                 onClick={() => handleQuantityType(item)}
//               >
//                 {item}
//               </button>
//             ))}
//           </div>
//         </Accordion>

//         {/* Quantity Unit */}
//         {selectedQuantityType && states.length > 0 && (
//           <Accordion title="Quantity Unit" batch={9} state={b} onClick={bFunc} border={false}>
//             <div className="flex gap-2 flex-wrap">
//               {states.map(({ item, state }) => (
//                 <button
//                   key={item}
//                   className={`px-4 py-[6px] rounded-2xl uppercase ${
//                     state ? "bg-[--foreground-green] text-white" : "bg-[#EAF2FF] text-[--foreground-green]"
//                   }`}
//                   onClick={() => handleStates(item)}
//                 >
//                   {item}
//                 </button>
//               ))}
//             </div>
//           </Accordion>
//         )}

//         {/* Quantity Input */}
//         {selectedQuantityType && selectedUnit && (
//           <div className="py-5">
//             <input
//               type="number"
//               id="quantity"
//               name="quantity"
//               value={quantity}
//               onChange={(e) => setQuantity(e.target.value)}
//               required
//               className="w-full px-4 py-3 rounded-xl outline-none bg-[#EAF2FF] border border-[#C5C6CC]"
//               placeholder="Enter value"
//             />
//             <p className={`text-xs pt-2 text-[#8F9098] ${openSansFont}`}>
//               Minimum Unit ({selectedUnit.item})
//             </p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ProductSpec;
