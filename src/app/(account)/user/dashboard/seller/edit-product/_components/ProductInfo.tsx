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
  const [countState, setCount2] = useState(25); 

  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [displayCircle, setDisplayCircle] = useState(true);

  const [uploadCount, setuploadCount] = useState(75);

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

      showToast("success", "Product information saved successfully");
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
        setProductTypeState((prev) =>
          prev.map(({ item }) => {
            let categoryArray = [];
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
              product.color?.some((color: any) => {
                if (!color || typeof color.name !== "string") {
                  return false;
                }

                const apiColorName = color.name.trim().toLowerCase();
                const localColorName = item.name.trim().toLowerCase();

                return apiColorName === localColorName;
              }) || false,
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
  //   // handleBtnFunc(handleAPI);
  //   return () => handleBtnFunc(() => console.log("default"));
  // }, [productTypeState, colorState, handlingTypeState]);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleAPI();
        }}
        className="space-y-4"
      >
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
                key={item}
                type="button"
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
        <div className="flex items-center justify-center pt-3 pb-40 gap-6 w-full">
                  <button
                    type="submit"
                    className="rounded-[12px] py-5 px-4 text-base font-semibold leading-[14.52px] text-center block w-full bg-[--foreground-green] text-white scale-100 hover:scale-90 transition-all duration-500"
                  >
                    {"NEXT"}
                  </button>
                  <div>
                    {displayCircle ? (
                      <Circle count={countState} size={48}>
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
