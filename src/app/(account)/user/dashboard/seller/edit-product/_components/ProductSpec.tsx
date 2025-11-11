// // export default ProductSpec;
// import { FC, useEffect, useState } from "react";
// import general_type from "./general.types";
// import openSansFont from "@/fonts/OpenSans";
// import useForm from "@/hooks/useForm";
// import Accordion from "./Accordion";
// import useToggle from "@/hooks/useToggle";
// import axios from "@/utils/axios";
// import { showToast } from "@/utils/alert";
// import { useSearchParams } from "next/navigation";
  
// // 🔹 Mapping QuantityType -> Top 5 Units
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
//   const [quantity, setQuantity] = useState<string>("");
// const searchParams = useSearchParams();
//   const productId = searchParams.get("id");
//   const [states, setState] = useState<{ item: string; state: boolean }[]>([]);
//   const [qualityType, setQualityType] = useState(QualityTypeState);

//   const [registeredBusinessName, setRegisteredBusinessName] = useForm("");
//   const [description, setDescription] = useForm("");

//   const [a, aFunc] = useToggle(true);
//   const [b, bFunc] = useToggle(true);

//   // 🔹 Handle QTY input
//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setQuantity(e.target.value);
//   };

//   // 🔹 Handle Quantity Type Selection
//   const handleQuantityType = (selectedType: string) => {
//     setQualityType((prev) =>
//       prev.map(({ item }) => ({
//         item,
//         state: item === selectedType ? !prev.find((q) => q.item === item)?.state : false, // only one active
//       }))
//     );

//     // 🔹 Reset units dynamically when type changes
//     const units = quantityUnitsMap[selectedType] || [];
//     setState(units.map((u) => ({ item: u, state: false })));
//   };

//   // 🔹 Handle Unit Selection (only one at a time)
//   const handleStates = (selectedUnit: string) => {
//     setState((prev) =>
//       prev.map(({ item }) => ({
//         item,
//         state: item === selectedUnit,
//       }))
//     );
//   };

//   // API Call
//   const handleAPI = async () => {
//     const selectedQuantityType = qualityType.filter(({ state }) => state).map(({ item }) => item);
//     const selectedUnitType = states.filter(({ state }) => state).map(({ item }) => item);

//     axios({
//       method: "PUT",
//       url: `/products/vendor/add-product-spec/${productId}`,
//       data: {
//         quantityType: selectedQuantityType[0],
//         quantityUnit: selectedUnitType[0],
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
//   }, [states, registeredBusinessName, description, quantity]);

//   const selectedQuantityType = qualityType.find((q) => q.state);
//   const selectedUnit = states.find((s) => s.state);

//   return (
//     <div className="py-3">
//       <div className="py-5 w-full">
//         {/* Quantity Type */}
//         <Accordion title="Quantity Type" subTitle="" batch={9} state={a} onClick={aFunc} border={false}>
//           <div className="flex gap-2 flex-wrap">
//             {qualityType.map(({ item, state }) => (
//               <button
//                 key={item}
//                 className={`px-4 py-[6px] text-3 rounded-2xl uppercase ${
//                   state ? "bg-[--foreground-green] text-white" : "bg-[#EAF2FF] text-[--foreground-green]"
//                 }`}
//                 onClick={() => handleQuantityType(item)}
//               >
//                 {item}
//               </button>
//             ))}
//           </div>
//         </Accordion>

//         {/* Quantity Unit (only shows if type is selected & no unit picked yet) */}
//         {selectedQuantityType && !selectedUnit && states.length > 0 && (
//           <Accordion title="Quantity Unit" subTitle="" batch={9} state={b} onClick={bFunc} border={false}>
//             <div className="flex gap-2 flex-wrap">
//               {states.map(({ item, state }) => (
//                 <button
//                   key={item}
//                   className={`px-4 py-[6px] text-3 rounded-2xl uppercase ${
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

//         {/* Input for QTY (renamed to Minimum Unit if unit selected) */}
//         {selectedQuantityType && selectedUnit && (
//           <div className="py-5">
//             <input
//               type="number"
//               id="quantity"
//               name="quantity"
//               value={quantity}
//               onChange={handleChange}
//               required
//               className="w-full px-4 py-3 rounded-xl outline-none bg-[#EAF2FF] border-[0.67px] border-[#C5C6CC] placeholder:text-[#8F9098]"
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


// import { FC, useEffect, useState, useMemo, useCallback } from "react";
// import general_type from "./general.types";
// import { useSearchParams } from "next/navigation";
// import useForm from "@/hooks/useForm";
// import useToggle from "@/hooks/useToggle";
// import { showToast } from "@/utils/alert";
// import axios from "@/utils/axios";
// import Accordion from "./Accordion";
// import openSansFont from "@/fonts/OpenSans";
// import Circle from "@/components/Circle";
// import { Icon } from "@mui/material";







// // 1. STATIC MAPPING: Consolidated mapping for units
// const QUANTITY_UNITS_MAP: Readonly<Record<string, string[]>> = {
//   WEIGHT: [
//     "KILOGRAMS (KG)",
//     "GRAMS (G)",
//     "TONNES (T)",
//     "POUNDS (LBS)",
//     "OUNCES (OZ)",
//   ],
//   VOLUME: [
//     "LITERS (L)",
//     "MILLILITERS (ML)",
//     "CUBIC METERS (M³)",
//     "GALLONS (GAL)",
//     "CUPS",
//   ],
//   UNIT: ["PIECES (PCS)", "PACKS", "DOZENS (DOZ)", "CARTONS", "SETS"],
//   LENGTH: [
//     "MILLIMETERS (MM)",
//     "CENTIMETERS (CM)",
//     "METERS (M)",
//     "KILOMETERS (KM)",
//     "INCHES (IN)",
//   ],
//   AREA: [
//     "SQUARE METERS (M²)",
//     "SQUARE KILOMETERS (KM²)",
//     "HECTARES (HA)",
//     "ACRES (AC)",
//     "SQUARE FEET (FT²)",
//   ],
//   SPECIALIZED: [
//     "LITERS PER MINUTE (L/MIN)",
//     "CUBIC CENTIMETERS (CC)",
//     "PERCENTAGE (%)",
//     "UNITS/DOSE",
//     "POINTS",
//   ],
//   OTHER: ["CUSTOM UNIT"],
// };

// const QUALITY_TYPES: Readonly<string[]> = Object.keys(QUANTITY_UNITS_MAP);

// const ProductSpec: FC<general_type> = ({
//   setCount,
//   setSection,
// }) => {
//   // Retrieve productId from URL for edit mode
//   const searchParams = useSearchParams();
//   const productId = searchParams.get("id");

//   const [productData, setProductData] = useState({
//     quantity: "", // Minimum Unit Amount (number/string)
//     totalStock: 1, // Total Quantity (number)
//     isReadyForPickUp: "available", // "available" | "not available"
//     weight: 1, // Delivery weight (number)
//   });
//   const [selectedQualityType, setSelectedQualityType] = useState<string | null>(
//     null
//   );
//   const [selectedUnit, setSelectedUnit] = useState<string | null>(null);

//   // Unused state variables from original files, kept for consistency if needed elsewhere
//   const [registeredBusinessName] = useForm("");
//   const [description] = useForm("");

//   const [a, aFunc] = useToggle(true); // Quantity Type Accordion state
//   const [b, bFunc] = useToggle(true); // Quantity Unit Accordion state
//   const [displayCircle, setDisplayCircle] = useState(true);
//   const [countState, setCount2] = useState(25); 

//   // Memoize the available units based on the selected type
//   const availableUnits: string[] = useMemo(() => {
//     return selectedQualityType
//       ? QUANTITY_UNITS_MAP[selectedQualityType] || []
//       : [];
//   }, [selectedQualityType]);

//   // Handler for all input/select changes
//   const handleInputChange = useCallback(
//     (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
//       const { name, value, type } = e.target;
//       let finalValue: string | number = value;

//       if (type === "number" || name === "weight" || name === "totalStock") {
//         // Simple numeric validation for display consistency
//         finalValue = value.replace(/[^0-9.]/g, "");
//       }

//       setProductData((prev) => ({
//         ...prev,
//         [name]: finalValue,
//       }));
//     },
//     []
//   );

//   // Optimized selection handlers
//   const handleQualityType = (type: string) => {
//     const newType = selectedQualityType === type ? null : type;

//     setSelectedQualityType(newType);
//     setSelectedUnit(null); // Reset unit when type changes
//   };

//   const handleUnitSelect = (unit: string) => {
//     setSelectedUnit(selectedUnit === unit ? null : unit);
//   };

//   // ⭐️ FEATURE: Fetch and Pre-populate Data for Edit Mode
//   useEffect(() => {
//     const fetchProductSpec = async () => {
//       // NOTE: In a real app, 'addProductActive' is used for a multi-step form process
//       // but for edit, we prioritize the URL 'productId'.
//       if (!productId) return; 
//       const token = localStorage.getItem("userToken");
//       if (!token) {
//         showToast("error", "Authentication required to fetch product.");
//         return;
//       }

//       try {
//         const res = await axios.get(`/products/vendor/${productId}`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         const product = res.data;

//         // Set all input/select fields
//         setProductData({
//           quantity: product.quantity?.toString() || "",
//           totalStock: product.totalStock || 1,
//           isReadyForPickUp: product.isReadyForPickUp || "available",
//           weight: product.weight || 1,
//         });

//         // Set button/accordion selections
//         setSelectedQualityType(product.quantityType || null);
//         setSelectedUnit(product.quantityUnit || null);
        
//       } catch (error: any) {
//         console.error("Error fetching product specifications:", error);
//         showToast("error", "Failed to load existing product specs.");
//       }
//     };
//     fetchProductSpec();
//   }, [productId]);

//   // API Call Handler (PUT request for update)
//   const handleAPI = useCallback(async () => {
//     if (!selectedQualityType || !selectedUnit) {
//       return showToast("error", "Please select both Quantity Type and Unit.");
//     }

//     const quantityValue = parseFloat(productData.quantity);
//     const totalStockValue = parseInt(productData.totalStock.toString(), 10);

//     if (isNaN(quantityValue) || quantityValue <= 0) {
//       return showToast(
//         "error",
//         "Minimum unit amount must be a positive number."
//       );
//     }
//     if (isNaN(totalStockValue) || totalStockValue <= 0) {
//       return showToast("error", "Total stock must be a positive integer.");
//     }

//     // Determine the product ID to use (URL ID for Edit, localStorage ID for New)
//     const activeProductId = productId || localStorage.getItem("addProductActive");
//     const token = localStorage.getItem("userToken");

//     if (!activeProductId || !token) {
//       return showToast("error", "Authentication error or product ID missing.");
//     }

//     try {
//       const res = await axios.put( 
//         `/products/vendor/add-product-spec/${activeProductId}`,
//         {
//           quantityType: selectedQualityType,
//           quantityUnit: selectedUnit,
//           quantity: quantityValue,
//           totalStock: totalStockValue,
//           weight: productData.weight,
//           isReadyForPickUp: productData.isReadyForPickUp,
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       showToast("success", res.data.message);
//       setSection(3);
//     } catch (err: any) {
//       const errorMessage =
//         err.response?.data?.message ||
//         err.message ||
//         "An unknown error occurred.";
//       console.error(err);
//       showToast("error", errorMessage);
//     }
//   }, [selectedQualityType, selectedUnit, productData, setSection, productId]);

//   const getButtonClass = (isActive: boolean) =>
//     `px-4 py-[6px] text-3 rounded-2xl uppercase font-medium transition-all duration-200 ${
//       isActive
//         ? "bg-[--foreground-green] text-white shadow-md"
//         : "bg-[#EAF2FF] text-[--foreground-green] hover:bg-[#DCE9FF]"
//     }`;

//   return (
//     <div className="py-3">
//       <form
//         onSubmit={(e) => {
//           e.preventDefault();
//           handleAPI();
//         }}
//         className="space-y-4"
//       >
//         <div className="py-5 w-full space-y-4">
          
//           {/* Quantity Type Accordion */}
//           <Accordion
//             title="Quantity Type"
//             subTitle={selectedQualityType || "Select Type"}
//             state={a}
//             onClick={aFunc}
//             border={true}
//           >
//             <div className="flex gap-2 flex-wrap pt-2">
//               {QUALITY_TYPES.map((item) => (
//                 <button
//                   key={item}
//                   type="button"
//                   className={getButtonClass(item === selectedQualityType)}
//                   onClick={() => handleQualityType(item)}
//                 >
//                   {item}
//                 </button>
//               ))}
//             </div>
//           </Accordion>

//           {/* Quantity Unit Accordion (Only visible if a Type is selected) */}
//           {selectedQualityType && availableUnits.length > 0 && (
//             <Accordion
//               title="Quantity Unit"
//               subTitle={selectedUnit || "Select Unit"}
//               state={b}
//               onClick={bFunc}
//               border={true}
//             >
//               <div className="flex gap-2 flex-wrap pt-2">
//                 {availableUnits.map((item) => (
//                   <button
//                     key={item}
//                     type="button"
//                     className={getButtonClass(item === selectedUnit)}
//                     onClick={() => handleUnitSelect(item)}
//                   >
//                     {item}
//                   </button>
//                 ))}
//               </div>
//             </Accordion>
//           )}

//           {/* Input for Minimum Unit Amount */}
//           {selectedUnit && (
//             <div className="pt-2">
//               <label htmlFor="quantity" className={`text-sm text-[#71727A] ${openSansFont} block mb-1`}>
//                 Minimum Unit Amount
//               </label>
//               <input
//                 type="number"
//                 id="quantity"
//                 name="quantity"
//                 value={productData.quantity}
//                 onChange={handleInputChange}
//                 required
//                 min={0.01}
//                 step="any"
//                 className="w-full px-4 py-3 rounded-xl outline-none bg-[#F7F8FA] border-[1px] border-[#C5C6CC] placeholder:text-[#8F9098] focus:border-[--foreground-green]"
//                 placeholder={`Enter minimum unit value in ${selectedUnit}`}
//               />
//               <p className={`text-xs pt-2 text-[#8F9098] ${openSansFont}`}>
//                 The smallest amount you can sell or ship ({selectedUnit}).
//               </p>
//             </div>
//           )}
          
//           {/* Input for Weight */}
//           <div className="pt-2">
//             <label htmlFor="weight" className={`text-sm text-[#71727A] ${openSansFont} block mb-1`}>
//                 Delivery Weight (KG)
//             </label>
//             <input
//               type="number"
//               id="weight"
//               name="weight"
//               value={productData.weight}
//               onChange={handleInputChange}
//               required
//               min={0.1}
//               step="any"
//               className="w-full px-4 py-3 rounded-xl outline-none bg-[#F7F8FA] border-[1px] border-[#C5C6CC] placeholder:text-[#8F9098] focus:border-[--foreground-green]"
//               placeholder="Enter the product's weight in kilograms"
//             />
//             <p className={`text-xs pt-2 text-[#8F9098] ${openSansFont}`}>
//               This weight is used for calculating delivery charges.
//             </p>
//           </div>

//           {/* Select for Availability */}
//           <div className="pt-2">
//             <label htmlFor="isReadyForPickUp" className={`text-sm text-[#71727A] ${openSansFont} block mb-1`}>
//               Is this product ready for immediate shipping?
//             </label>
//             <select
//               id="isReadyForPickUp"
//               name="isReadyForPickUp"
//               onChange={handleInputChange}
//               value={productData.isReadyForPickUp}
//               required
//               className="w-full px-4 py-3 rounded-xl outline-none bg-white border-[1px] border-[#C5C6CC] text-gray-800 focus:ring-1 focus:ring-[--foreground-green] focus:border-[--foreground-green] appearance-none cursor-pointer"
//             >
//               <option value="available">Yes (Available)</option>
//               <option value="not available">No (Not Available)</option>
//             </select>
//           </div>
          
//           {/* Input for Total Stock */}
//           <div className="pt-2">
//             <label htmlFor="totalStock" className={`text-sm text-[#71727A] ${openSansFont} block mb-1`}>
//               Total in Stock
//             </label>
//             <input
//               type="number"
//               id="totalStock"
//               name="totalStock"
//               onChange={handleInputChange}
//               value={productData.totalStock}
//               required
//               min={1}
//               className="w-full px-4 py-3 rounded-xl outline-none bg-[#F7F8FA] border-[1px] border-[#C5C6CC] placeholder:text-[#8F9098] focus:border-[--foreground-green]"
//               placeholder="e.g. 100"
//             />
//             <p className={`text-xs pt-2 text-[#8F9098] ${openSansFont}`}>
//               The current total inventory count.
//             </p>
//           </div>
//         </div>
        
//         {/* Navigation Button */}
//         <div className="flex items-center justify-center pt-8 pb-40 gap-6 w-full">
//           <button
//             type="submit"
//             className="rounded-[12px] py-5 px-4 text-base font-semibold leading-[14.52px] text-center block w-full bg-[--foreground-green] text-white scale-100 hover:scale-[0.98] transition-all duration-300 shadow-lg"
//           >
//             {"NEXT"}
//           </button>
//           <div>
//             {displayCircle ? (
//               <Circle count={countState} size={48}>
//                 <Icon className="text-xl text-[--foreground-green] font-extrabold" />
//               </Circle>
//             ) : (
//               ""
//             )}
//           </div>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default ProductSpec;
"use client";

import { FC, useEffect, useState, useMemo, useCallback, Suspense } from "react";
import general_type from "./general.types";
import { useSearchParams } from "next/navigation";
import useForm from "@/hooks/useForm";
import useToggle from "@/hooks/useToggle";
import { showToast } from "@/utils/alert";
import axios from "@/utils/axios";
import Accordion from "./Accordion";
import openSansFont from "@/fonts/OpenSans";
import Circle from "@/components/Circle";
import { Icon } from "@mui/material";

const QUANTITY_UNITS_MAP: Readonly<Record<string, string[]>> = {
  WEIGHT: ["KILOGRAMS (KG)", "GRAMS (G)", "TONNES (T)", "POUNDS (LBS)", "OUNCES (OZ)"],
  VOLUME: ["LITERS (L)", "MILLILITERS (ML)", "CUBIC METERS (M³)", "GALLONS (GAL)", "CUPS"],
  UNIT: ["PIECES (PCS)", "PACKS", "DOZENS (DOZ)", "CARTONS", "SETS"],
  LENGTH: ["MILLIMETERS (MM)", "CENTIMETERS (CM)", "METERS (M)", "KILOMETERS (KM)", "INCHES (IN)"],
  AREA: ["SQUARE METERS (M²)", "SQUARE KILOMETERS (KM²)", "HECTARES (HA)", "ACRES (AC)", "SQUARE FEET (FT²)"],
  SPECIALIZED: ["LITERS PER MINUTE (L/MIN)", "CUBIC CENTIMETERS (CC)", "PERCENTAGE (%)", "UNITS/DOSE", "POINTS"],
  OTHER: ["CUSTOM UNIT"],
};

const QUALITY_TYPES = Object.keys(QUANTITY_UNITS_MAP);

const ProductSpec: FC<general_type> = ({ setCount, setSection }) => {
  const searchParams = useSearchParams();
  const productId = searchParams.get("id");

  const [productData, setProductData] = useState({
    quantity: "",
    totalStock: 1,
    isReadyForPickUp: "available",
    weight: 1,
  });

  const [selectedQualityType, setSelectedQualityType] = useState<string | null>(null);
  const [selectedUnit, setSelectedUnit] = useState<string | null>(null);

  const [a, aFunc] = useToggle(true);
  const [b, bFunc] = useToggle(true);
  const [displayCircle, setDisplayCircle] = useState(true);
  const [countState] = useState(25);

  // ✅ Derived unit list
  const availableUnits = useMemo(() => {
    return selectedQualityType ? QUANTITY_UNITS_MAP[selectedQualityType] || [] : [];
  }, [selectedQualityType]);

  // ✅ Input Change
  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const { name, value } = e.target;
      setProductData((prev) => ({ ...prev, [name]: value }));
    },
    []
  );

  const handleQualityType = (type: string) => {
    setSelectedQualityType((prev) => (prev === type ? null : type));
    setSelectedUnit(null);
  };

  const handleUnitSelect = (unit: string) => {
    setSelectedUnit((prev) => (prev === unit ? null : unit));
  };

useEffect(() => {
  const fetchProductSpec = async () => {
    if (!productId) return;

    const token = localStorage.getItem("userToken");
    if (!token) {
      showToast("error", "Please log in first.");
      return;
    }

    try {
      const res = await axios.get(`/products/vendor/${productId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const product = res.data;

      // ✅ Normalize strings for safer comparison
      const normalizedType = product.quantityType?.trim().toUpperCase() || null;
      const normalizedUnit = product.quantityUnit?.trim().toUpperCase() || null;

      // ✅ Find the correct quality type key
      const matchedType =
        QUALITY_TYPES.find(
          (type) => type.toUpperCase() === normalizedType
        ) || null;

      // ✅ Find correct unit only if type exists
      let matchedUnit: string | null = null;
      if (matchedType && normalizedUnit) {
        const possibleUnits = QUANTITY_UNITS_MAP[matchedType];
        matchedUnit =
          possibleUnits.find(
            (unit) =>
              unit.toUpperCase() === normalizedUnit ||
              unit.toUpperCase().includes(normalizedUnit)
          ) || null;
      }

      // ✅ Update all form data
      setProductData({
        quantity: product.quantity?.toString() || "",
        totalStock: product.totalStock || 1,
        isReadyForPickUp: product.isReadyForPickUp || "available",
        weight: product.weight || 1,
      });

      // ✅ Update selections safely
      setSelectedQualityType(matchedType);
      setSelectedUnit(matchedUnit);

    } catch (err) {
      console.error("❌ Error fetching product details:", err);
      showToast("error", "Failed to load product details.");
    }
  };

  fetchProductSpec();
}, [productId]);


  // ✅ Submit (Create or Update)
  const handleAPI = useCallback(async () => {
    if (!selectedQualityType || !selectedUnit) {
      return showToast("error", "Please select both quantity type and unit.");
    }

    const token = localStorage.getItem("userToken");
    const activeProductId = productId || localStorage.getItem("addProductActive");

    if (!activeProductId || !token) {
      return showToast("error", "Product ID or authentication missing.");
    }

    try {
      const res = await axios.put(
        `/products/vendor/add-product-spec/${activeProductId}`,
        {
          quantityType: selectedQualityType,
          quantityUnit: selectedUnit,
          quantity: Number(productData.quantity),
          totalStock: Number(productData.totalStock),
          weight: Number(productData.weight),
          isReadyForPickUp: productData.isReadyForPickUp,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      showToast("success", res.data.message || "Product updated successfully!");
      setSection(3);
    } catch (err: any) {
      console.error(err);
      showToast("error", err.response?.data?.message || "Failed to update product.");
    }
  }, [productId, productData, selectedQualityType, selectedUnit, setSection]);

  const getButtonClass = (isActive: boolean) =>
    `px-4 py-[6px] text-3 rounded-2xl uppercase font-medium transition-all duration-200 ${
      isActive
        ? "bg-[--foreground-green] text-white shadow-md"
        : "bg-[#EAF2FF] text-[--foreground-green] hover:bg-[#DCE9FF]"
    }`;

  return (
    <Suspense fallback={<div>Loading...</div>}>

    <div className="py-3">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleAPI();
        }}
        className="space-y-4"
      >
        <div className="py-5 w-full space-y-4">
          {/* Quantity Type */}
          <Accordion
            title="Quantity Type"
            subTitle={selectedQualityType || "Select Type"}
            state={a}
            onClick={aFunc}
            border={true}
          >
            <div className="flex gap-2 flex-wrap pt-2">
              {QUALITY_TYPES.map((item) => (
                <button
                  key={item}
                  type="button"
                  className={getButtonClass(item === selectedQualityType)}
                  onClick={() => handleQualityType(item)}
                >
                  {item}
                </button>
              ))}
            </div>
          </Accordion>

          {/* Quantity Unit */}
          {selectedQualityType && availableUnits.length > 0 && (
            <Accordion
              title="Quantity Unit"
              subTitle={selectedUnit || "Select Unit"}
              state={b}
              onClick={bFunc}
              border={true}
            >
              <div className="flex gap-2 flex-wrap pt-2">
                {availableUnits.map((item) => (
                  <button
                    key={item}
                    type="button"
                    className={getButtonClass(item === selectedUnit)}
                    onClick={() => handleUnitSelect(item)}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </Accordion>
          )}

          {/* Quantity */}
          {selectedUnit && (
            <div className="pt-2">
              <label className="text-sm text-[#71727A] block mb-1">
                Minimum Unit Amount
              </label>
              <input
                type="number"
                name="quantity"
                value={productData.quantity}
                onChange={handleInputChange}
                required
                min={0.01}
                step="any"
                className="w-full px-4 py-3 rounded-xl bg-[#F7F8FA] border border-[#C5C6CC] focus:border-[--foreground-green]"
                placeholder={`Enter minimum unit value in ${selectedUnit}`}
              />
            </div>
          )}

          {/* Weight */}
          <div className="pt-2">
            <label className="text-sm text-[#71727A] block mb-1">Delivery Weight (KG)</label>
            <input
              type="number"
              name="weight"
              value={productData.weight}
              onChange={handleInputChange}
              // min={0.1}
              required
              step="any"
              className="w-full px-4 py-3 rounded-xl bg-[#F7F8FA] border border-[#C5C6CC] focus:border-[--foreground-green]"
            />
          </div>

          {/* Availability */}
          <div className="pt-2">
            <label className="text-sm text-[#71727A] block mb-1">
              Is this product ready for shipping?
            </label>
            <select
              name="isReadyForPickUp"
              value={productData.isReadyForPickUp}
              onChange={handleInputChange}
              className="w-full px-4 py-3 rounded-xl bg-white border border-[#C5C6CC] focus:ring-[--foreground-green]"
            >
              <option value="available">Yes (Available)</option>
              <option value="not available">No (Not Available)</option>
            </select>
          </div>

          {/* Total Stock */}
          <div className="pt-2">
            <label className="text-sm text-[#71727A] block mb-1">Total in Stock</label>
            <input
              type="number"
              name="totalStock"
              value={productData.totalStock}
              onChange={handleInputChange}
              min={1}
              required
              className="w-full px-4 py-3 rounded-xl bg-[#F7F8FA] border border-[#C5C6CC] focus:border-[--foreground-green]"
            />
          </div>
        </div>

        {/* Submit */}
        <div className="flex items-center justify-center pt-8 pb-40 gap-6 w-full">
          <button
            type="submit"
            className="rounded-[12px] py-5 px-4 text-base font-semibold text-center w-full bg-[--foreground-green] text-white transition-all duration-300 shadow-lg"
          >
            NEXT
          </button>
          {displayCircle && (
            <Circle count={countState} size={48}>
              <Icon className="text-xl text-[--foreground-green] font-extrabold" />
            </Circle>
          )}
        </div>
      </form>
    </div>
    </Suspense>
  );
};

export default ProductSpec;
