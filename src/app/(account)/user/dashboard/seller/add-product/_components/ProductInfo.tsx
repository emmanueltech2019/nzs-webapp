import { useEffect, useState, FC, useMemo, useCallback } from "react";
// Use specific imports for smaller bundle size where possible.
// Assuming axios and utilities are already optimized and secure.
import axios from "@/utils/axios";
import { showToast } from "@/utils/alert";
import useToggle from "@/hooks/useToggle";
import Accordion from "./Accordion";
import openSansFont from "@/fonts/OpenSans";
// Use specific import for smaller bundle size
import { Icon } from "@iconify/react"; // Check if this is a lighter import path
import general_type from "./general.types";
import { handleApiError } from "@/utils/errors";
import Circle from "@/components/Circle";

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
    "WHITE",
    "BLACK",
    "GRAY",
    "YELLOW",
    "BLUE",
    "PURPLE",
    "GREEN",
    "RED",
    "PINK",
    "ORANGE",
    "GOLD",
    "SILVER",
  ],
  handlingType: ["Fragile", "Perishable"],
} as const;

type SelectionItem = { item: string; state: boolean };

const initializeState = (arr: readonly string[]): SelectionItem[] =>
  arr.map((item) => ({ item, state: false }));

const BusinessDescription: FC<general_type> = ({
  handleBtnFunc,
  setCount,
  setSection,
}) => {
  const [isProductTypeOpen, toggleProductType] = useToggle(true);
  const [isColorOpen, toggleColor] = useToggle(true);
  const [loading, setLoading] = useState(false);
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [uploadCount, setUploadCount] = useState(75);

  const [productTypeState, setProductTypeState] = useState(() =>
    initializeState(OPTIONS.productType)
  );
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);

  const [colorState, setColorState] = useState(() =>
    initializeState(OPTIONS.color)
  );

  const [handlingTypeState, setHandlingTypeState] = useState(() =>
    initializeState(OPTIONS.handlingType)
  );

// const handleSelection = useCallback(
//   (
//     setState: React.Dispatch<React.SetStateAction<SelectionItem[]>>,
//     selectedItem: string
//   ) => {
//     setState((prev) =>
//       prev.map(({ item, state }) => {
//         if (item === selectedItem) {
//           // Toggle the state of the clicked item
//           return { item, state: !state };
//         } else {
//           // Ensure all other items are deselected (single selection logic)
//           return { item, state: false };
//         }
//       })
//     );
//   },
//   []
// );
const handleSelection = useCallback(
  (
    setState: React.Dispatch<React.SetStateAction<SelectionItem[]>>,
    selectedItem: string,
    multiSelect = false
  ) => {
    setState((prev) =>
      prev.map(({ item, state }) => {
        if (item === selectedItem) {
          return { item, state: !state }; // Toggle clicked item
        }
        return multiSelect ? { item, state } : { item, state: false };
      })
    );
  },
  []
);
  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files ? Array.from(e.target.files) : [];
      if (!files.length) return;

      const MAX_FILES = 5;
      const MAX_SIZE_MB = 5;

      if (files.length + imageFiles.length > MAX_FILES) {
        showToast("error", `You can upload a maximum of ${MAX_FILES} images.`);
        return;
      }

      for (const file of files) {
        if (file.size > MAX_SIZE_MB * 1024 * 1024) {
          showToast("error", `Image ${file.name} is too large. Max is ${MAX_SIZE_MB}MB.`);
          return;
        }
      }

      setImageFiles((prev) => [...prev, ...files]);

      imagePreviews.forEach((url) => URL.revokeObjectURL(url));

      const newPreviews = files.map((file) => URL.createObjectURL(file));
      setImagePreviews(newPreviews);
      
      e.target.value = '';
    },
    [imageFiles, imagePreviews]
  );
  
  const handleAPI = useCallback(async () => {
    if (!productName.trim() || !productDescription.trim()) {
      showToast("error", "Product Name and Description are required.");
      return;
    }
    
    if (productName.length > 100 || productDescription.length > 500) {
        showToast("error", "Input is too long.");
        return;
    }

    setLoading(true);
    
    const userToken = localStorage.getItem("userToken");
    if (!userToken) {
      showToast("error", "User session expired. Please log in again.");
      setLoading(false);
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
      showToast("error", "Please select at least one product type and color.");
      setLoading(false);
      return;
    }

    if (!imageFiles.length) {
      showToast("error", "Please select at least one image.");
      setLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append("productName", productName.trim());
    formData.append("description", productDescription.trim());

    selectedProductTypes.forEach((type) => {
        formData.append("category[]", type);
    });
    selectedColors.forEach((color) => {
        formData.append("color[]", color);
    });
    
    selectedHandlingTypes.forEach((handling) => {
      formData.append("specialHandling[]", handling);
    });
    
    // Security: Validate businessId presence
    const businessId = localStorage.getItem("activeBusiness");
    if (!businessId) {
        showToast("error", "Business context not found. Cannot proceed.");
        setLoading(false);
        return;
    }
    formData.append("businessId", businessId);

    // Append all images
    imageFiles.forEach((file) => {
      formData.append("images", file, file.name); // Supply filename for better server processing
    });

    try {
      // --- Security Optimization: Ensure 'Authorization' header is used for security ---
      const response = await axios.post("/products/vendor/create", formData, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });

      localStorage.setItem("addProductActive", response.data.productId);
      showToast("success", response.data.message);
      setSection(2);
    } catch (error) {
      const errorMessage = handleApiError(error, "An error occurred during product creation");
      showToast("error", errorMessage);
    } finally {
        setLoading(false);
    }
  }, [
    productName,
    productDescription,
    productTypeState,
    colorState,
    handlingTypeState,
    imageFiles,
    setSection,
  ]);
  
  useEffect(() => {
    return () => {
      imagePreviews.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [imagePreviews]); 
  useEffect(() => {
    setCount(25);
    handleBtnFunc(() => handleAPI()); 
    return () => handleBtnFunc(() => console.log("default/cleanup"));
  }, [handleAPI, setCount, handleBtnFunc]);

  const selectedCount = useMemo(() => {
    const productTypeCount = productTypeState.filter(({ state }) => state).length;
    const colorCount = colorState.filter(({ state }) => state).length;
    return { productTypeCount, colorCount };
  }, [productTypeState, colorState]);


  return (
    <div className="py-3 pb-5">
      <div className="bg-[#F8F9FE] p-4 rounded-lg my-[2rem]">
        <div className="bg-[#FFFFFF] p-4 flex gap-2 justify-center flex-wrap">
          {imagePreviews.length > 0 ? (
            imagePreviews.map((preview, index) => (
              <img
                key={preview} 
                src={preview}
                alt={`Product Preview ${index + 1}`}
                className="w-24 h-24 object-cover rounded-lg"
                loading="lazy"
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
            accept=".jpg,.jpeg,.png"
            multiple
            className="w-full px-4 py-2 rounded-xl outline-none placeholder:text-[#8F9098] text-[12px] hidden"
            placeholder="Upload Image"
          />
          <label
            htmlFor="file"
            className="w-full text-[12px] px-4 py-3 rounded-xl bg-[#EAF2FF] flex items-center justify-center cursor-pointer"
          >
            {imageFiles.length > 0
                ? `${imageFiles.length} Image(s) Selected`
                : "Upload Images"}
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
          maxLength={100} 
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
          maxLength={500} 
          className="w-full px-4 py-3 rounded-xl outline-none bg-inherit border-[0.67px] border-[#C5C6CC] placeholder:text-[#8F9098]"
          placeholder="Description"
          rows={4}
        ></textarea>
      </div>

      <Accordion
        title="Product Type"
        subTitle={`Select at least 1 (${selectedCount.productTypeCount} selected)`}
        onClick={toggleProductType}
        state={isProductTypeOpen}
      >
        <div className="flex gap-2 flex-wrap">
          {productTypeState.map(({ item, state }) => (
            <button
              key={item}
              className={`px-4 py-[6px] text-3 rounded-2xl ${
                state
                  ? "bg-[--foreground-green] text-white"
                  : "bg-[#EAF2FF] text-[--foreground-green]"
              }`}
              onClick={() =>
                handleSelection(setProductTypeState, item)
              }
            >
              {item}
            </button>
          ))}
        </div>
      </Accordion>

      <Accordion
        title="Color"
        subTitle={`Select at least 1 (${selectedCount.colorCount} selected)`}
        onClick={toggleColor}
        state={isColorOpen}
      >
        <div className="flex gap-3 flex-wrap">
          {colorState.map(({ item, state }) => (
            <button
              key={item}
              className={`px-4 py-[6px] text-3 rounded-2xl ${
                state
                  ? "bg-[--foreground-green] text-white"
                  : "bg-[#EAF2FF] text-[--foreground-green]"
              }`}
              onClick={() => handleSelection(setColorState, item, true)}
            >
              {item}
            </button>
          ))}
        </div>
      </Accordion>

      <div className="border-[0.5px] border-[#D4D6DD] rounded-2xl p-4 mt-3">
        <h1 className="flex gap-2 items-center pb-6">
          <span className="flex items-center justify-center rounded-full w-4 h-4 bg-[--foreground-green]">
            <span className="flex items-center justify-center rounded-full bg-white h-[5px] w-[5px]"></span>
          </span>
          <span className={`text-[#71727A] text-sm font-bold ${openSansFont}`}>
            Special Handling
          </span>
        </h1>

        <div className="flex flex-col gap-3 py-3">
          {handlingTypeState.map(({ item, state }) => (
            <div
              key={item}
              className={`p-4 py-3 flex justify-between rounded-[12px] transition-all duration-300 border-[0.5px] cursor-pointer ${
                state
                  ? "bg-[#EAF2FF] border-transparent"
                  : "bg-[#ffffff] border-[#C5C6CC]"
              }`}
              onClick={() =>
                handleSelection(setHandlingTypeState, item)
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
    </div>
  );
};

export default BusinessDescription;