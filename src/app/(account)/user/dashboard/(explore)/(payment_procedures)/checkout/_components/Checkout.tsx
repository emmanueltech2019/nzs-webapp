// "use client";

// import React, {
//   useCallback,
//   useEffect,
//   useMemo,
//   useRef,
//   useState,
// } from "react";

// import { useRouter } from "next/navigation";
// import Image from "next/image";

// import axios from "@/utils/axios";
// import Swal from "sweetalert2";

// // Icons & Components
// import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
// import MyLocationOutlinedIcon from "@mui/icons-material/MyLocationOutlined";
// import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
// import LocationOnRoundedIcon from "@mui/icons-material/LocationOnRounded";
// import StorefrontRoundedIcon from "@mui/icons-material/StorefrontRounded";
// import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
// import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
// import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
// import RefreshRoundedIcon from "@mui/icons-material/RefreshRounded";
// import WarningAmberRoundedIcon from "@mui/icons-material/WarningAmberRounded";
// import AddRoundedIcon from "@mui/icons-material/AddRounded";
// import RemoveRoundedIcon from "@mui/icons-material/RemoveRounded";

// import TagHeader from "@/components/header/TagHeader";
// import CircleLoader from "@/components/loader/loader";
// import AddressModal from "./AddressModal";
// import FundWalletModal from "../../../../wallet/components/FundWalletModal";

// // Assets
// import DHLLOGO from "@/assets/images/dhl-express-logo-black.png";
// import PAYONDELIVERYLOGO from "@/assets/images/cash-on-delivery.png";
// import FEDEXLOGO from "@/assets/images/fedex-logo.png";
// import GIGLOGO from "@/assets/images/gig-logo.png";
// import REDSTAR from "@/assets/images/redstar.png";

// /* -------------------------------------------------------------------------- */
// /*                                   TYPES                                    */
// /* -------------------------------------------------------------------------- */

// interface User {
//   firstname: string;
//   lastname: string;
//   email: string;
//   accountType: "buyer" | "seller";
//   street: string;
//   phone: string;

//   addresses?: {
//     town?: string;
//     city?: string;
//     state?: string;
//     zip?: string;
//     street?: string;
//     townId?: string | number;
//     cityName?: string;
//   };
// }

// interface Product {
//   _id: string;
//   name: string;
//   weight?: number;
//   price?: number;
//   businessId: string;
//   description: string;
//   quantityInfo?: {
//     weight?: number;
//   };

//   images?: string[];
// }

// interface CartItem {
//   productId: Product;
//   quantity: number;
// }

// interface VendorPayload {
//   businessId: string;
//   items: CartItem[];
// }

// interface GeoLocation {
//   latitude: number;
//   longitude: number;
// }

// interface GIGShipmentItem {
//   ItemName: string;
//   Description: string;
//   Quantity: number;
//   Weight: number;
//   IsVolumetric: boolean;
//   ShipmentType: number;
//   Value: number;
// }

// interface GIGPayload {
//   SenderStationId: number;
//   ReceiverStationId: number;
//   VehicleType: number;

//   SenderLocation: GeoLocation | null;
//   ReceiverLocation: GeoLocation | null;

//   CustomerCode: string;
//   CustomerType: number;
//   PickUpOptions: number;

//   ShipmentItems: GIGShipmentItem[];

//   IsFromAgility: boolean;
//   Value: number;
//   DeliveryOptionIds: number[];
// }

// interface FezCostItem {
//   state?: string;
//   cost?: string | number;
// }

// interface FezState {
//   id: number;
//   state: string;
// }

// interface FezOrderResponse {
//   status?: string;
//   success?: boolean;
//   message?: string;
//   orderNos?: Record<string, string>;
//   data?: unknown;
// }

// /* -------------------------------------------------------------------------- */
// /*                                  CONSTANTS                                 */
// /* -------------------------------------------------------------------------- */

// const ALL_VEHICLE_TYPE = {
//   CAR: 0,
//   BIKE: 1,
//   VAN: 2,
//   TRUCK: 3,
// };

// const GIG_VEHICLE_TYPES = {
//   BIKE: 1,
//   VAN: 2,
//   TRUCK: 3,
// };

// const WEIGHT_THRESHOLDS = [
//   {
//     max: 10,
//     type: ALL_VEHICLE_TYPE.BIKE,
//   },
//   {
//     max: 50,
//     type: ALL_VEHICLE_TYPE.CAR,
//   },
//   {
//     max: 500,
//     type: ALL_VEHICLE_TYPE.VAN,
//   },
//   {
//     max: Infinity,
//     type: ALL_VEHICLE_TYPE.TRUCK,
//   },
// ];

// const GIG_WEIGHT_THRESHOLDS = [
//   {
//     max: 10,
//     type: GIG_VEHICLE_TYPES.BIKE,
//   },
//   {
//     max: 500,
//     type: GIG_VEHICLE_TYPES.VAN,
//   },
//   {
//     max: Infinity,
//     type: GIG_VEHICLE_TYPES.TRUCK,
//   },
// ];

// const SHIPPING_IDS = {
//   REDSTAR: "redstar",
//   FEZ: "fez",
//   GIG: "gig",
//   DHL: "dhl",
//   PAY_ON_DELIVERY: "pay on delivery",
// } as const;

// /*
//  * The endpoint/payload remain the same as the previous GIG integration.
//  * Store the existing value in your environment instead of hard-coding it.
//  */
// const GIG_ACCESS_TOKEN =
//   process.env.NEXT_PUBLIC_GIG_ACCESS_TOKEN || "";

// /* -------------------------------------------------------------------------- */
// /*                             HELPER FUNCTIONS                               */
// /* -------------------------------------------------------------------------- */

// const groupItemsByBusiness = (
//   items: CartItem[]
// ): VendorPayload[] => {
//   const groups: Record<
//     string,
//     CartItem[]
//   > = {};

//   for (const item of items) {
//     const businessId =
//       item?.productId?.businessId;

//     if (!businessId) {
//       continue;
//     }

//     if (!groups[businessId]) {
//       groups[businessId] = [];
//     }

//     groups[businessId].push(item);
//   }

//   return Object.entries(groups).map(
//     ([businessId, groupedItems]) => ({
//       businessId,
//       items: groupedItems,
//     })
//   );
// };

// const getCoordinates = async (
//   address: string
// ): Promise<{
//   Latitude: number;
//   Longitude: number;
// } | null> => {
//   if (!address?.trim()) {
//     return null;
//   }

//   const apiKey =
//     process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

//   if (!apiKey) {
//     console.error(
//       "NEXT_PUBLIC_GOOGLE_MAPS_API_KEY is not configured."
//     );

//     return null;
//   }

//   const url =
//     `https://maps.googleapis.com/maps/api/geocode/json` +
//     `?address=${encodeURIComponent(address)}` +
//     `&key=${apiKey}`;

//   try {
//     const response = await fetch(url);
//     const data = await response.json();

//     if (
//       data.status === "OK" &&
//       data.results?.length > 0
//     ) {
//       const { lat, lng } =
//         data.results[0].geometry.location;

//       return {
//         Latitude: lat,
//         Longitude: lng,
//       };
//     }

//     return null;
//   } catch (error) {
//     console.error(
//       "Geocoding error:",
//       error
//     );

//     return null;
//   }
// };

// const normalizeNigeriaState = (
//   value?: string | null
// ): string => {
//   const normalized = String(value || "")
//     .trim()
//     .toLowerCase()
//     .replace(/\s+/g, " ")
//     .replace(/\s+state$/i, "")
//     .replace(/^state of\s+/i, "");

//   const aliases: Record<string, string> = {
//     abuja: "FCT",
//     "fct abuja": "FCT",
//     fct: "FCT",
//     "federal capital territory": "FCT",
//     "abuja municipal": "FCT",
//     akwaibom: "Akwa Ibom",
//     "akwa ibom": "Akwa Ibom",
//     bayelsa: "Bayelsa",
//     benue: "Benue",
//     borno: "Borno",
//     "cross river": "Cross River",
//     delta: "Delta",
//     ebonyi: "Ebonyi",
//     edo: "Edo",
//     ekiti: "Ekiti",
//     enugu: "Enugu",
//     gombe: "Gombe",
//     imo: "Imo",
//     jigawa: "Jigawa",
//     kano: "Kano",
//     katsina: "Katsina",
//     kebbi: "Kebbi",
//     kogi: "Kogi",
//     kwara: "Kwara",
//     lagos: "Lagos",
//     nasarawa: "Nasarawa",
//     niger: "Niger",
//     ogun: "Ogun",
//     ondo: "Ondo",
//     osun: "Osun",
//     oyo: "Oyo",
//     plateau: "Plateau",
//     rivers: "Rivers",
//     sokoto: "Sokoto",
//     taraba: "Taraba",
//     yobe: "Yobe",
//     zamfara: "Zamfara",
//     kaduna: "Kaduna",
//     "rivers state": "Rivers",
//     "lagos state": "Lagos",
//     "akwa ibom state": "Akwa Ibom",
//   };

//   if (!normalized) {
//     return "";
//   }

//   if (aliases[normalized]) {
//     return aliases[normalized];
//   }

//   return normalized
//     .split(" ")
//     .filter(Boolean)
//     .map(
//       (part) =>
//         part.charAt(0).toUpperCase() +
//         part.slice(1)
//     )
//     .join(" ");
// };

// // const getFezCostItems = (
// //   response: unknown
// // ): FezCostItem[] => {
// //   const visit = (value: unknown): FezCostItem[] => {
// //     if (Array.isArray(value)) {
// //       const items = value.filter(
// //         (item): item is FezCostItem =>
// //           Boolean(item) &&
// //           typeof item === "object" &&
// //           ("cost" in item || "state" in item)
// //       );

// //       if (items.length > 0) {
// //         return items;
// //       }

// //       for (const item of value) {
// //         const nested = visit(item);
// //         if (nested.length > 0) {
// //           return nested;
// //         }
// //       }

// //       return [];
// //     }

// //     if (!value || typeof value !== "object") {
// //       return [];
// //     }

// //     const record = value as Record<string, unknown>;

// //     for (const key of [
// //       "Cost",
// //       "cost",
// //       "Costs",
// //       "costs",
// //       "data",
// //       "result",
// //       "response",
// //     ]) {
// //       if (!(key in record)) {
// //         continue;
// //       }

// //       const nested = visit(record[key]);
// //       if (nested.length > 0) {
// //         return nested;
// //       }
// //     }

// //     return [];
// //   };

// //   return visit(response);
// // };
// interface FezCostItem {
//   state?: string;
//   cost?: string | number;
// }

// const getFezCostItems = (
//   response: unknown
// ): FezCostItem[] => {
//   const isCostItem = (
//     value: unknown
//   ): value is FezCostItem => {
//     if (
//       !value ||
//       typeof value !== "object"
//     ) {
//       return false;
//     }

//     const record =
//       value as Record<string, unknown>;

//     return (
//       typeof record.state === "string" &&
//       (
//         typeof record.cost === "number" ||
//         typeof record.cost === "string"
//       )
//     );
//   };

//   const visit = (
//     value: unknown
//   ): FezCostItem[] => {
//     // Handle arrays
//     if (Array.isArray(value)) {
//       const directItems = value.filter(
//         isCostItem
//       );

//       if (directItems.length > 0) {
//         return directItems;
//       }

//       for (const item of value) {
//         const nested = visit(item);

//         if (nested.length > 0) {
//           return nested;
//         }
//       }

//       return [];
//     }

//     // Handle single FEZ cost object
//     if (isCostItem(value)) {
//       return [value];
//     }

//     if (
//       !value ||
//       typeof value !== "object"
//     ) {
//       return [];
//     }

//     const record =
//       value as Record<string, unknown>;

//     // Search known FEZ wrapper properties
//     for (const key of [
//       "Cost",
//       "cost",
//       "Costs",
//       "costs",
//       "data",
//       "result",
//       "response",
//     ]) {
//       if (!(key in record)) {
//         continue;
//       }

//       const nested = visit(
//         record[key]
//       );

//       if (nested.length > 0) {
//         return nested;
//       }
//     }

//     return [];
//   };

//   return visit(response);
// };
// const getExactFezState = (
//   value: string | null | undefined,
//   states: FezState[]
// ): string => {
//   const normalized = normalizeNigeriaState(
//     value
//   );

//   if (!normalized) {
//     return "";
//   }

//   return (
//     states.find(
//       (item) =>
//         normalizeNigeriaState(
//           item.state
//         ) === normalized
//     )?.state || ""
//   );
// };

// const getFezOrderNumbers = (
//   response: unknown
// ): Record<string, string> => {
//   const visit = (value: unknown): Record<string, string> | null => {
//     if (!value || typeof value !== "object" || Array.isArray(value)) {
//       return null;
//     }

//     const record = value as Record<string, unknown>;

//     for (const key of [
//       "orderNos",
//       "OrderNos",
//       "ordernos",
//     ]) {
//       const candidate = record[key];

//       if (
//         candidate &&
//         typeof candidate === "object" &&
//         !Array.isArray(candidate)
//       ) {
//         const entries = Object.entries(
//           candidate as Record<string, unknown>
//         ).filter(([, orderNo]) =>
//           Boolean(orderNo)
//         );

//         if (entries.length > 0) {
//           return Object.fromEntries(
//             entries.map(([uniqueId, orderNo]) => [
//               uniqueId,
//               String(orderNo),
//             ])
//           );
//         }
//       }
//     }

//     for (const child of Object.values(record)) {
//       const nested = visit(child);
//       if (nested) {
//         return nested;
//       }
//     }

//     return null;
//   };

//   return visit(response) || {};
// };

// const formatCurrency = (
//   amount: number | null | undefined
// ) => {
//   const value = Number(amount || 0);

//   return new Intl.NumberFormat("en-NG", {
//     style: "currency",
//     currency: "NGN",
//     maximumFractionDigits: 0,
//   }).format(value);
// };

// const getProductWeight = (
//   item: CartItem
// ) => {
//   return Number(
//     item.productId.quantityInfo
//       ?.weight ??
//       item.productId.weight ??
//       1
//   );
// };

// const getProductTotal = (
//   item: CartItem
// ) => {
//   return (
//     Number(item.productId.price || 0) *
//     Number(item.quantity || 0)
//   );
// };

// /* -------------------------------------------------------------------------- */
// /*                         SHIPPING OPTIONS                                   */
// /* -------------------------------------------------------------------------- */

// const shippingOptions = [
//   {
//     id: SHIPPING_IDS.REDSTAR,
//     name: "Red Star Logistics",
//     description:
//       "Door-to-door delivery with live pricing.",
//     logo: REDSTAR,
//     width: 120,
//     height: 24,
//     available: true,
//     badge: "Recommended",
//   },

//   {
//     id: SHIPPING_IDS.PAY_ON_DELIVERY,
//     name: "Pay on Delivery",
//     description:
//       "Shipping fee will be confirmed separately.",
//     logo: PAYONDELIVERYLOGO,
//     width: 105,
//     height: 72,
//     available: true,
//     badge: "Available",
//   },

//   {
//     id: SHIPPING_IDS.FEZ,
//     name: "Fez Logistics",
//     description:
//       "Reliable nationwide delivery with live pricing.",
//     logo:
//       "https://res.cloudinary.com/dq8f0jdgt/image/upload/v1773458882/64708f8629b92d48d4457146_fez_logo_qwnrhz.svg",
//     width: 120,
//     height: 24,
//     available: true,
//     badge: "Available",
//     externalLogo: true,
//   },

//   {
//     id: SHIPPING_IDS.GIG,
//     name: "GIG Logistics",
//     description:
//       "Coming soon.",
//     logo: GIGLOGO,
//     width: 70,
//     height: 24,
//     available: false,
//     badge: "Coming soon",
//   },

//   {
//     id: SHIPPING_IDS.DHL,
//     name: "DHL Express",
//     description:
//       "Coming soon.",
//     logo: DHLLOGO,
//     width: 100,
//     height: 24,
//     available: false,
//     badge: "Coming soon",
//   },
// ];

// /* -------------------------------------------------------------------------- */
// /*                              STEP INDICATOR                                */
// /* -------------------------------------------------------------------------- */

// const CheckoutSteps = () => {
//   return (
//     <div className="mb-7 overflow-x-auto">
//       <div className="mx-auto flex min-w-[430px] items-start justify-between">
//         {/* Step 1 */}

//         <div className="flex min-w-[110px] flex-col items-center">
//           <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#C4EDDA] text-[#006838]">
//             <CheckOutlinedIcon
//               sx={{ fontSize: 19 }}
//             />
//           </div>

//           <p className="mt-2 text-xs font-bold text-gray-700">
//             Your bag
//           </p>
//         </div>

//         {/* Connector */}

//         <div className="mt-[17px] h-[2px] flex-1 bg-[#006838]/20">
//           <div className="h-full w-full bg-[#006838]" />
//         </div>

//         {/* Step 2 */}

//         <div className="flex min-w-[110px] flex-col items-center">
//           <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#006838] text-white shadow-[0_0_0_5px_rgba(0,104,56,0.08)]">
//             2
//           </div>

//           <p className="mt-2 text-xs font-bold text-[#006838]">
//             Shipping
//           </p>
//         </div>

//         {/* Connector */}

//         <div className="mt-[17px] h-[2px] flex-1 bg-gray-200" />

//         {/* Step 3 */}

//         <div className="flex min-w-[110px] flex-col items-center">
//           <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-sm font-bold text-gray-400">
//             3
//           </div>

//           <p className="mt-2 text-xs font-bold text-gray-400">
//             Payment
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// /* -------------------------------------------------------------------------- */
// /*                            SECTION HEADER                                  */
// /* -------------------------------------------------------------------------- */

// const SectionHeader = ({
//   icon,
//   title,
//   description,
// }: {
//   icon: React.ReactNode;
//   title: string;
//   description?: string;
// }) => {
//   return (
//     <div className="mb-5 flex items-start gap-3">
//       <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#006838]/10 text-[#006838]">
//         {icon}
//       </div>

//       <div>
//         <h2 className="text-base font-black text-gray-900">
//           {title}
//         </h2>

//         {description && (
//           <p className="mt-1 text-xs leading-5 text-gray-500">
//             {description}
//           </p>
//         )}
//       </div>
//     </div>
//   );
// };

// /* -------------------------------------------------------------------------- */
// /*                           LOADING SKELETON                                 */
// /* -------------------------------------------------------------------------- */

// const CheckoutSkeleton = () => {
//   return (
//     <div className="space-y-5">
//       <div className="h-7 w-40 animate-pulse rounded bg-gray-100" />

//       <div className="h-28 animate-pulse rounded-3xl bg-gray-100" />

//       <div className="h-64 animate-pulse rounded-3xl bg-gray-100" />

//       <div className="h-48 animate-pulse rounded-3xl bg-gray-100" />
//     </div>
//   );
// };

// /* -------------------------------------------------------------------------- */
// /*                        CHECKOUT SHIPPING COMPONENT                         */
// /* -------------------------------------------------------------------------- */

// const CheckoutShipping: React.FC = () => {
//   const router = useRouter();

//   /* ------------------------------------------------------------------------ */
//   /* STATE                                                                    */
//   /* ------------------------------------------------------------------------ */

//   const [
//     selectedShipping,
//     setSelectedShipping,
//   ] = useState("");

//   const [address, setAddress] =
//     useState("");

//   const [city, setCity] =
//     useState("");

//   const [cityName, setCityName] =
//     useState("");

//   const [state, setState] =
//     useState("");

//   const [zip, setZip] =
//     useState("");

//   const [town, setTown] =
//     useState("");

//   const [townId, setTownId] =
//     useState("");

//   const [walletBalance, setWalletBalance] =
//     useState(0);

//   const [showModal, setShowModal] =
//     useState(false);

//   const [showModal2, setShowModal2] =
//     useState(false);

//   const [isSubmitting, setIsSubmitting] =
//     useState(false);

//   const [loading, setLoading] =
//     useState(true);

//   const [cartLoading, setCartLoading] =
//     useState(true);

//   const [
//     loadingDeliveryFee,
//     setLoadingDeliveryFee,
//   ] = useState(false);

//   const [user, setUser] =
//     useState<User | null>(null);

//   const [cartItems, setCartItems] =
//     useState<CartItem[]>([]);

//   const [groupedItems, setGroupedItems] =
//     useState<Record<
//       string,
//       CartItem[]
//     >>(() => ({}));

//   const [vendors, setVendors] =
//     useState<Record<string, any>>(
//       () => ({})
//     );

//   const [weight, setWeight] =
//     useState(0);

//   const [
//     totalProductPrice,
//     setTotalProductPrice,
//   ] = useState(0);

//   const [
//     deliveryFee,
//     setDeliveryFee,
//   ] = useState<number | null>(null);

//   const [
//     deliveryFee2,
//     setDeliveryFee2,
//   ] = useState<number | null>(null);

//   const [pricingError, setPricingError] =
//     useState<string | null>(null);

//   const pricingRequestRef =
//     useRef(0);

//   const [fezStates, setFezStates] =
//     useState<FezState[]>([]);

//   const [
//     fezDestinationState,
//     setFezDestinationState,
//   ] = useState("");

//   /* ------------------------------------------------------------------------ */
//   /* AUTH HEADER                                                              */
//   /* ------------------------------------------------------------------------ */

//   const getAuthHeaders = useCallback(() => {
//     const token =
//       localStorage.getItem("userToken");

//     return {
//       Authorization: `Bearer ${token}`,
//     };
//   }, []);

//   /* ------------------------------------------------------------------------ */
//   /* FEZ STATES                                                              */
//   /* ------------------------------------------------------------------------ */

//   const fetchFezStates = useCallback(
//     async (): Promise<FezState[]> => {
//       const response = await axios.get(
//         "/fez/states",
//         {
//           headers: getAuthHeaders(),
//         }
//       );

//       const states =
//         response.data?.states ??
//         response.data?.data?.states ??
//         [];

//       if (!Array.isArray(states)) {
//         throw new Error(
//           "FEZ returned an invalid states response."
//         );
//       }

//       const normalizedStates: FezState[] =
//         states
//           .map((item: any) => ({
//             id: Number(item?.id),
//             state: String(item?.state || "").trim(),
//           }))
//           .filter(
//             (item: FezState) =>
//               Number.isFinite(item.id) &&
//               Boolean(item.state)
//           );

//       setFezStates(normalizedStates);
//       return normalizedStates;
//     },
//     [getAuthHeaders]
//   );

//   const askForFezDestinationState =
//     useCallback(async (): Promise<boolean> => {
//       try {
//         let states = fezStates;

//         if (states.length === 0) {
//           states = await fetchFezStates();
//         }

//         if (states.length === 0) {
//           await Swal.fire(
//             "FEZ States Unavailable",
//             "We could not load FEZ's official Nigerian states. Please try again.",
//             "error"
//           );
//           return false;
//         }

//         const inputOptions: Record<string, string> = {};

//         for (const item of states) {
//           inputOptions[item.state] = item.state;
//         }

//         const result = await Swal.fire({
//           title: "FEZ Delivery State",
//           text: "Which FEZ destination state should we use for this order?",
//           input: "select",
//           inputOptions,
//           inputPlaceholder: "Select FEZ destination state",
//           inputValue: fezDestinationState || "",
//           showCancelButton: true,
//           confirmButtonText: "Continue with FEZ",
//           cancelButtonText: "Cancel",
//           confirmButtonColor: "#006838",
//           allowOutsideClick: false,
//           inputValidator: (value) => {
//             if (!value) {
//               return "Please select a FEZ destination state.";
//             }
//             return undefined;
//           },
//         });

//         if (!result.isConfirmed || !result.value) {
//           return false;
//         }

//         const selectedState = states.find(
//           (item) => item.state === result.value
//         );

//         if (!selectedState) {
//           await Swal.fire(
//             "Invalid FEZ State",
//             "Please select a state from FEZ's official list.",
//             "error"
//           );
//           return false;
//         }

//         setFezDestinationState(
//           selectedState.state
//         );
//         setSelectedShipping(
//           SHIPPING_IDS.FEZ
//         );

//         return true;
//       } catch (error: any) {
//         console.error(
//           "FEZ states fetch error:",
//           error
//         );

//         await Swal.fire(
//           "FEZ States Error",
//           error?.response?.data?.message ||
//             error?.response?.data?.description ||
//             error?.message ||
//             "Unable to load FEZ states.",
//           "error"
//         );

//         return false;
//       }
//     },
//     [
//       fezStates,
//       fezDestinationState,
//       fetchFezStates,
//     ]
//   );

//   /* ------------------------------------------------------------------------ */
//   /* FETCH PROFILE                                                           */
//   /* ------------------------------------------------------------------------ */

//   const fetchProfile = useCallback(
//     async () => {
//       const token =
//         localStorage.getItem("userToken");

//       if (!token) {
//         setLoading(false);
//         router.replace("/auth/login");
//         return;
//       }

//       try {
//         setLoading(true);

//         const res = await axios.get(
//           "/users/profile",
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );

//         const u: User =
//           res.data.user;

//         setUser(u);

//         setAddress(
//           u.addresses?.street ||
//             ""
//         );

//         setCity(
//           u.addresses?.city ||
//             ""
//         );

//         setState(
//           u.addresses?.state ||
//             ""
//         );

//         setZip(
//           u.addresses?.zip ||
//             ""
//         );

//         setTown(
//           u.addresses?.town ||
//             ""
//         );

//         setTownId(
//           String(
//             u.addresses?.townId ||
//               ""
//           )
//         );

//         setCityName(
//           u.addresses?.cityName ||
//             ""
//         );

//         setWalletBalance(
//           Number(
//             res.data.wallet?.balance ||
//               0
//           )
//         );
//       } catch (error: any) {
//         console.error(
//           "Profile fetch error:",
//           error
//         );

//         if (
//           error?.response?.status === 401 ||
//           error?.response?.data?.message ===
//             "Unauthorized access"
//         ) {
//           localStorage.removeItem(
//             "userToken"
//           );

//           router.replace("/auth/login");
//           return;
//         }

//         Swal.fire(
//           "Unable to load profile",
//           "Please refresh and try again.",
//           "error"
//         );
//       } finally {
//         setLoading(false);
//       }
//     },
//     [router]
//   );

//   useEffect(() => {
//     fetchProfile();
//   }, [fetchProfile, showModal]);

//   /* ------------------------------------------------------------------------ */
//   /* FETCH CART + VENDORS                                                    */
//   /* ------------------------------------------------------------------------ */

//   useEffect(() => {
//     if (!user) {
//       return;
//     }

//     const fetchCart = async () => {
//       const token =
//         localStorage.getItem("userToken");

//       if (!token) {
//         return;
//       }

//       try {
//         setCartLoading(true);

//         const res = await axios.get(
//           "cart",
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );

//         const items: CartItem[] =
//           res.data?.cart?.items ??
//           [];

//         setCartItems(items);

//         const totalPrice =
//           items.reduce(
//             (sum, item) =>
//               sum +
//               Number(
//                 item.productId?.price ||
//                   0
//               ) *
//                 Number(
//                   item.quantity || 0
//                 ),
//             0
//           );

//         setTotalProductPrice(
//           totalPrice
//         );

//         const grouped: Record<
//           string,
//           CartItem[]
//         > = {};

//         let totalCartWeight = 0;

//         for (const item of items) {
//           const businessId =
//             item?.productId
//               ?.businessId ||
//             "unknown";

//           if (!grouped[businessId]) {
//             grouped[businessId] = [];
//           }

//           grouped[businessId].push(
//             item
//           );

//           totalCartWeight +=
//             getProductWeight(item) *
//             Number(item.quantity || 0);
//         }

//         setGroupedItems(grouped);
//         setWeight(totalCartWeight);

//         /* -------------------------------------------------------------- */
//         /* Vendor requests remain the same endpoint/integration.          */
//         /* -------------------------------------------------------------- */

//         const businessIds =
//           Object.keys(grouped);

//         const vendorResults =
//           await Promise.all(
//             businessIds.map(
//               async (businessId) => {
//                 try {
//                   const vendorRes =
//                     await axios.get(
//                       `/business/${businessId}`,
//                       {
//                         headers:
//                           getAuthHeaders(),
//                       }
//                     );

//                   return [
//                     businessId,
//                     vendorRes.data
//                       .business,
//                   ] as const;
//                 } catch (error) {
//                   console.error(
//                     `Failed to fetch vendor ${businessId}`,
//                     error
//                   );

//                   return [
//                     businessId,
//                     null,
//                   ] as const;
//                 }
//               }
//             )
//           );

//         const vendorData =
//           Object.fromEntries(
//             vendorResults
//           );

//         setVendors(vendorData);
//       } catch (error: any) {
//         console.error(
//           "Cart fetch error:",
//           error
//         );

//         if (
//           error?.response?.status ===
//           401
//         ) {
//           localStorage.removeItem(
//             "userToken"
//           );

//           router.replace("/auth/login");
//           return;
//         }

//         Swal.fire(
//           "Cart Error",
//           "We couldn't load your basket.",
//           "error"
//         );
//       } finally {
//         setCartLoading(false);
//       }
//     };

//     fetchCart();
//   }, [
//     user,
//     getAuthHeaders,
//     router,
//   ]);

//   /* ------------------------------------------------------------------------ */
//   /* DERIVED GROUP INFORMATION                                               */
//   /* ------------------------------------------------------------------------ */

//   const vendorGroups = useMemo(() => {
//     return Object.entries(
//       groupedItems
//     ).map(
//       ([businessId, items]) => ({
//         businessId,
//         items,
//         vendor:
//           vendors[businessId] ||
//           null,
//         total:
//           items.reduce(
//             (sum, item) =>
//               sum + getProductTotal(item),
//             0
//           ),
//         pieces:
//           items.reduce(
//             (sum, item) =>
//               sum +
//               Number(
//                 item.quantity || 0
//               ),
//             0
//           ),
//         weight:
//           items.reduce(
//             (sum, item) =>
//               sum +
//               getProductWeight(
//                 item
//               ) *
//                 Number(
//                   item.quantity ||
//                     0
//                 ),
//             0
//           ),
//       })
//     );
//   }, [
//     groupedItems,
//     vendors,
//   ]);

//   /* ------------------------------------------------------------------------ */
//   /* DELIVERY FEE                                                            */
//   /* ------------------------------------------------------------------------ */

//   useEffect(() => {
//     let cancelled = false;
//     const requestId =
//       ++pricingRequestRef.current;

//     const getDeliveryFee = async () => {
//       const supportedProviders = [
//         SHIPPING_IDS.REDSTAR,
//         SHIPPING_IDS.GIG,
//         SHIPPING_IDS.FEZ,
//       ];

//       if (
//         !supportedProviders.includes(
//           selectedShipping as (typeof SHIPPING_IDS)[keyof typeof SHIPPING_IDS]
//         ) ||
//         cartItems.length === 0
//       ) {
//         if (!cancelled) {
//           setDeliveryFee(null);
//           setDeliveryFee2(null);
//           setPricingError(null);
//           setLoadingDeliveryFee(false);
//         }
//         return;
//       }

//       if (
//         selectedShipping === SHIPPING_IDS.FEZ &&
//         !fezDestinationState
//       ) {
//         if (!cancelled) {
//           setDeliveryFee(null);
//           setDeliveryFee2(null);
//           setPricingError(null);
//           setLoadingDeliveryFee(false);
//         }
//         return;
//       }

//       setLoadingDeliveryFee(true);
//       setDeliveryFee(null);
//       setDeliveryFee2(null);
//       setPricingError(null);

//       const REDSTAR_API_KEY =
//         process.env.NEXT_PUBLIC_REDSTAR_API_KEY;

//       const groupedVendors =
//         groupItemsByBusiness(cartItems);

//       let totalFee = 0;

//       try {
//         /* ------------------------------------------------------------ */
//         /* GIG RECEIVER COORDINATES                                     */
//         /* ------------------------------------------------------------ */

//         let receiverCoords: {
//           Latitude: number;
//           Longitude: number;
//         } | null = null;

//         if (
//           selectedShipping ===
//           SHIPPING_IDS.GIG
//         ) {
//           const receiverAddressStr =
//             `${address}, ${city}, ${state}`;

//           receiverCoords =
//             await getCoordinates(
//               receiverAddressStr
//             );
//         }

//         /* ------------------------------------------------------------ */
//         /* EACH BUSINESS                                                */
//         /* ------------------------------------------------------------ */

//         for (const vendor of groupedVendors) {
//           if (cancelled ||
//               requestId !== pricingRequestRef.current) {
//             return;
//           }

//           const vendorRes =
//             await axios.get(
//               `/business/${vendor.businessId}`,
//               {
//                 headers: getAuthHeaders(),
//               }
//             );

//           if (cancelled ||
//               requestId !== pricingRequestRef.current) {
//             return;
//           }

//           const v =
//             vendorRes.data?.business;

//           if (!v) {
//             throw new Error(
//               `Vendor ${vendor.businessId} data could not be loaded.`
//             );
//           }

//           const totalWeight =
//             vendor.items.reduce(
//               (sum, item) =>
//                 sum +
//                 getProductWeight(item) *
//                   Number(item.quantity || 0),
//               0
//             );

//           const vendorTotalValue =
//             vendor.items.reduce(
//               (sum, item) =>
//                 sum +
//                 Number(item.productId.price || 0) *
//                   Number(item.quantity || 0),
//               0
//             );

//           /* ---------------------------------------------------------- */
//           /* REDSTAR                                                     */
//           /* ---------------------------------------------------------- */

//           if (
//             selectedShipping ===
//             SHIPPING_IDS.REDSTAR
//           ) {
//             const feeRes =
//               await axios.post(
//                 "/auth/DeliveryFee",
//                 {
//                   senderCity:
//                     v.addresses?.city ||
//                     "Unknown",

//                   senderTownID:
//                     v.addresses?.townId ||
//                     0,

//                   recipientCity:
//                     cityName,

//                   recipientTownID:
//                     parseInt(townId) || 0,

//                   pickupType: 1,
//                   weight: totalWeight,
//                 },
//                 {
//                   headers: {
//                     "X-API-KEY":
//                       REDSTAR_API_KEY,
//                     "Content-Type":
//                       "application/json",
//                   },
//                 }
//               );

//             totalFee +=
//               Number(
//                 feeRes.data?.TotalAmount || 0
//               );
//           }

//           /* ---------------------------------------------------------- */
//           /* GIG                                                         */
//           /* ---------------------------------------------------------- */

//           if (
//             selectedShipping ===
//             SHIPPING_IDS.GIG
//           ) {
//             if (!GIG_ACCESS_TOKEN) {
//               throw new Error(
//                 "GIG access token is not configured."
//               );
//             }

//             const senderAddressStr =
//               `${v.addresses?.street || ""}, ${v.addresses?.city || ""}, ${v.addresses?.state || ""}`;

//             const senderCoords =
//               await getCoordinates(
//                 senderAddressStr
//               );

//             const vehicle =
//               GIG_WEIGHT_THRESHOLDS.find(
//                 (item) =>
//                   totalWeight <= item.max
//               );

//             const vehicleType =
//               vehicle?.type ||
//               GIG_VEHICLE_TYPES.TRUCK;

//             const gigPayload: GIGPayload = {
//               SenderStationId: 3,
//               ReceiverStationId: 3,
//               VehicleType: vehicleType,
//               SenderLocation: senderCoords,
//               ReceiverLocation: receiverCoords,
//               CustomerCode: "ECO038082",
//               CustomerType: 0,
//               PickUpOptions: 0,
//               DeliveryOptionIds: [1, 2],
//               Value: vendorTotalValue,
//               ShipmentItems: vendor.items.map((item) => ({
//                 ItemName: item.productId.name,
//                 Description:
//                   item.productId.description ||
//                   "Vendor item",
//                 Quantity: Number(item.quantity || 0),
//                 Weight: getProductWeight(item),
//                 IsVolumetric: false,
//                 ShipmentType: 1,
//                 Value: Number(item.productId.price || 0),
//               })),
//               IsFromAgility: false,
//             };

//             const gigFeeRes =
//               await axios.post(
//                 "https://dev-thirdpartynode.theagilitysystems.com/price",
//                 gigPayload,
//                 {
//                   headers: {
//                     accept: "application/json",
//                     "access-token":
//                       GIG_ACCESS_TOKEN,
//                     "content-type":
//                       "application/json",
//                   },
//                 }
//               );

//             const gigGrandTotal =
//               Number(
//                 gigFeeRes.data?.data?.GrandTotal
//               );

//             if (Number.isFinite(gigGrandTotal)) {
//               totalFee += gigGrandTotal;
//             }
//           }

//           /* ---------------------------------------------------------- */
//           /* FEZ                                                         */
//           /* Browser -> Express -> FEZ                                   */
//           /* ---------------------------------------------------------- */

//           if (
//             selectedShipping ===
//             SHIPPING_IDS.FEZ
//           ) {
//             const destinationState =
//               fezDestinationState.trim();

//             const pickUpState =
//               getExactFezState(
//                 v.addresses?.state,
//                 fezStates
//               );

//             if (!destinationState) {
//               throw new Error(
//                 "A delivery state is required for FEZ pricing."
//               );
//             }

//             if (!pickUpState) {
//               throw new Error(
//                 `Seller pickup state "${v.addresses?.state || "Unknown"}" is not available in FEZ's official state list.`
//               );
//             }

//             const fezWeight = Math.max(
//               1,
//               Math.ceil(
//                 Number(totalWeight) || 1
//               )
//             );

//             const fezCostRes =
//               await axios.post(
//                 "/fez/cost",
//                 {
//                   state: destinationState,
//                   pickUpState,
//                   weight: fezWeight,
//                   locker: false,
//                 },
//                 {
//                   headers: getAuthHeaders(),
//                 }
//               );

//             if (cancelled ||
//                 requestId !== pricingRequestRef.current) {
//               return;
//             }

//             const costItems =
//               getFezCostItems(
//                 fezCostRes.data
//               );

//             if (costItems.length === 0) {
//               throw new Error(
//                 `FEZ returned no delivery cost for ${destinationState}.`
//               );
//             }

//             const destinationMatch =
//               costItems.find(
//                 (item) =>
//                   normalizeNigeriaState(
//                     item.state
//                   ) === destinationState
//               );

//             const selectedCost =
//               destinationMatch ||
//               costItems[0];

//             const numericCost =
//               Number(selectedCost?.cost);

//             if (
//               !Number.isFinite(numericCost)
//             ) {
//               throw new Error(
//                 `Invalid FEZ delivery price returned for ${destinationState}.`
//               );
//             }

//             console.log("FEZ pricing response", {
//               businessId: vendor.businessId,
//               destinationState,
//               pickUpState,
//               weight: fezWeight,
//               costItems,
//               selectedCost,
//               numericCost,
//             });

//             totalFee += numericCost;
//           }
//         }

//         if (cancelled ||
//             requestId !== pricingRequestRef.current) {
//           return;
//         }

//         const percentage = 1.65 / 100;
//         const baseAmount =
//           totalFee + totalProductPrice;
//         const percentageFee =
//           baseAmount * percentage;
//         const finalDeliveryFee = Math.round(
//           totalFee + percentageFee
//         );

//         if (
//           selectedShipping === SHIPPING_IDS.FEZ
//         ) {
//           console.log("FEZ vendor price accepted", {
//             totalFee,
//             finalDeliveryFee,
//           });
//         }

//         setDeliveryFee(totalFee);
//         setDeliveryFee2(finalDeliveryFee);
//         setPricingError(null);

//         console.log("Delivery pricing complete", {
//           provider: selectedShipping,
//           totalFee,
//           finalDeliveryFee,
//         });
//       } catch (error: any) {
//         if (
//           cancelled ||
//           requestId !== pricingRequestRef.current
//         ) {
//           return;
//         }

//         console.error(
//           "Delivery pricing error:",
//           error
//         );

//         setDeliveryFee(null);
//         setDeliveryFee2(null);
//         setPricingError(
//           error?.response?.data?.message ||
//             error?.response?.data?.Message ||
//             error?.message ||
//             `Failed to calculate ${selectedShipping.toUpperCase()} delivery fee.`
//         );
//       } finally {
//         if (
//           !cancelled &&
//           requestId === pricingRequestRef.current
//         ) {
//           setLoadingDeliveryFee(false);
//         }
//       }
//     };

//     getDeliveryFee();

//     return () => {
//       cancelled = true;
//     };
//   }, [
//     selectedShipping,
//     cartItems,
//     address,
//     city,
//     state,
//     cityName,
//     townId,
//     totalProductPrice,
//     getAuthHeaders,
//     fezDestinationState,
//     fezStates,
//   ]);

//   /* ------------------------------------------------------------------------ */
//   /* SHIPPING SELECTORS                                                      */
//   /* ------------------------------------------------------------------------ */

//   const selectShipping = async (
//     shippingId: string
//   ) => {
//     const selectedOption =
//       shippingOptions.find(
//         (option) =>
//           option.id === shippingId
//       );

//     if (!selectedOption) {
//       return;
//     }

//     if (!selectedOption.available) {
//       Swal.fire({
//         toast: true,
//         position: "top-end",
//         timer: 2200,
//         showConfirmButton: false,
//         icon: "info",
//         title: `${selectedOption.name} is coming soon.`,
//       });

//       return;
//     }

//     if (shippingId === SHIPPING_IDS.FEZ) {
//       await askForFezDestinationState();
//       return;
//     }

//     setFezDestinationState("");
//     setSelectedShipping(
//       shippingId
//     );
//   };

//   /* ------------------------------------------------------------------------ */
//   /* FEZ ORDER CREATION                                                      */
//   /* ------------------------------------------------------------------------ */

//   const createFezOrders = async (
//     groupedVendors: VendorPayload[]
//   ) => {
//     const selectedFezState =
//       fezDestinationState.trim();

//     const officialFezStates =
//       fezStates.length > 0
//         ? fezStates
//         : await fetchFezStates();

//     if (!selectedFezState) {
//       throw new Error(
//         "Please select a FEZ destination state before creating the order."
//       );
//     }

//     const batchId =
//       `NZ-FEZ-${Date.now()}-${Math.random()
//         .toString(36)
//         .slice(2, 8)}`;

//     const preparedOrders: Array<{
//       businessId: string;
//       vendor: VendorPayload;
//       vendorData: any;
//       uniqueID: string;
//       payload: Record<string, unknown>;
//     }> = [];

//     for (let index = 0; index < groupedVendors.length; index++) {
//       const vendor = groupedVendors[index];
//       const vendorData =
//         vendors[vendor.businessId];

//       if (!vendorData?.addresses) {
//         throw new Error(
//           `Vendor data is missing for ${vendor.businessId}.`
//         );
//       }

//       const vendorTotalWeight =
//         vendor.items.reduce(
//           (sum, item) =>
//             sum +
//             getProductWeight(item) *
//               Number(item.quantity || 0),
//           0
//         );

//       const vendorTotalValue =
//         vendor.items.reduce(
//           (sum, item) =>
//             sum +
//             Number(item.productId.price || 0) *
//               Number(item.quantity || 0),
//           0
//         );

//       const senderName =
//         vendorData.userId
//           ? [
//               vendorData.userId.firstname,
//               vendorData.userId.lastname,
//             ]
//               .filter(Boolean)
//               .join(" ")
//           : vendorData.businessName ||
//             vendorData.name ||
//             "Seller";

//       const senderPhone =
//         vendorData.userId?.phone ||
//         vendorData.phone ||
//         "0000000000";

//       const senderAddress = [
//         vendorData.addresses?.street,
//         vendorData.addresses?.town,
//         vendorData.addresses?.city,
//         vendorData.addresses?.state,
//       ]
//         .filter(Boolean)
//         .join(", ");

//       const recipientAddress = [
//         address,
//         town,
//         cityName || city,
//         state,
//         zip,
//       ]
//         .filter(Boolean)
//         .join(", ");

//       const uniqueID =
//         `NZ-${Date.now()}-${index}-${vendor.businessId.slice(-6)}-${Math.random()
//           .toString(36)
//           .slice(2, 6)}`;

//       const itemDescription =
//         vendor.items
//           .map(
//             (item) =>
//               `${item.productId.name} x ${item.quantity}`
//           )
//           .join(", ");

//       const recipientState =
//         selectedFezState;
//       const pickUpState =
//         getExactFezState(
//           vendorData.addresses?.state,
//           officialFezStates
//         );

//       if (!recipientState) {
//         throw new Error(
//           "A delivery state is required for FEZ order creation."
//         );
//       }

//       if (!pickUpState) {
//         throw new Error(
//           `Seller pickup state "${vendorData.addresses?.state || "Unknown"}" is not available in FEZ's official state list for ${vendor.businessId}.`
//         );
//       }

//       const payload = {
//         recipientAddress,
//         recipientState,
//         recipientName: [
//           user?.firstname,
//           user?.lastname,
//         ]
//           .filter(Boolean)
//           .join(" "),
//         recipientPhone:
//           user?.phone ||
//           "0000000000",
//         recipientEmail:
//           user?.email ||
//           "",
//         uniqueID,
//         BatchID: batchId,
//         itemDescription,
//         additionalDetails: `Town: ${
//           town || "N/A"
//         }, City: ${
//           cityName || city || "N/A"
//         }, Order created from New Zenith Marketplace`,
//         valueOfItem: String(
//           vendorTotalValue
//         ),
//         weight: Math.max(
//           1,
//           Math.ceil(
//             Number(vendorTotalWeight) || 1
//           )
//         ),
//         pickUpState,
//         pickUpAddress: senderAddress,
//         isItemCod: false,
//         fragile: false,
//         thirdparty: true,
//         senderName,
//         senderAddress,
//         senderPhone,
//       };

//       preparedOrders.push({
//         businessId: vendor.businessId,
//         vendor,
//         vendorData,
//         uniqueID,
//         payload,
//       });
//     }

//     if (preparedOrders.length === 0) {
//       throw new Error(
//         "No FEZ orders were prepared."
//       );
//     }

//     const fezResult =
//       await axios.post(
//         "/fez/order",
//         preparedOrders.map(
//           (item) => item.payload
//         ),
//         {
//           headers: getAuthHeaders(),
//         }
//       );

//     const fezResponse: FezOrderResponse =
//       fezResult.data?.data ??
//       fezResult.data ??
//       {};

//     const orderNumbers =
//       getFezOrderNumbers(fezResponse);

//     const responseStatus =
//       String(
//         (fezResponse as any).status ??
//         ""
//       ).toLowerCase();

//     const responseMessage =
//       String(
//         (fezResponse as any).message ??
//         (fezResponse as any).Message ??
//         ""
//       );

//     if (
//       (fezResponse as any).success === false ||
//       responseStatus === "failed" ||
//       responseStatus === "failure"
//     ) {
//       throw new Error(
//         responseMessage ||
//           "FEZ shipment creation failed."
//       );
//     }

//     let successfulShipments = 0;
//     const errors: string[] = [];

//     for (const prepared of preparedOrders) {
//       const fezOrderNumber =
//         orderNumbers[prepared.uniqueID] ||
//         null;

//       try {
//         const internalOrderPayload = {
//           businessId:
//             prepared.businessId,
//           vendorId:
//             prepared.vendorData.userId?._id ||
//             prepared.vendorData.owner ||
//             prepared.vendorData._id,
//           items: prepared.vendor.items,
//           logisticsPayload:
//             prepared.payload,
//           logisticsResponse: {
//             provider: "FEZ",
//             orderNo: fezOrderNumber,
//             batchId,
//             response: fezResponse,
//           },
//           paymentReference:
//             `WALLET-${Date.now()}-${successfulShipments}`,
//           shippingMethod: "fez",
//         };

//         const dbResult =
//           await axios.post(
//             "/orders/create",
//             internalOrderPayload,
//             {
//               headers: getAuthHeaders(),
//             }
//           );

//         if (dbResult.data?.success) {
//           successfulShipments++;
//         } else {
//           errors.push(
//             `FEZ shipment created for ${
//               prepared.vendorData.businessName ||
//               prepared.vendorData.name ||
//               prepared.businessId
//             }, but internal order saving failed.`
//           );
//         }
//       } catch (error: any) {
//         errors.push(
//           `FEZ shipment created for ${
//             prepared.vendorData.businessName ||
//             prepared.vendorData.name ||
//             prepared.businessId
//           }, but internal order saving failed. ${
//             error?.response?.data?.message ||
//             error?.message ||
//             ""
//           }`
//         );
//       }
//     }

//     return {
//       successfulShipments,
//       errors,
//       batchId,
//       orderNumbers,
//     };
//   };

//   /* ------------------------------------------------------------------------ */
//   /* SUBMIT CHECKOUT                                                         */
//   /* ------------------------------------------------------------------------ */

//   const handleSubmit = async (
//     e: React.FormEvent
//   ) => {
//     e.preventDefault();

//     if (!selectedShipping) {
//       await Swal.fire(
//         "Select Shipping",
//         "Please select a shipping method.",
//         "warning"
//       );
//       return;
//     }

//     if (selectedShipping === SHIPPING_IDS.DHL) {
//       await Swal.fire(
//         "Coming Soon",
//         "DHL checkout is not available yet.",
//         "info"
//       );
//       return;
//     }

//     if (
//       ![
//         SHIPPING_IDS.REDSTAR,
//         SHIPPING_IDS.GIG,
//         SHIPPING_IDS.FEZ,
//         SHIPPING_IDS.PAY_ON_DELIVERY,
//       ].includes(selectedShipping as any)
//     ) {
//       await Swal.fire(
//         "Notice",
//         "This shipping method is not currently available.",
//         "info"
//       );
//       return;
//     }

//     const REDSTAR_API_KEY =
//       process.env
//         .NEXT_PUBLIC_REDSTAR_API_KEY;

//     const groupedVendors =
//       groupItemsByBusiness(
//         cartItems
//       );

//     if (
//       groupedVendors.length === 0
//     ) {
//       await Swal.fire(
//         "Empty basket",
//         "Your basket is empty.",
//         "warning"
//       );

//       return;
//     }

//     if (!user) {
//       await Swal.fire(
//         "Profile unavailable",
//         "Please wait for your profile to finish loading.",
//         "warning"
//       );

//       return;
//     }

//     if (!address.trim()) {
//       await Swal.fire(
//         "Address required",
//         "Please add a delivery address before checking out.",
//         "warning"
//       );

//       return;
//     }

//     if (
//       selectedShipping === SHIPPING_IDS.FEZ &&
//       !fezDestinationState
//     ) {
//       const selected =
//         await askForFezDestinationState();

//       if (!selected) {
//         return;
//       }
//     }

//     if (
//       selectedShipping !==
//         SHIPPING_IDS.PAY_ON_DELIVERY &&
//       (loadingDeliveryFee ||
//         deliveryFee2 === null ||
//         pricingError)
//     ) {
//       await Swal.fire(
//         "Delivery Fee",
//         pricingError ||
//           "Please wait for the shipping fee to finish calculating.",
//         "info"
//       );
//       return;
//     }

//     setIsSubmitting(true);

//     Swal.fire({
//       title: "Submitting Orders...",
//       text: `Processing ${groupedVendors.length} shipment(s). Please wait.`,
//       allowOutsideClick: false,
//       allowEscapeKey: false,
//       didOpen: () => {
//         Swal.showLoading();
//       },
//     });

//     if (
//       selectedShipping === SHIPPING_IDS.FEZ
//     ) {
//       try {
//         const result =
//           await createFezOrders(
//             groupedVendors
//           );

//         Swal.close();

//         if (result.successfulShipments > 0) {
//           await Swal.fire({
//             title: "Order created!",
//             text: `${result.successfulShipments} FEZ shipment(s) created successfully.`,
//             icon: "success",
//             confirmButtonColor: "#006838",
//           });

//           router.push(
//             "/user/dashboard/transaction"
//           );
//           return;
//         }

//         await Swal.fire({
//           title: "Order Failed",
//           text:
//             result.errors.join("\n") ||
//             "No FEZ shipments were created.",
//           icon: "error",
//           confirmButtonColor: "#006838",
//         });
//       } catch (error: any) {
//         Swal.close();

//         await Swal.fire({
//           title: "FEZ Order Failed",
//           text:
//             error?.response?.data?.message ||
//             error?.response?.data?.Message ||
//             error?.message ||
//             "Unable to create FEZ shipment.",
//           icon: "error",
//           confirmButtonColor: "#006838",
//         });
//       } finally {
//         setIsSubmitting(false);
//       }

//       return;
//     }

//     let successfulShipments = 0;

//     const errors: string[] = [];

//     for (
//       const vendor of groupedVendors
//     ) {
//       const vendorData =
//         vendors[
//           vendor.businessId
//         ];

//       if (
//         !vendorData ||
//         !vendorData.addresses
//       ) {
//         errors.push(
//           `Vendor data missing for ID: ${vendor.businessId}`
//         );

//         continue;
//       }

//       const vendorTotalWeight =
//         vendor.items.reduce(
//           (sum, item) =>
//             sum +
//             getProductWeight(
//               item
//             ) *
//               Number(
//                 item.quantity || 0
//               ),
//           0
//         );

//       const vendorTotalPieces =
//         vendor.items.reduce(
//           (sum, item) =>
//             sum +
//             Number(
//               item.quantity || 0
//             ),
//           0
//         );

//       const shipmentItems =
//         vendor.items.map(
//           (item) => ({
//             id: 0,
//             status: 0,
//             createdOn:
//               new Date().toISOString(),
//             createdBy:
//               user.firstname ||
//               "User",
//             shipmentId: 0,
//             commodity:
//               item.productId.name,
//             description:
//               item.productId
//                 .description,
//             countryOfManufacturing:
//               "Nigeria",
//             quantity:
//               Number(
//                 item.quantity || 0
//               ),
//             weight:
//               getProductWeight(
//                 item
//               ) *
//               Number(
//                 item.quantity || 0
//               ),
//             unitOfMeasure: 0,
//             unitOfPrice:
//               Number(
//                 item.productId
//                   .price || 0
//               ),
//           })
//         );

//       const singleRedStarPayload =
//         {
//           senderCity:
//             vendorData.addresses
//               .city ||
//             "Unknown",

//           recipientCity:
//             cityName,

//           recipientTownID:
//             parseInt(
//               townId
//             ) || 0,

//           recipientName:
//             `${user.firstname} ${user.lastname}`,

//           recipientPhoneNo:
//             user.phone ||
//             "0000000000",

//           recipientEmail:
//             user.email || "",

//           recipientAddress:
//             address,

//           recipientState:
//             state,

//           senderTownID:
//             vendorData.addresses
//               .townId || 0,

//           senderName:
//             `${vendorData.userId?.firstname || ""} ${vendorData.userId?.lastname || vendorData.name || ""}`,

//           senderAddress:
//             vendorData.addresses
//               .street ||
//             "Unknown",

//           senderPhone:
//             vendorData.userId
//               ?.phone ||
//             "0000000000",

//           orderNo:
//             `ORDER-${Date.now()}-${vendor.businessId.substring(
//               0,
//               4
//             )}`,

//           packaging:
//             "Box",

//           boxandCrating:
//             "Standard",

//           deliveryType:
//             "Door to Door",

//           description:
//             `Order from ${vendorData.name}`,

//           onforwardingLocation:
//             "",

//           paymentType:
//             "Prepaid",

//           pickupType: 1,

//           weight:
//             vendorTotalWeight,

//           pieces:
//             vendorTotalPieces,

//           cashOnDelivery: 0,

//           shipmentItems,
//         };

//       try {
//         /* -------------------------------------------------------------- */
//         /* PAY ON DELIVERY                                                */
//         /* -------------------------------------------------------------- */

//         if (
//           selectedShipping ===
//           SHIPPING_IDS.PAY_ON_DELIVERY
//         ) {
//           const internalOrderPayload =
//             {
//               businessId:
//                 vendor.businessId,

//               vendorId:
//                 vendorData.userId
//                   ?._id ||
//                 vendorData.owner ||
//                 vendorData._id,

//               items:
//                 vendor.items,

//               paymentReference:
//                 `WALLET-${Date.now()}`,

//               shippingMethod:
//                 "pay on delivery",
//             };

//           const dbResult =
//             await axios.post(
//               "/orders/create",
//               internalOrderPayload,
//               {
//                 headers:
//                   getAuthHeaders(),
//               }
//             );

//           if (
//             dbResult.data.success
//           ) {
//             successfulShipments++;
//           } else {
//             errors.push(
//               `Failed to save Pay on Delivery order for ${vendorData.name}.`
//             );
//           }
//         }

//         /* -------------------------------------------------------------- */
//         /* REDSTAR                                                        */
//         /* -------------------------------------------------------------- */

//         else {
//           const res =
//             await axios.post(
//               "/auth/PickupRequest",
//               singleRedStarPayload,
//               {
//                 headers: {
//                   "X-API-KEY":
//                     REDSTAR_API_KEY,

//                   "Content-Type":
//                     "application/json",
//                 },
//               }
//             );

//           if (
//             res.data.TransStatus ===
//             "Successful"
//           ) {
//             try {
//               const internalOrderPayload =
//                 {
//                   businessId:
//                     vendor.businessId,

//                   vendorId:
//                     vendorData.userId
//                       ?._id ||
//                     vendorData.owner ||
//                     vendorData._id,

//                   items:
//                     vendor.items,

//                   logisticsPayload:
//                     singleRedStarPayload,

//                   logisticsResponse:
//                     res.data,

//                   paymentReference:
//                     `WALLET-${Date.now()}`,
//                 };

//               const dbResult =
//                 await axios.post(
//                   "/orders/create",
//                   internalOrderPayload,
//                   {
//                     headers:
//                       getAuthHeaders(),
//                   }
//                 );

//               if (
//                 dbResult.data
//                   .success
//               ) {
//                 successfulShipments++;
//               } else {
//                 errors.push(
//                   `Shipment created for ${vendorData.name}, but failed to save internally.`
//                 );
//               }
//             } catch (
//               internalError
//             ) {
//               console.error(
//                 internalError
//               );

//               errors.push(
//                 `Shipment created for ${vendorData.name}, but failed to save internally.`
//               );
//             }
//           } else {
//             errors.push(
//               res.data.Message ||
//                 `API error for ${vendorData.name}.`
//             );
//           }
//         }
//       } catch (error: any) {
//         console.error(
//           "Checkout vendor error:",
//           error
//         );

//         errors.push(
//           `Failed for ${vendorData.name}. Error: ${
//             error?.response?.data
//               ?.Message ||
//             error?.response?.data
//               ?.message ||
//             error?.message ||
//             "Unknown error"
//           }`
//         );
//       }
//     }

//     Swal.close();
//     setIsSubmitting(false);

//     if (
//       successfulShipments > 0
//     ) {
//       await Swal.fire({
//         title: "Order created!",
//         text: `${successfulShipments} shipment(s) created successfully.`,
//         icon: "success",
//         confirmButtonColor:
//           "#006838",
//       });

//       router.push(
//         "/user/dashboard/transaction"
//       );
//     } else {
//       await Swal.fire({
//         title: "Order Failed",
//         text:
//           errors.join("\n") ||
//           "No shipments were created.",
//         icon: "error",
//         confirmButtonColor:
//           "#006838",
//       });
//     }
//   };

//   /* ------------------------------------------------------------------------ */
//   /* TOTALS                                                                  */
//   /* ------------------------------------------------------------------------ */

//   const totalPayable =
//     totalProductPrice +
//     Number(deliveryFee2 || 0);

//   const balanceDifference =
//     walletBalance -
//     totalPayable;

//   const hasSufficientBalance =
//     balanceDifference >= 0;

//   const isCheckoutReady =
//     selectedShipping.length > 0 &&
//     cartItems.length > 0 &&
//     Boolean(address.trim()) &&
//     !loadingDeliveryFee &&
//     (selectedShipping ===
//       SHIPPING_IDS.PAY_ON_DELIVERY ||
//       (deliveryFee2 !== null &&
//         !pricingError)) &&
//     !isSubmitting;

//   const selectedShippingOption =
//     shippingOptions.find(
//       (option) =>
//         option.id ===
//         selectedShipping
//     );

//   /* ------------------------------------------------------------------------ */
//   /* EMPTY CART                                                              */
//   /* ------------------------------------------------------------------------ */

//   if (
//     !loading &&
//     !cartLoading &&
//     cartItems.length === 0
//   ) {
//     return (
//       <main className="min-h-screen bg-[#f7f9f8] px-4 py-5 md:px-6 md:py-8">
//         <div className="mx-auto w-full max-w-5xl">
//           <TagHeader title="Checkout" />

//           <section className="mt-6 flex flex-col items-center justify-center rounded-[30px] border border-dashed border-gray-300 bg-white px-6 py-24 text-center shadow-sm">
//             <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-[#006838]/10 text-[#006838]">
//               <ShoppingBagOutlinedIcon
//                 sx={{ fontSize: 38 }}
//               />
//             </div>

//             <h1 className="mt-6 text-2xl font-black text-gray-900">
//               Your basket is empty
//             </h1>

//             <p className="mt-2 max-w-md text-sm leading-6 text-gray-500">
//               Add some products to your basket
//               before continuing to checkout.
//             </p>

//             <button
//               type="button"
//               onClick={() =>
//                 router.push(
//                   "/user/dashboard"
//                 )
//               }
//               className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#006838] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#00542d]"
//             >
//               Continue shopping

//               <ArrowForwardRoundedIcon
//                 sx={{ fontSize: 18 }}
//               />
//             </button>
//           </section>
//         </div>
//       </main>
//     );
//   }

//   /* ------------------------------------------------------------------------ */
//   /* RENDER                                                                  */
//   /* ------------------------------------------------------------------------ */

//   return (
//     <>
//       {showModal && (
//         <AddressModal
//           onClose={() =>
//             setShowModal(false)
//           }
//         />
//       )}

//       {showModal2 && (
//         <FundWalletModal
//           onClose={() =>
//             setShowModal2(false)
//           }
//         />
//       )}

//       {(loading || cartLoading) && (
//         <div className="fixed inset-0 z-[80] flex items-center justify-center bg-white/70 backdrop-blur-sm">
//           <CircleLoader
//             isVisible={
//               loading ||
//               cartLoading
//             }
//           />
//         </div>
//       )}

//       <main className="min-h-screen bg-[#f7f9f8]">
//         <div className="mx-auto w-full max-w-[1250px] px-4 py-5 pb-32 sm:px-5 md:px-6 lg:px-8">
//           <TagHeader title="Checkout" />

//           <div className="mt-5">
//             <CheckoutSteps />
//           </div>

//           <form
//             id="checkout-form"
//             onSubmit={handleSubmit}
//             className="grid grid-cols-1 gap-5 xl:grid-cols-[minmax(0,1fr)_370px]"
//           >
//             {/* ========================================================== */}
//             {/* LEFT COLUMN                                                 */}
//             {/* ========================================================== */}

//             <div className="min-w-0 space-y-5">
//               {/* -------------------------------------------------------- */}
//               {/* ADDRESS                                                    */}
//               {/* -------------------------------------------------------- */}

//               <section className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
//                 <SectionHeader
//                   icon={
//                     <LocationOnRoundedIcon
//                       sx={{
//                         fontSize: 20,
//                       }}
//                     />
//                   }
//                   title="Delivery address"
//                   description="Where should your order be delivered?"
//                 />

//                 <div
//                   className={`rounded-2xl border p-4 ${
//                     address
//                       ? "border-[#006838]/15 bg-[#006838]/5"
//                       : "border-amber-200 bg-amber-50"
//                   }`}
//                 >
//                   <div className="flex items-start gap-3">
//                     <div
//                       className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${
//                         address
//                           ? "bg-white text-[#006838]"
//                           : "bg-white text-amber-600"
//                       }`}
//                     >
//                       <MyLocationOutlinedIcon
//                         sx={{
//                           fontSize: 20,
//                         }}
//                       />
//                     </div>

//                     <div className="min-w-0 flex-1">
//                       <div className="flex flex-wrap items-center gap-2">
//                         <h3 className="text-sm font-bold text-gray-900">
//                           Saved address
//                         </h3>

//                         {address && (
//                           <span className="rounded-full bg-[#006838]/10 px-2 py-1 text-[10px] font-bold uppercase tracking-wide text-[#006838]">
//                             Selected
//                           </span>
//                         )}
//                       </div>

//                       {address ? (
//                         <div className="mt-2 space-y-1 text-sm leading-5 text-gray-500">
//                           <p>
//                             {address}
//                           </p>

//                           <p>
//                             {[cityName || city,
//                               town,
//                               state,
//                               zip]
//                               .filter(
//                                 Boolean
//                               )
//                               .join(
//                                 ", "
//                               )}
//                           </p>
//                         </div>
//                       ) : (
//                         <p className="mt-2 text-sm text-amber-700">
//                           No delivery address has been
//                           selected yet.
//                         </p>
//                       )}
//                     </div>

//                     <CheckOutlinedIcon
//                       sx={{
//                         fontSize: 20,
//                         color: address
//                           ? "#006838"
//                           : "#d97706",
//                       }}
//                     />
//                   </div>
//                 </div>

//                 <button
//                   type="button"
//                   onClick={() =>
//                     setShowModal(true)
//                   }
//                   className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-[#006838]/20 bg-[#006838]/5 py-3 text-sm font-bold text-[#006838] transition hover:bg-[#006838]/10"
//                 >
//                   <AddRoundedIcon
//                     sx={{
//                       fontSize: 19,
//                     }}
//                   />

//                   Add or change address
//                 </button>
//               </section>

//               {/* -------------------------------------------------------- */}
//               {/* SHIPPING METHOD                                            */}
//               {/* -------------------------------------------------------- */}

//               <section className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
//                 <SectionHeader
//                   icon={
//                     <LocalShippingOutlinedIcon
//                       sx={{
//                         fontSize: 21,
//                       }}
//                     />
//                   }
//                   title="Shipping method"
//                   description="Choose how your order should be delivered."
//                 />

//                 <div className="space-y-3">
//                   {shippingOptions.map(
//                     (provider) => {
//                       const selected =
//                         selectedShipping ===
//                         provider.id;

//                       return (
//                         <button
//                           key={provider.id}
//                           type="button"
//                           disabled={
//                             !provider.available
//                           }
//                           onClick={() =>
//                             selectShipping(
//                               provider.id
//                             )
//                           }
//                           className={`
//                             group
//                             flex
//                             w-full
//                             items-center
//                             gap-4
//                             rounded-2xl
//                             border
//                             p-4
//                             text-left
//                             transition-all
//                             duration-200
//                             ${
//                               selected
//                                 ? "border-[#006838] bg-[#006838]/5 ring-4 ring-[#006838]/5"
//                                 : provider.available
//                                 ? "border-gray-200 bg-white hover:border-[#006838]/25 hover:bg-gray-50"
//                                 : "cursor-not-allowed border-gray-100 bg-gray-50 opacity-65"
//                             }
//                           `}
//                         >
//                           {/* Logo */}

//                           <div
//                             className={`
//                               flex
//                               h-14
//                               w-20
//                               shrink-0
//                               items-center
//                               justify-center
//                               rounded-xl
//                               ${
//                                 selected
//                                   ? "bg-white"
//                                   : "bg-gray-50"
//                               }
//                             `}
//                           >
//                             {provider.externalLogo ? (
//                               <img
//                                 src={provider.logo}
//                                 alt={provider.name}
//                                 width={provider.width}
//                                 height={provider.height}
//                                 className="max-h-10 w-auto object-contain"
//                               />
//                             ) : (
//                               <Image
//                                 src={provider.logo}
//                                 alt={provider.name}
//                                 width={provider.width}
//                                 height={provider.height}
//                                 className="max-h-10 w-auto object-contain"
//                               />
//                             )}
//                           </div>

//                           {/* Details */}

//                           <div className="min-w-0 flex-1">
//                             <div className="flex flex-wrap items-center gap-2">
//                               <p className="text-sm font-bold text-gray-900">
//                                 {
//                                   provider.name
//                                 }
//                               </p>

//                               <span
//                                 className={`rounded-full px-2 py-1 text-[9px] font-bold uppercase tracking-wide ${
//                                   selected
//                                     ? "bg-[#006838]/10 text-[#006838]"
//                                     : provider.available
//                                     ? "bg-gray-100 text-gray-500"
//                                     : "bg-gray-200 text-gray-500"
//                                 }`}
//                               >
//                                 {
//                                   provider.badge
//                                 }
//                               </span>
//                             </div>

//                             <p className="mt-1 text-xs leading-5 text-gray-500">
//                               {
//                                 provider.description
//                               }
//                             </p>
//                           </div>

//                           {/* Radio */}

//                           <span
//                             className={`
//                               flex
//                               h-6
//                               w-6
//                               shrink-0
//                               items-center
//                               justify-center
//                               rounded-full
//                               border-2
//                               transition
//                               ${
//                                 selected
//                                   ? "border-[#006838] bg-[#006838]"
//                                   : "border-gray-300 bg-white"
//                               }
//                             `}
//                           >
//                             {selected && (
//                               <span className="h-2.5 w-2.5 rounded-full bg-white" />
//                             )}
//                           </span>
//                         </button>
//                       );
//                     }
//                   )}
//                 </div>
//               </section>

//               {/* -------------------------------------------------------- */}
//               {/* SHIPPING PRICE                                             */}
//               {/* -------------------------------------------------------- */}

//               <section className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
//                 <SectionHeader
//                   icon={
//                     <AccountBalanceWalletOutlinedIcon
//                       sx={{
//                         fontSize: 21,
//                       }}
//                     />
//                   }
//                   title="Order total"
//                   description="Review your product and shipping costs."
//                 />

//                 <div className="rounded-2xl bg-gray-50 p-4">
//                   {selectedShipping ===
//                   SHIPPING_IDS.PAY_ON_DELIVERY ? (
//                     <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4">
//                       <div className="flex items-start gap-3">
//                         <WarningAmberRoundedIcon
//                           sx={{
//                             color:
//                               "#d97706",
//                             fontSize: 20,
//                           }}
//                         />

//                         <div>
//                           <p className="text-sm font-bold text-amber-900">
//                             Pay on Delivery
//                           </p>

//                           <p className="mt-1 text-xs leading-5 text-amber-700">
//                             Shipping fees will be
//                             confirmed through
//                             WhatsApp or phone
//                             before delivery.
//                           </p>
//                         </div>
//                       </div>
//                     </div>
//                   ) : (
//                     <div className="flex items-center justify-between gap-4">
//                       <span className="text-sm text-gray-500">
//                         Shipping fee
//                       </span>

//                       <span className="text-sm font-bold text-gray-900">
//                         {loadingDeliveryFee ? (
//                           <span className="inline-flex items-center gap-2 text-[#006838]">
//                             <span className="h-4 w-4 animate-spin rounded-full border-2 border-[#006838]/20 border-t-[#006838]" />
//                             Calculating...
//                           </span>
//                         ) : [
//                             SHIPPING_IDS.REDSTAR,
//                             SHIPPING_IDS.GIG,
//                             SHIPPING_IDS.FEZ,
//                           ].includes(
//                             selectedShipping as any
//                           ) ? (
//                           formatCurrency(
//                             deliveryFee2
//                           )
//                         ) : (
//                           "Select a shipping method"
//                         )}
//                       </span>
//                     </div>
//                   )}

//                   {pricingError &&
//                     selectedShipping !==
//                       SHIPPING_IDS.PAY_ON_DELIVERY && (
//                       <p className="mt-2 text-right text-xs font-medium text-red-600">
//                         {pricingError}
//                       </p>
//                     )}

//                   <div className="mt-4 flex items-center justify-between border-t border-gray-200 pt-4">
//                     <span className="text-sm font-medium text-gray-500">
//                       Product subtotal
//                     </span>

//                     <span className="font-bold text-gray-800">
//                       {formatCurrency(
//                         totalProductPrice
//                       )}
//                     </span>
//                   </div>

//                   <div className="mt-3 flex items-center justify-between">
//                     <span className="text-base font-black text-gray-900">
//                       Total payable
//                     </span>

//                     <span className="text-xl font-black text-[#006838]">
//                       {formatCurrency(
//                         totalPayable
//                       )}
//                     </span>
//                   </div>
//                 </div>
//               </section>

//               {/* -------------------------------------------------------- */}
//               {/* BASKET PREVIEW                                             */}
//               {/* -------------------------------------------------------- */}

//               {vendorGroups.length >
//                 0 && (
//                 <section className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
//                   <SectionHeader
//                     icon={
//                       <ShoppingBagOutlinedIcon
//                         sx={{
//                           fontSize: 20,
//                         }}
//                       />
//                     }
//                     title="Basket summary"
//                     description={`${cartItems.length} line ${
//                       cartItems.length ===
//                       1
//                         ? "item"
//                         : "items"
//                     } from ${
//                       vendorGroups.length
//                     } ${
//                       vendorGroups.length ===
//                       1
//                         ? "business"
//                         : "businesses"
//                     }`}
//                   />

//                   <div className="space-y-4">
//                     {vendorGroups.map(
//                       (group) => (
//                         <div
//                           key={
//                             group.businessId
//                           }
//                           className="overflow-hidden rounded-2xl border border-gray-100"
//                         >
//                           <div className="flex items-center justify-between gap-3 bg-gray-50 px-4 py-3">
//                             <div className="flex min-w-0 items-center gap-2">
//                               <StorefrontRoundedIcon
//                                 sx={{
//                                   fontSize: 17,
//                                   color:
//                                     "#006838",
//                                 }}
//                               />

//                               <p className="truncate text-xs font-bold text-gray-800">
//                                 {group
//                                   .vendor
//                                   ?.name ||
//                                   group
//                                     .vendor
//                                     ?.businessName ||
//                                   "Business"}
//                               </p>
//                             </div>

//                             <span className="shrink-0 text-xs font-bold text-[#006838]">
//                               {formatCurrency(
//                                 group.total
//                               )}
//                             </span>
//                           </div>

//                           <div className="divide-y divide-gray-100">
//                             {group.items.map(
//                               (
//                                 item
//                               ) => (
//                                 <div
//                                   key={
//                                     item
//                                       .productId
//                                       ._id
//                                   }
//                                   className="flex items-center gap-3 px-4 py-3"
//                                 >
//                                   <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-xl bg-gray-100">
//                                     {item
//                                       .productId
//                                       .images
//                                       ?.length ? (
//                                       <Image
//                                         src={
//                                           item
//                                             .productId
//                                             .images[0]
//                                         }
//                                         alt={
//                                           item
//                                             .productId
//                                             .name
//                                         }
//                                         fill
//                                         sizes="48px"
//                                         className="object-cover"
//                                       />
//                                     ) : (
//                                       <div className="flex h-full w-full items-center justify-center text-gray-300">
//                                         <ShoppingBagOutlinedIcon
//                                           sx={{
//                                             fontSize:
//                                               20,
//                                           }}
//                                         />
//                                       </div>
//                                     )}
//                                   </div>

//                                   <div className="min-w-0 flex-1">
//                                     <p className="truncate text-xs font-bold text-gray-800">
//                                       {
//                                         item
//                                           .productId
//                                           .name
//                                       }
//                                     </p>

//                                     <p className="mt-0.5 text-[11px] text-gray-400">
//                                       Qty:{" "}
//                                       {
//                                         item.quantity
//                                       }
//                                     </p>
//                                   </div>

//                                   <p className="shrink-0 text-xs font-bold text-gray-700">
//                                     {formatCurrency(
//                                       getProductTotal(
//                                         item
//                                       )
//                                     )}
//                                   </p>
//                                 </div>
//                               )
//                             )}
//                           </div>
//                         </div>
//                       )
//                     )}
//                   </div>
//                 </section>
//               )}

//               {/* -------------------------------------------------------- */}
//               {/* WALLET MOBILE                                             */}
//               {/* -------------------------------------------------------- */}

//               <div className="xl:hidden">
//                 <WalletSummaryCard
//                   walletBalance={
//                     walletBalance
//                   }
//                   totalPayable={
//                     totalPayable
//                   }
//                   balanceDifference={
//                     balanceDifference
//                   }
//                   hasSufficientBalance={
//                     hasSufficientBalance
//                   }
//                   loadingDeliveryFee={
//                     loadingDeliveryFee
//                   }
//                   isSubmitting={
//                     isSubmitting
//                   }
//                   canCheckout={
//                     isCheckoutReady
//                   }
//                   onCheckout={() =>
//                     document
//                       .getElementById(
//                         "checkout-submit"
//                       )
//                       ?.click()
//                   }
//                   onFund={() =>
//                     setShowModal2(true)
//                   }
//                 />
//               </div>
//             </div>

//             {/* ========================================================== */}
//             {/* RIGHT SUMMARY                                               */}
//             {/* ========================================================== */}

//             <aside className="hidden xl:block">
//               <div className="sticky top-5 space-y-4">
//                 <WalletSummaryCard
//                   walletBalance={
//                     walletBalance
//                   }
//                   totalPayable={
//                     totalPayable
//                   }
//                   balanceDifference={
//                     balanceDifference
//                   }
//                   hasSufficientBalance={
//                     hasSufficientBalance
//                   }
//                   loadingDeliveryFee={
//                     loadingDeliveryFee
//                   }
//                   isSubmitting={
//                     isSubmitting
//                   }
//                   canCheckout={
//                     isCheckoutReady
//                   }
//                   onCheckout={() =>
//                     document
//                       .getElementById(
//                         "checkout-submit"
//                       )
//                       ?.click()
//                   }
//                   onFund={() =>
//                     setShowModal2(true)
//                   }
//                 />

//                 <div className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm">
//                   <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-gray-400">
//                     Delivery
//                   </p>

//                   <div className="mt-4 flex items-center gap-3">
//                     <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#006838]/10 text-[#006838]">
//                       <LocalShippingOutlinedIcon />
//                     </div>

//                     <div className="min-w-0">
//                       <p className="truncate text-sm font-bold text-gray-900">
//                         {selectedShippingOption
//                           ?.name ||
//                           "No method selected"}
//                       </p>

//                       <p className="mt-1 text-xs text-gray-500">
//                         {selectedShipping
//                           ? "Shipping method selected"
//                           : "Choose a shipping method"}
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </aside>
//           </form>
//         </div>
//       </main>

//       {/* Hidden submit button so the same existing form submission flow
//           is used by both mobile and desktop summary buttons. */}

//       <button
//         id="checkout-submit"
//         type="submit"
//         formNoValidate
//         className="hidden"
//         disabled={!isCheckoutReady}
//         form="checkout-form"
//       />
//     </>
//   );
// };

// /* -------------------------------------------------------------------------- */
// /*                          WALLET SUMMARY CARD                               */
// /* -------------------------------------------------------------------------- */

// interface WalletSummaryCardProps {
//   walletBalance: number;
//   totalPayable: number;
//   balanceDifference: number;
//   hasSufficientBalance: boolean;
//   loadingDeliveryFee: boolean;
//   isSubmitting: boolean;
//   canCheckout: boolean;
//   onCheckout: () => void;
//   onFund: () => void;
// }

// const WalletSummaryCard = ({
//   walletBalance,
//   totalPayable,
//   balanceDifference,
//   hasSufficientBalance,
//   loadingDeliveryFee,
//   isSubmitting,
//   canCheckout,
//   onCheckout,
//   onFund,
// }: WalletSummaryCardProps) => {
//   return (
//     <section
//       className={`rounded-3xl border p-5 shadow-sm ${
//         hasSufficientBalance
//           ? "border-emerald-200 bg-white"
//           : "border-red-200 bg-white"
//       }`}
//     >
//       <div className="flex items-center gap-3">
//         <div
//           className={`flex h-11 w-11 items-center justify-center rounded-xl ${
//             hasSufficientBalance
//               ? "bg-emerald-50 text-emerald-600"
//               : "bg-red-50 text-red-600"
//           }`}
//         >
//           <AccountBalanceWalletOutlinedIcon />
//         </div>

//         <div>
//           <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-gray-400">
//             Wallet
//           </p>

//           <h2 className="text-base font-black text-gray-900">
//             Payment summary
//           </h2>
//         </div>
//       </div>

//       <div className="mt-5 space-y-3">
//         <div className="flex items-center justify-between text-sm">
//           <span className="text-gray-500">
//             Account balance
//           </span>

//           <span className="font-bold text-gray-900">
//             {formatCurrency(
//               walletBalance
//             )}
//           </span>
//         </div>

//         <div className="flex items-center justify-between text-sm">
//           <span className="text-gray-500">
//             Total payable
//           </span>

//           <span className="font-bold text-gray-900">
//             {formatCurrency(
//               totalPayable
//             )}
//           </span>
//         </div>

//         <div
//           className={`rounded-2xl p-4 ${
//             hasSufficientBalance
//               ? "bg-emerald-50"
//               : "bg-red-50"
//           }`}
//         >
//           <p
//             className={`text-[10px] font-bold uppercase tracking-wider ${
//               hasSufficientBalance
//                 ? "text-emerald-600"
//                 : "text-red-600"
//             }`}
//           >
//             {hasSufficientBalance
//               ? "Remaining balance"
//               : "Amount short"}
//           </p>

//           <p
//             className={`mt-1 text-xl font-black ${
//               hasSufficientBalance
//                 ? "text-emerald-700"
//                 : "text-red-700"
//             }`}
//           >
//             {formatCurrency(
//               Math.abs(
//                 balanceDifference
//               )
//             )}
//           </p>
//         </div>
//       </div>

//       {hasSufficientBalance ? (
//         <button
//           type="button"
//           onClick={onCheckout}
//           disabled={
//             isSubmitting ||
//             loadingDeliveryFee ||
//             !canCheckout
//           }
//           className="mt-5 flex w-full items-center justify-center gap-2 rounded-2xl bg-[#006838] py-4 text-sm font-bold text-white shadow-lg shadow-[#006838]/10 transition hover:bg-[#00542d] disabled:cursor-not-allowed disabled:bg-gray-300 disabled:shadow-none"
//         >
//           {isSubmitting ? (
//             <>
//               <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
//               Processing...
//             </>
//           ) : (
//             <>
//               Checkout
//               <ArrowForwardRoundedIcon
//                 sx={{ fontSize: 18 }}
//               />
//             </>
//           )}
//         </button>
//       ) : (
//         <button
//           type="button"
//           onClick={onFund}
//           className="mt-5 flex w-full items-center justify-center gap-2 rounded-2xl bg-red-600 py-4 text-sm font-bold text-white transition hover:bg-red-700"
//         >
//           Fund wallet
//           <ArrowForwardRoundedIcon
//             sx={{ fontSize: 18 }}
//           />
//         </button>
//       )}
//     </section>
//   );
// };

// export default CheckoutShipping;
"use client";

import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import { useRouter } from "next/navigation";
import Image from "next/image";

import axios from "@/utils/axios";
import Swal from "sweetalert2";

// Icons & Components
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import MyLocationOutlinedIcon from "@mui/icons-material/MyLocationOutlined";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import LocationOnRoundedIcon from "@mui/icons-material/LocationOnRounded";
import StorefrontRoundedIcon from "@mui/icons-material/StorefrontRounded";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import RefreshRoundedIcon from "@mui/icons-material/RefreshRounded";
import WarningAmberRoundedIcon from "@mui/icons-material/WarningAmberRounded";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import RemoveRoundedIcon from "@mui/icons-material/RemoveRounded";

import TagHeader from "@/components/header/TagHeader";
import CircleLoader from "@/components/loader/loader";
import AddressModal from "./AddressModal";
import FundWalletModal from "../../../../wallet/components/FundWalletModal";

// Assets
import DHLLOGO from "@/assets/images/dhl-express-logo-black.png";
import PAYONDELIVERYLOGO from "@/assets/images/cash-on-delivery.png";
import FEDEXLOGO from "@/assets/images/fedex-logo.png";
import GIGLOGO from "@/assets/images/gig-logo.png";
import REDSTAR from "@/assets/images/redstar.png";

/* -------------------------------------------------------------------------- */
/*                                   TYPES                                    */
/* -------------------------------------------------------------------------- */

interface User {
  firstname: string;
  lastname: string;
  email: string;
  accountType: "buyer" | "seller";
  street: string;
  phone: string;

  addresses?: {
    town?: string;
    city?: string;
    state?: string;
    zip?: string;
    street?: string;
    townId?: string | number;
    cityName?: string;
  };
}

interface Product {
  _id: string;
  name: string;
  weight?: number;
  price?: number;
  businessId: string;
  description: string;
  quantityInfo?: {
    weight?: number;
  };

  images?: string[];
}

interface CartItem {
  productId: Product;
  quantity: number;
}

interface VendorPayload {
  businessId: string;
  items: CartItem[];
}

interface GeoLocation {
  latitude: number;
  longitude: number;
}

interface GIGShipmentItem {
  ItemName: string;
  Description: string;
  Quantity: number;
  Weight: number;
  IsVolumetric: boolean;
  ShipmentType: number;
  Value: number;
}

interface GIGPayload {
  SenderStationId: number;
  ReceiverStationId: number;
  VehicleType: number;

  SenderLocation: GeoLocation | null;
  ReceiverLocation: GeoLocation | null;

  CustomerCode: string;
  CustomerType: number;
  PickUpOptions: number;

  ShipmentItems: GIGShipmentItem[];

  IsFromAgility: boolean;
  Value: number;
  DeliveryOptionIds: number[];
}

interface FezCostItem {
  state?: string;
  cost?: string | number;
}

interface FezState {
  id: number;
  state: string;
}

interface FezOrderResponse {
  status?: string;
  success?: boolean;
  message?: string;
  orderNos?: Record<string, string>;
  data?: unknown;
}

/* -------------------------------------------------------------------------- */
/*                                  CONSTANTS                                 */
/* -------------------------------------------------------------------------- */

const ALL_VEHICLE_TYPE = {
  CAR: 0,
  BIKE: 1,
  VAN: 2,
  TRUCK: 3,
};

const GIG_VEHICLE_TYPES = {
  BIKE: 1,
  VAN: 2,
  TRUCK: 3,
};

const WEIGHT_THRESHOLDS = [
  {
    max: 10,
    type: ALL_VEHICLE_TYPE.BIKE,
  },
  {
    max: 50,
    type: ALL_VEHICLE_TYPE.CAR,
  },
  {
    max: 500,
    type: ALL_VEHICLE_TYPE.VAN,
  },
  {
    max: Infinity,
    type: ALL_VEHICLE_TYPE.TRUCK,
  },
];

const GIG_WEIGHT_THRESHOLDS = [
  {
    max: 10,
    type: GIG_VEHICLE_TYPES.BIKE,
  },
  {
    max: 500,
    type: GIG_VEHICLE_TYPES.VAN,
  },
  {
    max: Infinity,
    type: GIG_VEHICLE_TYPES.TRUCK,
  },
];

const SHIPPING_IDS = {
  REDSTAR: "redstar",
  FEZ: "fez",
  GIG: "gig",
  DHL: "dhl",
  PAY_ON_DELIVERY: "pay on delivery",
} as const;

const PROCESSING_FEE_RATE = 1.65 / 100;

/*
 * The endpoint/payload remain the same as the previous GIG integration.
 * Store the existing value in your environment instead of hard-coding it.
 */
const GIG_ACCESS_TOKEN =
  process.env.NEXT_PUBLIC_GIG_ACCESS_TOKEN || "";

/* -------------------------------------------------------------------------- */
/*                             HELPER FUNCTIONS                               */
/* -------------------------------------------------------------------------- */

const groupItemsByBusiness = (
  items: CartItem[]
): VendorPayload[] => {
  const groups: Record<
    string,
    CartItem[]
  > = {};

  for (const item of items) {
    const businessId =
      item?.productId?.businessId;

    if (!businessId) {
      continue;
    }

    if (!groups[businessId]) {
      groups[businessId] = [];
    }

    groups[businessId].push(item);
  }

  return Object.entries(groups).map(
    ([businessId, groupedItems]) => ({
      businessId,
      items: groupedItems,
    })
  );
};

const getCoordinates = async (
  address: string
): Promise<{
  Latitude: number;
  Longitude: number;
} | null> => {
  if (!address?.trim()) {
    return null;
  }

  const apiKey =
    process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  if (!apiKey) {
    console.error(
      "NEXT_PUBLIC_GOOGLE_MAPS_API_KEY is not configured."
    );

    return null;
  }

  const url =
    `https://maps.googleapis.com/maps/api/geocode/json` +
    `?address=${encodeURIComponent(address)}` +
    `&key=${apiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (
      data.status === "OK" &&
      data.results?.length > 0
    ) {
      const { lat, lng } =
        data.results[0].geometry.location;

      return {
        Latitude: lat,
        Longitude: lng,
      };
    }

    return null;
  } catch (error) {
    console.error(
      "Geocoding error:",
      error
    );

    return null;
  }
};

const normalizeNigeriaState = (
  value?: string | null
): string => {
  const normalized = String(value || "")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, " ")
    .replace(/\s+state$/i, "")
    .replace(/^state of\s+/i, "");

  const aliases: Record<string, string> = {
    abuja: "FCT",
    "fct abuja": "FCT",
    fct: "FCT",
    "federal capital territory": "FCT",
    "abuja municipal": "FCT",
    akwaibom: "Akwa Ibom",
    "akwa ibom": "Akwa Ibom",
    bayelsa: "Bayelsa",
    benue: "Benue",
    borno: "Borno",
    "cross river": "Cross River",
    delta: "Delta",
    ebonyi: "Ebonyi",
    edo: "Edo",
    ekiti: "Ekiti",
    enugu: "Enugu",
    gombe: "Gombe",
    imo: "Imo",
    jigawa: "Jigawa",
    kano: "Kano",
    katsina: "Katsina",
    kebbi: "Kebbi",
    kogi: "Kogi",
    kwara: "Kwara",
    lagos: "Lagos",
    nasarawa: "Nasarawa",
    niger: "Niger",
    ogun: "Ogun",
    ondo: "Ondo",
    osun: "Osun",
    oyo: "Oyo",
    plateau: "Plateau",
    rivers: "Rivers",
    sokoto: "Sokoto",
    taraba: "Taraba",
    yobe: "Yobe",
    zamfara: "Zamfara",
    kaduna: "Kaduna",
    "rivers state": "Rivers",
    "lagos state": "Lagos",
    "akwa ibom state": "Akwa Ibom",
  };

  if (!normalized) {
    return "";
  }

  if (aliases[normalized]) {
    return aliases[normalized];
  }

  return normalized
    .split(" ")
    .filter(Boolean)
    .map(
      (part) =>
        part.charAt(0).toUpperCase() +
        part.slice(1)
    )
    .join(" ");
};

// const getFezCostItems = (
//   response: unknown
// ): FezCostItem[] => {
//   const visit = (value: unknown): FezCostItem[] => {
//     if (Array.isArray(value)) {
//       const items = value.filter(
//         (item): item is FezCostItem =>
//           Boolean(item) &&
//           typeof item === "object" &&
//           ("cost" in item || "state" in item)
//       );

//       if (items.length > 0) {
//         return items;
//       }

//       for (const item of value) {
//         const nested = visit(item);
//         if (nested.length > 0) {
//           return nested;
//         }
//       }

//       return [];
//     }

//     if (!value || typeof value !== "object") {
//       return [];
//     }

//     const record = value as Record<string, unknown>;

//     for (const key of [
//       "Cost",
//       "cost",
//       "Costs",
//       "costs",
//       "data",
//       "result",
//       "response",
//     ]) {
//       if (!(key in record)) {
//         continue;
//       }

//       const nested = visit(record[key]);
//       if (nested.length > 0) {
//         return nested;
//       }
//     }

//     return [];
//   };

//   return visit(response);
// };
interface FezCostItem {
  state?: string;
  cost?: string | number;
}

const getFezCostItems = (
  response: unknown
): FezCostItem[] => {
  const isCostItem = (
    value: unknown
  ): value is FezCostItem => {
    if (
      !value ||
      typeof value !== "object"
    ) {
      return false;
    }

    const record =
      value as Record<string, unknown>;

    return (
      typeof record.state === "string" &&
      (
        typeof record.cost === "number" ||
        typeof record.cost === "string"
      )
    );
  };

  const visit = (
    value: unknown
  ): FezCostItem[] => {
    // Handle arrays
    if (Array.isArray(value)) {
      const directItems = value.filter(
        isCostItem
      );

      if (directItems.length > 0) {
        return directItems;
      }

      for (const item of value) {
        const nested = visit(item);

        if (nested.length > 0) {
          return nested;
        }
      }

      return [];
    }

    // Handle single FEZ cost object
    if (isCostItem(value)) {
      return [value];
    }

    if (
      !value ||
      typeof value !== "object"
    ) {
      return [];
    }

    const record =
      value as Record<string, unknown>;

    // Search known FEZ wrapper properties
    for (const key of [
      "Cost",
      "cost",
      "Costs",
      "costs",
      "data",
      "result",
      "response",
    ]) {
      if (!(key in record)) {
        continue;
      }

      const nested = visit(
        record[key]
      );

      if (nested.length > 0) {
        return nested;
      }
    }

    return [];
  };

  return visit(response);
};
const getExactFezState = (
  value: string | null | undefined,
  states: FezState[]
): string => {
  const normalized = normalizeNigeriaState(
    value
  );

  if (!normalized) {
    return "";
  }

  return (
    states.find(
      (item) =>
        normalizeNigeriaState(
          item.state
        ) === normalized
    )?.state || ""
  );
};

const getFezOrderNumbers = (
  response: unknown
): Record<string, string> => {
  const visit = (value: unknown): Record<string, string> | null => {
    if (!value || typeof value !== "object" || Array.isArray(value)) {
      return null;
    }

    const record = value as Record<string, unknown>;

    for (const key of [
      "orderNos",
      "OrderNos",
      "ordernos",
    ]) {
      const candidate = record[key];

      if (
        candidate &&
        typeof candidate === "object" &&
        !Array.isArray(candidate)
      ) {
        const entries = Object.entries(
          candidate as Record<string, unknown>
        ).filter(([, orderNo]) =>
          Boolean(orderNo)
        );

        if (entries.length > 0) {
          return Object.fromEntries(
            entries.map(([uniqueId, orderNo]) => [
              uniqueId,
              String(orderNo),
            ])
          );
        }
      }
    }

    for (const child of Object.values(record)) {
      const nested = visit(child);
      if (nested) {
        return nested;
      }
    }

    return null;
  };

  return visit(response) || {};
};

const formatCurrency = (
  amount: number | null | undefined
) => {
  const value = Number(amount || 0);

  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(value);
};

const getProductWeight = (
  item: CartItem
) => {
  return Number(
    item.productId.quantityInfo
      ?.weight ??
      item.productId.weight ??
      1
  );
};

const getProductTotal = (
  item: CartItem
) => {
  return (
    Number(item.productId.price || 0) *
    Number(item.quantity || 0)
  );
};

/* -------------------------------------------------------------------------- */
/*                         SHIPPING OPTIONS                                   */
/* -------------------------------------------------------------------------- */

const shippingOptions = [
  {
    id: SHIPPING_IDS.REDSTAR,
    name: "Red Star Logistics",
    description:
      "Door-to-door delivery with live pricing.",
    logo: REDSTAR,
    width: 120,
    height: 24,
    available: true,
    badge: "Recommended",
  },

  {
    id: SHIPPING_IDS.PAY_ON_DELIVERY,
    name: "Pay on Delivery",
    description:
      "Shipping fee will be confirmed separately.",
    logo: PAYONDELIVERYLOGO,
    width: 105,
    height: 72,
    available: true,
    badge: "Available",
  },

  {
    id: SHIPPING_IDS.FEZ,
    name: "Fez Logistics",
    description:
      "Reliable nationwide delivery with live pricing.",
    logo:
      "https://res.cloudinary.com/dq8f0jdgt/image/upload/v1773458882/64708f8629b92d48d4457146_fez_logo_qwnrhz.svg",
    width: 120,
    height: 24,
    available: true,
    badge: "Available",
    externalLogo: true,
  },

  {
    id: SHIPPING_IDS.GIG,
    name: "GIG Logistics",
    description:
      "Coming soon.",
    logo: GIGLOGO,
    width: 70,
    height: 24,
    available: false,
    badge: "Coming soon",
  },

  {
    id: SHIPPING_IDS.DHL,
    name: "DHL Express",
    description:
      "Coming soon.",
    logo: DHLLOGO,
    width: 100,
    height: 24,
    available: false,
    badge: "Coming soon",
  },
];

/* -------------------------------------------------------------------------- */
/*                              STEP INDICATOR                                */
/* -------------------------------------------------------------------------- */

const CheckoutSteps = () => {
  return (
    <div className="mb-7 overflow-x-auto">
      <div className="mx-auto flex min-w-[430px] items-start justify-between">
        {/* Step 1 */}

        <div className="flex min-w-[110px] flex-col items-center">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#C4EDDA] text-[#006838]">
            <CheckOutlinedIcon
              sx={{ fontSize: 19 }}
            />
          </div>

          <p className="mt-2 text-xs font-bold text-gray-700">
            Your bag
          </p>
        </div>

        {/* Connector */}

        <div className="mt-[17px] h-[2px] flex-1 bg-[#006838]/20">
          <div className="h-full w-full bg-[#006838]" />
        </div>

        {/* Step 2 */}

        <div className="flex min-w-[110px] flex-col items-center">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#006838] text-white shadow-[0_0_0_5px_rgba(0,104,56,0.08)]">
            2
          </div>

          <p className="mt-2 text-xs font-bold text-[#006838]">
            Shipping
          </p>
        </div>

        {/* Connector */}

        <div className="mt-[17px] h-[2px] flex-1 bg-gray-200" />

        {/* Step 3 */}

        <div className="flex min-w-[110px] flex-col items-center">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-sm font-bold text-gray-400">
            3
          </div>

          <p className="mt-2 text-xs font-bold text-gray-400">
            Payment
          </p>
        </div>
      </div>
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/*                            SECTION HEADER                                  */
/* -------------------------------------------------------------------------- */

const SectionHeader = ({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description?: string;
}) => {
  return (
    <div className="mb-5 flex items-start gap-3">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#006838]/10 text-[#006838]">
        {icon}
      </div>

      <div>
        <h2 className="text-base font-black text-gray-900">
          {title}
        </h2>

        {description && (
          <p className="mt-1 text-xs leading-5 text-gray-500">
            {description}
          </p>
        )}
      </div>
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/*                           LOADING SKELETON                                 */
/* -------------------------------------------------------------------------- */

const CheckoutSkeleton = () => {
  return (
    <div className="space-y-5">
      <div className="h-7 w-40 animate-pulse rounded bg-gray-100" />

      <div className="h-28 animate-pulse rounded-3xl bg-gray-100" />

      <div className="h-64 animate-pulse rounded-3xl bg-gray-100" />

      <div className="h-48 animate-pulse rounded-3xl bg-gray-100" />
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/*                        CHECKOUT SHIPPING COMPONENT                         */
/* -------------------------------------------------------------------------- */

const CheckoutShipping: React.FC = () => {
  const router = useRouter();

  /* ------------------------------------------------------------------------ */
  /* STATE                                                                    */
  /* ------------------------------------------------------------------------ */

  const [
    selectedShipping,
    setSelectedShipping,
  ] = useState("");

  const [address, setAddress] =
    useState("");

  const [city, setCity] =
    useState("");

  const [cityName, setCityName] =
    useState("");

  const [state, setState] =
    useState("");

  const [zip, setZip] =
    useState("");

  const [town, setTown] =
    useState("");

  const [townId, setTownId] =
    useState("");

  const [walletBalance, setWalletBalance] =
    useState(0);

  const [showModal, setShowModal] =
    useState(false);

  const [showModal2, setShowModal2] =
    useState(false);

  const [isSubmitting, setIsSubmitting] =
    useState(false);

  const [loading, setLoading] =
    useState(true);

  const [cartLoading, setCartLoading] =
    useState(true);

  const [
    loadingDeliveryFee,
    setLoadingDeliveryFee,
  ] = useState(false);

  const [user, setUser] =
    useState<User | null>(null);

  const [cartItems, setCartItems] =
    useState<CartItem[]>([]);

  const [groupedItems, setGroupedItems] =
    useState<Record<
      string,
      CartItem[]
    >>(() => ({}));

  const [vendors, setVendors] =
    useState<Record<string, any>>(
      () => ({})
    );

  const [weight, setWeight] =
    useState(0);

  const [
    totalProductPrice,
    setTotalProductPrice,
  ] = useState(0);

  const [
    deliveryFee,
    setDeliveryFee,
  ] = useState<number | null>(null);

  const [
    deliveryFee2,
    setDeliveryFee2,
  ] = useState<number | null>(null);

  const [pricingError, setPricingError] =
    useState<string | null>(null);

  const pricingRequestRef =
    useRef(0);

  const [fezStates, setFezStates] =
    useState<FezState[]>([]);

  const [
    fezDestinationState,
    setFezDestinationState,
  ] = useState("");

  /* ------------------------------------------------------------------------ */
  /* AUTH HEADER                                                              */
  /* ------------------------------------------------------------------------ */

  const getAuthHeaders = useCallback(() => {
    const token =
      localStorage.getItem("userToken");

    return {
      Authorization: `Bearer ${token}`,
    };
  }, []);

  /* ------------------------------------------------------------------------ */
  /* FEZ STATES                                                              */
  /* ------------------------------------------------------------------------ */

  const fetchFezStates = useCallback(
    async (): Promise<FezState[]> => {
      const response = await axios.get(
        "/fez/states",
        {
          headers: getAuthHeaders(),
        }
      );

      const states =
        response.data?.states ??
        response.data?.data?.states ??
        [];

      if (!Array.isArray(states)) {
        throw new Error(
          "FEZ returned an invalid states response."
        );
      }

      const normalizedStates: FezState[] =
        states
          .map((item: any) => ({
            id: Number(item?.id),
            state: String(item?.state || "").trim(),
          }))
          .filter(
            (item: FezState) =>
              Number.isFinite(item.id) &&
              Boolean(item.state)
          );

      setFezStates(normalizedStates);
      return normalizedStates;
    },
    [getAuthHeaders]
  );

  const askForFezDestinationState =
    useCallback(async (): Promise<boolean> => {
      try {
        let states = fezStates;

        if (states.length === 0) {
          states = await fetchFezStates();
        }

        if (states.length === 0) {
          await Swal.fire(
            "FEZ States Unavailable",
            "We could not load FEZ's official Nigerian states. Please try again.",
            "error"
          );
          return false;
        }

        const inputOptions: Record<string, string> = {};

        for (const item of states) {
          inputOptions[item.state] = item.state;
        }

        const result = await Swal.fire({
          title: "FEZ Delivery State",
          text: "Which FEZ destination state should we use for this order?",
          input: "select",
          inputOptions,
          inputPlaceholder: "Select FEZ destination state",
          inputValue: fezDestinationState || "",
          showCancelButton: true,
          confirmButtonText: "Continue with FEZ",
          cancelButtonText: "Cancel",
          confirmButtonColor: "#006838",
          allowOutsideClick: false,
          inputValidator: (value) => {
            if (!value) {
              return "Please select a FEZ destination state.";
            }
            return undefined;
          },
        });

        if (!result.isConfirmed || !result.value) {
          return false;
        }

        const selectedState = states.find(
          (item) => item.state === result.value
        );

        if (!selectedState) {
          await Swal.fire(
            "Invalid FEZ State",
            "Please select a state from FEZ's official list.",
            "error"
          );
          return false;
        }

        setFezDestinationState(
          selectedState.state
        );
        setSelectedShipping(
          SHIPPING_IDS.FEZ
        );

        return true;
      } catch (error: any) {
        console.error(
          "FEZ states fetch error:",
          error
        );

        await Swal.fire(
          "FEZ States Error",
          error?.response?.data?.message ||
            error?.response?.data?.description ||
            error?.message ||
            "Unable to load FEZ states.",
          "error"
        );

        return false;
      }
    },
    [
      fezStates,
      fezDestinationState,
      fetchFezStates,
    ]
  );

  /* ------------------------------------------------------------------------ */
  /* FETCH PROFILE                                                           */
  /* ------------------------------------------------------------------------ */

  const fetchProfile = useCallback(
    async () => {
      const token =
        localStorage.getItem("userToken");

      if (!token) {
        setLoading(false);
        router.replace("/auth/login");
        return;
      }

      try {
        setLoading(true);

        const res = await axios.get(
          "/users/profile",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const u: User =
          res.data.user;

        setUser(u);

        setAddress(
          u.addresses?.street ||
            ""
        );

        setCity(
          u.addresses?.city ||
            ""
        );

        setState(
          u.addresses?.state ||
            ""
        );

        setZip(
          u.addresses?.zip ||
            ""
        );

        setTown(
          u.addresses?.town ||
            ""
        );

        setTownId(
          String(
            u.addresses?.townId ||
              ""
          )
        );

        setCityName(
          u.addresses?.cityName ||
            ""
        );

        setWalletBalance(
          Number(
            res.data.wallet?.balance ||
              0
          )
        );
      } catch (error: any) {
        console.error(
          "Profile fetch error:",
          error
        );

        if (
          error?.response?.status === 401 ||
          error?.response?.data?.message ===
            "Unauthorized access"
        ) {
          localStorage.removeItem(
            "userToken"
          );

          router.replace("/auth/login");
          return;
        }

        Swal.fire(
          "Unable to load profile",
          "Please refresh and try again.",
          "error"
        );
      } finally {
        setLoading(false);
      }
    },
    [router]
  );

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile, showModal]);

  /* ------------------------------------------------------------------------ */
  /* FETCH CART + VENDORS                                                    */
  /* ------------------------------------------------------------------------ */

  useEffect(() => {
    if (!user) {
      return;
    }

    const fetchCart = async () => {
      const token =
        localStorage.getItem("userToken");

      if (!token) {
        return;
      }

      try {
        setCartLoading(true);

        const res = await axios.get(
          "cart",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const items: CartItem[] =
          res.data?.cart?.items ??
          [];

        setCartItems(items);

        const totalPrice =
          items.reduce(
            (sum, item) =>
              sum +
              Number(
                item.productId?.price ||
                  0
              ) *
                Number(
                  item.quantity || 0
                ),
            0
          );

        setTotalProductPrice(
          totalPrice
        );

        const grouped: Record<
          string,
          CartItem[]
        > = {};

        let totalCartWeight = 0;

        for (const item of items) {
          const businessId =
            item?.productId
              ?.businessId ||
            "unknown";

          if (!grouped[businessId]) {
            grouped[businessId] = [];
          }

          grouped[businessId].push(
            item
          );

          totalCartWeight +=
            getProductWeight(item) *
            Number(item.quantity || 0);
        }

        setGroupedItems(grouped);
        setWeight(totalCartWeight);

        /* -------------------------------------------------------------- */
        /* Vendor requests remain the same endpoint/integration.          */
        /* -------------------------------------------------------------- */

        const businessIds =
          Object.keys(grouped);

        const vendorResults =
          await Promise.all(
            businessIds.map(
              async (businessId) => {
                try {
                  const vendorRes =
                    await axios.get(
                      `/business/${businessId}`,
                      {
                        headers:
                          getAuthHeaders(),
                      }
                    );

                  return [
                    businessId,
                    vendorRes.data
                      .business,
                  ] as const;
                } catch (error) {
                  console.error(
                    `Failed to fetch vendor ${businessId}`,
                    error
                  );

                  return [
                    businessId,
                    null,
                  ] as const;
                }
              }
            )
          );

        const vendorData =
          Object.fromEntries(
            vendorResults
          );

        setVendors(vendorData);
      } catch (error: any) {
        console.error(
          "Cart fetch error:",
          error
        );

        if (
          error?.response?.status ===
          401
        ) {
          localStorage.removeItem(
            "userToken"
          );

          router.replace("/auth/login");
          return;
        }

        Swal.fire(
          "Cart Error",
          "We couldn't load your basket.",
          "error"
        );
      } finally {
        setCartLoading(false);
      }
    };

    fetchCart();
  }, [
    user,
    getAuthHeaders,
    router,
  ]);

  /* ------------------------------------------------------------------------ */
  /* DERIVED GROUP INFORMATION                                               */
  /* ------------------------------------------------------------------------ */

  const vendorGroups = useMemo(() => {
    return Object.entries(
      groupedItems
    ).map(
      ([businessId, items]) => ({
        businessId,
        items,
        vendor:
          vendors[businessId] ||
          null,
        total:
          items.reduce(
            (sum, item) =>
              sum + getProductTotal(item),
            0
          ),
        pieces:
          items.reduce(
            (sum, item) =>
              sum +
              Number(
                item.quantity || 0
              ),
            0
          ),
        weight:
          items.reduce(
            (sum, item) =>
              sum +
              getProductWeight(
                item
              ) *
                Number(
                  item.quantity ||
                    0
                ),
            0
          ),
      })
    );
  }, [
    groupedItems,
    vendors,
  ]);

  /* ------------------------------------------------------------------------ */
  /* DELIVERY FEE                                                            */
  /* ------------------------------------------------------------------------ */

  useEffect(() => {
    let cancelled = false;
    const requestId =
      ++pricingRequestRef.current;

    const getDeliveryFee = async () => {
      const supportedProviders = [
        SHIPPING_IDS.REDSTAR,
        SHIPPING_IDS.GIG,
        SHIPPING_IDS.FEZ,
      ];

      if (
        !supportedProviders.includes(
          selectedShipping as (typeof SHIPPING_IDS)[keyof typeof SHIPPING_IDS]
        ) ||
        cartItems.length === 0
      ) {
        if (!cancelled) {
          setDeliveryFee(null);
          setDeliveryFee2(null);
          setPricingError(null);
          setLoadingDeliveryFee(false);
        }
        return;
      }

      if (
        selectedShipping === SHIPPING_IDS.FEZ &&
        !fezDestinationState
      ) {
        if (!cancelled) {
          setDeliveryFee(null);
          setDeliveryFee2(null);
          setPricingError(null);
          setLoadingDeliveryFee(false);
        }
        return;
      }

      setLoadingDeliveryFee(true);
      setDeliveryFee(null);
      setDeliveryFee2(null);
      setPricingError(null);

      const REDSTAR_API_KEY =
        process.env.NEXT_PUBLIC_REDSTAR_API_KEY;

      const groupedVendors =
        groupItemsByBusiness(cartItems);

      let totalFee = 0;

      try {
        /* ------------------------------------------------------------ */
        /* GIG RECEIVER COORDINATES                                     */
        /* ------------------------------------------------------------ */

        let receiverCoords: {
          Latitude: number;
          Longitude: number;
        } | null = null;

        if (
          selectedShipping ===
          SHIPPING_IDS.GIG
        ) {
          const receiverAddressStr =
            `${address}, ${city}, ${state}`;

          receiverCoords =
            await getCoordinates(
              receiverAddressStr
            );
        }

        /* ------------------------------------------------------------ */
        /* EACH BUSINESS                                                */
        /* ------------------------------------------------------------ */

        for (const vendor of groupedVendors) {
          if (cancelled ||
              requestId !== pricingRequestRef.current) {
            return;
          }

          const vendorRes =
            await axios.get(
              `/business/${vendor.businessId}`,
              {
                headers: getAuthHeaders(),
              }
            );

          if (cancelled ||
              requestId !== pricingRequestRef.current) {
            return;
          }

          const v =
            vendorRes.data?.business;

          if (!v) {
            throw new Error(
              `Vendor ${vendor.businessId} data could not be loaded.`
            );
          }

          const totalWeight =
            vendor.items.reduce(
              (sum, item) =>
                sum +
                getProductWeight(item) *
                  Number(item.quantity || 0),
              0
            );

          const vendorTotalValue =
            vendor.items.reduce(
              (sum, item) =>
                sum +
                Number(item.productId.price || 0) *
                  Number(item.quantity || 0),
              0
            );

          /* ---------------------------------------------------------- */
          /* REDSTAR                                                     */
          /* ---------------------------------------------------------- */

          if (
            selectedShipping ===
            SHIPPING_IDS.REDSTAR
          ) {
            const feeRes =
              await axios.post(
                "/auth/DeliveryFee",
                {
                  senderCity:
                    v.addresses?.city ||
                    "Unknown",

                  senderTownID:
                    v.addresses?.townId ||
                    0,

                  recipientCity:
                    cityName,

                  recipientTownID:
                    parseInt(townId) || 0,

                  pickupType: 1,
                  weight: totalWeight,
                },
                {
                  headers: {
                    "X-API-KEY":
                      REDSTAR_API_KEY,
                    "Content-Type":
                      "application/json",
                  },
                }
              );

            totalFee +=
              Number(
                feeRes.data?.TotalAmount || 0
              );
          }

          /* ---------------------------------------------------------- */
          /* GIG                                                         */
          /* ---------------------------------------------------------- */

          if (
            selectedShipping ===
            SHIPPING_IDS.GIG
          ) {
            if (!GIG_ACCESS_TOKEN) {
              throw new Error(
                "GIG access token is not configured."
              );
            }

            const senderAddressStr =
              `${v.addresses?.street || ""}, ${v.addresses?.city || ""}, ${v.addresses?.state || ""}`;

            const senderCoords =
              await getCoordinates(
                senderAddressStr
              );

            const vehicle =
              GIG_WEIGHT_THRESHOLDS.find(
                (item) =>
                  totalWeight <= item.max
              );

            const vehicleType =
              vehicle?.type ||
              GIG_VEHICLE_TYPES.TRUCK;

            const gigPayload: GIGPayload = {
              SenderStationId: 3,
              ReceiverStationId: 3,
              VehicleType: vehicleType,
              SenderLocation: senderCoords,
              ReceiverLocation: receiverCoords,
              CustomerCode: "ECO038082",
              CustomerType: 0,
              PickUpOptions: 0,
              DeliveryOptionIds: [1, 2],
              Value: vendorTotalValue,
              ShipmentItems: vendor.items.map((item) => ({
                ItemName: item.productId.name,
                Description:
                  item.productId.description ||
                  "Vendor item",
                Quantity: Number(item.quantity || 0),
                Weight: getProductWeight(item),
                IsVolumetric: false,
                ShipmentType: 1,
                Value: Number(item.productId.price || 0),
              })),
              IsFromAgility: false,
            };

            const gigFeeRes =
              await axios.post(
                "https://dev-thirdpartynode.theagilitysystems.com/price",
                gigPayload,
                {
                  headers: {
                    accept: "application/json",
                    "access-token":
                      GIG_ACCESS_TOKEN,
                    "content-type":
                      "application/json",
                  },
                }
              );

            const gigGrandTotal =
              Number(
                gigFeeRes.data?.data?.GrandTotal
              );

            if (Number.isFinite(gigGrandTotal)) {
              totalFee += gigGrandTotal;
            }
          }

          /* ---------------------------------------------------------- */
          /* FEZ                                                         */
          /* Browser -> Express -> FEZ                                   */
          /* ---------------------------------------------------------- */

          if (
            selectedShipping ===
            SHIPPING_IDS.FEZ
          ) {
            const destinationState =
              fezDestinationState.trim();

            const pickUpState =
              getExactFezState(
                v.addresses?.state,
                fezStates
              );

            if (!destinationState) {
              throw new Error(
                "A delivery state is required for FEZ pricing."
              );
            }

            if (!pickUpState) {
              throw new Error(
                `Seller pickup state "${v.addresses?.state || "Unknown"}" is not available in FEZ's official state list.`
              );
            }

            const fezWeight = Math.max(
              1,
              Math.ceil(
                Number(totalWeight) || 1
              )
            );

            const fezCostRes =
              await axios.post(
                "/fez/cost",
                {
                  state: destinationState,
                  pickUpState,
                  weight: fezWeight,
                  locker: false,
                },
                {
                  headers: getAuthHeaders(),
                }
              );

            if (cancelled ||
                requestId !== pricingRequestRef.current) {
              return;
            }

            // The API response wraps pricing details in "data".
            // Use totalCost so VAT and any surcharge are included.
            const fezPricingData =
              fezCostRes.data?.data ??
              fezCostRes.data;

            const numericCost =
              Number(fezPricingData?.totalCost);

            if (
              fezPricingData?.totalCost === undefined ||
              fezPricingData?.totalCost === null ||
              !Number.isFinite(numericCost)
            ) {
              throw new Error(
                `Invalid FEZ totalCost returned for ${destinationState}.`
              );
            }

            console.log("FEZ pricing response", {
              businessId: vendor.businessId,
              destinationState,
              pickUpState,
              weight: fezWeight,
              totalCost: numericCost,
            });

            totalFee += numericCost;
          }
        }

        if (cancelled ||
            requestId !== pricingRequestRef.current) {
          return;
        }

        const percentage = PROCESSING_FEE_RATE;
        const baseAmount =
          totalFee + totalProductPrice;
        const percentageFee =
          baseAmount * percentage;
        const finalDeliveryFee = Math.round(
          totalFee + percentageFee
        );

        if (
          selectedShipping === SHIPPING_IDS.FEZ
        ) {
          console.log("FEZ vendor price accepted", {
            totalFee,
            finalDeliveryFee,
          });
        }

        setDeliveryFee(totalFee);
        setDeliveryFee2(finalDeliveryFee);
        setPricingError(null);

        console.log("Delivery pricing complete", {
          provider: selectedShipping,
          totalFee,
          finalDeliveryFee,
        });
      } catch (error: any) {
        if (
          cancelled ||
          requestId !== pricingRequestRef.current
        ) {
          return;
        }

        console.error(
          "Delivery pricing error:",
          error
        );

        setDeliveryFee(null);
        setDeliveryFee2(null);
        setPricingError(
          error?.response?.data?.message ||
            error?.response?.data?.Message ||
            error?.message ||
            `Failed to calculate ${selectedShipping.toUpperCase()} delivery fee.`
        );
      } finally {
        if (
          !cancelled &&
          requestId === pricingRequestRef.current
        ) {
          setLoadingDeliveryFee(false);
        }
      }
    };

    getDeliveryFee();

    return () => {
      cancelled = true;
    };
  }, [
    selectedShipping,
    cartItems,
    address,
    city,
    state,
    cityName,
    townId,
    totalProductPrice,
    getAuthHeaders,
    fezDestinationState,
    fezStates,
  ]);

  /* ------------------------------------------------------------------------ */
  /* SHIPPING SELECTORS                                                      */
  /* ------------------------------------------------------------------------ */

  const selectShipping = async (
    shippingId: string
  ) => {
    const selectedOption =
      shippingOptions.find(
        (option) =>
          option.id === shippingId
      );

    if (!selectedOption) {
      return;
    }

    if (!selectedOption.available) {
      Swal.fire({
        toast: true,
        position: "top-end",
        timer: 2200,
        showConfirmButton: false,
        icon: "info",
        title: `${selectedOption.name} is coming soon.`,
      });

      return;
    }

    if (shippingId === SHIPPING_IDS.FEZ) {
      await askForFezDestinationState();
      return;
    }

    setFezDestinationState("");
    setSelectedShipping(
      shippingId
    );
  };

  /* ------------------------------------------------------------------------ */
  /* FEZ ORDER CREATION                                                      */
  /* ------------------------------------------------------------------------ */

  const createFezOrders = async (
    groupedVendors: VendorPayload[]
  ) => {
    const selectedFezState =
      fezDestinationState.trim();

    const officialFezStates =
      fezStates.length > 0
        ? fezStates
        : await fetchFezStates();

    if (!selectedFezState) {
      throw new Error(
        "Please select a FEZ destination state before creating the order."
      );
    }

    const batchId =
      `NZ-FEZ-${Date.now()}-${Math.random()
        .toString(36)
        .slice(2, 8)}`;

    const preparedOrders: Array<{
      businessId: string;
      vendor: VendorPayload;
      vendorData: any;
      uniqueID: string;
      payload: Record<string, unknown>;
    }> = [];

    for (let index = 0; index < groupedVendors.length; index++) {
      const vendor = groupedVendors[index];
      const vendorData =
        vendors[vendor.businessId];

      if (!vendorData?.addresses) {
        throw new Error(
          `Vendor data is missing for ${vendor.businessId}.`
        );
      }

      const vendorTotalWeight =
        vendor.items.reduce(
          (sum, item) =>
            sum +
            getProductWeight(item) *
              Number(item.quantity || 0),
          0
        );

      const vendorTotalValue =
        vendor.items.reduce(
          (sum, item) =>
            sum +
            Number(item.productId.price || 0) *
              Number(item.quantity || 0),
          0
        );

      const senderName =
        vendorData.userId
          ? [
              vendorData.userId.firstname,
              vendorData.userId.lastname,
            ]
              .filter(Boolean)
              .join(" ")
          : vendorData.businessName ||
            vendorData.name ||
            "Seller";

      const senderPhone =
        vendorData.userId?.phone ||
        vendorData.phone ||
        "0000000000";

      const senderAddress = [
        vendorData.addresses?.street,
        vendorData.addresses?.town,
        vendorData.addresses?.city,
        vendorData.addresses?.state,
      ]
        .filter(Boolean)
        .join(", ");

      const recipientAddress = [
        address,
        town,
        cityName || city,
        state,
        zip,
      ]
        .filter(Boolean)
        .join(", ");

      const uniqueID =
        `NZ-${Date.now()}-${index}-${vendor.businessId.slice(-6)}-${Math.random()
          .toString(36)
          .slice(2, 6)}`;

      const itemDescription =
        vendor.items
          .map(
            (item) =>
              `${item.productId.name} x ${item.quantity}`
          )
          .join(", ");

      const recipientState =
        selectedFezState;
      const pickUpState =
        getExactFezState(
          vendorData.addresses?.state,
          officialFezStates
        );

      if (!recipientState) {
        throw new Error(
          "A delivery state is required for FEZ order creation."
        );
      }

      if (!pickUpState) {
        throw new Error(
          `Seller pickup state "${vendorData.addresses?.state || "Unknown"}" is not available in FEZ's official state list for ${vendor.businessId}.`
        );
      }

      const payload = {
        recipientAddress,
        recipientState,
        recipientName: [
          user?.firstname,
          user?.lastname,
        ]
          .filter(Boolean)
          .join(" "),
        recipientPhone:
          user?.phone ||
          "0000000000",
        recipientEmail:
          user?.email ||
          "",
        uniqueID,
        BatchID: batchId,
        itemDescription,
        additionalDetails: `Town: ${
          town || "N/A"
        }, City: ${
          cityName || city || "N/A"
        }, Order created from New Zenith Marketplace`,
        valueOfItem: String(
          vendorTotalValue
        ),
        weight: Math.max(
          1,
          Math.ceil(
            Number(vendorTotalWeight) || 1
          )
        ),
        pickUpState,
        pickUpAddress: senderAddress,
        isItemCod: false,
        fragile: false,
        thirdparty: true,
        senderName,
        senderAddress,
        senderPhone,
      };

      preparedOrders.push({
        businessId: vendor.businessId,
        vendor,
        vendorData,
        uniqueID,
        payload,
      });
    }

    if (preparedOrders.length === 0) {
      throw new Error(
        "No FEZ orders were prepared."
      );
    }

    const fezResult =
      await axios.post(
        "/fez/order",
        preparedOrders.map(
          (item) => item.payload
        ),
        {
          headers: getAuthHeaders(),
        }
      );

    const fezResponse: FezOrderResponse =
      fezResult.data?.data ??
      fezResult.data ??
      {};

    const orderNumbers =
      getFezOrderNumbers(fezResponse);

    const responseStatus =
      String(
        (fezResponse as any).status ??
        ""
      ).toLowerCase();

    const responseMessage =
      String(
        (fezResponse as any).message ??
        (fezResponse as any).Message ??
        ""
      );

    if (
      (fezResponse as any).success === false ||
      responseStatus === "failed" ||
      responseStatus === "failure"
    ) {
      throw new Error(
        responseMessage ||
          "FEZ shipment creation failed."
      );
    }

    let successfulShipments = 0;
    const errors: string[] = [];

    for (const prepared of preparedOrders) {
      const fezOrderNumber =
        orderNumbers[prepared.uniqueID] ||
        null;

      try {
        const internalOrderPayload = {
          businessId:
            prepared.businessId,
          vendorId:
            prepared.vendorData.userId?._id ||
            prepared.vendorData.owner ||
            prepared.vendorData._id,
          items: prepared.vendor.items,
          logisticsPayload:
            prepared.payload,
          logisticsResponse: {
            provider: "FEZ",
            orderNo: fezOrderNumber,
            batchId,
            response: fezResponse,
          },
          paymentReference:
            `WALLET-${Date.now()}-${successfulShipments}`,
          shippingMethod: "fez",
        };

        const dbResult =
          await axios.post(
            "/orders/create",
            internalOrderPayload,
            {
              headers: getAuthHeaders(),
            }
          );

        if (dbResult.data?.success) {
          successfulShipments++;
        } else {
          errors.push(
            `FEZ shipment created for ${
              prepared.vendorData.businessName ||
              prepared.vendorData.name ||
              prepared.businessId
            }, but internal order saving failed.`
          );
        }
      } catch (error: any) {
        errors.push(
          `FEZ shipment created for ${
            prepared.vendorData.businessName ||
            prepared.vendorData.name ||
            prepared.businessId
          }, but internal order saving failed. ${
            error?.response?.data?.message ||
            error?.message ||
            ""
          }`
        );
      }
    }

    return {
      successfulShipments,
      errors,
      batchId,
      orderNumbers,
    };
  };

  /* ------------------------------------------------------------------------ */
  /* SUBMIT CHECKOUT                                                         */
  /* ------------------------------------------------------------------------ */

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    if (!selectedShipping) {
      await Swal.fire(
        "Select Shipping",
        "Please select a shipping method.",
        "warning"
      );
      return;
    }

    if (selectedShipping === SHIPPING_IDS.DHL) {
      await Swal.fire(
        "Coming Soon",
        "DHL checkout is not available yet.",
        "info"
      );
      return;
    }

    if (
      ![
        SHIPPING_IDS.REDSTAR,
        SHIPPING_IDS.GIG,
        SHIPPING_IDS.FEZ,
        SHIPPING_IDS.PAY_ON_DELIVERY,
      ].includes(selectedShipping as any)
    ) {
      await Swal.fire(
        "Notice",
        "This shipping method is not currently available.",
        "info"
      );
      return;
    }

    const REDSTAR_API_KEY =
      process.env
        .NEXT_PUBLIC_REDSTAR_API_KEY;

    const groupedVendors =
      groupItemsByBusiness(
        cartItems
      );

    if (
      groupedVendors.length === 0
    ) {
      await Swal.fire(
        "Empty basket",
        "Your basket is empty.",
        "warning"
      );

      return;
    }

    if (!user) {
      await Swal.fire(
        "Profile unavailable",
        "Please wait for your profile to finish loading.",
        "warning"
      );

      return;
    }

    if (!address.trim()) {
      await Swal.fire(
        "Address required",
        "Please add a delivery address before checking out.",
        "warning"
      );

      return;
    }

    if (
      selectedShipping === SHIPPING_IDS.FEZ &&
      !fezDestinationState
    ) {
      const selected =
        await askForFezDestinationState();

      if (!selected) {
        return;
      }
    }

    if (
      selectedShipping !==
        SHIPPING_IDS.PAY_ON_DELIVERY &&
      (loadingDeliveryFee ||
        deliveryFee2 === null ||
        pricingError)
    ) {
      await Swal.fire(
        "Delivery Fee",
        pricingError ||
          "Please wait for the shipping fee to finish calculating.",
        "info"
      );
      return;
    }

    setIsSubmitting(true);

    Swal.fire({
      title: "Submitting Orders...",
      text: `Processing ${groupedVendors.length} shipment(s). Please wait.`,
      allowOutsideClick: false,
      allowEscapeKey: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    if (
      selectedShipping === SHIPPING_IDS.FEZ
    ) {
      try {
        const result =
          await createFezOrders(
            groupedVendors
          );

        Swal.close();

        if (result.successfulShipments > 0) {
          await Swal.fire({
            title: "Order created!",
            text: `${result.successfulShipments} FEZ shipment(s) created successfully.`,
            icon: "success",
            confirmButtonColor: "#006838",
          });

          router.push(
            "/user/dashboard/transaction"
          );
          return;
        }

        await Swal.fire({
          title: "Order Failed",
          text:
            result.errors.join("\n") ||
            "No FEZ shipments were created.",
          icon: "error",
          confirmButtonColor: "#006838",
        });
      } catch (error: any) {
        Swal.close();

        await Swal.fire({
          title: "FEZ Order Failed",
          text:
            error?.response?.data?.message ||
            error?.response?.data?.Message ||
            error?.message ||
            "Unable to create FEZ shipment.",
          icon: "error",
          confirmButtonColor: "#006838",
        });
      } finally {
        setIsSubmitting(false);
      }

      return;
    }

    let successfulShipments = 0;

    const errors: string[] = [];

    for (
      const vendor of groupedVendors
    ) {
      const vendorData =
        vendors[
          vendor.businessId
        ];

      if (
        !vendorData ||
        !vendorData.addresses
      ) {
        errors.push(
          `Vendor data missing for ID: ${vendor.businessId}`
        );

        continue;
      }

      const vendorTotalWeight =
        vendor.items.reduce(
          (sum, item) =>
            sum +
            getProductWeight(
              item
            ) *
              Number(
                item.quantity || 0
              ),
          0
        );

      const vendorTotalPieces =
        vendor.items.reduce(
          (sum, item) =>
            sum +
            Number(
              item.quantity || 0
            ),
          0
        );

      const shipmentItems =
        vendor.items.map(
          (item) => ({
            id: 0,
            status: 0,
            createdOn:
              new Date().toISOString(),
            createdBy:
              user.firstname ||
              "User",
            shipmentId: 0,
            commodity:
              item.productId.name,
            description:
              item.productId
                .description,
            countryOfManufacturing:
              "Nigeria",
            quantity:
              Number(
                item.quantity || 0
              ),
            weight:
              getProductWeight(
                item
              ) *
              Number(
                item.quantity || 0
              ),
            unitOfMeasure: 0,
            unitOfPrice:
              Number(
                item.productId
                  .price || 0
              ),
          })
        );

      const singleRedStarPayload =
        {
          senderCity:
            vendorData.addresses
              .city ||
            "Unknown",

          recipientCity:
            cityName,

          recipientTownID:
            parseInt(
              townId
            ) || 0,

          recipientName:
            `${user.firstname} ${user.lastname}`,

          recipientPhoneNo:
            user.phone ||
            "0000000000",

          recipientEmail:
            user.email || "",

          recipientAddress:
            address,

          recipientState:
            state,

          senderTownID:
            vendorData.addresses
              .townId || 0,

          senderName:
            `${vendorData.userId?.firstname || ""} ${vendorData.userId?.lastname || vendorData.name || ""}`,

          senderAddress:
            vendorData.addresses
              .street ||
            "Unknown",

          senderPhone:
            vendorData.userId
              ?.phone ||
            "0000000000",

          orderNo:
            `ORDER-${Date.now()}-${vendor.businessId.substring(
              0,
              4
            )}`,

          packaging:
            "Box",

          boxandCrating:
            "Standard",

          deliveryType:
            "Door to Door",

          description:
            `Order from ${vendorData.name}`,

          onforwardingLocation:
            "",

          paymentType:
            "Prepaid",

          pickupType: 1,

          weight:
            vendorTotalWeight,

          pieces:
            vendorTotalPieces,

          cashOnDelivery: 0,

          shipmentItems,
        };

      try {
        /* -------------------------------------------------------------- */
        /* PAY ON DELIVERY                                                */
        /* -------------------------------------------------------------- */

        if (
          selectedShipping ===
          SHIPPING_IDS.PAY_ON_DELIVERY
        ) {
          const internalOrderPayload =
            {
              businessId:
                vendor.businessId,

              vendorId:
                vendorData.userId
                  ?._id ||
                vendorData.owner ||
                vendorData._id,

              items:
                vendor.items,

              paymentReference:
                `WALLET-${Date.now()}`,

              shippingMethod:
                "pay on delivery",
            };

          const dbResult =
            await axios.post(
              "/orders/create",
              internalOrderPayload,
              {
                headers:
                  getAuthHeaders(),
              }
            );

          if (
            dbResult.data.success
          ) {
            successfulShipments++;
          } else {
            errors.push(
              `Failed to save Pay on Delivery order for ${vendorData.name}.`
            );
          }
        }

        /* -------------------------------------------------------------- */
        /* REDSTAR                                                        */
        /* -------------------------------------------------------------- */

        else {
          const res =
            await axios.post(
              "/auth/PickupRequest",
              singleRedStarPayload,
              {
                headers: {
                  "X-API-KEY":
                    REDSTAR_API_KEY,

                  "Content-Type":
                    "application/json",
                },
              }
            );

          if (
            res.data.TransStatus ===
            "Successful"
          ) {
            try {
              const internalOrderPayload =
                {
                  businessId:
                    vendor.businessId,

                  vendorId:
                    vendorData.userId
                      ?._id ||
                    vendorData.owner ||
                    vendorData._id,

                  items:
                    vendor.items,

                  logisticsPayload:
                    singleRedStarPayload,

                  logisticsResponse:
                    res.data,

                  paymentReference:
                    `WALLET-${Date.now()}`,
                };

              const dbResult =
                await axios.post(
                  "/orders/create",
                  internalOrderPayload,
                  {
                    headers:
                      getAuthHeaders(),
                  }
                );

              if (
                dbResult.data
                  .success
              ) {
                successfulShipments++;
              } else {
                errors.push(
                  `Shipment created for ${vendorData.name}, but failed to save internally.`
                );
              }
            } catch (
              internalError
            ) {
              console.error(
                internalError
              );

              errors.push(
                `Shipment created for ${vendorData.name}, but failed to save internally.`
              );
            }
          } else {
            errors.push(
              res.data.Message ||
                `API error for ${vendorData.name}.`
            );
          }
        }
      } catch (error: any) {
        console.error(
          "Checkout vendor error:",
          error
        );

        errors.push(
          `Failed for ${vendorData.name}. Error: ${
            error?.response?.data
              ?.Message ||
            error?.response?.data
              ?.message ||
            error?.message ||
            "Unknown error"
          }`
        );
      }
    }

    Swal.close();
    setIsSubmitting(false);

    if (
      successfulShipments > 0
    ) {
      await Swal.fire({
        title: "Order created!",
        text: `${successfulShipments} shipment(s) created successfully.`,
        icon: "success",
        confirmButtonColor:
          "#006838",
      });

      router.push(
        "/user/dashboard/transaction"
      );
    } else {
      await Swal.fire({
        title: "Order Failed",
        text:
          errors.join("\n") ||
          "No shipments were created.",
        icon: "error",
        confirmButtonColor:
          "#006838",
      });
    }
  };

  /* ------------------------------------------------------------------------ */
  /* TOTALS                                                                  */
  /* ------------------------------------------------------------------------ */

  const payOnDeliveryFee = Math.round(
    totalProductPrice * PROCESSING_FEE_RATE
  );

  const totalPayable =
    totalProductPrice +
    (selectedShipping === SHIPPING_IDS.PAY_ON_DELIVERY
      ? payOnDeliveryFee
      : Number(deliveryFee2 || 0));

  const balanceDifference =
    walletBalance -
    totalPayable;

  const hasSufficientBalance =
    balanceDifference >= 0;

  const isCheckoutReady =
    selectedShipping.length > 0 &&
    cartItems.length > 0 &&
    Boolean(address.trim()) &&
    !loadingDeliveryFee &&
    (selectedShipping ===
      SHIPPING_IDS.PAY_ON_DELIVERY ||
      (deliveryFee2 !== null &&
        !pricingError)) &&
    !isSubmitting;

  const selectedShippingOption =
    shippingOptions.find(
      (option) =>
        option.id ===
        selectedShipping
    );

  /* ------------------------------------------------------------------------ */
  /* EMPTY CART                                                              */
  /* ------------------------------------------------------------------------ */

  if (
    !loading &&
    !cartLoading &&
    cartItems.length === 0
  ) {
    return (
      <main className="min-h-screen bg-[#f7f9f8] px-4 py-5 md:px-6 md:py-8">
        <div className="mx-auto w-full max-w-5xl">
          <TagHeader title="Checkout" />

          <section className="mt-6 flex flex-col items-center justify-center rounded-[30px] border border-dashed border-gray-300 bg-white px-6 py-24 text-center shadow-sm">
            <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-[#006838]/10 text-[#006838]">
              <ShoppingBagOutlinedIcon
                sx={{ fontSize: 38 }}
              />
            </div>

            <h1 className="mt-6 text-2xl font-black text-gray-900">
              Your basket is empty
            </h1>

            <p className="mt-2 max-w-md text-sm leading-6 text-gray-500">
              Add some products to your basket
              before continuing to checkout.
            </p>

            <button
              type="button"
              onClick={() =>
                router.push(
                  "/user/dashboard"
                )
              }
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#006838] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#00542d]"
            >
              Continue shopping

              <ArrowForwardRoundedIcon
                sx={{ fontSize: 18 }}
              />
            </button>
          </section>
        </div>
      </main>
    );
  }

  /* ------------------------------------------------------------------------ */
  /* RENDER                                                                  */
  /* ------------------------------------------------------------------------ */

  return (
    <>
      {showModal && (
        <AddressModal
          onClose={() =>
            setShowModal(false)
          }
        />
      )}

      {showModal2 && (
        <FundWalletModal
          onClose={() =>
            setShowModal2(false)
          }
        />
      )}

      {(loading || cartLoading) && (
        <div className="fixed inset-0 z-[80] flex items-center justify-center bg-white/70 backdrop-blur-sm">
          <CircleLoader
            isVisible={
              loading ||
              cartLoading
            }
          />
        </div>
      )}

      <main className="min-h-screen bg-[#f7f9f8]">
        <div className="mx-auto w-full max-w-[1250px] px-4 py-5 pb-32 sm:px-5 md:px-6 lg:px-8">
          <TagHeader title="Checkout" />

          <div className="mt-5">
            <CheckoutSteps />
          </div>

          <form
            id="checkout-form"
            onSubmit={handleSubmit}
            className="grid grid-cols-1 gap-5 xl:grid-cols-[minmax(0,1fr)_370px]"
          >
            {/* ========================================================== */}
            {/* LEFT COLUMN                                                 */}
            {/* ========================================================== */}

            <div className="min-w-0 space-y-5">
              {/* -------------------------------------------------------- */}
              {/* ADDRESS                                                    */}
              {/* -------------------------------------------------------- */}

              <section className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
                <SectionHeader
                  icon={
                    <LocationOnRoundedIcon
                      sx={{
                        fontSize: 20,
                      }}
                    />
                  }
                  title="Delivery address"
                  description="Where should your order be delivered?"
                />

                <div
                  className={`rounded-2xl border p-4 ${
                    address
                      ? "border-[#006838]/15 bg-[#006838]/5"
                      : "border-amber-200 bg-amber-50"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${
                        address
                          ? "bg-white text-[#006838]"
                          : "bg-white text-amber-600"
                      }`}
                    >
                      <MyLocationOutlinedIcon
                        sx={{
                          fontSize: 20,
                        }}
                      />
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="text-sm font-bold text-gray-900">
                          Saved address
                        </h3>

                        {address && (
                          <span className="rounded-full bg-[#006838]/10 px-2 py-1 text-[10px] font-bold uppercase tracking-wide text-[#006838]">
                            Selected
                          </span>
                        )}
                      </div>

                      {address ? (
                        <div className="mt-2 space-y-1 text-sm leading-5 text-gray-500">
                          <p>
                            {address}
                          </p>

                          <p>
                            {[cityName || city,
                              town,
                              state,
                              zip]
                              .filter(
                                Boolean
                              )
                              .join(
                                ", "
                              )}
                          </p>
                        </div>
                      ) : (
                        <p className="mt-2 text-sm text-amber-700">
                          No delivery address has been
                          selected yet.
                        </p>
                      )}
                    </div>

                    <CheckOutlinedIcon
                      sx={{
                        fontSize: 20,
                        color: address
                          ? "#006838"
                          : "#d97706",
                      }}
                    />
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    setShowModal(true)
                  }
                  className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-[#006838]/20 bg-[#006838]/5 py-3 text-sm font-bold text-[#006838] transition hover:bg-[#006838]/10"
                >
                  <AddRoundedIcon
                    sx={{
                      fontSize: 19,
                    }}
                  />

                  Add or change address
                </button>
              </section>

              {/* -------------------------------------------------------- */}
              {/* SHIPPING METHOD                                            */}
              {/* -------------------------------------------------------- */}

              <section className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
                <SectionHeader
                  icon={
                    <LocalShippingOutlinedIcon
                      sx={{
                        fontSize: 21,
                      }}
                    />
                  }
                  title="Shipping method"
                  description="Choose how your order should be delivered."
                />

                <div className="space-y-3">
                  {shippingOptions.map(
                    (provider) => {
                      const selected =
                        selectedShipping ===
                        provider.id;

                      return (
                        <button
                          key={provider.id}
                          type="button"
                          disabled={
                            !provider.available
                          }
                          onClick={() =>
                            selectShipping(
                              provider.id
                            )
                          }
                          className={`
                            group
                            flex
                            w-full
                            items-center
                            gap-4
                            rounded-2xl
                            border
                            p-4
                            text-left
                            transition-all
                            duration-200
                            ${
                              selected
                                ? "border-[#006838] bg-[#006838]/5 ring-4 ring-[#006838]/5"
                                : provider.available
                                ? "border-gray-200 bg-white hover:border-[#006838]/25 hover:bg-gray-50"
                                : "cursor-not-allowed border-gray-100 bg-gray-50 opacity-65"
                            }
                          `}
                        >
                          {/* Logo */}

                          <div
                            className={`
                              flex
                              h-14
                              w-20
                              shrink-0
                              items-center
                              justify-center
                              rounded-xl
                              ${
                                selected
                                  ? "bg-white"
                                  : "bg-gray-50"
                              }
                            `}
                          >
                            {provider.externalLogo ? (
                              <img
                                src={provider.logo}
                                alt={provider.name}
                                width={provider.width}
                                height={provider.height}
                                className="max-h-10 w-auto object-contain"
                              />
                            ) : (
                              <Image
                                src={provider.logo}
                                alt={provider.name}
                                width={provider.width}
                                height={provider.height}
                                className="max-h-10 w-auto object-contain"
                              />
                            )}
                          </div>

                          {/* Details */}

                          <div className="min-w-0 flex-1">
                            <div className="flex flex-wrap items-center gap-2">
                              <p className="text-sm font-bold text-gray-900">
                                {
                                  provider.name
                                }
                              </p>

                              <span
                                className={`rounded-full px-2 py-1 text-[9px] font-bold uppercase tracking-wide ${
                                  selected
                                    ? "bg-[#006838]/10 text-[#006838]"
                                    : provider.available
                                    ? "bg-gray-100 text-gray-500"
                                    : "bg-gray-200 text-gray-500"
                                }`}
                              >
                                {
                                  provider.badge
                                }
                              </span>
                            </div>

                            <p className="mt-1 text-xs leading-5 text-gray-500">
                              {
                                provider.description
                              }
                            </p>
                          </div>

                          {/* Radio */}

                          <span
                            className={`
                              flex
                              h-6
                              w-6
                              shrink-0
                              items-center
                              justify-center
                              rounded-full
                              border-2
                              transition
                              ${
                                selected
                                  ? "border-[#006838] bg-[#006838]"
                                  : "border-gray-300 bg-white"
                              }
                            `}
                          >
                            {selected && (
                              <span className="h-2.5 w-2.5 rounded-full bg-white" />
                            )}
                          </span>
                        </button>
                      );
                    }
                  )}
                </div>
              </section>

              {/* -------------------------------------------------------- */}
              {/* SHIPPING PRICE                                             */}
              {/* -------------------------------------------------------- */}

              <section className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
                <SectionHeader
                  icon={
                    <AccountBalanceWalletOutlinedIcon
                      sx={{
                        fontSize: 21,
                      }}
                    />
                  }
                  title="Order total"
                  description="Review your product and shipping costs."
                />

                <div className="rounded-2xl bg-gray-50 p-4">
                  {selectedShipping ===
                  SHIPPING_IDS.PAY_ON_DELIVERY ? (
                    <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4">
                      <div className="flex items-start gap-3">
                        <WarningAmberRoundedIcon
                          sx={{
                            color:
                              "#d97706",
                            fontSize: 20,
                          }}
                        />

                        <div>
                          <p className="text-sm font-bold text-amber-900">
                            Pay on Delivery
                          </p>

                          <p className="mt-1 text-xs leading-5 text-amber-700">
                            Shipping fees will be
                            confirmed through
                            WhatsApp or phone
                            before delivery.
                          </p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between gap-4">
                      <span className="text-sm text-gray-500">
                        Shipping fee
                      </span>

                      <span className="text-sm font-bold text-gray-900">
                        {loadingDeliveryFee ? (
                          <span className="inline-flex items-center gap-2 text-[#006838]">
                            <span className="h-4 w-4 animate-spin rounded-full border-2 border-[#006838]/20 border-t-[#006838]" />
                            Calculating...
                          </span>
                        ) : [
                            SHIPPING_IDS.REDSTAR,
                            SHIPPING_IDS.GIG,
                            SHIPPING_IDS.FEZ,
                          ].includes(
                            selectedShipping as any
                          ) ? (
                          formatCurrency(
                            deliveryFee2
                          )
                        ) : (
                          "Select a shipping method"
                        )}
                      </span>
                    </div>
                  )}

                  {pricingError &&
                    selectedShipping !==
                      SHIPPING_IDS.PAY_ON_DELIVERY && (
                      <p className="mt-2 text-right text-xs font-medium text-red-600">
                        {pricingError}
                      </p>
                    )}

                  <div className="mt-4 flex items-center justify-between border-t border-gray-200 pt-4">
                    <span className="text-sm font-medium text-gray-500">
                      Product subtotal
                    </span>

                    <span className="font-bold text-gray-800">
                      {formatCurrency(
                        totalProductPrice
                      )}
                    </span>
                  </div>

                  {selectedShipping ===
                    SHIPPING_IDS.PAY_ON_DELIVERY && (
                    <div className="mt-3 flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-500">
                        Service fee (1.65%)
                      </span>

                      <span className="font-bold text-gray-800">
                        {formatCurrency(
                          payOnDeliveryFee
                        )}
                      </span>
                    </div>
                  )}

                  <div className="mt-3 flex items-center justify-between">
                    <span className="text-base font-black text-gray-900">
                      Total payable
                    </span>

                    <span className="text-xl font-black text-[#006838]">
                      {formatCurrency(
                        totalPayable
                      )}
                    </span>
                  </div>
                </div>
              </section>

              {/* -------------------------------------------------------- */}
              {/* BASKET PREVIEW                                             */}
              {/* -------------------------------------------------------- */}

              {vendorGroups.length >
                0 && (
                <section className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
                  <SectionHeader
                    icon={
                      <ShoppingBagOutlinedIcon
                        sx={{
                          fontSize: 20,
                        }}
                      />
                    }
                    title="Basket summary"
                    description={`${cartItems.length} line ${
                      cartItems.length ===
                      1
                        ? "item"
                        : "items"
                    } from ${
                      vendorGroups.length
                    } ${
                      vendorGroups.length ===
                      1
                        ? "business"
                        : "businesses"
                    }`}
                  />

                  <div className="space-y-4">
                    {vendorGroups.map(
                      (group) => (
                        <div
                          key={
                            group.businessId
                          }
                          className="overflow-hidden rounded-2xl border border-gray-100"
                        >
                          <div className="flex items-center justify-between gap-3 bg-gray-50 px-4 py-3">
                            <div className="flex min-w-0 items-center gap-2">
                              <StorefrontRoundedIcon
                                sx={{
                                  fontSize: 17,
                                  color:
                                    "#006838",
                                }}
                              />

                              <p className="truncate text-xs font-bold text-gray-800">
                                {group
                                  .vendor
                                  ?.name ||
                                  group
                                    .vendor
                                    ?.businessName ||
                                  "Business"}
                              </p>
                            </div>

                            <span className="shrink-0 text-xs font-bold text-[#006838]">
                              {formatCurrency(
                                group.total
                              )}
                            </span>
                          </div>

                          <div className="divide-y divide-gray-100">
                            {group.items.map(
                              (
                                item
                              ) => (
                                <div
                                  key={
                                    item
                                      .productId
                                      ._id
                                  }
                                  className="flex items-center gap-3 px-4 py-3"
                                >
                                  <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-xl bg-gray-100">
                                    {item
                                      .productId
                                      .images
                                      ?.length ? (
                                      <Image
                                        src={
                                          item
                                            .productId
                                            .images[0]
                                        }
                                        alt={
                                          item
                                            .productId
                                            .name
                                        }
                                        fill
                                        sizes="48px"
                                        className="object-cover"
                                      />
                                    ) : (
                                      <div className="flex h-full w-full items-center justify-center text-gray-300">
                                        <ShoppingBagOutlinedIcon
                                          sx={{
                                            fontSize:
                                              20,
                                          }}
                                        />
                                      </div>
                                    )}
                                  </div>

                                  <div className="min-w-0 flex-1">
                                    <p className="truncate text-xs font-bold text-gray-800">
                                      {
                                        item
                                          .productId
                                          .name
                                      }
                                    </p>

                                    <p className="mt-0.5 text-[11px] text-gray-400">
                                      Qty:{" "}
                                      {
                                        item.quantity
                                      }
                                    </p>
                                  </div>

                                  <p className="shrink-0 text-xs font-bold text-gray-700">
                                    {formatCurrency(
                                      getProductTotal(
                                        item
                                      )
                                    )}
                                  </p>
                                </div>
                              )
                            )}
                          </div>
                        </div>
                      )
                    )}
                  </div>
                </section>
              )}

              {/* -------------------------------------------------------- */}
              {/* WALLET MOBILE                                             */}
              {/* -------------------------------------------------------- */}

              <div className="xl:hidden">
                <WalletSummaryCard
                  walletBalance={
                    walletBalance
                  }
                  totalPayable={
                    totalPayable
                  }
                  balanceDifference={
                    balanceDifference
                  }
                  hasSufficientBalance={
                    hasSufficientBalance
                  }
                  loadingDeliveryFee={
                    loadingDeliveryFee
                  }
                  isSubmitting={
                    isSubmitting
                  }
                  canCheckout={
                    isCheckoutReady
                  }
                  onCheckout={() =>
                    document
                      .getElementById(
                        "checkout-submit"
                      )
                      ?.click()
                  }
                  onFund={() =>
                    setShowModal2(true)
                  }
                />
              </div>
            </div>

            {/* ========================================================== */}
            {/* RIGHT SUMMARY                                               */}
            {/* ========================================================== */}

            <aside className="hidden xl:block">
              <div className="sticky top-5 space-y-4">
                <WalletSummaryCard
                  walletBalance={
                    walletBalance
                  }
                  totalPayable={
                    totalPayable
                  }
                  balanceDifference={
                    balanceDifference
                  }
                  hasSufficientBalance={
                    hasSufficientBalance
                  }
                  loadingDeliveryFee={
                    loadingDeliveryFee
                  }
                  isSubmitting={
                    isSubmitting
                  }
                  canCheckout={
                    isCheckoutReady
                  }
                  onCheckout={() =>
                    document
                      .getElementById(
                        "checkout-submit"
                      )
                      ?.click()
                  }
                  onFund={() =>
                    setShowModal2(true)
                  }
                />

                <div className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm">
                  <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-gray-400">
                    Delivery
                  </p>

                  <div className="mt-4 flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#006838]/10 text-[#006838]">
                      <LocalShippingOutlinedIcon />
                    </div>

                    <div className="min-w-0">
                      <p className="truncate text-sm font-bold text-gray-900">
                        {selectedShippingOption
                          ?.name ||
                          "No method selected"}
                      </p>

                      <p className="mt-1 text-xs text-gray-500">
                        {selectedShipping
                          ? "Shipping method selected"
                          : "Choose a shipping method"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </aside>
          </form>
        </div>
      </main>

      {/* Hidden submit button so the same existing form submission flow
          is used by both mobile and desktop summary buttons. */}

      <button
        id="checkout-submit"
        type="submit"
        formNoValidate
        className="hidden"
        disabled={!isCheckoutReady}
        form="checkout-form"
      />
    </>
  );
};

/* -------------------------------------------------------------------------- */
/*                          WALLET SUMMARY CARD                               */
/* -------------------------------------------------------------------------- */

interface WalletSummaryCardProps {
  walletBalance: number;
  totalPayable: number;
  balanceDifference: number;
  hasSufficientBalance: boolean;
  loadingDeliveryFee: boolean;
  isSubmitting: boolean;
  canCheckout: boolean;
  onCheckout: () => void;
  onFund: () => void;
}

const WalletSummaryCard = ({
  walletBalance,
  totalPayable,
  balanceDifference,
  hasSufficientBalance,
  loadingDeliveryFee,
  isSubmitting,
  canCheckout,
  onCheckout,
  onFund,
}: WalletSummaryCardProps) => {
  return (
    <section
      className={`rounded-3xl border p-5 shadow-sm ${
        hasSufficientBalance
          ? "border-emerald-200 bg-white"
          : "border-red-200 bg-white"
      }`}
    >
      <div className="flex items-center gap-3">
        <div
          className={`flex h-11 w-11 items-center justify-center rounded-xl ${
            hasSufficientBalance
              ? "bg-emerald-50 text-emerald-600"
              : "bg-red-50 text-red-600"
          }`}
        >
          <AccountBalanceWalletOutlinedIcon />
        </div>

        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-gray-400">
            Wallet
          </p>

          <h2 className="text-base font-black text-gray-900">
            Payment summary
          </h2>
        </div>
      </div>

      <div className="mt-5 space-y-3">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-500">
            Account balance
          </span>

          <span className="font-bold text-gray-900">
            {formatCurrency(
              walletBalance
            )}
          </span>
        </div>

        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-500">
            Total payable
          </span>

          <span className="font-bold text-gray-900">
            {formatCurrency(
              totalPayable
            )}
          </span>
        </div>

        <div
          className={`rounded-2xl p-4 ${
            hasSufficientBalance
              ? "bg-emerald-50"
              : "bg-red-50"
          }`}
        >
          <p
            className={`text-[10px] font-bold uppercase tracking-wider ${
              hasSufficientBalance
                ? "text-emerald-600"
                : "text-red-600"
            }`}
          >
            {hasSufficientBalance
              ? "Remaining balance"
              : "Amount short"}
          </p>

          <p
            className={`mt-1 text-xl font-black ${
              hasSufficientBalance
                ? "text-emerald-700"
                : "text-red-700"
            }`}
          >
            {formatCurrency(
              Math.abs(
                balanceDifference
              )
            )}
          </p>
        </div>
      </div>

      {hasSufficientBalance ? (
        <button
          type="button"
          onClick={onCheckout}
          disabled={
            isSubmitting ||
            loadingDeliveryFee ||
            !canCheckout
          }
          className="mt-5 flex w-full items-center justify-center gap-2 rounded-2xl bg-[#006838] py-4 text-sm font-bold text-white shadow-lg shadow-[#006838]/10 transition hover:bg-[#00542d] disabled:cursor-not-allowed disabled:bg-gray-300 disabled:shadow-none"
        >
          {isSubmitting ? (
            <>
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
              Processing...
            </>
          ) : (
            <>
              Checkout
              <ArrowForwardRoundedIcon
                sx={{ fontSize: 18 }}
              />
            </>
          )}
        </button>
      ) : (
        <button
          type="button"
          onClick={onFund}
          className="mt-5 flex w-full items-center justify-center gap-2 rounded-2xl bg-red-600 py-4 text-sm font-bold text-white transition hover:bg-red-700"
        >
          Fund wallet
          <ArrowForwardRoundedIcon
            sx={{ fontSize: 18 }}
          />
        </button>
      )}
    </section>
  );
};

export default CheckoutShipping;