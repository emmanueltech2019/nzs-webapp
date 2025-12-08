"use client";

import { FC, useEffect, useState, useMemo, useCallback, Suspense } from "react";
import general_type from "./general.types";
import { useSearchParams } from "next/navigation";
import useToggle from "@/hooks/useToggle";
import { showToast } from "@/utils/alert";
import axios from "@/utils/axios";
import Accordion from "./Accordion";
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
  // const handleInputChange = useCallback(
  //   (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
  //     const { name, value } = e.target;
  //     setProductData((prev) => ({ ...prev, [name]: value }));
  //   },
  //   []
  // );
  const handleInputChange = useCallback(
  (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    let finalValue: string | number = value;

    // Convert only if the input is meant for numbers (and is not the select)
    if (type === "number") {
      // Use Number() or parseFloat() but ensure state is consistent
      finalValue = value; // Keep as string here for controlled input consistency
    }

    setProductData((prev) => ({ ...prev, [name]: finalValue }));
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
    <>

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
                Minimum Purchasable Amount (per order)
              </label>
              <input
                type="number"
                name="quantity"
                value={productData.quantity}
                onChange={handleInputChange}
                required
                min={1}
                step="any"
                className="w-full px-4 py-3 rounded-xl bg-[#F7F8FA] border border-[#C5C6CC] focus:border-[--foreground-green]"
                placeholder={`Enter minimum unit value in ${selectedUnit}`}
              />
            </div>
          )}

          {/* Weight */}
          <div className="pt-2">
            <label className="text-sm text-[#71727A] block mb-1">Delivery Weight (KG per item) </label>
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
    </>
  );
};
  
export default ProductSpec;
