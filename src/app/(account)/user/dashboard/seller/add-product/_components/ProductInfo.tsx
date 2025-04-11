import { useEffect, useState, FC } from "react";
import axios from "@/utils/axios";
import { showToast } from "@/utils/alert";
import useToggle from "@/hooks/useToggle";
import Accordion from "./Accordion";
import interFont from "@/fonts/Inter";
import openSansFont from "@/fonts/OpenSans";
import { Icon } from "@iconify/react/dist/iconify.js";
import general_type from "./general.types";
import { handleApiError } from "@/utils/errors";
import Circle from "@/components/Circle";

const OPTIONS = {
  sector: ["Health", "Hospitality", "Education", "Legal", "Logistics"],
  productType: ["Edible", "Wears", "Equipment", "Stationaries"],
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
};

const BusinessDescription: FC<general_type> = ({
  handleBtnFunc,
  setCount,
  setSection,
}) => {
  const [isProductTypeOpen, toggleProductType] = useToggle(true);
  const [isColorOpen, toggleColor] = useToggle(true);

  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");

  const [uploadCount, setuploadCount] = useState(75);

  const [productTypeState, setProductTypeState] = useState(
    OPTIONS.productType.map((item) => ({ item, state: false }))
  );

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const [colorState, setColorState] = useState(
    OPTIONS.color.map((item) => ({ item, state: false }))
  );

  const [handlingTypeState, setHandlingTypeState] = useState(
    OPTIONS.handlingType.map((item) => ({ item, state: false }))
  );

  const handleSelection = (
    state: { item: string; state: boolean }[],
    setState: React.Dispatch<
      React.SetStateAction<{ item: string; state: boolean }[]>
    >,
    selectedItem: string
  ) => {
    setState((prev) =>
      prev.map(({ item, state }) => ({
        item,
        state: item === selectedItem ? !state : state,
      }))
    );
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImageFile(file);

    // Clean up the previous preview URL
    if (imagePreview) {
      URL.revokeObjectURL(imagePreview);
    }

    // Generate new preview URL
    const previewUrl = URL.createObjectURL(file);
    setImagePreview(previewUrl);
  };

  const handleImageUpload = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "my_preset");
    formData.append("cloud_name", "dyrleuyj9");

    try {
      const response = await fetch(
        "https://api.cloudinary.com/v1_1/dyrleuyj9/image/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();
      return data.secure_url; // Get the image URL
    } catch (error) {
      console.error("Image upload failed:", error);
      return null;
    }
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

    if (!imageFile) {
      alert("Please select an image.");
      return;
    }

    const uploadedImageUrl = await handleImageUpload(imageFile);
    if (!uploadedImageUrl) {
      alert("Image upload failed.");
      return;
    }

    const payload = {
      productName,
      description: productDescription,
      category: selectedProductTypes,
      color: selectedColors,
      specialHandling: selectedHandlingTypes,
      businessId: localStorage.getItem("activeBusiness"),
      image: uploadedImageUrl,
    };

    try {
      console.log(payload);
      // Uncomment when the API is ready
      const response = await axios.post("/products/vendor/create", payload, {
        headers: { Authorization: `Bearer ${userToken}` },
      });
      localStorage.setItem("addProductActive", response.data.productId);
      showToast("success", response.data.message);
      setSection(2);
    } catch (error) {
      console.error(error);
      const errorMessage = handleApiError(error, "An error occurred");
      showToast("error", errorMessage);
    }
  };

  useEffect(() => {
    setCount(25);
    handleBtnFunc(handleAPI);
    return () => handleBtnFunc(() => console.log("default"));
  }, [productTypeState, colorState]);

  return (
    <div className="py-3 pb-5">
      <div className="bg-[#F8F9FE] p-4 rounded-lg my-[2rem]">
        <div className="bg-[#FFFFFF] p-4 flex justify-center">
          {imageFile ? (
            // Display the uploaded image preview
            <div className=" transition-all duration-300 ease-in-ou">
              <img
                src={imagePreview || undefined}
                alt="Preview"
                className="w-full h-full object-cover rounded-lg transition-all duration-300 ease-in-out"

                width="100"
                height="100"
              />
            </div>
          ) : (
            // Show the Circle component when no image is uploaded
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
            onChange={handleFileChange}// Handle file selection
            accept="image/*"
            className="w-full px-4 py-2 rounded-xl outline-none placeholder:text-[#8F9098] text-[12px] hidden"
            placeholder="Upload Image"
          />
          <label
            htmlFor="file"
            className="w-full text-[12px] px-4 py-3 rounded-xl bg-[#EAF2FF] flex items-center justify-center cursor-pointer"
          >
            {imageFile ? (
              <span>{imageFile.name}</span> // Display the file name once uploaded
            ) : (
              <span>Product Image</span> // Default text before selection
            )}
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
        <input
          type="text"
          id="productDescription"
          value={productDescription}
          onChange={(e) => setProductDescription(e.target.value)}
          required
          className="w-full px-4 py-3 rounded-xl outline-none bg-inherit border-[0.67px] border-[#C5C6CC] placeholder:text-[#8F9098]"
          placeholder="Description"
        />
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
        <div className="flex gap-3 flex-wrap">
          {colorState.map(({ item, state }) => (
            <button
              key={item}
              className={`px-4 py-[6px] text-3 rounded-2xl ${
                state
                  ? "bg-[--foreground-green] text-white"
                  : "bg-[#EAF2FF] text-[--foreground-green]"
              }`}
              onClick={() => handleSelection(colorState, setColorState, item)}
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
    </div>
  );
};

export default BusinessDescription;
