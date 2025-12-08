import { FC, useEffect, useState, useMemo, useCallback } from "react";
// Assuming these are all necessary and properly barrel-exported for speed
import general_type from "./general.types";
import openSansFont from "@/fonts/OpenSans";
import useForm from "@/hooks/useForm";
import Accordion from "./Accordion";
import useToggle from "@/hooks/useToggle";
import axios from "@/utils/axios";
import { showToast } from "@/utils/alert";
import Circle from "@/components/Circle";
import { Icon } from "@iconify/react"; // Check if this is a lighter import path

// 1. PERFORMANCE: Use a single, consolidated mapping for units
// This reduces initial state definition and allows for dynamic updates.
const QUANTITY_UNITS_MAP: Readonly<Record<string, string[]>> = {
  WEIGHT: [
    "KILOGRAMS (KG)",
    "GRAMS (G)",
    "TONNES (T)",
    "POUNDS (LBS)",
    "OUNCES (OZ)",
  ],
  VOLUME: [
    "LITERS (L)",
    "MILLILITERS (ML)",
    "CUBIC METERS (M³)",
    "GALLONS (GAL)",
    "CUPS",
  ],
  UNIT: ["PIECES (PCS)", "PACKS", "DOZENS (DOZ)", "CARTONS", "SETS"],
  LENGTH: [
    "MILLIMETERS (MM)",
    "CENTIMETERS (CM)",
    "METERS (M)",
    "KILOMETERS (KM)",
    "INCHES (IN)",
  ],
  AREA: [
    "SQUARE METERS (M²)",
    "SQUARE KILOMETERS (KM²)",
    "HECTARES (HA)",
    "ACRES (AC)",
    "SQUARE FEET (FT²)",
  ],
  SPECIALIZED: [
    "LITERS PER MINUTE (L/MIN)",
    "CUBIC CENTIMETERS (CC)",
    "PERCENTAGE (%)",
    "UNITS/DOSE",
    "POINTS",
  ],
  OTHER: ["CUSTOM UNIT"],
};

const QUALITY_TYPES: Readonly<string[]> = Object.keys(QUANTITY_UNITS_MAP);

interface ProductSpecProps extends general_type {}

const ProductSpec: FC<ProductSpecProps> = ({
  handleBtnFunc,
  setCount,
  setSection,
}) => {
  const [productData, setProductData] = useState({
    quantity: "", // Minimum Unit Amount (was 'unit' in original)
    totalStock: 1, // Total Quantity (was 'quantity' in original)
    isReadyForPickUp: "available", // New field for availability status
    weight: 1, // New field for weight
  });
  const [selectedQualityType, setSelectedQualityType] = useState<string | null>(
    null
  );
  const [selectedUnit, setSelectedUnit] = useState<string | null>(null);
  // const [weight, setWeight] = useState<number>(1); // New state for weight
  // Unchanged state variables (useForm and useToggle are custom hooks)
  const [a, aFunc] = useToggle(true); // Quantity Type Accordion
  const [b, bFunc] = useToggle(true); // Quantity Unit Accordion

  // 4. PERFORMANCE: Memoize the available units based on the selected type
  const availableUnits: string[] = useMemo(() => {
    return selectedQualityType
      ? QUANTITY_UNITS_MAP[selectedQualityType] || []
      : [];
  }, [selectedQualityType]);

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
      return showToast(
        "error",
        "Minimum unit amount must be a positive number."
      );
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
    console.log("Submitting quantity info:", {
      quantityType: selectedQualityType,
      quantityUnit: selectedUnit,
      quantity: quantityValue,
      totalStock: totalStockValue,
      weight: productData.weight,
      readyForPickUp: productData.isReadyForPickUp,
    });
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
          weight: productData.weight,
          readyForPickUp: productData.isReadyForPickUp,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      showToast("success", res.data.message);
      setSection(3);
    } catch (err: any) {
      // Use err.response.data.message for cleaner error messages from API
      const errorMessage =
        err.response?.data?.message ||
        err.message ||
        "An unknown error occurred.";
      console.error(err);
      showToast("error", errorMessage);
    }
  }, [selectedQualityType, selectedUnit, productData, setSection]);

  // 11. Readability/Performance: Helper function for button class logic
  const getButtonClass = (isActive: boolean) =>
    `px-4 py-[6px] text-3 rounded-2xl uppercase ${
      isActive
        ? "bg-[--foreground-green] text-white"
        : "bg-[#EAF2FF] text-[--foreground-green]"
    }`;
  const [displayCircle, setDisplayCircle] = useState(true);
  const [count, setCount2] = useState(25);

  return (
    <div className="py-3">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleAPI();
        }}
      >
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
                  type="button"
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

          {/* Input for Minimum Unit Amount (Only visible if a Unit is selected) */}
          {selectedUnit && (
            <div className="py-5">
              <label className="text-sm text-[#71727A] block mb-1">
                Minimum Purchasable Amount (per order)
              </label>
              <input
                type="number"
                id="quantity"
                name="quantity"
                value={productData.quantity}
                onChange={handleInputChange}
                required
                min={1}
                className="w-full px-4 py-3 rounded-xl outline-none bg-inherit border-[0.67px] border-[#C5C6CC] placeholder:text-[#8F9098]"
                placeholder="Enter minimum unit value"
              />
              {/* <p className={`text-xs pt-2 text-[#8F9098] ${openSansFont}`}>
                Minimum Unit Amount (this is the smallest saleable unit for your store)
              </p> */}
            </div>
          )}
          <div className="py-5">
            <label className="text-sm text-[#71727A] block mb-1">
              Delivery Weight (KG per item){" "}
            </label>
            <input
              type="number"
              name="weight"
              value={productData.weight}
              onChange={handleInputChange}
              required
              min={1}
              className="w-full px-4 py-3 rounded-xl outline-none bg-inherit border-[0.67px] border-[#C5C6CC] placeholder:text-[#8F9098]"
              placeholder="Enter minimum unit value"
            />
          </div>
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
              <option value="available">Yes (Available)</option>
              <option value="not available">No (Not Available)</option>
            </select>
          </div>
          {/* Input for Total Stock (Always visible for inventory) */}
          <div className="pb-3">
            <label className="text-sm text-[#71727A] block mb-1">
              Total in Stock
            </label>
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
            {/* <p className={`text-xs pt-2 text-[#8F9098] ${openSansFont}`}>
              Total in Stock
            </p> */}
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
    </div>
  );
};

export default ProductSpec;
