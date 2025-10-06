// // // import { FC, useEffect, useState } from "react";
// // // import general_type from "./general.types";
// // // import openSansFont from "@/fonts/OpenSans";
// // // import useForm from "@/hooks/useForm";
// // // import Accordion from "./Accordion";
// // // import useToggle from "@/hooks/useToggle";
// // // import axios from "@/utils/axios";
// // // import { showToast } from "@/utils/alert";

// // // const mainState = [
// // //   { item: "KILOGRAMS (KG)", state: false },
// // //   { item: "GRAMS (G)", state: false },
// // //   { item: "TONNES (T)", state: false },
// // //   { item: "POUNDS (LBS)", state: false },
// // //   { item: "OUNCES (OZ)", state: false },
// // // ];
// // // const QualityTypeState = [
// // //   { item: "WEIGHT", state: false },
// // //   { item: "VOLUME", state: false },
// // //   { item: "UNIT", state: false },
// // //   { item: "LENGTH", state: false },
// // //   { item: "AREA", state: false },
// // //   { item: "SPECIALIZED", state: false },
// // //   { item: "OTHER", state: false },
// // // ];

// // // const ProductSpec: FC<general_type> = ({
// // //   handleBtnFunc,
// // //   setCount,
// // //   setSection,
// // // }) => {
// // //   const [uploadCount, setuploadCount] = useState(0);
// // //   const [file, setFile] = useState<File | null>(null);
// // //   const [unit, setUnit] = useState<string>(""); 
// // //   const [quantity, setQuantity] = useState<string>("");
// // //   const [states, setState] = useState(mainState);
// // //   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
// // //   setQuantity(e.target.value);
// // //   };

// // //   const handleChange2 = (e: React.ChangeEvent<HTMLInputElement>) => {
// // //     setUnit(e.target.value);
// // //   };

// // //   const handleStates = (a: string) => {
// // //     setState((prev) =>
// // //       prev.map(({ item, state }, i) => ({
// // //         item,
// // //         state: item == a ? !state : state,
// // //       }))
// // //     );
// // //   };
// // //   const [qualityType, setQualityType] = useState(QualityTypeState);
// // //   const handleQuantityType = (a: string) => {
// // //     setQualityType((prev) =>
// // //       prev.map(({ item, state }, i) => ({
// // //         item,
// // //         state: item == a ? !state : state,
// // //       }))
// // //     );
// // //   };

// // //   const [registeredBusinessName, setRegisteredBusinessName] = useForm("");
// // //   const [description, setDescription] = useForm("");

// // //   const [a, aFunc] = useToggle(true);
// // //   const [b, bFunc] = useToggle(true);
  
// // //   const handleAPI = async () => {
// // //     const selectedQuantityType = qualityType
// // //       .filter(({ state }) => state)
// // //       .map(({ item }) => item);
// // //     const selectedUnitType = states
// // //       .filter(({ state }) => state)
// // //       .map(({ item }) => item);

// // //     axios({
// // //       method: "PUT",
// // //       url: `/products/vendor/add-product-spec/${localStorage.getItem(
// // //         "addProductActive"
// // //       )}`,
// // //       data: {
// // //         quantityType: selectedQuantityType[0],
// // //         quantityUnit: selectedUnitType[0],
// // //          unitAmount: parseFloat(unit),
// // //       quantity: parseFloat(quantity),
// // //       },
// // //       headers: {
// // //         Authorization: `Bearer ${localStorage.getItem("userToken")}`,
// // //       },
// // //     })
// // //       .then((res) => {
// // //         showToast("success", res.data.message);
// // //         console.log({
// // //         quantityType: selectedQuantityType[0],
// // //         quantityUnit: selectedUnitType[0],
// // //         unitAmount: unit,
// // //         quantity,
// // //       })
// // //         setSection(3);
// // //         // window.location.replace("/user/dashboard/seller/inventory")
// // //       })
// // //       .catch((err) => {
// // //         console.error(err);
// // //         showToast("error", err.message);
// // //       });
// // //   };
// // //   useEffect(() => {
// // //     setCount(50);
// // //     handleBtnFunc(handleAPI);
// // //     return () => {
// // //       handleBtnFunc(() => console.log("default"));
// // //     };
// // //   }, [uploadCount, states, registeredBusinessName, description, unit, quantity]);
// // //   return (
// // //     <div className="py-3">
// // //       <div className="py-5 w-full">

// // //         <Accordion
// // //           title="Quantity Type"
// // //           subTitle=""
// // //           batch={9}
// // //           state={a}
// // //           onClick={aFunc}
// // //           border={false}
// // //         >
// // //           {
// // //             <div className="flex gap-2 flex-wrap">
// // //               {qualityType.map(({ item, state }) => (
// // //                 <button
// // //                   key={item}
// // //                   className={`px-4 py-[6px] text-3 rounded-2xl uppercase ${
// // //                     state
// // //                       ? "bg-[--foreground-green] text-white"
// // //                       : "bg-[#EAF2FF] text-[--foreground-green]"
// // //                   }`}
// // //                   onClick={() => handleQuantityType(item)}
// // //                 >
// // //                   {item}
// // //                 </button>
// // //               ))}
// // //             </div>
// // //           }
// // //         </Accordion>

// // //         <Accordion
// // //           title="Quantity Unit"
// // //           subTitle=""
// // //           batch={9}
// // //           state={b}
// // //           onClick={bFunc}
// // //           border={false}
// // //         >
// // //           {
// // //             <div className="flex gap-2 flex-wrap">
// // //               {states.map(({ item, state }) => (
// // //                 <button
// // //                   key={item}
// // //                   className={`px-4 py-[6px] text-3 rounded-2xl uppercase ${
// // //                     state
// // //                       ? "bg-[--foreground-green] text-white"
// // //                       : "bg-[#EAF2FF] text-[--foreground-green]"
// // //                   }`}
// // //                   onClick={() => handleStates(item)}
// // //                 >
// // //                   {item}
// // //                 </button>
// // //               ))}
// // //             </div>
// // //           }
// // //         </Accordion>

// // //         <div className="py-5 flex flex-row gap-4">
// // //           <div className="w-[80%]">
// // //             <input
// // //               type="number"
// // //               id="unit"
// // //               name="unit"
// // //               value={unit}
// // //               onChange={handleChange2}
// // //               required
// // //               className="w-full px-4 py-3 rounded-xl outline-none bg-inherit border-[0.67px] border-[#C5C6CC] placeholder:text-[#8F9098]"
// // //               placeholder="Unit"
// // //             />
// // //             <p className={`text-xs pt-2 text-[#8F9098] ${openSansFont}`}>
// // //               Unit Amount
// // //             </p>
// // //           </div>
// // //           <div className="w-[15%]">
// // //             <input
// // //               type="number"
// // //               id="quantity"
// // //               name="quantity"
// // //               value={quantity}
// // //               onChange={handleChange}
// // //               required
// // //               className="w-full px-4 py-3 rounded-xl outline-none bg-[#EAF2FF] border-[0.67px] border-[#C5C6CC] placeholder:text-[#8F9098]"
// // //               placeholder="Quantity"
// // //             />
// // //             <p className={`text-xs pt-2 text-[#8F9098] ${openSansFont}`}>QTY</p>
// // //           </div>
// // //         </div>

// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export default ProductSpec;
// // import { FC, useEffect, useState } from "react";
// // import general_type from "./general.types";
// // import openSansFont from "@/fonts/OpenSans";
// // import useForm from "@/hooks/useForm";
// // import Accordion from "./Accordion";
// // import useToggle from "@/hooks/useToggle";
// // import axios from "@/utils/axios";
// // import { showToast } from "@/utils/alert";

// // // 🔹 Mapping QuantityType -> Top 5 Units
// // const quantityUnitsMap: Record<string, string[]> = {
// //   WEIGHT: ["KILOGRAMS (KG)", "GRAMS (G)", "TONNES (T)", "POUNDS (LBS)", "OUNCES (OZ)"],
// //   VOLUME: ["LITERS (L)", "MILLILITERS (ML)", "CUBIC METERS (M³)", "GALLONS (GAL)", "CUPS"],
// //   UNIT: ["PIECES (PCS)", "PACKS", "DOZENS (DOZ)", "CARTONS", "SETS"],
// //   LENGTH: ["MILLIMETERS (MM)", "CENTIMETERS (CM)", "METERS (M)", "KILOMETERS (KM)", "INCHES (IN)"],
// //   AREA: ["SQUARE METERS (M²)", "SQUARE KILOMETERS (KM²)", "HECTARES (HA)", "ACRES (AC)", "SQUARE FEET (FT²)"],
// //   SPECIALIZED: ["LITERS PER MINUTE (L/MIN)", "CUBIC CENTIMETERS (CC)", "PERCENTAGE (%)", "UNITS/DOSE", "POINTS"],
// //   OTHER: ["CUSTOM UNIT"],
// // };

// // const QualityTypeState = [
// //   { item: "WEIGHT", state: false },
// //   { item: "VOLUME", state: false },
// //   { item: "UNIT", state: false },
// //   { item: "LENGTH", state: false },
// //   { item: "AREA", state: false },
// //   { item: "SPECIALIZED", state: false },
// //   { item: "OTHER", state: false },
// // ];

// // const ProductSpec: FC<general_type> = ({ handleBtnFunc, setCount, setSection }) => {
// //   const [quantity, setQuantity] = useState<string>("");

// //   const [states, setState] = useState<{ item: string; state: boolean }[]>([]);
// //   const [qualityType, setQualityType] = useState(QualityTypeState);
// //   const [totalStock, setTotalStock] = useState(1);

// //   const [registeredBusinessName, setRegisteredBusinessName] = useForm("");
// //   const [description, setDescription] = useForm("");

// //   const [a, aFunc] = useToggle(true);
// //   const [b, bFunc] = useToggle(true);

// //   // 🔹 Handle QTY input
// //   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
// //     setQuantity(e.target.value);
// //   };

// //   // 🔹 Handle Quantity Type Selection
// //   const handleQuantityType = (selectedType: string) => {
// //     setQualityType((prev) =>
// //       prev.map(({ item }) => ({
// //         item,
// //         state: item === selectedType ? !prev.find((q) => q.item === item)?.state : false, // only one active
// //       }))
// //     );

// //     // 🔹 Reset units dynamically when type changes
// //     const units = quantityUnitsMap[selectedType] || [];
// //     setState(units.map((u) => ({ item: u, state: false })));
// //   };

// //   // 🔹 Handle Unit Selection (only one at a time)
// //   const handleStates = (selectedUnit: string) => {
// //     setState((prev) =>
// //       prev.map(({ item }) => ({
// //         item,
// //         state: item === selectedUnit,
// //       }))
// //     );
// //   };

// //   // API Call
// //   const handleAPI = async () => {
// //     const selectedQuantityType = qualityType.filter(({ state }) => state).map(({ item }) => item);
// //     const selectedUnitType = states.filter(({ state }) => state).map(({ item }) => item);

// //     axios({
// //       method: "PUT",
// //       url: `/products/vendor/add-product-spec/${localStorage.getItem("addProductActive")}`,
// //       data: {
// //         quantityType: selectedQuantityType[0],
// //         quantityUnit: selectedUnitType[0],
// //         quantity: parseFloat(quantity),
// //         totalStock: parseInt(totalStock.toString(), 10),
// //       },
// //       headers: {
// //         Authorization: `Bearer ${localStorage.getItem("userToken")}`,
// //       },
// //     })
// //       .then((res) => {
// //         showToast("success", res.data.message);
// //         setSection(3);
// //       })
// //       .catch((err) => {
// //         console.error(err);
// //         showToast("error", err.message);
// //       });
// //   };

// //   useEffect(() => {
// //     setCount(50);
// //     handleBtnFunc(handleAPI);
// //     return () => {
// //       handleBtnFunc(() => console.log("default"));
// //     };
// //   }, [states, registeredBusinessName, description, quantity, totalStock]);

// //   const selectedQuantityType = qualityType.find((q) => q.state);
// //   const selectedUnit = states.find((s) => s.state);

// //   return (
// //     <div className="py-3">
// //       <div className="py-5 w-full">
// //         {/* Quantity Type */}
// //         <Accordion title="Quantity Type" subTitle="" batch={9} state={a} onClick={aFunc} border={false}>
// //           <div className="flex gap-2 flex-wrap">
// //             {qualityType.map(({ item, state }) => (
// //               <button
// //                 key={item}
// //                 className={`px-4 py-[6px] text-3 rounded-2xl uppercase ${
// //                   state ? "bg-[--foreground-green] text-white" : "bg-[#EAF2FF] text-[--foreground-green]"
// //                 }`}
// //                 onClick={() => handleQuantityType(item)}
// //               >
// //                 {item}
// //               </button>
// //             ))}
// //           </div>
// //         </Accordion>

// //         {/* Quantity Unit (only shows if type is selected & no unit picked yet) */}
// //         {selectedQuantityType && !selectedUnit && states.length > 0 && (
// //           <Accordion title="Quantity Unit" subTitle="" batch={9} state={b} onClick={bFunc} border={false}>
// //             <div className="flex gap-2 flex-wrap">
// //               {states.map(({ item, state }) => (
// //                 <button
// //                   key={item}
// //                   className={`px-4 py-[6px] text-3 rounded-2xl uppercase ${
// //                     state ? "bg-[--foreground-green] text-white" : "bg-[#EAF2FF] text-[--foreground-green]"
// //                   }`}
// //                   onClick={() => handleStates(item)}
// //                 >
// //                   {item}
// //                 </button>
// //               ))}
// //             </div>
// //           </Accordion>
// //         )}

// //         {/* Input for QTY (renamed to Minimum Unit if unit selected) */}
// //         {selectedQuantityType && selectedUnit && (
// //           <div className="py-5">
// //             <input
// //               type="number"
// //               id="quantity"
// //               name="quantity"
// //               value={quantity}
// //               onChange={handleChange}
// //               required
// //               className="w-full px-4 py-3 rounded-xl outline-none bg-[#EAF2FF] border-[0.67px] border-[#C5C6CC] placeholder:text-[#8F9098]"
// //               placeholder="Enter value"
// //             />
// //             <p className={`text-xs pt-2 text-[#8F9098] ${openSansFont}`}>
// //               Minimum Unit ({selectedUnit.item})
// //             </p>
// //           </div>
// //         )}
// //         <div className="pb-3">
// //         <input
// //           type="number"
// //           id="totalStock"
// //           onChange={(e) => setTotalStock(Number(e.target.value))}
// //           value={totalStock}
// //           required
// //           min={1}
// //           className="w-full px-4 py-3 rounded-xl outline-none bg-inherit border-[0.67px] border-[#C5C6CC] placeholder:text-[#8F9098]"
// //           placeholder="NGN 0.00"
// //         />
// //         <p className={`text-xs pt-2 text-[#8F9098] ${openSansFont}`}>
// //           Total in stock
// //         </p>
// //       </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default ProductSpec;
import { FC, useEffect, useState, useMemo, useCallback } from "react";
// Assuming these are all necessary and properly barrel-exported for speed
import general_type from "./general.types";
import openSansFont from "@/fonts/OpenSans";
import useForm from "@/hooks/useForm";
import Accordion from "./Accordion";
import useToggle from "@/hooks/useToggle";
import axios from "@/utils/axios";
import { showToast } from "@/utils/alert";

// 1. PERFORMANCE: Use a single, consolidated mapping for units
// This reduces initial state definition and allows for dynamic updates.
const QUANTITY_UNITS_MAP: Readonly<Record<string, string[]>> = {
  WEIGHT: ["KILOGRAMS (KG)", "GRAMS (G)", "TONNES (T)", "POUNDS (LBS)", "OUNCES (OZ)"],
  VOLUME: ["LITERS (L)", "MILLILITERS (ML)", "CUBIC METERS (M³)", "GALLONS (GAL)", "CUPS"],
  UNIT: ["PIECES (PCS)", "PACKS", "DOZENS (DOZ)", "CARTONS", "SETS"],
  LENGTH: ["MILLIMETERS (MM)", "CENTIMETERS (CM)", "METERS (M)", "KILOMETERS (KM)", "INCHES (IN)"],
  AREA: ["SQUARE METERS (M²)", "SQUARE KILOMETERS (KM²)", "HECTARES (HA)", "ACRES (AC)", "SQUARE FEET (FT²)"],
  SPECIALIZED: ["LITERS PER MINUTE (L/MIN)", "CUBIC CENTIMETERS (CC)", "PERCENTAGE (%)", "UNITS/DOSE", "POINTS"],
  OTHER: ["CUSTOM UNIT"],
};

// 2. PERFORMANCE: Define QualityTypeState as a constant array of strings for simplicity
// State logic will be handled by tracking only the selected string item.
const QUALITY_TYPES: Readonly<string[]> = Object.keys(QUANTITY_UNITS_MAP);

interface ProductSpecProps extends general_type {}

const ProductSpec: FC<ProductSpecProps> = ({ handleBtnFunc, setCount, setSection }) => {
  // 3. PERFORMANCE: Consolidate related states for less overhead
  const [productData, setProductData] = useState({
    quantity: "", // Minimum Unit Amount (was 'unit' in original)
    totalStock: 1, // Total Quantity (was 'quantity' in original)
    isReadyForPickUp: "available", // New field for availability status
  });
  const [selectedQualityType, setSelectedQualityType] = useState<string | null>(null);
  const [selectedUnit, setSelectedUnit] = useState<string | null>(null);

  // Unchanged state variables (useForm and useToggle are custom hooks)
  const [registeredBusinessName] = useForm("");
  const [description] = useForm("");
  const [a, aFunc] = useToggle(true); // Quantity Type Accordion
  const [b, bFunc] = useToggle(true); // Quantity Unit Accordion

  // 4. PERFORMANCE: Memoize the available units based on the selected type
  const availableUnits: string[] = useMemo(() => {
    return selectedQualityType ? QUANTITY_UNITS_MAP[selectedQualityType] || [] : [];
  }, [selectedQualityType]);

  // 5. SECURITY: Input change handler with simple sanitization
  // const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
  //   const { name, value } = e.target;
  //   // Basic sanitization: only allow numbers (and decimal point)
  //   const sanitizedValue = value.replace(/[^0-9.]/g, "");

  //   setProductData((prev) => ({
  //     ...prev,
  //     [name]: sanitizedValue,
  //   }));
  // }, []);
const handleInputChange = useCallback(
  (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    let finalValue: string | number;

    if (type === "number") {
      finalValue = value.replace(/[^0-9.]/g, "");
    } else {
      finalValue = value; // ✅ no boolean conversion for select
    }

    setProductData((prev) => ({
      ...prev,
      [name]: finalValue,
    }));
  },
  []
);

  // 6. PERFORMANCE: Optimized selection handlers (fewer state updates)
  const handleQualityType = (type: string) => {
    // If the same type is clicked, unselect it. Otherwise, select it.
    const newType = selectedQualityType === type ? null : type;
    
    setSelectedQualityType(newType);
    setSelectedUnit(null); // Reset unit when type changes
  };

  const handleUnitSelect = (unit: string) => {
    // Allow unselecting by clicking the same unit again
    setSelectedUnit(selectedUnit === unit ? null : unit);
  };
  
  // 7. SECURITY & PERFORMANCE: API call handler memoized with useCallback
  const handleAPI = useCallback(async () => {
    // 8. SECURITY: Input validation before API call
    if (!selectedQualityType || !selectedUnit) {
      return showToast("error", "Please select both Quantity Type and Unit.");
    }
    
    const quantityValue = parseFloat(productData.quantity);
    const totalStockValue = parseInt(productData.totalStock.toString(), 10);

    if (isNaN(quantityValue) || quantityValue <= 0) {
      return showToast("error", "Minimum unit amount must be a positive number.");
    }
    if (isNaN(totalStockValue) || totalStockValue <= 0) {
      return showToast("error", "Total stock must be a positive integer.");
    }

    // 9. SECURITY: Abstract localStorage access out of the API call for a cleaner,
    // more secure pattern. Ideally, the token should be in an HTTP-Only cookie.
    const productId = localStorage.getItem("addProductActive");
    const token = localStorage.getItem("userToken");
    
    if (!productId || !token) {
        return showToast("error", "Authentication error or product ID missing.");
    }

    try {
      const res = await axios({
        method: "PUT",
        url: `/products/vendor/add-product-spec/${productId}`,
        data: {
          quantityType: selectedQualityType,
          quantityUnit: selectedUnit,
          // Use validated and parsed values
          quantity: quantityValue, 
          totalStock: totalStockValue,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      showToast("success", res.data.message);
      setSection(3);
    } catch (err: any) {
      // Use err.response.data.message for cleaner error messages from API
      const errorMessage = err.response?.data?.message || err.message || "An unknown error occurred.";
      console.error(err);
      showToast("error", errorMessage);
    }
  }, [selectedQualityType, selectedUnit, productData, setSection]);

  // 10. PERFORMANCE: Optimized useEffect dependency array
  useEffect(() => {
    setCount(50);
    // handleBtnFunc is set to the memoized handleAPI function
    handleBtnFunc(handleAPI);
    return () => {
      handleBtnFunc(() => console.log("default"));
    };
  }, [handleAPI, setCount, handleBtnFunc]); // Removed unnecessary dependencies

  // 11. Readability/Performance: Helper function for button class logic
  const getButtonClass = (isActive: boolean) =>
    `px-4 py-[6px] text-3 rounded-2xl uppercase ${
      isActive
        ? "bg-[--foreground-green] text-white"
        : "bg-[#EAF2FF] text-[--foreground-green]"
    }`;

  return (
    <div className="py-3">
      <div className="py-5 w-full">
        {/* Quantity Type Accordion */}
        <Accordion
          title="Quantity Type"
          subTitle={selectedQualityType || "Select Type"}
          batch={9}
          state={a}
          onClick={aFunc}
          border={false}
        >
          <div className="flex gap-2 flex-wrap">
            {QUALITY_TYPES.map((item) => (
              <button
                key={item}
                className={getButtonClass(item === selectedQualityType)}
                onClick={() => handleQualityType(item)}
              >
                {item}
              </button>
            ))}
          </div>
        </Accordion>

        {/* Quantity Unit Accordion (Only visible if a Type is selected) */}
        {selectedQualityType && availableUnits.length > 0 && (
          <Accordion
            title="Quantity Unit"
            subTitle={selectedUnit || "Select Unit"}
            batch={9}
            state={b}
            onClick={bFunc}
            border={false}
          >
            <div className="flex gap-2 flex-wrap">
              {availableUnits.map((item) => (
                <button
                  key={item}
                  className={getButtonClass(item === selectedUnit)}
                  onClick={() => handleUnitSelect(item)}
                >
                  {item}
                </button>
              ))}
            </div>
          </Accordion>
        )}

        {/* Input for Minimum Unit Amount (Only visible if a Unit is selected) */}
        {selectedUnit && (
          <div className="py-5">
            <input
              type="number"
              id="quantity"
              name="quantity"
              value={productData.quantity}
              onChange={handleInputChange}
              required
              min={0.01}
              className="w-full px-4 py-3 rounded-xl outline-none bg-inherit border-[0.67px] border-[#C5C6CC] placeholder:text-[#8F9098]"
              placeholder="Enter minimum unit value"
            />
            <p className={`text-xs pt-2 text-[#8F9098] ${openSansFont}`}>
              Minimum Unit Amount ({selectedUnit})
            </p>
          </div>
        )}
        <div className="pb-3">
          <label>Is this product ready to immediate shipping? </label>
          <select 
              id="isReadyForPickUp"
              name="isReadyForPickUp"
              onChange={handleInputChange} 
              value={productData.isReadyForPickUp}
              required
              className="w-full px-4 py-3 rounded-xl outline-none bg-white border-[1px] border-[#C5C6CC] text-gray-800 focus:ring-1 focus:ring-[--foreground-green] focus:border-[--foreground-green] appearance-none cursor-pointer"
            >
              <option value="available">Yes</option>
              <option value="not available">No</option>
            </select>
        </div>
        {/* Input for Total Stock (Always visible for inventory) */}
        <div className="pb-3">
          <input
            type="number"
            id="totalStock"
            name="totalStock"
            onChange={handleInputChange}
            value={productData.totalStock}
            required
            min={1}
            className="w-full px-4 py-3 rounded-xl outline-none bg-inherit border-[0.67px] border-[#C5C6CC] placeholder:text-[#8F9098]"
            placeholder="e.g. 100"
          />
          <p className={`text-xs pt-2 text-[#8F9098] ${openSansFont}`}>
            Total in Stock
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductSpec;








// import { FC, useEffect, useState, useMemo, useCallback } from "react";

// // =========================================================
// // MOCKED/INLINED DEPENDENCIES TO RESOLVE COMPILATION ERRORS
// // =========================================================

// // 1. Mocked Type for external components
// interface general_type {
//   handleBtnFunc: (func: () => Promise<void>) => void;
//   setCount: (count: number) => void;
//   setSection: (section: number) => void;
// }

// // 2. Mocked Font Class
// const openSansFont = "font-sans";

// // 3. Mocked useForm Hook
// const useForm = (initialValue: any): [any, (e: React.ChangeEvent<HTMLInputElement>) => void] => {
//   const [value, setValue] = useState(initialValue);
//   const handler = useCallback((e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value), []);
//   return [value, handler];
// };

// // 4. Mocked useToggle Hook
// const useToggle = (initialValue: boolean): [boolean, () => void] => {
//   const [value, setValue] = useState(initialValue);
//   const toggle = useCallback(() => setValue(prev => !prev), []);
//   return [value, toggle];
// };

// // 5. Mocked showToast Utility
// const showToast = (type: 'success' | 'error', message: string) => {
//     // SECURITY: Use console log for feedback, replacing external alert/toast system
//     console.log(`[TOAST - ${type.toUpperCase()}]: ${message}`);
// };

// // 6. Mocked axios Utility
// // const mockAxios = async (config: { url: string, data: any, headers: any, method: string }) => {
// //     return new Promise((resolve, reject) => {
// //         setTimeout(() => {
// //             // Simulate API logic based on data validation
// //             if (config.data.quantityType && config.data.totalStock > 0 && config.data.quantity > 0) {
// //                 console.log("Mock API Call Success:", config.data);
// //                 resolve({ data: { message: "Product spec updated successfully (Mocked API)." } });
// //             } else {
// //                 console.error("Mock API Call Failed:", config.data);
// //                 reject({ response: { data: { message: "Validation failed: Quantity/Stock must be positive." } } });
// //             }
// //         }, 300); // Small delay for effect
// //     });
// // };
// const mockAxios = async (config: { url: string, data: any, headers: any, method: string }) : Promise<{ data: { message: string } }> => {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       if (config.data.quantityType && config.data.totalStock > 0 && config.data.quantity > 0) {
//         console.log("Mock API Call Success:", config.data);
//         resolve({ data: { message: "Product spec updated successfully (Mocked API)." } });
//       } else {
//         console.error("Mock API Call Failed:", config.data);
//         reject({ response: { data: { message: "Validation failed: Quantity/Stock must be positive." } } });
//       }
//     }, 300);
//   });
// };
// // 7. Mocked Accordion Component
// interface AccordionProps {
//     title: string;
//     subTitle: string;
//     state: boolean;
//     onClick: () => void;
//     children: React.ReactNode;
//     border: boolean; // Retaining prop, but setting style inline
//     batch?: number
// }

// const Accordion: FC<AccordionProps> = ({ title, subTitle, state, onClick, children }) => (
//   <div className="w-full bg-white rounded-xl shadow-sm overflow-hidden my-3 border border-gray-200">
//     <button
//       onClick={onClick}
//       className="w-full text-left p-4 flex justify-between items-center bg-gray-50 hover:bg-gray-100 transition-colors"
//     >
//       <div>
//         <h3 className="font-semibold text-gray-800 text-base">{title}</h3>
//         <p className="text-sm text-gray-500">{subTitle}</p>
//       </div>
//       <svg className={`w-5 h-5 text-gray-500 transition-transform duration-300 ${state ? 'rotate-180' : 'rotate-0'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
//         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
//       </svg>
//     </button>
//     {state && <div className="p-4 bg-white border-t border-gray-200 transition-all duration-300">{children}</div>}
//   </div>
// );

// // =========================================================
// // END OF MOCKED DEPENDENCIES
// // =========================================================

// // 8. CONSTANTS: Define constants outside the component for units and types
// const QUANTITY_UNITS_MAP: Readonly<Record<string, string[]>> = {
//   WEIGHT: ["KILOGRAMS (KG)", "GRAMS (G)", "TONNES (T)", "POUNDS (LBS)", "OUNCES (OZ)"],
//   VOLUME: ["LITERS (L)", "MILLILITERS (ML)", "CUBIC METERS (M³)", "GALLONS (GAL)", "CUPS"],
//   UNIT: ["PIECES (PCS)", "PACKS", "DOZENS (DOZ)", "CARTONS", "SETS"],
//   LENGTH: ["MILLIMETERS (MM)", "CENTIMETERS (CM)", "METERS (M)", "KILOMETERS (KM)", "INCHES (IN)"],
//   AREA: ["SQUARE METERS (M²)", "SQUARE KILOMETERS (KM²)", "HECTARES (HA)", "ACRES (AC)", "SQUARE FEET (FT²)"],
//   SPECIALIZED: ["LITERS PER MINUTE (L/MIN)", "CUBIC CENTIMETERS (CC)", "PERCENTAGE (%)", "UNITS/DOSE", "POINTS"],
//   OTHER: ["CUSTOM UNIT"],
// };

// const QUALITY_TYPES: Readonly<string[]> = Object.keys(QUANTITY_UNITS_MAP);

// interface ProductSpecProps extends general_type {}

// const ProductSpec: FC<ProductSpecProps> = ({ handleBtnFunc, setCount, setSection }) => {
//   // 9. STATE: Consolidated state for product numerical/status data
//   const [productData, setProductData] = useState({
//     quantity: "", 
//     totalStock: 1, 
//     isReadyForPickUp: true, 
//   });
  
//   const [selectedQualityType, setSelectedQualityType] = useState<string | null>(null);
//   const [selectedUnit, setSelectedUnit] = useState<string | null>(null);

//   // Unused mock state, retained to satisfy the custom useForm hook definition from original code
//   const [registeredBusinessName] = useForm("");
//   const [description] = useForm("");
  
//   // Accordion Toggles
//   const [a, aFunc] = useToggle(true); 
//   const [b, bFunc] = useToggle(true); 

//   // 10. PERFORMANCE: Memoize the available units list (derived state)
//   const availableUnits: string[] = useMemo(() => {
//     return selectedQualityType ? QUANTITY_UNITS_MAP[selectedQualityType] || [] : [];
//   }, [selectedQualityType]);

//   // 11. SECURITY & PERFORMANCE: Input change handler with sanitization
//   const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
//     const { name, value, type } = e.target;
//     let finalValue: string | number | boolean;

//     if (type === 'number') {
//       // SECURITY: Basic sanitization: only allow numbers (and decimal point)
//       finalValue = value.replace(/[^0-9.]/g, "");
//     } else if (name === 'isReadyForPickUp') {
//         // Handle select change, converting string 'true'/'false' to boolean
//         finalValue = value === 'true';
//     } else {
//         finalValue = value;
//     }

//     setProductData((prev) => ({
//       ...prev,
//       [name]: finalValue,
//     }));
//   }, []);

//   // 12. HANDLER: Optimized selection handlers
//   const handleQuantityType = (type: string) => {
//     const newType = selectedQualityType === type ? null : type;
//     setSelectedQualityType(newType);
//     setSelectedUnit(null); // Reset unit when type changes
//     // Auto-open unit accordion when a type is selected
//     if (newType) bFunc();
//   };

//   const handleUnitSelect = (unit: string) => {
//     setSelectedUnit(selectedUnit === unit ? null : unit);
//   };
  
//   // 13. API CALL (SECURITY/PERFORMANCE): Memoized API call handler with validation
//   const handleAPI = useCallback(async () => {
//     // SECURITY: Step 1 - Core field validation
//     if (!selectedQualityType || !selectedUnit) {
//       return showToast("error", "Please select both Quantity Type and Unit.");
//     }
    
//     // SECURITY: Step 2 - Parse and validate numerical inputs
//     const quantityValue = parseFloat(productData.quantity);
//     const totalStockValue = parseInt(productData.totalStock.toString(), 10);

//     if (isNaN(quantityValue) || quantityValue <= 0) {
//       return showToast("error", "Minimum unit amount must be a positive number.");
//     }
//     if (isNaN(totalStockValue) || totalStockValue < 1) {
//       return showToast("error", "Total stock must be a positive integer (at least 1).");
//     }

//     // SECURITY: Step 3 - Check for required auth data (Mocked localStorage access)
//     // NOTE: In a real app, localStorage is insecure. Tokens should be HTTP-Only cookies.
//     const productId = localStorage.getItem("addProductActive") || "MOCK_PRODUCT_ID_123";
//     const token = localStorage.getItem("userToken") || "MOCK_USER_TOKEN";
    
//     if (productId.includes("MOCK") || token.includes("MOCK")) {
//       console.warn("Using mock auth/product ID. Ensure real data is available in production.");
//     }

//     try {
//       // SECURITY: Use mockAxios which mimics real API behavior
//       const res = await mockAxios({
//         method: "PUT",
//         url: `/products/vendor/add-product-spec/${productId}`,
//         data: {
//           quantityType: selectedQualityType,
//           quantityUnit: selectedUnit,
//           quantity: quantityValue, 
//           totalStock: totalStockValue,
//           readyForPickUp: productData.isReadyForPickUp, 
//         },
//         headers: {
//           Authorization: `Bearer ${token}`,
//           'Content-Type': 'application/json' 
//         },
//       });

//       showToast("success", res.data.message);
//       setSection(3);
//     } catch (err: any) {
//       const errorMessage = err.response?.data?.message || err.message || "An unknown error occurred during API call (Mocked).";
//       console.error("API Error:", err);
//       showToast("error", errorMessage);
//     }
//   }, [selectedQualityType, selectedUnit, productData, setSection]);

//   // 14. PERFORMANCE: Optimized useEffect dependencies
//   useEffect(() => {
//     setCount(50);
//     handleBtnFunc(handleAPI);
//     return () => {
//       handleBtnFunc(async () => console.log("default handler cleaned up"));
//     };
//   }, [handleAPI, setCount, handleBtnFunc]); 

//   // Helper function for button class logic
//   const getButtonClass = (isActive: boolean) =>
//     `px-4 py-[6px] text-xs sm:text-sm rounded-2xl uppercase font-medium transition-colors duration-200 ${
//       isActive
//         ? "bg-[--foreground-green] text-white shadow-md ring-2 ring-[--foreground-green] ring-offset-2"
//         : "bg-[#EAF2FF] text-[--foreground-green] hover:bg-opacity-80"
//     }`;

//   return (
//     <div className="py-3">
//       <div className="py-5 w-full">

//         {/* Quantity Type Accordion */}
//         <Accordion
//           title="Quantity Type"
//           subTitle={selectedQualityType || "Select Product Type (e.g., WEIGHT)"}
//           state={a}
//           onClick={aFunc}
//           batch={9}
//           border={false}
//         >
//           <div className="flex gap-2 sm:gap-3 flex-wrap pt-2">
//             {QUALITY_TYPES.map((item) => (
//               <button
//                 key={item}
//                 className={getButtonClass(item === selectedQualityType)}
//                 onClick={() => handleQuantityType(item)}
//               >
//                 {item}
//               </button>
//             ))}
//           </div>
//         </Accordion>

//         {/* Quantity Unit Accordion (Only visible if a Type is selected) */}
//         {selectedQualityType && availableUnits.length > 0 && (
//           <Accordion
//             title="Quantity Unit"
//             subTitle={selectedUnit || "Select Specific Unit"}
//             state={b}
//             onClick={bFunc}
//             batch={9}
//             border={false}
//           >
//             <div className="flex gap-2 sm:gap-3 flex-wrap pt-2">
//               {availableUnits.map((item) => (
//                 <button
//                   key={item}
//                   className={getButtonClass(item === selectedUnit)}
//                   onClick={() => handleUnitSelect(item)}
//                 >
//                   {item}
//                 </button>
//               ))}
//             </div>
//           </Accordion>
//         )}

//         {/* Input for Minimum Unit Amount (Only visible if a Unit is selected) */}
//         {selectedUnit && (
//           <div className="pt-3">
//             <label htmlFor="quantity" className="sr-only">Minimum Unit Amount</label>
//             <input
//               type="number"
//               id="quantity"
//               name="quantity"
//               value={productData.quantity}
//               onChange={handleInputChange}
//               required
//               min={0.01}
//               step="0.01"
//               className="w-full px-4 py-3 rounded-xl outline-none bg-white border-[1px] border-[#C5C6CC] placeholder:text-[#8F9098] focus:border-[--foreground-green] focus:ring-1 focus:ring-[--foreground-green] transition-shadow"
//               placeholder={`Enter the minimum amount of ${selectedUnit} a customer can buy`}
//             />
//             <p className={`text-xs pt-2 text-[#8F9098] ${openSansFont}`}>
//               Minimum Order Unit Amount ({selectedUnit})
//             </p>
//           </div>
//         )}
        
//         {/* Input for Total Stock */}
//         <div className="pt-3">
//             <label htmlFor="totalStock" className="sr-only">Total in Stock</label>
//           <input
//             type="number"
//             id="totalStock"
//             name="totalStock"
//             onChange={handleInputChange}
//             value={productData.totalStock}
//             required
//             min={1}
//             step={1}
//             className="w-full px-4 py-3 rounded-xl outline-none bg-white border-[1px] border-[#C5C6CC] placeholder:text-[#8F9098] focus:border-[--foreground-green] focus:ring-1 focus:ring-[--foreground-green] transition-shadow"
//             placeholder="e.g. 100"
//           />
//           <p className={`text-xs pt-2 text-[#8F9098] ${openSansFont}`}>
//             Total in Stock (number of units)
//           </p>
//         </div>

//         {/* Ready For Pick Up Selector */}
//         <div className="pt-3">
//           <label htmlFor="isReadyForPickUp" className={`block text-sm font-medium text-gray-700 mb-2 ${openSansFont}`}>
//             Is this product ready for immediate shipment/pickup?
//           </label>
//           <select 
//             id="isReadyForPickUp"
//             name="isReadyForPickUp"
//             onChange={handleInputChange} 
//             value={productData.isReadyForPickUp ? 'true' : 'false'}
//             required
//             className="w-full px-4 py-3 rounded-xl outline-none bg-white border-[1px] border-[#C5C6CC] text-gray-800 focus:ring-1 focus:ring-[--foreground-green] focus:border-[--foreground-green] appearance-none cursor-pointer"
//           >
//             <option value={'true'}>Yes (Available Now)</option>
//             <option value={'false'}>No (Pre-order/Made-to-order)</option>
//           </select>

//         </div>

//       </div>
//     </div>
//   );
// };

// export default ProductSpec;
