// import { useEffect, useState, FC, useMemo, useCallback } from "react";
// // Use specific imports for smaller bundle size where possible.
// // Assuming axios and utilities are already optimized and secure.
// import axios from "@/utils/axios";
// import { showToast } from "@/utils/alert";
// import useToggle from "@/hooks/useToggle";
// import Accordion from "./Accordion";
// import openSansFont from "@/fonts/OpenSans";
// // Use specific import for smaller bundle size
// import { Icon } from "@iconify/react"; // Check if this is a lighter import path
// import general_type from "./general.types";
// import { handleApiError } from "@/utils/errors";
// import Circle from "@/components/Circle";

// const OPTIONS = {
//   sector: ["Health", "Hospitality", "Education", "Legal", "Logistics"],
//   productType: [
//     "Edible",
//     "Wears",
//     "Equipment",
//     "Stationaries",
//     "Automobiles",
//     "Gadgets",
//     "Books",
//     "Furniture",
//     "Cosmetics",
//     "Toys",
//     "Art",
//   ],
//     color: [
//     { name: "White", hex: "#FFFFFF", textColor: "#000000" },
//     { name: "Black", hex: "#000000", textColor: "#FFFFFF" },
//     { name: "Gray", hex: "#808080" },
//     { name: "Silver", hex: "#C0C0C0" },
//     { name: "Gold", hex: "#FFD700" },
//     { name: "Beige", hex: "#F5F5DC" },
//     { name: "Ivory", hex: "#FFFFF0" },
//     { name: "Brown", hex: "#A52A2A" },

//     // Red Shades
//     { name: "Red", hex: "#FF0000" },
//     { name: "Maroon", hex: "#800000" },
//     { name: "Crimson", hex: "#DC143C" },
//     { name: "Burgundy", hex: "#800020" },
//     { name: "Firebrick", hex: "#B22222" },
//     { name: "Scarlet", hex: "#FF2400" },
//     { name: "Coral", hex: "#FF7F50" },
//     { name: "Salmon", hex: "#FA8072" },

//     // Pink Shades
//     { name: "Pink", hex: "#FFC0CB" },
//     { name: "Hot Pink", hex: "#FF69B4" },
//     { name: "Light Pink", hex: "#FFB6C1" },
//     { name: "Fuchsia", hex: "#FF00FF" },
//     { name: "Magenta", hex: "#FF00FF" },
//     { name: "Rose", hex: "#FF007F" },
//     { name: "Blush", hex: "#DE5D83" },
//     { name: "Peach", hex: "#FFE5B4" },

//     // Orange Shades
//     { name: "Orange", hex: "#FFA500" },
//     { name: "Dark Orange", hex: "#FF8C00" },
//     { name: "Tomato", hex: "#FF6347" },
//     { name: "Tangerine", hex: "#F28500" },
//     { name: "Amber", hex: "#FFBF00" },
//     { name: "Apricot", hex: "#FBCEB1" },

//     // Yellow Shades
//     { name: "Yellow", hex: "#FFFF00" },
//     { name: "Light Yellow", hex: "#FFFFE0" },
//     { name: "Lemon", hex: "#FFF44F" },
//     { name: "Mustard", hex: "#FFDB58" },
//     { name: "Khaki", hex: "#C3B091" },
//     { name: "Cream", hex: "#FFFDD0" },

//     // Green Shades
//     { name: "Green", hex: "#008000" },
//     { name: "Light Green", hex: "#90EE90" },
//     { name: "Lime", hex: "#00FF00" },
//     { name: "Olive", hex: "#808000" },
//     { name: "Mint", hex: "#98FF98" },
//     { name: "Sea Green", hex: "#2E8B57" },
//     { name: "Forest Green", hex: "#228B22" },
//     { name: "Emerald", hex: "#50C878" },
//     { name: "Teal", hex: "#008080" },
//     { name: "Jade", hex: "#00A86B" },

//     // Blue Shades
//     { name: "Blue", hex: "#0000FF" },
//     { name: "Light Blue", hex: "#ADD8E6" },
//     { name: "Sky Blue", hex: "#87CEEB" },
//     { name: "Dodger Blue", hex: "#1E90FF" },
//     { name: "Royal Blue", hex: "#4169E1" },
//     { name: "Navy Blue", hex: "#000080" },
//     { name: "Cyan", hex: "#00FFFF" },
//     { name: "Turquoise", hex: "#40E0D0" },
//     { name: "Aqua", hex: "#00FFFF" },
//     { name: "Azure", hex: "#007FFF" },

//     // Purple / Violet Shades
//     { name: "Purple", hex: "#800080" },
//     { name: "Lavender", hex: "#E6E6FA" },
//     { name: "Violet", hex: "#8A2BE2" },
//     { name: "Indigo", hex: "#4B0082" },
//     { name: "Orchid", hex: "#DA70D6" },
//     { name: "Plum", hex: "#DDA0DD" },
//     { name: "Lilac", hex: "#C8A2C8" },
//     { name: "Amethyst", hex: "#9966CC" },

//     // Neutral & Metallics
//     { name: "Bronze", hex: "#CD7F32" },
//     { name: "Copper", hex: "#B87333" },
//     { name: "Charcoal", hex: "#36454F" },
//     { name: "Slate", hex: "#708090" },
//     { name: "Graphite", hex: "#383838" },
//     { name: "Pearl", hex: "#E2DFD2" },

//     // Earth & Natural Tones
//     { name: "Tan", hex: "#D2B48C" },
//     { name: "Sand", hex: "#C2B280" },
//     { name: "Chocolate", hex: "#7B3F00" },
//     { name: "Coffee", hex: "#6F4E37" },
//     { name: "Mocha", hex: "#967969" },
//     { name: "Rust", hex: "#B7410E" },
//     { name: "Terracotta", hex: "#E2725B" },
//     { name: "Olive Drab", hex: "#6B8E23" },

//     // Special / Neon / Pastel
//     {
//       name: "Rainbow",
//       hex: "linear-gradient(90deg, red, orange, yellow, green, blue, indigo, violet)",
//     },
//     {
//       name: "Multicolor",
//       hex: "linear-gradient(90deg, #FF0000, #00FF00, #0000FF)",
//     },
//     { name: "Neon Green", hex: "#39FF14" },
//     { name: "Neon Pink", hex: "#FF6EC7" },
//     { name: "Neon Blue", hex: "#1B03A3" },
//     { name: "Neon Orange", hex: "#FF6700" },
//     { name: "Pastel Pink", hex: "#FFD1DC" },
//     { name: "Pastel Blue", hex: "#AEC6CF" },
//     { name: "Pastel Yellow", hex: "#FFFACD" },
//     { name: "Pastel Green", hex: "#77DD77" },
//     { name: "Metallic Blue", hex: "#32527B" },
//     { name: "Rose Gold", hex: "#B76E79" },
//   ],
//   handlingType: ["Fragile", "Perishable"],
// } as const;
// function getTextColor(hex: string): string {
//   if (hex.startsWith("linear-gradient")) return "#FFFFFF"; // For gradients

//   // Convert HEX → RGB
//   const c = hex.replace("#", "");
//   const num = parseInt(c, 16);
//   const r = (num >> 16) & 0xff;
//   const g = (num >> 8) & 0xff;
//   const b = num & 0xff;

//   // Calculate brightness using W3C formula
//   const brightness = (r * 299 + g * 587 + b * 114) / 1000;

//   return brightness > 150 ? "#000000" : "#FFFFFF";
// }

// type SelectionItem = { item: string; state: boolean };

// const initializeState = (arr: readonly string[]): SelectionItem[] =>
//   arr.map((item) => ({ item, state: false }));

// const BusinessDescription: FC<general_type> = ({
//   handleBtnFunc,
//   setCount,
//   setSection,
// }) => {
//   const [isProductTypeOpen, toggleProductType] = useToggle(true);
//   const [isColorOpen, toggleColor] = useToggle(true);
//   const [loading, setLoading] = useState(false);
//   const [productName, setProductName] = useState("");
//   const [productDescription, setProductDescription] = useState("");
//   const [uploadCount, setUploadCount] = useState(75);
//   const [count, setCount2] = useState(25);

//   const [productTypeState, setProductTypeState] = useState(() =>
//     initializeState(OPTIONS.productType)
//   );
//   const [imageFiles, setImageFiles] = useState<File[]>([]);
//   const [imagePreviews, setImagePreviews] = useState<string[]>([]);
// type ColorItemT = {
//     name: string;
//     hex: string;
//     textColor?: string | undefined;
//   };
//   const [colorState, setColorState] = useState<
//       { item: ColorItemT; state: boolean }[]
//     >(
//       OPTIONS.color.map((color) => ({
//         item: { ...color, textColor: getTextColor(color.hex) },
//         state: false,
//       }))
//     );

//   const [handlingTypeState, setHandlingTypeState] = useState(() =>
//     initializeState(OPTIONS.handlingType)
//   );

// // const handleSelection = useCallback(
// //   (
// //     setState: React.Dispatch<React.SetStateAction<SelectionItem[]>>,
// //     selectedItem: string
// //   ) => {
// //     setState((prev) =>
// //       prev.map(({ item, state }) => {
// //         if (item === selectedItem) {
// //           // Toggle the state of the clicked item
// //           return { item, state: !state };
// //         } else {
// //           // Ensure all other items are deselected (single selection logic)
// //           return { item, state: false };
// //         }
// //       })
// //     );
// //   },
// //   []
// // );
// // const handleSelection = useCallback(
// //   (
// //     setState: React.Dispatch<React.SetStateAction<SelectionItem[]>>,
// //     selectedItem: string,
// //     multiSelect = false
// //   ) => {
// //     setState((prev) =>
// //       prev.map(({ item, state }) => {
// //         if (item === selectedItem) {
// //           return { item, state: !state }; // Toggle clicked item
// //         }
// //         return multiSelect ? { item, state } : { item, state: false };
// //       })
// //     );
// //   },
// //   []
// // );
// function handleSelection<T>(
//     state: { item: T; state: boolean }[],
//     setState: React.Dispatch<
//       React.SetStateAction<{ item: T; state: boolean }[]>
//     >,
//     selectedItem: T
//   ) {
//     setState((prev) =>
//       prev.map(({ item, state }) => {
//         let isMatch = false;
//         if (typeof item === "string" && typeof selectedItem === "string") {
//           isMatch = item === selectedItem;
//         } else if (
//           typeof item === "object" &&
//           item !== null &&
//           "name" in item &&
//           typeof selectedItem === "object" &&
//           selectedItem !== null &&
//           "name" in selectedItem
//         ) {
//           isMatch =
//             (item as { name: string }).name ===
//             (selectedItem as { name: string }).name;
//         }
//         return { item, state: isMatch ? !state : state };
//       })
//     );
//   }
//   const handleFileChange = useCallback(
//     (e: React.ChangeEvent<HTMLInputElement>) => {
//       const files = e.target.files ? Array.from(e.target.files) : [];
//       if (!files.length) return;

//       const MAX_FILES = 5;
//       const MAX_SIZE_MB = 5;

//       if (files.length + imageFiles.length > MAX_FILES) {
//         showToast("error", `You can upload a maximum of ${MAX_FILES} images.`);
//         return;
//       }

//       for (const file of files) {
//         if (file.size > MAX_SIZE_MB * 1024 * 1024) {
//           showToast("error", `Image ${file.name} is too large. Max is ${MAX_SIZE_MB}MB.`);
//           return;
//         }
//       }

//       setImageFiles((prev) => [...prev, ...files]);

//       imagePreviews.forEach((url) => URL.revokeObjectURL(url));

//       const newPreviews = files.map((file) => URL.createObjectURL(file));
//       setImagePreviews(newPreviews);
      
//       e.target.value = '';
//     },
//     [imageFiles, imagePreviews]
//   );
  
//   const handleAPI = useCallback(async () => {
//     if (!productName.trim() || !productDescription.trim()) {
//       showToast("error", "Product Name and Description are required.");
//       return;
//     }
    
//     if (productName.length > 100 || productDescription.length > 500) {
//         showToast("error", "Input is too long.");
//         return;
//     }

//     setLoading(true);
    
//     const userToken = localStorage.getItem("userToken");
//     if (!userToken) {
//       showToast("error", "User session expired. Please log in again.");
//       setLoading(false);
//       return;
//     }

//     const selectedProductTypes = productTypeState
//       .filter(({ state }) => state)
//       .map(({ item }) => item);
//     const selectedColors = colorState
//       .filter(({ state }) => state)
//       .map(({ item }) => item);
//     const selectedHandlingTypes = handlingTypeState
//       .filter(({ state }) => state)
//       .map(({ item }) => item);

//     if (!selectedProductTypes.length || !selectedColors.length) {
//       showToast("error", "Please select at least one product type and color.");
//       setLoading(false);
//       return;
//     }

//     if (!imageFiles.length) {
//       showToast("error", "Please select at least one image.");
//       setLoading(false);
//       return;
//     }

//     const formData = new FormData();
//     formData.append("productName", productName.trim());
//     formData.append("description", productDescription.trim());

//     selectedProductTypes.forEach((type) => {
//         formData.append("category[]", type);
//     });
//     selectedColors.forEach((color) => {
//         formData.append("color[]", color);
//     });
    
//     selectedHandlingTypes.forEach((handling) => {
//       formData.append("specialHandling[]", handling);
//     });
    
//     // Security: Validate businessId presence
//     const businessId = localStorage.getItem("activeBusiness");
//     if (!businessId) {
//         showToast("error", "Business context not found. Cannot proceed.");
//         setLoading(false);
//         return;
//     }
//     formData.append("businessId", businessId);

//     // Append all images
//     imageFiles.forEach((file) => {
//       formData.append("images", file, file.name); // Supply filename for better server processing
//     });

//     try {
//       // --- Security Optimization: Ensure 'Authorization' header is used for security ---
//       const response = await axios.post("/products/vendor/create", formData, {
//         headers: {
//           Authorization: `Bearer ${userToken}`,
//         },
//       });

//       localStorage.setItem("addProductActive", response.data.productId);
//       showToast("success", response.data.message);
//       setSection(2);
//     } catch (error) {
//       const errorMessage = handleApiError(error, "An error occurred during product creation");
//       showToast("error", errorMessage);
//     } finally {
//         setLoading(false);
//     }
//   }, [
//     productName,
//     productDescription,
//     productTypeState,
//     colorState,
//     handlingTypeState,
//     imageFiles,
//     setSection,
//   ]);
  
//   useEffect(() => {
//     return () => {
//       imagePreviews.forEach((url) => URL.revokeObjectURL(url));
//     };
//   }, [imagePreviews]); 
//   useEffect(() => {
//     setCount(25);
//     handleBtnFunc(handleAPI);
//     return () => handleBtnFunc(() => console.log("default/cleanup"));
//       // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   const selectedCount = useMemo(() => {
//     const productTypeCount = productTypeState.filter(({ state }) => state).length;
//     const colorCount = colorState.filter(({ state }) => state).length;
//     return { productTypeCount, colorCount };
//   }, [productTypeState, colorState]);

//   const [displayCircle, setDisplayCircle] = useState(true);

//   return (
//     <div className="py-3 pb-5">
//       <form onSubmit={(e) => {
//     e.preventDefault();
//     handleAPI();
//   }}>
//       <div className="bg-[#F8F9FE] p-4 rounded-lg my-[2rem]">
//         <div className="bg-[#FFFFFF] p-4 flex gap-2 justify-center flex-wrap">
//           {imagePreviews.length > 0 ? (
//             imagePreviews.map((preview, index) => (
//               <img
//                 key={preview} 
//                 src={preview}
//                 alt={`Product Preview ${index + 1}`}
//                 className="w-24 h-24 object-cover rounded-lg"
//                 loading="lazy"
//               />
//             ))
//           ) : (
//             <div className="-rotate-90 py-4">
//               <Circle count={uploadCount}>
//                 <Icon
//                   icon="ri:arrow-right-line"
//                   className="text-[#006838]"
//                   width="32"
//                   height="32"
//                 />
//               </Circle>
//             </div>
//           )}
//         </div>
//         <div className="pb-3 mt-2 flex items-center justify-center">
//           <input
//             type="file"
//             id="file"
//             onChange={handleFileChange}
//             accept=".jpg,.jpeg,.png"
//             multiple
//             className="w-full px-4 py-2 rounded-xl outline-none placeholder:text-[#8F9098] text-[12px] hidden"
//             placeholder="Upload Image"
//           />
//           <label
//             htmlFor="file"
//             className="w-full text-[12px] px-4 py-3 rounded-xl bg-[#EAF2FF] flex items-center justify-center cursor-pointer"
//           >
//             {imageFiles.length > 0
//                 ? `${imageFiles.length} Image(s) Selected`
//                 : "Upload Images"}
//           </label>
//         </div>
//       </div>

//       <div className="pb-3">
//         <input
//           type="text"
//           id="productName"
//           value={productName}
//           onChange={(e) => setProductName(e.target.value)}
//           required
//           maxLength={100} 
//           className="w-full px-4 py-3 rounded-xl outline-none bg-inherit border-[0.67px] border-[#C5C6CC] placeholder:text-[#8F9098]"
//           placeholder="Product Name"
//         />
//       </div>

//       <div className="pb-3">
//         <textarea
//           id="productDescription"
//           value={productDescription}
//           onChange={(e) => setProductDescription(e.target.value)}
//           required
//           maxLength={500} 
//           minLength={50}
//           className="w-full px-4 py-3 rounded-xl outline-none bg-inherit border-[0.67px] border-[#C5C6CC] placeholder:text-[#8F9098]"
//           placeholder="Description"
//           rows={4}
//         ></textarea>
//       </div>

//       <Accordion
//         title="Product Type"
//         subTitle={`Select at least 1 (${selectedCount.productTypeCount} selected)`}
//         onClick={toggleProductType}
//         state={isProductTypeOpen}
//       >
//         <div className="flex gap-2 flex-wrap">
//           {productTypeState.map(({ item, state }) => (
//             <button
//               key={item}
//               type='button'
//               className={`px-4 py-[6px] text-3 rounded-2xl ${
//                 state
//                   ? "bg-[--foreground-green] text-white"
//                   : "bg-[#EAF2FF] text-[--foreground-green]"
//               }`}
//               onClick={() =>
//                 handleSelection(setProductTypeState, item)
//               }
//             >
//               {item}
//             </button>
//           ))}
//         </div>
//       </Accordion>

//       <Accordion
//         title="Color"
//         subTitle={`Select at least 1 (${selectedCount.colorCount} selected)`}
//         onClick={toggleColor}
//         state={isColorOpen}
//       >
//         <div className="flex gap-3 flex-wrap">
//           {/* {colorState.map(({ item, state }) => (
//             <button
//               key={item}
//               type="button"
//               className={`px-4 py-[6px] text-3 rounded-2xl ${
//                 state
//                   ? "bg-[--foreground-green] text-white"
//                   : "bg-[#EAF2FF] text-[--foreground-green]"
//               }`}
//               onClick={() => handleSelection(setColorState, item, true)}
//             >
//               {item}
//             </button>
//           ))} */}
//           {colorState.map(({ item, state }) => (
//               <button
//                 key={item.name}
//                 className={`px-4 py-[6px] text-sm rounded-2xl border transition duration-150 ${
//                   state ? "border-[--foreground-green]" : "border-gray-300"
//                 }`}
//                 onClick={() => handleSelection(colorState, setColorState, item)}
//                 style={{
//                   background: state ? item.hex : "transparent",
//                   color: state ? item.textColor : "#333",
//                 }}
//               >
//                 {item.name}
//               </button>
//             ))}
//         </div>
//       </Accordion>

//       <div className="border-[0.5px] border-[#D4D6DD] rounded-2xl p-4 mt-3">
//         <h1 className="flex gap-2 items-center pb-6">
//           <span className="flex items-center justify-center rounded-full w-4 h-4 bg-[--foreground-green]">
//             <span className="flex items-center justify-center rounded-full bg-white h-[5px] w-[5px]"></span>
//           </span>
//           <span className={`text-[#71727A] text-sm font-bold ${openSansFont}`}>
//             Special Handling
//           </span>
//         </h1>

//         <div className="flex flex-col gap-3 py-3">
//           {handlingTypeState.map(({ item, state }) => (
//             <div
//               key={item}
//               className={`p-4 py-3 flex justify-between rounded-[12px] transition-all duration-300 border-[0.5px] cursor-pointer ${
//                 state
//                   ? "bg-[#EAF2FF] border-transparent"
//                   : "bg-[#ffffff] border-[#C5C6CC]"
//               }`}
//               onClick={() =>
//                 handleSelection(setHandlingTypeState, item)
//               }
//             >
//               <p className="text-[14px] text-[#1F2024]">{item}</p>
//               <Icon
//                 icon="ph:check-bold"
//                 className={`text-[#006838] text-[14px] transition-all duration-300 ${
//                   state ? "opacity-100" : "opacity-0"
//                 }`}
//               />
//             </div>
//           ))}
//         </div>
//       </div>
//       {loading && (
//         <div className="text-center mt-4 text-[--foreground-green]">
//           Processing... Please wait.
//         </div>
//       )}
//             <div className="flex items-center justify-center pt-3 pb-40 gap-6 w-full">
//         <button
//           type="submit"
//           className="rounded-[12px] py-5 px-4 text-base font-semibold leading-[14.52px] text-center block w-full bg-[--foreground-green] text-white scale-100 hover:scale-90 transition-all duration-500"
//         >
//           {"NEXT"}
//         </button>
//         <div>
//           {displayCircle ? (
//             <Circle count={count} size={48}>
//               <Icon
//                 icon="akar-icons:arrow-right"
//                 className="text-xl text-[--foreground-green] font-extrabold"
//               ></Icon>
//             </Circle>
//           ) : (
//             ""
//           )}
//         </div>
//       </div>
//       </form>
//     </div>
//   );
// };

// export default BusinessDescription;
"use client";

import { useEffect, useState, FC, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import axios from "@/utils/axios";
import { showToast } from "@/utils/alert";
import useToggle from "@/hooks/useToggle";
import Accordion from "./Accordion";
import openSansFont from "@/fonts/OpenSans";
import { Icon } from "@iconify/react/dist/iconify.js";
import general_type from "./general.types";
import { handleApiError } from "@/utils/errors";
import Circle from "@/components/Circle";
import { desc, form } from "framer-motion/client";

const OPTIONS = {
  sector: ["Health", "Hospitality", "Education", "Legal", "Logistics"],
  productType: [
    "Edible",
    "Wears",
    "Equipment",
    "Stationaries",
    "Automobiles",
    "Gadgets",
    "Books",
    "Furniture",
    "Cosmetics",
    "Toys",
    "Art",
  ],
  color: [
    { name: "White", hex: "#FFFFFF", textColor: "#000000" },
    { name: "Black", hex: "#000000", textColor: "#FFFFFF" },
    { name: "Gray", hex: "#808080" },
    { name: "Silver", hex: "#C0C0C0" },
    { name: "Gold", hex: "#FFD700" },
    { name: "Beige", hex: "#F5F5DC" },
    { name: "Ivory", hex: "#FFFFF0" },
    { name: "Brown", hex: "#A52A2A" },

    // Red Shades
    { name: "Red", hex: "#FF0000" },
    { name: "Maroon", hex: "#800000" },
    { name: "Crimson", hex: "#DC143C" },
    { name: "Burgundy", hex: "#800020" },
    { name: "Firebrick", hex: "#B22222" },
    { name: "Scarlet", hex: "#FF2400" },
    { name: "Coral", hex: "#FF7F50" },
    { name: "Salmon", hex: "#FA8072" },

    // Pink Shades
    { name: "Pink", hex: "#FFC0CB" },
    { name: "Hot Pink", hex: "#FF69B4" },
    { name: "Light Pink", hex: "#FFB6C1" },
    { name: "Fuchsia", hex: "#FF00FF" },
    { name: "Magenta", hex: "#FF00FF" },
    { name: "Rose", hex: "#FF007F" },
    { name: "Blush", hex: "#DE5D83" },
    { name: "Peach", hex: "#FFE5B4" },

    // Orange Shades
    { name: "Orange", hex: "#FFA500" },
    { name: "Dark Orange", hex: "#FF8C00" },
    { name: "Tomato", hex: "#FF6347" },
    { name: "Tangerine", hex: "#F28500" },
    { name: "Amber", hex: "#FFBF00" },
    { name: "Apricot", hex: "#FBCEB1" },

    // Yellow Shades
    { name: "Yellow", hex: "#FFFF00" },
    { name: "Light Yellow", hex: "#FFFFE0" },
    { name: "Lemon", hex: "#FFF44F" },
    { name: "Mustard", hex: "#FFDB58" },
    { name: "Khaki", hex: "#C3B091" },
    { name: "Cream", hex: "#FFFDD0" },

    // Green Shades
    { name: "Green", hex: "#008000" },
    { name: "Light Green", hex: "#90EE90" },
    { name: "Lime", hex: "#00FF00" },
    { name: "Olive", hex: "#808000" },
    { name: "Mint", hex: "#98FF98" },
    { name: "Sea Green", hex: "#2E8B57" },
    { name: "Forest Green", hex: "#228B22" },
    { name: "Emerald", hex: "#50C878" },
    { name: "Teal", hex: "#008080" },
    { name: "Jade", hex: "#00A86B" },

    // Blue Shades
    { name: "Blue", hex: "#0000FF" },
    { name: "Light Blue", hex: "#ADD8E6" },
    { name: "Sky Blue", hex: "#87CEEB" },
    { name: "Dodger Blue", hex: "#1E90FF" },
    { name: "Royal Blue", hex: "#4169E1" },
    { name: "Navy Blue", hex: "#000080" },
    { name: "Cyan", hex: "#00FFFF" },
    { name: "Turquoise", hex: "#40E0D0" },
    { name: "Aqua", hex: "#00FFFF" },
    { name: "Azure", hex: "#007FFF" },

    // Purple / Violet Shades
    { name: "Purple", hex: "#800080" },
    { name: "Lavender", hex: "#E6E6FA" },
    { name: "Violet", hex: "#8A2BE2" },
    { name: "Indigo", hex: "#4B0082" },
    { name: "Orchid", hex: "#DA70D6" },
    { name: "Plum", hex: "#DDA0DD" },
    { name: "Lilac", hex: "#C8A2C8" },
    { name: "Amethyst", hex: "#9966CC" },

    // Neutral & Metallics
    { name: "Bronze", hex: "#CD7F32" },
    { name: "Copper", hex: "#B87333" },
    { name: "Charcoal", hex: "#36454F" },
    { name: "Slate", hex: "#708090" },
    { name: "Graphite", hex: "#383838" },
    { name: "Pearl", hex: "#E2DFD2" },

    // Earth & Natural Tones
    { name: "Tan", hex: "#D2B48C" },
    { name: "Sand", hex: "#C2B280" },
    { name: "Chocolate", hex: "#7B3F00" },
    { name: "Coffee", hex: "#6F4E37" },
    { name: "Mocha", hex: "#967969" },
    { name: "Rust", hex: "#B7410E" },
    { name: "Terracotta", hex: "#E2725B" },
    { name: "Olive Drab", hex: "#6B8E23" },

    // Special / Neon / Pastel
    {
      name: "Rainbow",
      hex: "linear-gradient(90deg, red, orange, yellow, green, blue, indigo, violet)",
    },
    {
      name: "Multicolor",
      hex: "linear-gradient(90deg, #FF0000, #00FF00, #0000FF)",
    },
    { name: "Neon Green", hex: "#39FF14" },
    { name: "Neon Pink", hex: "#FF6EC7" },
    { name: "Neon Blue", hex: "#1B03A3" },
    { name: "Neon Orange", hex: "#FF6700" },
    { name: "Pastel Pink", hex: "#FFD1DC" },
    { name: "Pastel Blue", hex: "#AEC6CF" },
    { name: "Pastel Yellow", hex: "#FFFACD" },
    { name: "Pastel Green", hex: "#77DD77" },
    { name: "Metallic Blue", hex: "#32527B" },
    { name: "Rose Gold", hex: "#B76E79" },
  ],

  handlingType: ["Fragile", "Perishable"],
};
function getTextColor(hex: string): string {
  if (hex.startsWith("linear-gradient")) return "#FFFFFF"; // For gradients

  // Convert HEX → RGB
  const c = hex.replace("#", "");
  const num = parseInt(c, 16);
  const r = (num >> 16) & 0xff;
  const g = (num >> 8) & 0xff;
  const b = num & 0xff;

  // Calculate brightness using W3C formula
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;

  return brightness > 150 ? "#000000" : "#FFFFFF";
}

const BusinessDescription: FC<general_type> = ({
  // handleBtnFunc,
  setCount,
  setSection,
}) => {
  const searchParams = useSearchParams();
  const productId = searchParams.get("id");

  const [isProductTypeOpen, toggleProductType] = useToggle(true);
  const [isColorOpen, toggleColor] = useToggle(true);
  const [loading, setLoading] = useState(false);
  const [displayCircle, setDisplayCircle] = useState(true);

  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");

  const [uploadCount, setuploadCount] = useState(75);
  const [count, setCount2] = useState(25);

  const [productTypeState, setProductTypeState] = useState(
    OPTIONS.productType.map((item) => ({ item, state: false }))
  );

  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);

  type ColorItemT = {
    name: string;
    hex: string;
    textColor?: string | undefined;
  };

  const [colorState, setColorState] = useState<
    { item: ColorItemT; state: boolean }[]
  >(
    OPTIONS.color.map((color) => ({
      item: { ...color, textColor: getTextColor(color.hex) },
      state: false,
    }))
  );
  const [handlingTypeState, setHandlingTypeState] = useState(
    OPTIONS.handlingType.map((item) => ({ item, state: false }))
  );

  function handleSelection<T>(
    state: { item: T; state: boolean }[],
    setState: React.Dispatch<
      React.SetStateAction<{ item: T; state: boolean }[]>
    >,
    selectedItem: T
  ) {
    setState((prev) =>
      prev.map(({ item, state }) => {
        let isMatch = false;
        if (typeof item === "string" && typeof selectedItem === "string") {
          isMatch = item === selectedItem;
        } else if (
          typeof item === "object" &&
          item !== null &&
          "name" in item &&
          typeof selectedItem === "object" &&
          selectedItem !== null &&
          "name" in selectedItem
        ) {
          isMatch =
            (item as { name: string }).name ===
            (selectedItem as { name: string }).name;
        }
        return { item, state: isMatch ? !state : state };
      })
    );
  }
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files ? Array.from(e.target.files) : [];
    if (!files.length) return;

    setImageFiles(files);
    imagePreviews.forEach((url) => URL.revokeObjectURL(url));
    const previews = files.map((file) => URL.createObjectURL(file));
    setImagePreviews(previews);
  };

  const handleAPI = async () => {
    const userToken = localStorage.getItem("userToken");
    if (!userToken) {
      showToast("error", "User token not found");
      return;
    }

    const selectedProductTypes = productTypeState
      .filter(({ state }) => state)
      .map(({ item }) => item);
    const selectedColors = colorState
      .filter(({ state }) => state)
      .map(({ item }) => item);
    const selectedHandlingTypes = handlingTypeState
      .filter(({ state }) => state)
      .map(({ item }) => item);

    if (!selectedProductTypes.length || !selectedColors.length) {
      showToast("error", "Please select both product types and colors");
      return;
    }
    
    const formData = new FormData();
    formData.append("productName", productName);
    formData.append("description", productDescription);
    formData.append("category", JSON.stringify(selectedProductTypes));
    // selectedColors.forEach((color) =>
    //   formData.append("color[]", JSON.stringify(color))
    // );
    formData.append("color", JSON.stringify(selectedColors));
    selectedHandlingTypes.forEach((handling) =>
      formData.append("specialHandling[]", handling)
    );
    formData.append("businessId", localStorage.getItem("activeBusiness") || "");

    imageFiles.forEach((file) => {
      formData.append("images", file); // must match backend multer field
    });
    console.log("selectedColors", selectedColors);
    setLoading(true);
    try {
      const url = productId
        ? `/products/vendor/${productId}`
        : "/products/vendor/create";
      const method = productId ? "put" : "post";

      const response = await axios({
        method,
        url,
        data: formData,
        headers: {
          Authorization: `Bearer ${userToken}`,
          "Content-Type": "multipart/form-data",
        },
      });

      if (!productId) {
        localStorage.setItem("addProductActive", response.data.productId);
      }

      showToast("success", 'Product information saved successfully');
      setLoading(false);
      setSection(2);
    } catch (error) {
      console.error(error);
      const errorMessage = handleApiError(error, "An error occurred");
      showToast("error", errorMessage);
    }
  };

  // Fetch product if editing
  useEffect(() => {
    const fetchProduct = async () => {
      if (!productId) return;
      const token = localStorage.getItem("userToken");

      try {
        const res = await axios.get(`/products/vendor/${productId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log("Fetched product data:", res.data);
        const product = res.data;

        setProductName(product.name || "");
        setProductDescription(product.description || "");

        // setProductTypeState((prev) =>
        //   prev.map(({ item }) => ({
        //     item,
        //     state: product.category?.includes(item) || false,
        //   }))
        // );

        // setColorState((prev) =>
        //   prev.map(({ item }) => ({
        //     item,
        //     state: product.color?.includes(item) || false,
        //   }))
        // );
setProductTypeState((prev) =>
  prev.map(({ item }) => {
    let categoryArray = [];

    // Parse category safely (in case it's stringified)
    if (Array.isArray(product.category)) {
      try {
        const first = product.category[0];
        if (typeof first === "string" && first.startsWith("[")) {
          categoryArray = JSON.parse(first);
        } else {
          categoryArray = product.category;
        }
      } catch (err) {
        categoryArray = [];
      }
    }

    return {
      item,
      state: categoryArray.includes(item),
    };
  })
);

setColorState((prev) =>
  prev.map(({ item }) => ({
    item,
    state:
      product.color?.some(
        (color: any) =>
          color.name.toLowerCase() === item.name.toLowerCase()
      ) || false,
  }))
);

        setHandlingTypeState((prev) =>
          prev.map(({ item }) => ({
            item,
            state: product.specialHandling?.includes(item) || false,
          }))
        );

        if (product.images?.length) {
          setImagePreviews(product.images); // backend URLs
        }
      } catch (err) {
        console.error("Error fetching product:", err);
        showToast("error", "Failed to load product details");
      }
    };

    fetchProduct();
  }, [productId]);

  // useEffect(() => {
  //   setCount(25);
  //   handleBtnFunc(handleAPI);
  //   return () => handleBtnFunc(() => console.log("default/cleanup"));
  //     // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <form onSubmit={(e) => {
    e.preventDefault();
    handleAPI();
  }} className="py-3 pb-5">
        <div className="bg-[#F8F9FE] p-4 rounded-lg my-[2rem]">
          <div className="bg-[#FFFFFF] p-4 flex justify-center">
            {imagePreviews.length > 0 ? (
              imagePreviews.map((preview, index) => (
                <img
                  key={index}
                  src={preview}
                  alt="Preview"
                  className="w-24 h-24 object-cover rounded-lg"
                />
              ))
            ) : (
              <div className="-rotate-90 py-4">
                <Circle count={uploadCount}>
                  <Icon
                    icon="ri:arrow-right-line"
                    className="text-[#006838]"
                    width="32"
                    height="32"
                  />
                </Circle>
              </div>
            )}
          </div>

          <div className="pb-3 mt-2 flex items-center justify-center">
            <input
              type="file"
              id="file"
              onChange={handleFileChange}
              accept="image/*"
              multiple
              className="w-full px-4 py-2 rounded-xl outline-none placeholder:text-[#8F9098] text-[12px] hidden"
            />
            <label
              htmlFor="file"
              className="w-full text-[12px] px-4 py-3 rounded-xl bg-[#EAF2FF] flex items-center justify-center cursor-pointer"
            >
              Upload Images
            </label>
          </div>
        </div>

        <div className="pb-3">
          <input
            type="text"
            id="productName"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            required
            className="w-full px-4 py-3 rounded-xl outline-none bg-inherit border-[0.67px] border-[#C5C6CC] placeholder:text-[#8F9098]"
            placeholder="Product Name"
          />
        </div>

        <div className="pb-3">
          <textarea
            id="productDescription"
            value={productDescription}
            onChange={(e) => setProductDescription(e.target.value)}
            required
            className="w-full px-4 py-3 rounded-xl outline-none bg-inherit border-[0.67px] border-[#C5C6CC] placeholder:text-[#8F9098]"
            placeholder="Description"
            rows={4}
          ></textarea>
        </div>

        <Accordion
          title="Product Type"
          subTitle="Select at least 1"
          onClick={toggleProductType}
          state={isProductTypeOpen}
        >
          <div className="flex gap-2 flex-wrap">
            {productTypeState.map(({ item, state }) => (
              <button
                type="button"
                key={item}
                className={`px-4 py-[6px] text-3 rounded-2xl ${
                  state
                    ? "bg-[--foreground-green] text-white"
                    : "bg-[#EAF2FF] text-[--foreground-green]"
                }`}
                onClick={() =>
                  handleSelection(productTypeState, setProductTypeState, item)
                }
              >
                {item}
              </button>
            ))}
          </div>
        </Accordion>

        <Accordion
          title="Color"
          subTitle="Select at least 1"
          onClick={toggleColor}
          state={isColorOpen}
        >
          <div className="flex flex-wrap gap-2">
            {colorState.map(({ item, state }) => (
              <button
                key={item.name}
                type="button"
                className={`px-4 py-[6px] text-sm rounded-2xl border transition duration-150 ${
                  state ? "border-[--foreground-green]" : "border-gray-300"
                }`}
                onClick={() => handleSelection(colorState, setColorState, item)}
                style={{
                  background: state ? item.hex : "transparent",
                  color: state ? item.textColor : "#333",
                }}
              >
                {item.name}
              </button>
            ))}
          </div>
        </Accordion>

        <div className="border-[0.5px] border-[#D4D6DD] rounded-2xl p-4 mt-3">
          <h1 className="flex gap-2 items-center pb-6">
            <span className="flex items-center justify-center rounded-full w-4 h-4 bg-[--foreground-green]">
              <span className="flex items-center justify-center rounded-full bg-white h-[5px] w-[5px]"></span>
            </span>
            <span
              className={`text-[#71727A] text-sm font-bold ${openSansFont}`}
            >
              Special Handling
            </span>
          </h1>

          <div className="flex flex-col gap-3 py-3">
            {handlingTypeState.map(({ item, state }) => (
              <div
                key={item}
                className={`p-4 py-3 flex justify-between rounded-[12px] transition-all duration-300 border-[0.5px] ${
                  state
                    ? "bg-[#EAF2FF] border-transparent"
                    : "bg-[#ffffff] border-[#C5C6CC]"
                }`}
                onClick={() =>
                  handleSelection(handlingTypeState, setHandlingTypeState, item)
                }
              >
                <p className="text-[14px] text-[#1F2024]">{item}</p>
                <Icon
                  icon="ph:check-bold"
                  className={`text-[#006838] text-[14px] transition-all duration-300 ${
                    state ? "opacity-100" : "opacity-0"
                  }`}
                />
              </div>
            ))}
          </div>
        </div>
      {loading && (
        <div className="text-center mt-4 text-[--foreground-green]">
          Processing... Please wait.
        </div>
      )}
            <div className="flex items-center justify-center pt-3 pb-40 gap-6 w-full">
        <button
          type="submit"
          className="rounded-[12px] py-5 px-4 text-base font-semibold leading-[14.52px] text-center block w-full bg-[--foreground-green] text-white scale-100 hover:scale-90 transition-all duration-500"
        >
          {"NEXT"}
        </button>
        <div>
          {displayCircle ? (
            <Circle count={count} size={48}>
              <Icon
                icon="akar-icons:arrow-right"
                className="text-xl text-[--foreground-green] font-extrabold"
              ></Icon>
            </Circle>
          ) : (
            ""
          )}
        </div>
      </div>
      </form>
    </Suspense>
  );
};

export default BusinessDescription;
