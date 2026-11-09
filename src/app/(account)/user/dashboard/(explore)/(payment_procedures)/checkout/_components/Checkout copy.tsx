
// "use client";

// import React, {
//   useCallback,
//   useEffect,
//   useMemo,
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
//       "Coming soon.",
//     logo:
//       "https://res.cloudinary.com/dq8f0jdgt/image/upload/v1773458882/64708f8629b92d48d4457146_fez_logo_qwnrhz.svg",
//     width: 120,
//     height: 24,
//     available: false,
//     badge: "Coming soon",
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
//     const getDeliveryFee =
//       async () => {
//         if (
//           selectedShipping !==
//             SHIPPING_IDS.REDSTAR &&
//           selectedShipping !==
//             SHIPPING_IDS.GIG
//         ) {
//           setDeliveryFee(null);
//           setDeliveryFee2(null);
//           setLoadingDeliveryFee(false);
//           return;
//         }

//         if (
//           cartItems.length === 0
//         ) {
//           setDeliveryFee(null);
//           setDeliveryFee2(null);
//           return;
//         }

//         setLoadingDeliveryFee(true);

//         const REDSTAR_API_KEY =
//           process.env
//             .NEXT_PUBLIC_REDSTAR_API_KEY;

//         const groupedVendors =
//           groupItemsByBusiness(
//             cartItems
//           );

//         let totalFee = 0;

//         try {
//           /* ------------------------------------------------------------ */
//           /* GIG RECEIVER COORDINATES                                     */
//           /* ------------------------------------------------------------ */

//           let receiverCoords:
//             | {
//                 Latitude: number;
//                 Longitude: number;
//               }
//             | null = null;

//           if (
//             selectedShipping ===
//             SHIPPING_IDS.GIG
//           ) {
//             const receiverAddressStr = `${address}, ${city}, ${state}`;

//             receiverCoords =
//               await getCoordinates(
//                 receiverAddressStr
//               );
//           }

//           /* ------------------------------------------------------------ */
//           /* EACH BUSINESS                                                */
//           /* ------------------------------------------------------------ */

//           for (const vendor of groupedVendors) {
//             const vendorRes =
//               await axios.get(
//                 `/business/${vendor.businessId}`,
//                 {
//                   headers:
//                     getAuthHeaders(),
//                 }
//               );

//             const v =
//               vendorRes.data
//                 .business;

//             const totalPieces =
//               vendor.items.reduce(
//                 (sum, item) =>
//                   sum +
//                   Number(
//                     item.quantity ||
//                       0
//                   ),
//                 0
//               );

//             const totalWeight =
//               vendor.items.reduce(
//                 (sum, item) =>
//                   sum +
//                   getProductWeight(
//                     item
//                   ) *
//                     Number(
//                       item.quantity ||
//                         0
//                     ),
//                 0
//               );

//             const vendorTotalValue =
//               vendor.items.reduce(
//                 (sum, item) =>
//                   sum +
//                   Number(
//                     item.productId
//                       .price ||
//                       0
//                   ) *
//                     Number(
//                       item.quantity ||
//                         0
//                     ),
//                 0
//               );

//             /* ---------------------------------------------------------- */
//             /* REDSTAR                                                     */
//             /* ---------------------------------------------------------- */

//             if (
//               selectedShipping ===
//               SHIPPING_IDS.REDSTAR
//             ) {
//               const feeRes =
//                 await axios.post(
//                   "/auth/DeliveryFee",
//                   {
//                     senderCity:
//                       v.addresses
//                         ?.city ||
//                       "Unknown",

//                     senderTownID:
//                       v.addresses
//                         ?.townId ||
//                       0,

//                     recipientCity:
//                       cityName,

//                     recipientTownID:
//                       parseInt(
//                         townId
//                       ) || 0,

//                     pickupType: 1,
//                     weight:
//                       totalWeight,
//                   },
//                   {
//                     headers: {
//                       "X-API-KEY":
//                         REDSTAR_API_KEY,

//                       "Content-Type":
//                         "application/json",
//                     },
//                   }
//                 );

//               totalFee +=
//                 Number(
//                   feeRes.data
//                     ?.TotalAmount ||
//                     0
//                 );
//             }

//             /* ---------------------------------------------------------- */
//             /* GIG                                                         */
//             /* ---------------------------------------------------------- */

//             if (
//               selectedShipping ===
//               SHIPPING_IDS.GIG
//             ) {
//               if (!GIG_ACCESS_TOKEN) {
//                 throw new Error(
//                   "GIG access token is not configured."
//                 );
//               }

//               const senderAddressStr = `${v.addresses?.street || ""}, ${v.addresses?.city || ""}, ${v.addresses?.state || ""}`;

//               const senderCoords =
//                 await getCoordinates(
//                   senderAddressStr
//                 );

//               const vehicle =
//                 GIG_WEIGHT_THRESHOLDS.find(
//                   (item) =>
//                     totalWeight <=
//                     item.max
//                 );

//               const vehicleType =
//                 vehicle?.type ||
//                 GIG_VEHICLE_TYPES.TRUCK;

//               const gigPayload: GIGPayload =
//                 {
//                   SenderStationId: 3,
//                   ReceiverStationId: 3,

//                   VehicleType:
//                     vehicleType,

//                   SenderLocation:
//                     senderCoords,

//                   ReceiverLocation:
//                     receiverCoords,

//                   CustomerCode:
//                     "ECO038082",

//                   CustomerType: 0,

//                   PickUpOptions: 0,

//                   DeliveryOptionIds: [
//                     1,
//                     2,
//                   ],

//                   Value:
//                     vendorTotalValue,

//                   ShipmentItems:
//                     vendor.items.map(
//                       (item) => ({
//                         ItemName:
//                           item.productId
//                             .name,

//                         Description:
//                           item.productId
//                             .description ||
//                           "Vendor item",

//                         Quantity:
//                           Number(
//                             item.quantity ||
//                               0
//                           ),

//                         Weight:
//                           getProductWeight(
//                             item
//                           ),

//                         IsVolumetric:
//                           false,

//                         ShipmentType:
//                           1,

//                         Value:
//                           Number(
//                             item
//                               .productId
//                               .price ||
//                               0
//                           ),
//                       })
//                     ),

//                   IsFromAgility:
//                     false,
//                 };

//               const gigFeeRes =
//                 await axios.post(
//                   "https://dev-thirdpartynode.theagilitysystems.com/price",
//                   gigPayload,
//                   {
//                     headers: {
//                       accept:
//                         "application/json",

//                       "access-token":
//                         GIG_ACCESS_TOKEN,

//                       "content-type":
//                         "application/json",
//                     },
//                   }
//                 );

//               const gigGrandTotal =
//                 Number(
//                   gigFeeRes.data?.data
//                     ?.GrandTotal
//                 );

//               if (
//                 Number.isFinite(
//                   gigGrandTotal
//                 )
//               ) {
//                 totalFee +=
//                   gigGrandTotal;
//               }
//             }

//             /* Keep original values available */
//             void totalPieces;
//           }

//           /*
//            * Preserve your existing 1.65% platform
//            * calculation.
//            */
//           const percentage =
//             1.65 / 100;

//           const baseAmount =
//             totalFee +
//             totalProductPrice;

//           const percentageFee =
//             baseAmount *
//             percentage;

//           setDeliveryFee(
//             totalFee
//           );

//           setDeliveryFee2(
//             Math.round(
//               totalFee +
//                 percentageFee
//             )
//           );
//         } catch (error) {
//           console.error(
//             "Delivery pricing error:",
//             error
//           );

//           setDeliveryFee(null);
//           setDeliveryFee2(null);

//           Swal.fire(
//             "Pricing Error",
//             `Failed to calculate ${selectedShipping.toUpperCase()} delivery fee. Please try again.`,
//             "error"
//           );
//         } finally {
//           setLoadingDeliveryFee(false);
//         }
//       };

//     getDeliveryFee();
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
//   ]);

//   /* ------------------------------------------------------------------------ */
//   /* SHIPPING SELECTORS                                                      */
//   /* ------------------------------------------------------------------------ */

//   const selectShipping = (
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

//     setSelectedShipping(
//       shippingId
//     );
//   };

//   /* ------------------------------------------------------------------------ */
//   /* SUBMIT CHECKOUT                                                         */
//   /* ------------------------------------------------------------------------ */

//   const handleSubmit = async (
//     e: React.FormEvent
//   ) => {
//     e.preventDefault();

//     /*
//      * Preserve your existing integration:
//      * only RedStar and Pay on Delivery are
//      * currently implemented.
//      */
//     if (
//       selectedShipping !==
//         SHIPPING_IDS.REDSTAR &&
//       selectedShipping !==
//         SHIPPING_IDS.PAY_ON_DELIVERY
//     ) {
//       await Swal.fire(
//         "Notice",
//         "Currently only RedStar and Pay on Delivery checkout is implemented in this flow.",
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
//                             <Image
//                               src={
//                                 provider.logo
//                               }
//                               alt={
//                                 provider.name
//                               }
//                               width={
//                                 provider.width
//                               }
//                               height={
//                                 provider.height
//                               }
//                               className="max-h-10 w-auto object-contain"
//                             />
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
//                         ) : selectedShipping ===
//                             SHIPPING_IDS.REDSTAR ||
//                           selectedShipping ===
//                             SHIPPING_IDS.GIG ? (
//                           formatCurrency(
//                             deliveryFee2
//                           )
//                         ) : (
//                           "Select a shipping method"
//                         )}
//                       </span>
//                     </div>
//                   )}

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

// // "use client";

// // import { useEffect, useState } from "react";
// // import { useRouter } from "next/navigation";
// // import Image from "next/image";
// // import axios from "@/utils/axios";
// // import Swal from "sweetalert2";

// // // Icons & Components
// // import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
// // import MyLocationOutlinedIcon from "@mui/icons-material/MyLocationOutlined";
// // import TagHeader from "@/components/header/TagHeader";
// // import CircleLoader from "@/components/loader/loader";
// // import AddressModal from "./AddressModal";
// // import FundWalletModal from "../../../../wallet/components/FundWalletModal";

// // // Assets
// // import DHLLOGO from "@/assets/images/dhl-express-logo-black.png";
// // import PAYONDELIVERYLOGO from "@/assets/images/cash-on-delivery.png";
// // import GIGLOGO from "@/assets/images/gig-logo.png";
// // import REDSTAR from "@/assets/images/redstar.png";

// // interface User {
// //   _id?: string;
// //   firstname: string;
// //   lastname: string;
// //   email: string;
// //   accountType: "buyer" | "seller";
// //   street?: string;
// //   phone: string;
// //   address?: {
// //     town: string;
// //     city: string;
// //     state: string;
// //     zip: string;
// //     street: string;
// //   };
// // }

// // interface Product {
// //   _id: string;
// //   name: string;
// //   weight?: number;
// //   price?: number;
// //   businessId: string;
// //   description: string;
// //   quantityInfo?: {
// //     weight?: number;
// //   };
// // }

// // interface CartItem {
// //   productId: Product;
// //   quantity: number;
// // }

// // interface VendorPayload {
// //   businessId: string;
// //   items: CartItem[];
// // }

// // interface GeoLocation {
// //   Latitude: number;
// //   Longitude: number;
// // }

// // interface FezCostItem {
// //   state?: string;
// //   cost?: string | number;
// // }

// // interface FezCostResponse {
// //   Cost?: FezCostItem[];
// //   cost?: FezCostItem[];
// //   data?: {
// //     Cost?: FezCostItem[];
// //     cost?: FezCostItem[];
// //   };
// // }

// // interface FezOrderResponse {
// //   status?: string;
// //   success?: boolean;
// //   message?: string;
// //   orderNos?: Record<string, string>;
// //   data?: {
// //     status?: string;
// //     orderNos?: Record<string, string>;
// //   };
// // }

// // interface ShippingProvider {
// //   id: string;
// //   name: string;
// //   description?: string;
// //   logo: any;
// //   width: number;
// //   height: number;
// //   available: boolean;
// //   externalLogo?: boolean;
// // }

// // const GIG_VEHICLE_TYPES = {
// //   BIKE: 1,
// //   VAN: 2,
// //   TRUCK: 3,
// // };

// // const GIG_WEIGHT_THRESHOLDS = [
// //   { max: 10, type: GIG_VEHICLE_TYPES.BIKE },
// //   { max: 500, type: GIG_VEHICLE_TYPES.VAN },
// //   { max: Infinity, type: GIG_VEHICLE_TYPES.TRUCK },
// // ];

// // const groupItemsByBusiness = (
// //   items: CartItem[]
// // ): VendorPayload[] => {
// //   const groups: Record<string, CartItem[]> = {};

// //   for (const item of items) {
// //     const businessId = item.productId.businessId;

// //     if (!groups[businessId]) {
// //       groups[businessId] = [];
// //     }

// //     groups[businessId].push(item);
// //   }

// //   return Object.entries(groups).map(
// //     ([businessId, items]) => ({
// //       businessId,
// //       items,
// //     })
// //   );
// // };

// // const normalizeNigeriaState = (
// //   value?: string | null
// // ): string => {
// //   const normalized = String(value || "")
// //     .trim()
// //     .toLowerCase()
// //     .replace(/\s+/g, " ");

// //   const aliases: Record<string, string> = {
// //     "river state": "Rivers",
// //     "rivers state": "Rivers",
// //     rivers: "Rivers",

// //     "lagos state": "Lagos",
// //     lagos: "Lagos",

// //     "fct abuja": "FCT",
// //     abuja: "FCT",
// //     "abuja federal capital territory": "FCT",

// //     "cross river state": "Cross River",
// //     "cross-river state": "Cross River",
// //     "cross river": "Cross River",

// //     "akwala ibom": "Akwa Ibom",
// //     "akwa ibom state": "Akwa Ibom",
// //     "akwa ibom": "Akwa Ibom",

// //     "delta state": "Delta",
// //     delta: "Delta",

// //     "edo state": "Edo",
// //     edo: "Edo",

// //     "enugu state": "Enugu",
// //     enugu: "Enugu",

// //     "imo state": "Imo",
// //     imo: "Imo",

// //     "kano state": "Kano",
// //     kano: "Kano",

// //     "kaduna state": "Kaduna",
// //     kaduna: "Kaduna",

// //     "ogun state": "Ogun",
// //     ogun: "Ogun",

// //     "oyo state": "Oyo",
// //     oyo: "Oyo",

// //     "anambra state": "Anambra",
// //     anambra: "Anambra",

// //     "abia state": "Abia",
// //     abia: "Abia",
// //   };

// //   return (
// //     aliases[normalized] ||
// //     String(value || "").trim()
// //   );
// // };

// // const getCoordinates = async (
// //   address: string
// // ): Promise<{
// //   Latitude: number;
// //   Longitude: number;
// // } | null> => {
// //   if (!address) return null;

// //   const apiKey =
// //     process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

// //   if (!apiKey) {
// //     console.error(
// //       "Google Maps API key is missing."
// //     );
// //     return null;
// //   }

// //   const url =
// //     `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
// //       address
// //     )}&key=${apiKey}`;

// //   try {
// //     const response = await fetch(url);
// //     const data = await response.json();

// //     if (
// //       data.status === "OK" &&
// //       data.results?.length > 0
// //     ) {
// //       const { lat, lng } =
// //         data.results[0].geometry.location;

// //       return {
// //         Latitude: lat,
// //         Longitude: lng,
// //       };
// //     }

// //     return null;
// //   } catch (error) {
// //     console.error(
// //       "Geocoding Error:",
// //       error
// //     );

// //     return null;
// //   }
// // };

// // const getAuthConfig = () => {
// //   const token =
// //     typeof window !== "undefined"
// //       ? localStorage.getItem("userToken")
// //       : null;

// //   return {
// //     headers: {
// //       Authorization: `Bearer ${token || ""}`,
// //     },
// //   };
// // };

// // const getFezCostItems = (
// //   response: FezCostResponse
// // ): FezCostItem[] => {
// //   if (Array.isArray(response?.Cost)) {
// //     return response.Cost;
// //   }

// //   if (Array.isArray(response?.cost)) {
// //     return response.cost;
// //   }

// //   if (Array.isArray(response?.data?.Cost)) {
// //     return response.data.Cost;
// //   }

// //   if (Array.isArray(response?.data?.cost)) {
// //     return response.data.cost;
// //   }

// //   return [];
// // };

// // const getFezOrderNumbers = (
// //   response: FezOrderResponse
// // ): Record<string, string> => {
// //   if (
// //     response?.orderNos &&
// //     typeof response.orderNos === "object"
// //   ) {
// //     return response.orderNos;
// //   }

// //   if (
// //     response?.data?.orderNos &&
// //     typeof response.data.orderNos === "object"
// //   ) {
// //     return response.data.orderNos;
// //   }

// //   return {};
// // };

// // const CheckoutShipping: React.FC = () => {
// //   const router = useRouter();

// //   const [selectedShipping, setSelectedShipping] =
// //     useState("");

// //   const [address, setAddress] = useState("");
// //   const [city, setCity] = useState("");
// //   const [cityName, setCityName] = useState("");
// //   const [state, setState] = useState("");
// //   const [zip, setZip] = useState("");
// //   const [town, setTown] = useState("");
// //   const [townId, setTownId] = useState("");

// //   const [walletBalance, setWalletBalance] =
// //     useState(0);

// //   const [showModal, setShowModal] =
// //     useState(false);

// //   const [showModal2, setShowModal2] =
// //     useState(false);

// //   const [isSubmitting, setIsSubmitting] =
// //     useState(false);

// //   const [loading, setLoading] =
// //     useState(true);

// //   const [loadingDeliveryFee, setLoadingDeliveryFee] =
// //     useState(false);

// //   const [user, setUser] =
// //     useState<User | null>(null);

// //   const [cartItems, setCartItems] =
// //     useState<CartItem[]>([]);

// //   const [groupedItems, setGroupedItems] =
// //     useState<Record<string, CartItem[]>>({});

// //   const [vendors, setVendors] =
// //     useState<Record<string, any>>({});

// //   const [weight, setWeight] =
// //     useState(0);

// //   const [totalProductPrice, setTotalProductPrice] =
// //     useState<number>(0);

// //   const [deliveryFee, setDeliveryFee] =
// //     useState<number | null>(null);

// //   const [deliveryFee2, setDeliveryFee2] =
// //     useState<number | null>(null);

// //   /**
// //    * Provider list.
// //    *
// //    * FEZ is now active.
// //    * GIG / DHL remain unchanged.
// //    */
// //   const shippingProviders: ShippingProvider[] = [
// //     {
// //       id: "redstar",
// //       name: "Red Star Logistics",
// //       description: "Red Star delivery",
// //       logo: REDSTAR,
// //       width: 120,
// //       height: 20,
// //       available: true,
// //     },
// //     {
// //       id: "fez",
// //       name: "Fez Logistics",
// //       description:
// //         "Reliable nationwide delivery with live pricing.",
// //       logo:
// //         "https://res.cloudinary.com/dq8f0jdgt/image/upload/v1773458882/64708f8629b92d48d4457146_fez_logo_qwnrhz.svg",
// //       width: 120,
// //       height: 24,
// //       available: true,
// //       externalLogo: true,
// //     },
// //     {
// //       id: "gig",
// //       name: "GIG",
// //       description: "GIG delivery",
// //       logo: GIGLOGO,
// //       width: 70,
// //       height: 20,
// //       available: true,
// //     },
// //     {
// //       id: "dhl",
// //       name: "DHL",
// //       description: "DHL delivery",
// //       logo: DHLLOGO,
// //       width: 100,
// //       height: 20,
// //       available: false,
// //     },
// //     {
// //       id: "pay on delivery",
// //       name: "Pay on Delivery",
// //       description: "Payment on delivery",
// //       logo: PAYONDELIVERYLOGO,
// //       width: 150,
// //       height: 120,
// //       available: true,
// //     },
// //   ];

// //   /**
// //    * Fetch profile.
// //    */
// //   useEffect(() => {
// //     const token =
// //       localStorage.getItem("userToken");

// //     if (!token) {
// //       setLoading(false);
// //       return;
// //     }

// //     setLoading(true);

// //     axios
// //       .get("/users/profile", {
// //         headers: {
// //           Authorization: `Bearer ${token}`,
// //         },
// //       })
// //       .then((res) => {
// //         const u = res.data.user;

// //         setUser(u);

// //         setAddress(
// //           u.addresses?.street || ""
// //         );

// //         setCity(
// //           u.addresses?.city || ""
// //         );

// //         setState(
// //           u.addresses?.state || ""
// //         );

// //         setZip(
// //           u.addresses?.zip || ""
// //         );

// //         setTown(
// //           u.addresses?.town || ""
// //         );

// //         setTownId(
// //           u.addresses?.townId || ""
// //         );

// //         setCityName(
// //           u.addresses?.cityName || ""
// //         );

// //         setWalletBalance(
// //           res.data.wallet?.balance || 0
// //         );
// //       })
// //       .catch((error) => {
// //         console.error(
// //           "Profile fetch error:",
// //           error
// //         );
// //       })
// //       .finally(() => {
// //         setLoading(false);
// //       });
// //   }, [showModal]);

// //   /**
// //    * Fetch cart + vendor data.
// //    */
// //   useEffect(() => {
// //     const token =
// //       localStorage.getItem("userToken");

// //     if (!token || !user) return;

// //     axios
// //       .get("cart", getAuthConfig())
// //       .then(async (res) => {
// //         const items: CartItem[] =
// //           res.data?.cart?.items ?? [];

// //         setCartItems(items);

// //         const totalPrice =
// //           items.reduce(
// //             (sum, item) =>
// //               sum +
// //               (item.productId.price || 0) *
// //                 (item.quantity || 1),
// //             0
// //           );

// //         setTotalProductPrice(totalPrice);

// //         const grouped: Record<
// //           string,
// //           CartItem[]
// //         > = {};

// //         let totalCartWeight = 0;

// //         for (const item of items) {
// //           const businessId =
// //             item?.productId?.businessId ||
// //             "unknown";

// //           if (!grouped[businessId]) {
// //             grouped[businessId] = [];
// //           }

// //           grouped[businessId].push(item);

// //           totalCartWeight +=
// //             (item.productId.weight ||
// //               item.productId.quantityInfo
// //                 ?.weight ||
// //               1) *
// //             item.quantity;
// //         }

// //         setGroupedItems(grouped);
// //         setWeight(totalCartWeight);

// //         const vendorData: Record<
// //           string,
// //           any
// //         > = {};

// //         for (const businessId of Object.keys(
// //           grouped
// //         )) {
// //           try {
// //             const vendorRes =
// //               await axios.get(
// //                 `/business/${businessId}`,
// //                 getAuthConfig()
// //               );

// //             vendorData[businessId] =
// //               vendorRes.data.business;
// //           } catch {
// //             vendorData[businessId] = null;
// //           }
// //         }

// //         setVendors(vendorData);
// //       })
// //       .catch((err) => {
// //         console.error(
// //           "Cart fetch error:",
// //           err
// //         );
// //       });
// //   }, [user]);

// //   /**
// //    * Delivery pricing.
// //    *
// //    * Existing RedStar and GIG integrations stay as they are.
// //    * FEZ calls the Express API:
// //    *
// //    * POST /fez/cost
// //    */
// //   useEffect(() => {
// //     const getDeliveryFee = async () => {
// //       const supportedProviders = [
// //         "redstar",
// //         "gig",
// //         "fez",
// //       ];

// //       if (
// //         !supportedProviders.includes(
// //           selectedShipping
// //         ) ||
// //         cartItems.length === 0
// //       ) {
// //         setDeliveryFee(null);
// //         setDeliveryFee2(null);
// //         return;
// //       }

// //       setLoadingDeliveryFee(true);
// //       setDeliveryFee(null);
// //       setDeliveryFee2(null);

// //       const REDSTAR_API_KEY =
// //         process.env
// //           .NEXT_PUBLIC_REDSTAR_API_KEY;

// //       const groupedVendors =
// //         groupItemsByBusiness(cartItems);

// //       let totalFee = 0;

// //       try {
// //         /**
// //          * ---------------------------------------------------------
// //          * GIG receiver coordinates
// //          * ---------------------------------------------------------
// //          */
// //         let receiverCoords:
// //           | {
// //               Latitude: number;
// //               Longitude: number;
// //             }
// //           | null = null;

// //         if (
// //           selectedShipping === "gig"
// //         ) {
// //           const receiverAddressStr =
// //             `${address}, ${city}, ${state}`;

// //           receiverCoords =
// //             await getCoordinates(
// //               receiverAddressStr
// //             );
// //         }

// //         /**
// //          * ---------------------------------------------------------
// //          * Each vendor
// //          * ---------------------------------------------------------
// //          */
// //         for (const vendor of groupedVendors) {
// //           const vendorRes =
// //             await axios.get(
// //               `/business/${vendor.businessId}`,
// //               getAuthConfig()
// //             );

// //           const v =
// //             vendorRes.data.business;

// //           const totalWeight =
// //             vendor.items.reduce(
// //               (sum, item) =>
// //                 sum +
// //                 (item.productId.quantityInfo
// //                   ?.weight ||
// //                   item.productId.weight ||
// //                   1) *
// //                   item.quantity,
// //               0
// //             );

// //           const vendorTotalValue =
// //             vendor.items.reduce(
// //               (sum, item) =>
// //                 sum +
// //                 (item.productId.price ||
// //                   0) *
// //                   item.quantity,
// //               0
// //             );

// //           /**
// //            * -------------------------------------------------------
// //            * REDSTAR
// //            * Existing integration preserved
// //            * -------------------------------------------------------
// //            */
// //           if (
// //             selectedShipping ===
// //             "redstar"
// //           ) {
// //             const feeRes =
// //               await axios.post(
// //                 "/auth/DeliveryFee",
// //                 {
// //                   senderCity:
// //                     v.addresses?.city ||
// //                     "Unknown",

// //                   senderTownID:
// //                     v.addresses?.townId ||
// //                     0,

// //                   recipientCity:
// //                     cityName,

// //                   recipientTownID:
// //                     parseInt(townId) ||
// //                     0,

// //                   pickupType: 1,
// //                   weight: totalWeight,
// //                 },
// //                 {
// //                   headers: {
// //                     "X-API-KEY":
// //                       REDSTAR_API_KEY,

// //                     "Content-Type":
// //                       "application/json",
// //                   },
// //                 }
// //               );

// //             totalFee +=
// //               Number(
// //                 feeRes.data.TotalAmount
// //               ) || 0;
// //           }

// //           /**
// //            * -------------------------------------------------------
// //            * GIG
// //            * Existing integration preserved
// //            * -------------------------------------------------------
// //            */
// //           else if (
// //             selectedShipping ===
// //             "gig"
// //           ) {
// //             const senderAddressStr =
// //               `${v.addresses?.street || ""}, ${
// //                 v.addresses?.city || ""
// //               }, ${
// //                 v.addresses?.state || ""
// //               }`;

// //             const senderCoords =
// //               await getCoordinates(
// //                 senderAddressStr
// //               );

// //             const vehicle =
// //               GIG_WEIGHT_THRESHOLDS.find(
// //                 (vw) =>
// //                   totalWeight <=
// //                   vw.max
// //               );

// //             const vehicleType =
// //               vehicle
// //                 ? vehicle.type
// //                 : GIG_VEHICLE_TYPES.TRUCK;

// //             const gigPayload = {
// //               SenderStationId: 3,
// //               ReceiverStationId: 3,
// //               VehicleType:
// //                 vehicleType,

// //               SenderLocation:
// //                 senderCoords,

// //               ReceiverLocation:
// //                 receiverCoords,

// //               IsFromAgility: false,

// //               CustomerCode:
// //                 "ECO038082",

// //               CustomerType: 0,
// //               PickUpOptions: 0,

// //               DeliveryOptionIds: [
// //                 1,
// //                 2,
// //               ],

// //               Value:
// //                 vendorTotalValue,

// //               ShipmentItems:
// //                 vendor.items.map(
// //                   (item) => ({
// //                     ItemName:
// //                       item.productId
// //                         .name,

// //                     Description:
// //                       item.productId
// //                         .description ||
// //                       "Vendor item",

// //                     Quantity:
// //                       item.quantity,

// //                     Weight:
// //                       item.productId
// //                         .quantityInfo
// //                         ?.weight ||
// //                       0.1,

// //                     IsVolumetric:
// //                       false,

// //                     ShipmentType:
// //                       1,

// //                     Value:
// //                       item.productId
// //                         .price ||
// //                       0,
// //                   })
// //                 ),
// //             };

// //             const gigFeeRes =
// //               await axios.post(
// //                 "https://dev-thirdpartynode.theagilitysystems.com/price",
// //                 gigPayload,
// //                 {
// //                   headers: {
// //                     accept:
// //                       "application/json",

// //                     // Existing integration.
// //                     // Keep your current backend-controlled
// //                     // GIG token when you move that integration
// //                     // server-side.
// //                     "access-token":
// //                       process.env
// //                         .NEXT_PUBLIC_GIG_ACCESS_TOKEN ||
// //                       "",

// //                     "content-type":
// //                       "application/json",
// //                   },
// //                 }
// //               );

// //             if (
// //               gigFeeRes.data?.data &&
// //               typeof
// //                 gigFeeRes.data.data
// //                   .GrandTotal ===
// //                 "number"
// //             ) {
// //               totalFee +=
// //                 gigFeeRes.data.data
// //                   .GrandTotal;
// //             }
// //           }

// //           /**
// //            * -------------------------------------------------------
// //            * FEZ
// //            *
// //            * Browser -> Express -> FEZ
// //            *
// //            * No FEZ secret appears here.
// //            * -------------------------------------------------------
// //            */
// //           else if (
// //             selectedShipping === "fez"
// //           ) {
// //             const destinationState =
// //               normalizeNigeriaState(
// //                 state
// //               );

// //             const pickUpState =
// //               normalizeNigeriaState(
// //                 v.addresses?.state
// //               );

// //             const fezWeight =
// //               Math.max(
// //                 1,
// //                 Math.ceil(
// //                   Number(totalWeight) ||
// //                     1
// //                 )
// //               );

// //             const fezCostRes =
// //               await axios.post(
// //                 "/fez/cost",
// //                 {
// //                   state:
// //                     destinationState,

// //                   pickUpState:
// //                     pickUpState,

// //                   weight:
// //                     fezWeight,

// //                   locker: false,
// //                 },
// //                 getAuthConfig()
// //               );

// //             const fezData =
// //               fezCostRes.data?.data ||
// //               fezCostRes.data ||
// //               {};

// //             const costItems =
// //               getFezCostItems(
// //                 fezData
// //               );

// //             if (
// //               costItems.length === 0
// //             ) {
// //               throw new Error(
// //                 `FEZ returned no delivery cost for ${destinationState}.`
// //               );
// //             }

// //             const destinationMatch =
// //               costItems.find(
// //                 (item) =>
// //                   normalizeNigeriaState(
// //                     item.state
// //                   ) ===
// //                   destinationState
// //               );

// //             const selectedCost =
// //               destinationMatch ||
// //               costItems[0];

// //             const numericCost =
// //               Number(
// //                 selectedCost?.cost
// //               );

// //             if (
// //               !Number.isFinite(
// //                 numericCost
// //               )
// //             ) {
// //               throw new Error(
// //                 `Invalid FEZ delivery price returned for ${destinationState}.`
// //               );
// //             }

// //             totalFee +=
// //               numericCost;
// //           }
// //         }

// //         /**
// //          * Existing 1.65% platform calculation.
// //          */
// //         const percentage =
// //           1.65 / 100;

// //         const baseAmount =
// //           totalFee +
// //           totalProductPrice;

// //         const percentageFee =
// //           baseAmount *
// //           percentage;

// //         const finalDeliveryFee =
// //           Math.round(
// //             totalFee +
// //               percentageFee
// //           );

// //         setDeliveryFee(
// //           totalFee
// //         );

// //         setDeliveryFee2(
// //           finalDeliveryFee
// //         );
// //       } catch (err: any) {
// //         console.error(
// //           "Delivery Pricing Error:",
// //           err
// //         );

// //         setDeliveryFee(null);
// //         setDeliveryFee2(null);

// //         Swal.fire(
// //           "Pricing Error",
// //           err?.response?.data
// //             ?.message ||
// //             `Failed to calculate ${selectedShipping.toUpperCase()} delivery fee.`,
// //           "error"
// //         );
// //       } finally {
// //         setLoadingDeliveryFee(
// //           false
// //         );
// //       }
// //     };

// //     getDeliveryFee();
// //   }, [
// //     selectedShipping,
// //     cartItems,
// //     address,
// //     city,
// //     state,
// //     cityName,
// //     townId,
// //     totalProductPrice,
// //   ]);

// //   const handleSelectRedStar =
// //     () =>
// //       setSelectedShipping(
// //         "redstar"
// //       );

// //   const handleSelectFEZ =
// //     () =>
// //       setSelectedShipping(
// //         "fez"
// //       );

// //   const handleSelectGIG =
// //     () =>
// //       setSelectedShipping(
// //         "gig"
// //       );

// //   const handleSelectDHL =
// //     () =>
// //       setSelectedShipping(
// //         "dhl"
// //       );

// //   const handleSelectCashOnDelivery =
// //     () =>
// //       setSelectedShipping(
// //         "pay on delivery"
// //       );

// //   /**
// //    * FEZ order creation.
// //    *
// //    * Browser -> Express -> FEZ
// //    */
// //   const createFezOrders = async (
// //     groupedVendors: VendorPayload[]
// //   ) => {
// //     const batchId =
// //       `NZ-FEZ-${Date.now()}`;

// //     const preparedOrders =
// //       [];

// //     for (
// //       let index = 0;
// //       index < groupedVendors.length;
// //       index++
// //     ) {
// //       const vendor =
// //         groupedVendors[index];

// //       const vendorData =
// //         vendors[
// //           vendor.businessId
// //         ];

// //       if (
// //         !vendorData ||
// //         !vendorData.addresses
// //       ) {
// //         throw new Error(
// //           `Vendor data is missing for ${vendor.businessId}.`
// //         );
// //       }

// //       const vendorTotalWeight =
// //         vendor.items.reduce(
// //           (sum, item) =>
// //             sum +
// //             (item.productId
// //               .quantityInfo
// //               ?.weight ||
// //               item.productId
// //                 .weight ||
// //               1) *
// //               item.quantity,
// //           0
// //         );

// //       const vendorTotalValue =
// //         vendor.items.reduce(
// //           (sum, item) =>
// //             sum +
// //             (item.productId.price ||
// //               0) *
// //               item.quantity,
// //           0
// //         );

// //       const senderName =
// //         vendorData.userId
// //           ? `${vendorData.userId.firstname || ""} ${
// //               vendorData.userId.lastname || ""
// //             }`.trim()
// //           : vendorData.businessName ||
// //             vendorData.name ||
// //             "Seller";

// //       const senderPhone =
// //         vendorData.userId?.phone ||
// //         vendorData.phone ||
// //         "0000000000";

// //       const senderAddress = [
// //         vendorData.addresses
// //           ?.street,
// //         vendorData.addresses
// //           ?.town,
// //         vendorData.addresses
// //           ?.city,
// //         vendorData.addresses
// //           ?.state,
// //       ]
// //         .filter(Boolean)
// //         .join(", ");

// //       const recipientAddress = [
// //         address,
// //         town,
// //         city,
// //         state,
// //       ]
// //         .filter(Boolean)
// //         .join(", ");

// //       const uniqueID =
// //         `NZ-${Date.now()}-${index}-${vendor.businessId.slice(
// //           -6
// //         )}`;

// //       const itemDescription =
// //         vendor.items
// //           .map(
// //             (item) =>
// //               `${item.productId.name} x ${item.quantity}`
// //           )
// //           .join(", ");

// //       const payload = {
// //         recipientAddress,

// //         recipientState:
// //           normalizeNigeriaState(
// //             state
// //           ),

// //         recipientName:
// //           `${user?.firstname || ""} ${
// //             user?.lastname || ""
// //           }`.trim(),

// //         recipientPhone:
// //           user?.phone ||
// //           "0000000000",

// //         recipientEmail:
// //           user?.email || "",

// //         uniqueID,

// //         BatchID: batchId,

// //         itemDescription,

// //         additionalDetails:
// //           `Town: ${
// //             town || "N/A"
// //           }, City: ${
// //             city || "N/A"
// //           }, Order created from New Zenith Marketplace`,

// //         valueOfItem:
// //           String(
// //             vendorTotalValue
// //           ),

// //         weight: Math.max(
// //           1,
// //           Math.ceil(
// //             Number(
// //               vendorTotalWeight
// //             ) || 1
// //           )
// //         ),

// //         pickUpState:
// //           normalizeNigeriaState(
// //             vendorData.addresses
// //               ?.state
// //           ),

// //         pickUpAddress:
// //           senderAddress,

// //         isItemCod: false,

// //         fragile: false,

// //         thirdparty: true,

// //         senderName,

// //         senderAddress,

// //         senderPhone,
// //       };

// //       preparedOrders.push({
// //         businessId:
// //           vendor.businessId,

// //         vendor,

// //         vendorData,

// //         uniqueID,

// //         payload,
// //       });
// //     }

// //     if (
// //       preparedOrders.length === 0
// //     ) {
// //       throw new Error(
// //         "No FEZ orders were prepared."
// //       );
// //     }

// //     /**
// //      * One request to Express.
// //      */
// //     const fezResult =
// //       await axios.post(
// //         "/fez/order",
// //         preparedOrders.map(
// //           (item) => item.payload
// //         ),
// //         getAuthConfig()
// //       );

// //     const fezResponse: FezOrderResponse =
// //       fezResult.data?.data ||
// //       fezResult.data ||
// //       {};

// //     const orderNumbers =
// //       getFezOrderNumbers(
// //         fezResponse
// //       );

// //     const fezStatus =
// //       String(
// //         fezResponse.status || ""
// //       ).toLowerCase();

// //     if (
// //       fezResponse.success === false ||
// //       fezStatus === "failed"
// //     ) {
// //       throw new Error(
// //         fezResponse.message ||
// //           "FEZ shipment creation failed."
// //       );
// //     }

// //     /**
// //      * FEZ returns order numbers mapped
// //      * against uniqueID.
// //      *
// //      * Save every successful shipment
// //      * into the existing internal order system.
// //      */
// //     let successfulShipments = 0;
// //     const errors: string[] = [];

// //     for (
// //       const prepared of preparedOrders
// //     ) {
// //       const fezOrderNumber =
// //         orderNumbers[
// //           prepared.uniqueID
// //         ];

// //       try {
// //         const internalOrderPayload =
// //           {
// //             businessId:
// //               prepared.businessId,

// //             vendorId:
// //               prepared.vendorData
// //                 .userId?._id ||
// //               prepared.vendorData
// //                 .owner ||
// //               prepared.vendorData._id,

// //             items:
// //               prepared.vendor
// //                 .items,

// //             logisticsPayload:
// //               prepared.payload,

// //             logisticsResponse: {
// //               provider:
// //                 "FEZ",

// //               orderNo:
// //                 fezOrderNumber ||
// //                 null,

// //               batchId,

// //               response:
// //                 fezResponse,
// //             },

// //             paymentReference:
// //               `WALLET-${Date.now()}-${successfulShipments}`,

// //             shippingMethod:
// //               "fez",
// //           };

// //         const dbResult =
// //           await axios.post(
// //             "/orders/create",
// //             internalOrderPayload,
// //             getAuthConfig()
// //           );

// //         if (
// //           dbResult.data?.success
// //         ) {
// //           successfulShipments++;
// //         } else {
// //           errors.push(
// //             `FEZ shipment created for ${
// //               prepared.vendorData.businessName ||
// //               prepared.vendorData.name ||
// //               prepared.businessId
// //             }, but internal order saving failed.`
// //           );
// //         }
// //       } catch (error: any) {
// //         errors.push(
// //           `FEZ shipment created for ${
// //             prepared.vendorData.businessName ||
// //             prepared.vendorData.name ||
// //             prepared.businessId
// //           }, but internal order saving failed. ${
// //             error.response?.data?.message ||
// //             error.message ||
// //             ""
// //           }`
// //         );
// //       }
// //     }

// //     return {
// //       successfulShipments,
// //       errors,
// //       batchId,
// //       orderNumbers,
// //     };
// //   };

// //   /**
// //    * Submit checkout.
// //    */
// //   const handleSubmit = async (
// //     e?: React.FormEvent
// //   ) => {
// //     e?.preventDefault();

// //     if (
// //       !selectedShipping
// //     ) {
// //       return Swal.fire(
// //         "Select Shipping",
// //         "Please select a shipping method.",
// //         "warning"
// //       );
// //     }

// //     if (
// //       selectedShipping ===
// //       "dhl"
// //     ) {
// //       return Swal.fire(
// //         "Coming Soon",
// //         "DHL checkout is not available yet.",
// //         "info"
// //       );
// //     }

// //     if (
// //       ![
// //         "redstar",
// //         "gig",
// //         "fez",
// //         "pay on delivery",
// //       ].includes(
// //         selectedShipping
// //       )
// //     ) {
// //       return Swal.fire(
// //         "Notice",
// //         "This shipping method is not currently available.",
// //         "info"
// //       );
// //     }

// //     const groupedVendors =
// //       groupItemsByBusiness(
// //         cartItems
// //       );

// //     if (
// //       groupedVendors.length === 0
// //     ) {
// //       return Swal.fire(
// //         "Error",
// //         "Your basket is empty.",
// //         "error"
// //       );
// //     }

// //     if (
// //       selectedShipping !==
// //         "pay on delivery" &&
// //       (deliveryFee2 === null ||
// //         loadingDeliveryFee)
// //     ) {
// //       return Swal.fire(
// //         "Delivery Fee",
// //         "Please wait for the shipping fee to finish calculating.",
// //         "info"
// //       );
// //     }

// //     setIsSubmitting(true);

// //     Swal.fire({
// //       title:
// //         "Submitting Orders...",
// //       text: `Processing ${groupedVendors.length} shipment(s). Please wait.`,
// //       allowOutsideClick: false,
// //       didOpen: () =>
// //         Swal.showLoading(),
// //     });

// //     /**
// //      * -------------------------------------------------------
// //      * FEZ
// //      * -------------------------------------------------------
// //      */
// //     if (
// //       selectedShipping ===
// //       "fez"
// //     ) {
// //       try {
// //         const result =
// //           await createFezOrders(
// //             groupedVendors
// //           );

// //         Swal.close();

// //         if (
// //           result.successfulShipments >
// //           0
// //         ) {
// //           await Swal.fire(
// //             "Success!",
// //             `${result.successfulShipments} FEZ shipment(s) created successfully.`,
// //             "success"
// //           );

// //           router.push(
// //             "/user/dashboard/transaction"
// //           );

// //           return;
// //         }

// //         await Swal.fire(
// //           "Order Failed",
// //           result.errors.join(
// //             "\n"
// //           ) ||
// //             "No FEZ shipments were created.",
// //           "error"
// //         );
// //       } catch (error: any) {
// //         Swal.close();

// //         await Swal.fire(
// //           "FEZ Order Failed",
// //           error.response?.data
// //             ?.message ||
// //             error.message ||
// //             "Unable to create FEZ shipment.",
// //           "error"
// //         );
// //       } finally {
// //         setIsSubmitting(false);
// //       }

// //       return;
// //     }

// //     /**
// //      * -------------------------------------------------------
// //      * EXISTING REDSTAR / POD FLOW
// //      * -------------------------------------------------------
// //      */
// //     const REDSTAR_API_KEY =
// //       process.env
// //         .NEXT_PUBLIC_REDSTAR_API_KEY;

// //     let successfulShipments = 0;
// //     const errors: string[] = [];

// //     for (
// //       const vendor of groupedVendors
// //     ) {
// //       const vendorData =
// //         vendors[
// //           vendor.businessId
// //         ];

// //       if (
// //         !vendorData ||
// //         !vendorData.addresses
// //       ) {
// //         errors.push(
// //           `Vendor data missing for ID: ${vendor.businessId}`
// //         );
// //         continue;
// //       }

// //       const vendorTotalWeight =
// //         vendor.items.reduce(
// //           (sum, item) =>
// //             sum +
// //             (item.productId
// //               .quantityInfo?.weight ||
// //               item.productId.weight ||
// //               1) *
// //               item.quantity,
// //           0
// //         );

// //       const vendorTotalPieces =
// //         vendor.items.reduce(
// //           (sum, item) =>
// //             sum + item.quantity,
// //           0
// //         );

// //       const shipmentItems =
// //         vendor.items.map(
// //           (item) => ({
// //             id: 0,
// //             status: 0,
// //             createdOn:
// //               new Date().toISOString(),
// //             createdBy:
// //               user?.firstname ||
// //               "User",

// //             shipmentId: 0,

// //             commodity:
// //               item.productId.name,

// //             description:
// //               item.productId
// //                 .description,

// //             countryOfManufacturing:
// //               "Nigeria",

// //             quantity:
// //               item.quantity,

// //             weight:
// //               (item.productId
// //                 .quantityInfo
// //                 ?.weight ||
// //                 item.productId
// //                   .weight ||
// //                 1) *
// //               item.quantity,

// //             unitOfMeasure: 0,

// //             unitOfPrice:
// //               item.productId
// //                 .price || 0,
// //           })
// //         );

// //       const singleRedStarPayload =
// //         {
// //           senderCity:
// //             vendorData.addresses
// //               .city ||
// //             "Unknown",

// //           recipientCity:
// //             cityName,

// //           recipientTownID:
// //             parseInt(townId) ||
// //             0,

// //           recipientName:
// //             `${user?.firstname || ""} ${
// //               user?.lastname || ""
// //             }`,

// //           recipientPhoneNo:
// //             user?.phone ||
// //             "0000000000",

// //           recipientEmail:
// //             user?.email || "",

// //           recipientAddress:
// //             address,

// //           recipientState:
// //             state,

// //           senderTownID:
// //             vendorData.addresses
// //               .townId || 0,

// //           senderName:
// //             `${
// //               vendorData.userId
// //                 ?.firstname || ""
// //             } ${
// //               vendorData.userId
// //                 ?.lastname ||
// //               vendorData.name ||
// //               ""
// //             }`.trim(),

// //           senderAddress:
// //             vendorData.addresses
// //               .street ||
// //             "Unknown",

// //           senderPhone:
// //             vendorData.userId
// //               ?.phone ||
// //             "0000000000",

// //           orderNo:
// //             `ORDER-${Date.now()}-${vendor.businessId.substring(
// //               0,
// //               4
// //             )}`,

// //           packaging: "Box",

// //           boxandCrating:
// //             "Standard",

// //           deliveryType:
// //             "Door to Door",

// //           description:
// //             `Order from ${
// //               vendorData.name ||
// //               vendorData.businessName ||
// //               "Vendor"
// //             }`,

// //           onforwardingLocation:
// //             "",

// //           paymentType:
// //             "Prepaid",

// //           pickupType: 1,

// //           weight:
// //             vendorTotalWeight,

// //           pieces:
// //             vendorTotalPieces,

// //           cashOnDelivery: 0,

// //           shipmentItems,
// //         };

// //       try {
// //         /**
// //          * PAY ON DELIVERY
// //          */
// //         if (
// //           selectedShipping ===
// //           "pay on delivery"
// //         ) {
// //           const internalOrderPayload =
// //             {
// //               businessId:
// //                 vendor.businessId,

// //               vendorId:
// //                 vendorData.userId
// //                   ?._id ||
// //                 vendorData.owner ||
// //                 vendorData._id,

// //               items:
// //                 vendor.items,

// //               paymentReference:
// //                 `WALLET-${Date.now()}`,

// //               shippingMethod:
// //                 "pay on delivery",
// //             };

// //           const dbResult =
// //             await axios.post(
// //               "/orders/create",
// //               internalOrderPayload,
// //               getAuthConfig()
// //             );

// //           if (
// //             dbResult.data
// //               ?.success
// //           ) {
// //             successfulShipments++;
// //           } else {
// //             errors.push(
// //               `Failed to save Pay on Delivery order for ${
// //                 vendorData.name ||
// //                 vendorData.businessName ||
// //                 "Vendor"
// //               }.`
// //             );
// //           }
// //         }

// //         /**
// //          * REDSTAR
// //          */
// //         else if (
// //           selectedShipping ===
// //           "redstar"
// //         ) {
// //           const res =
// //             await axios.post(
// //               "/auth/PickupRequest",
// //               singleRedStarPayload,
// //               {
// //                 headers: {
// //                   "X-API-KEY":
// //                     REDSTAR_API_KEY,

// //                   "Content-Type":
// //                     "application/json",
// //                 },
// //               }
// //             );

// //           if (
// //             res.data
// //               .TransStatus ===
// //             "Successful"
// //           ) {
// //             try {
// //               const internalOrderPayload =
// //                 {
// //                   businessId:
// //                     vendor.businessId,

// //                   vendorId:
// //                     vendorData
// //                       .userId?._id ||
// //                     vendorData
// //                       .owner ||
// //                     vendorData._id,

// //                   items:
// //                     vendor.items,

// //                   logisticsPayload:
// //                     singleRedStarPayload,

// //                   logisticsResponse:
// //                     res.data,

// //                   paymentReference:
// //                     `WALLET-${Date.now()}`,

// //                   shippingMethod:
// //                     "redstar",
// //                 };

// //               const dbResult =
// //                 await axios.post(
// //                   "/orders/create",
// //                   internalOrderPayload,
// //                   getAuthConfig()
// //                 );

// //               if (
// //                 dbResult.data
// //                   ?.success
// //               ) {
// //                 successfulShipments++;
// //               } else {
// //                 errors.push(
// //                   `Shipment created for ${
// //                     vendorData.name ||
// //                     vendorData.businessName ||
// //                     "Vendor"
// //                   }, but failed to save internally.`
// //                 );
// //               }
// //             } catch {
// //               errors.push(
// //                 `Shipment created for ${
// //                   vendorData.name ||
// //                   vendorData.businessName ||
// //                   "Vendor"
// //                 }, but failed to save internally.`
// //               );
// //             }
// //           } else {
// //             errors.push(
// //               res.data
// //                 ?.Message ||
// //                 `RedStar API error for ${
// //                   vendorData.name ||
// //                   vendorData.businessName ||
// //                   "Vendor"
// //                 }.`
// //             );
// //           }
// //         }
// //       } catch (error: any) {
// //         errors.push(
// //           `Failed for ${
// //             vendorData.name ||
// //             vendorData.businessName ||
// //             "Vendor"
// //           }. ${
// //             error.response?.data
// //               ?.Message ||
// //             error.response?.data
// //               ?.message ||
// //             error.message ||
// //             ""
// //           }`
// //         );
// //       }
// //     }

// //     Swal.close();
// //     setIsSubmitting(false);

// //     if (
// //       successfulShipments > 0
// //     ) {
// //       await Swal.fire(
// //         "Success!",
// //         `${successfulShipments} shipment(s) created.`,
// //         "success"
// //       );

// //       router.push(
// //         "/user/dashboard/transaction"
// //       );
// //     } else {
// //       Swal.fire(
// //         "Order Failed",
// //         errors.join("\n") ||
// //           "No shipments created.",
// //         "error"
// //       );
// //     }
// //   };

// //   const totalPayable =
// //     totalProductPrice +
// //     (deliveryFee2 || 0);

// //   const balanceDifference =
// //     walletBalance -
// //     totalPayable;

// //   const hasSufficientBalance =
// //     balanceDifference >=
// //     0;

// //   const shippingReady =
// //     selectedShipping ===
// //     "pay on delivery"
// //       ? true
// //       : [
// //           "redstar",
// //           "gig",
// //           "fez",
// //         ].includes(
// //           selectedShipping
// //         ) &&
// //         deliveryFee2 !== null &&
// //         !loadingDeliveryFee;

// //   const canCheckout =
// //     cartItems.length > 0 &&
// //     !!selectedShipping &&
// //     shippingReady &&
// //     !isSubmitting &&
// //     !loadingDeliveryFee;

// //   return (
// //     <>
// //       {showModal && (
// //         <AddressModal
// //           onClose={() =>
// //             setShowModal(false)
// //           }
// //         />
// //       )}

// //       {showModal2 && (
// //         <FundWalletModal
// //           onClose={() =>
// //             setShowModal2(false)
// //           }
// //         />
// //       )}

// //       <CircleLoader
// //         isVisible={loading}
// //       />

// //       <form
// //         className="p-6 md:w-[50vw] md:mx-10 lg:mx-0 xl:mx-10 mb-20"
// //         onSubmit={handleSubmit}
// //       >
// //         <TagHeader
// //           title="Checkout"
// //         />

// //         {/* Checkout Steps */}
// //         <div className="flex justify-around mb-8 mx-auto xl:ml-20 ml-12">
// //           <div className="flex flex-col items-center text-center justify-center mr-auto">
// //             <div className="w-8 h-8 rounded-full text-[#006838] bg-[#C4EDDA] flex items-center justify-center">
// //               <CheckOutlinedIcon />
// //             </div>

// //             <p className="text-sm font-bold py-2">
// //               Your bag
// //             </p>
// //           </div>

// //           <div className="flex flex-col items-center justify-center mr-auto">
// //             <div className="w-8 h-8 rounded-full bg-[#006838] flex items-center justify-center text-white">
// //               2
// //             </div>

// //             <p className="text-sm font-bold py-2">
// //               Shipping
// //             </p>
// //           </div>

// //           <div className="flex flex-col items-center text-gray-400 mr-auto">
// //             <div className="w-8 h-8 rounded-full bg-[#F8F9FE] flex items-center justify-center">
// //               3
// //             </div>

// //             <p className="text-sm font-bold py-2">
// //               Payment
// //             </p>
// //           </div>
// //         </div>

// //         {/* Address */}
// //         <div className="mb-4 border border-gray-300 rounded-lg p-4">
// //           <div className="p-5 rounded-lg flex justify-between">
// //             <div className="flex items-center space-x-3">
// //               <div className="text-gray-400">
// //                 <MyLocationOutlinedIcon />
// //               </div>

// //               <div>
// //                 <h3 className="text-sm font-semibold mb-1">
// //                   Saved Address
// //                 </h3>

// //                 <p className="text-gray-500">
// //                   Address:{" "}
// //                   {address || "N/A"}
// //                 </p>

// //                 <p className="text-gray-500">
// //                   City:{" "}
// //                   {city || "N/A"}
// //                 </p>

// //                 <p className="text-gray-500">
// //                   State:{" "}
// //                   {state || "N/A"}
// //                 </p>
// //               </div>
// //             </div>

// //             <div className="text-[#006838] my-auto">
// //               <CheckOutlinedIcon />
// //             </div>
// //           </div>

// //           <div className="flex justify-center">
// //             <button
// //               className="text-[#006838] mt-2"
// //               onClick={() =>
// //                 setShowModal(true)
// //               }
// //               type="button"
// //             >
// //               + Add Address
// //             </button>
// //           </div>
// //         </div>

// //         {/* Shipping Method */}
// //         <div className="mb-4">
// //           <h3 className="text-lg font-semibold mb-4">
// //             Pick Shipping Option
// //           </h3>

// //           {shippingProviders.map(
// //             (provider) => {
// //               const isSelected =
// //                 selectedShipping ===
// //                 provider.id;

// //               return (
// //                 <div
// //                   key={provider.id}
// //                   className={`p-4 mb-2 rounded-lg border h-20 flex items-center justify-between transition ${
// //                     provider.available
// //                       ? "cursor-pointer"
// //                       : "cursor-not-allowed opacity-50"
// //                   } ${
// //                     isSelected
// //                       ? "border-blue-500 bg-blue-50"
// //                       : "border-gray-300 bg-white"
// //                   }`}
// //                   onClick={() => {
// //                     if (
// //                       !provider.available
// //                     ) {
// //                       return;
// //                     }

// //                     switch (
// //                       provider.id
// //                     ) {
// //                       case "redstar":
// //                         handleSelectRedStar();
// //                         break;

// //                       case "fez":
// //                         handleSelectFEZ();
// //                         break;

// //                       case "gig":
// //                         handleSelectGIG();
// //                         break;

// //                       case "dhl":
// //                         handleSelectDHL();
// //                         break;

// //                       case "pay on delivery":
// //                         handleSelectCashOnDelivery();
// //                         break;

// //                       default:
// //                         setSelectedShipping(
// //                           provider.id
// //                         );
// //                     }
// //                   }}
// //                 >
// //                   {provider.externalLogo ? (
// //                     <img
// //                       src={provider.logo}
// //                       alt={
// //                         provider.name
// //                       }
// //                       width={
// //                         provider.width
// //                       }
// //                       height={
// //                         provider.height
// //                       }
// //                       className="object-contain"
// //                     />
// //                   ) : (
// //                     <Image
// //                       src={provider.logo}
// //                       alt={
// //                         provider.name
// //                       }
// //                       width={
// //                         provider.width
// //                       }
// //                       height={
// //                         provider.height
// //                       }
// //                       className="object-contain"
// //                     />
// //                   )}

// //                   <div className="flex-1 ml-4">
// //                     <p className="font-medium text-gray-800 text-[11px] md:text-[15px]">
// //                       {provider.name}
// //                     </p>

// //                     {provider.id ===
// //                       "fez" && (
// //                       <p className="text-xs text-green-600 mt-1">
// //                         Live delivery pricing
// //                       </p>
// //                     )}

// //                     {!provider.available && (
// //                       <p className="text-xs text-gray-400 mt-1">
// //                         Coming soon
// //                       </p>
// //                     )}
// //                   </div>

// //                   {isSelected && (
// //                     <div className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center">
// //                       <CheckOutlinedIcon
// //                         sx={{
// //                           fontSize:
// //                             14,
// //                         }}
// //                       />
// //                     </div>
// //                   )}
// //                 </div>
// //               );
// //             }
// //           )}
// //         </div>

// //         {/* Price Summary */}
// //         <div className="mb-4 border border-gray-300 rounded-lg p-4 text-center">
// //           {selectedShipping ===
// //           "pay on delivery" ? (
// //             <p className="font-medium text-gray-700">
// //               NB: Shipping Fee will
// //               be completed via
// //               WhatsApp or phone call
// //             </p>
// //           ) : (
// //             <div className="font-medium text-gray-700">
// //               Shipping Fee:{" "}
// //               {loadingDeliveryFee
// //                 ? "Calculating..."
// //                 : deliveryFee2 !==
// //                     null &&
// //                   [
// //                     "redstar",
// //                     "gig",
// //                     "fez",
// //                   ].includes(
// //                     selectedShipping
// //                   )
// //                 ? `₦${deliveryFee2.toLocaleString()}`
// //                 : selectedShipping ===
// //                   ""
// //                 ? "Select a shipping method"
// //                 : "Unable to calculate fee"}
// //             </div>
// //           )}

// //           {selectedShipping ===
// //             "fez" &&
// //             !loadingDeliveryFee &&
// //             deliveryFee !== null && (
// //               <div className="text-xs text-gray-500 mt-1">
// //                 FEZ base delivery:
// //                 {" "}
// //                 ₦
// //                 {deliveryFee.toLocaleString()}
// //                 <span className="mx-1">
// //                   •
// //                 </span>
// //                 platform calculation included
// //               </div>
// //             )}

// //           <div className="text-gray-600 mt-2">
// //             Product Price: ₦
// //             {totalProductPrice.toLocaleString()}
// //           </div>

// //           <div className="font-bold text-lg text-gray-900 mt-2">
// //             Total Pay: ₦
// //             {totalPayable.toLocaleString()}
// //           </div>
// //         </div>

// //         {/* Wallet Balance */}
// //         <div
// //           className={`p-4 rounded-lg border ${
// //             hasSufficientBalance
// //               ? "border-green-500 bg-green-50"
// //               : "border-red-500 bg-red-50"
// //           }`}
// //         >
// //           <div className="space-y-2">
// //             <div className="flex justify-between text-sm">
// //               <span>
// //                 Account Balance
// //               </span>

// //               <span className="font-semibold">
// //                 ₦
// //                 {walletBalance.toLocaleString()}
// //               </span>
// //             </div>

// //             <div className="flex justify-between text-sm font-medium">
// //               <span>
// //                 {hasSufficientBalance
// //                   ? "Remaining Balance"
// //                   : "Shortfall"}
// //               </span>

// //               <span
// //                 className={
// //                   hasSufficientBalance
// //                     ? "text-green-700"
// //                     : "text-red-700"
// //                 }
// //               >
// //                 ₦
// //                 {Math.abs(
// //                   balanceDifference
// //                 ).toLocaleString()}
// //               </span>
// //             </div>
// //           </div>

// //           <button
// //             type="button"
// //             className={`mt-4 w-full py-2 rounded-md text-white font-medium transition ${
// //               hasSufficientBalance
// //                 ? "bg-[#006838] hover:bg-green-800"
// //                 : "bg-red-600 hover:bg-red-700"
// //             } ${
// //               !canCheckout &&
// //               hasSufficientBalance
// //                 ? "opacity-50 cursor-not-allowed"
// //                 : ""
// //             }`}
// //             onClick={
// //               hasSufficientBalance
// //                 ? () =>
// //                     handleSubmit()
// //                 : () =>
// //                     setShowModal2(
// //                       true
// //                     )
// //             }
// //             disabled={
// //               isSubmitting ||
// //               loadingDeliveryFee ||
// //               (hasSufficientBalance &&
// //                 !canCheckout)
// //             }
// //           >
// //             {hasSufficientBalance
// //               ? isSubmitting
// //                 ? "Processing..."
// //                 : "Checkout"
// //               : "Top Up Balance"}
// //           </button>
// //         </div>
// //       </form>
// //     </>
// //   );
// // };

// // export default CheckoutShipping;

// // "use client";

// // import { useEffect, useRef, useState } from "react";
// // import { useRouter } from "next/navigation";
// // import Image from "next/image";
// // import axios from "@/utils/axios";
// // import Swal from "sweetalert2";

// // // Icons & Components
// // import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
// // import MyLocationOutlinedIcon from "@mui/icons-material/MyLocationOutlined";
// // import TagHeader from "@/components/header/TagHeader";
// // import CircleLoader from "@/components/loader/loader";
// // import AddressModal from "./AddressModal";
// // import FundWalletModal from "../../../../wallet/components/FundWalletModal";

// // // Assets
// // import DHLLOGO from "@/assets/images/dhl-express-logo-black.png";
// // import PAYONDELIVERYLOGO from "@/assets/images/cash-on-delivery.png";
// // import GIGLOGO from "@/assets/images/gig-logo.png";
// // import REDSTAR from "@/assets/images/redstar.png";

// // interface User {
// //   _id?: string;
// //   firstname: string;
// //   lastname: string;
// //   email: string;
// //   accountType: "buyer" | "seller";
// //   street?: string;
// //   phone: string;
// //   address?: {
// //     town: string;
// //     city: string;
// //     state: string;
// //     zip: string;
// //     street: string;
// //   };
// // }

// // interface Product {
// //   _id: string;
// //   name: string;
// //   weight?: number;
// //   price?: number;
// //   businessId: string;
// //   description: string;
// //   quantityInfo?: {
// //     weight?: number;
// //   };
// // }

// // interface CartItem {
// //   productId: Product;
// //   quantity: number;
// // }

// // interface VendorPayload {
// //   businessId: string;
// //   items: CartItem[];
// // }

// // interface GeoLocation {
// //   Latitude: number;
// //   Longitude: number;
// // }

// // interface FezCostItem {
// //   state?: string;
// //   cost?: string | number;
// // }

// // interface FezCostResponse {
// //   Cost?: FezCostItem[];
// //   cost?: FezCostItem[];
// //   data?: {
// //     Cost?: FezCostItem[];
// //     cost?: FezCostItem[];
// //   };
// // }

// // interface FezOrderResponse {
// //   status?: string;
// //   success?: boolean;
// //   message?: string;
// //   orderNos?: Record<string, string>;
// //   data?: {
// //     status?: string;
// //     orderNos?: Record<string, string>;
// //   };
// // }

// // interface ShippingProvider {
// //   id: string;
// //   name: string;
// //   description?: string;
// //   logo: any;
// //   width: number;
// //   height: number;
// //   available: boolean;
// //   externalLogo?: boolean;
// // }

// // const GIG_VEHICLE_TYPES = {
// //   BIKE: 1,
// //   VAN: 2,
// //   TRUCK: 3,
// // };

// // const GIG_WEIGHT_THRESHOLDS = [
// //   { max: 10, type: GIG_VEHICLE_TYPES.BIKE },
// //   { max: 500, type: GIG_VEHICLE_TYPES.VAN },
// //   { max: Infinity, type: GIG_VEHICLE_TYPES.TRUCK },
// // ];

// // const groupItemsByBusiness = (
// //   items: CartItem[]
// // ): VendorPayload[] => {
// //   const groups: Record<string, CartItem[]> = {};

// //   for (const item of items) {
// //     const businessId = item.productId.businessId;

// //     if (!groups[businessId]) {
// //       groups[businessId] = [];
// //     }

// //     groups[businessId].push(item);
// //   }

// //   return Object.entries(groups).map(
// //     ([businessId, items]) => ({
// //       businessId,
// //       items,
// //     })
// //   );
// // };

// // const normalizeNigeriaState = (
// //   value?: string | null
// // ): string => {
// //   const normalized = String(value || "")
// //     .trim()
// //     .toLowerCase()
// //     .replace(/\s+/g, " ");

// //   const aliases: Record<string, string> = {
// //     "river state": "Rivers",
// //     "rivers state": "Rivers",
// //     rivers: "Rivers",

// //     "lagos state": "Lagos",
// //     lagos: "Lagos",

// //     "fct abuja": "FCT",
// //     abuja: "FCT",
// //     "abuja federal capital territory": "FCT",

// //     "cross river state": "Cross River",
// //     "cross-river state": "Cross River",
// //     "cross river": "Cross River",

// //     "akwala ibom": "Akwa Ibom",
// //     "akwa ibom state": "Akwa Ibom",
// //     "akwa ibom": "Akwa Ibom",

// //     "delta state": "Delta",
// //     delta: "Delta",

// //     "edo state": "Edo",
// //     edo: "Edo",

// //     "enugu state": "Enugu",
// //     enugu: "Enugu",

// //     "imo state": "Imo",
// //     imo: "Imo",

// //     "kano state": "Kano",
// //     kano: "Kano",

// //     "kaduna state": "Kaduna",
// //     kaduna: "Kaduna",

// //     "ogun state": "Ogun",
// //     ogun: "Ogun",

// //     "oyo state": "Oyo",
// //     oyo: "Oyo",

// //     "anambra state": "Anambra",
// //     anambra: "Anambra",

// //     "abia state": "Abia",
// //     abia: "Abia",
// //   };

// //   return (
// //     aliases[normalized] ||
// //     String(value || "").trim()
// //   );
// // };

// // const getCoordinates = async (
// //   address: string
// // ): Promise<{
// //   Latitude: number;
// //   Longitude: number;
// // } | null> => {
// //   if (!address) return null;

// //   const apiKey =
// //     process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

// //   if (!apiKey) {
// //     console.error(
// //       "Google Maps API key is missing."
// //     );
// //     return null;
// //   }

// //   const url =
// //     `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
// //       address
// //     )}&key=${apiKey}`;

// //   try {
// //     const response = await fetch(url);
// //     const data = await response.json();

// //     if (
// //       data.status === "OK" &&
// //       data.results?.length > 0
// //     ) {
// //       const { lat, lng } =
// //         data.results[0].geometry.location;

// //       return {
// //         Latitude: lat,
// //         Longitude: lng,
// //       };
// //     }

// //     return null;
// //   } catch (error) {
// //     console.error(
// //       "Geocoding Error:",
// //       error
// //     );

// //     return null;
// //   }
// // };

// // const getAuthConfig = () => {
// //   const token =
// //     typeof window !== "undefined"
// //       ? localStorage.getItem("userToken")
// //       : null;

// //   return {
// //     headers: {
// //       Authorization: `Bearer ${token || ""}`,
// //     },
// //   };
// // };

// // const getFezCostItems = (response: unknown): FezCostItem[] => {
// //   const findCostArray = (value: unknown): FezCostItem[] => {
// //     if (!value || typeof value !== "object") {
// //       return [];
// //     }

// //     if (Array.isArray(value)) {
// //       const possibleCosts = value.filter(
// //         (item) =>
// //           item &&
// //           typeof item === "object" &&
// //           ("cost" in item || "Cost" in item)
// //       ) as FezCostItem[];

// //       if (possibleCosts.length > 0) {
// //         return possibleCosts;
// //       }

// //       for (const item of value) {
// //         const nested = findCostArray(item);
// //         if (nested.length > 0) return nested;
// //       }

// //       return [];
// //     }

// //     const objectValue = value as Record<string, unknown>;

// //     for (const key of ["Cost", "cost", "costs", "Costs"]) {
// //       if (Array.isArray(objectValue[key])) {
// //         const direct = findCostArray(objectValue[key]);
// //         if (direct.length > 0) return direct;
// //       }
// //     }

// //     for (const key of ["data", "result", "response"]) {
// //       const nested = findCostArray(objectValue[key]);
// //       if (nested.length > 0) return nested;
// //     }

// //     return [];
// //   };

// //   return findCostArray(response);
// // };

// // const getFezOrderNumbers = (
// //   response: FezOrderResponse
// // ): Record<string, string> => {
// //   if (
// //     response?.orderNos &&
// //     typeof response.orderNos === "object"
// //   ) {
// //     return response.orderNos;
// //   }

// //   if (
// //     response?.data?.orderNos &&
// //     typeof response.data.orderNos === "object"
// //   ) {
// //     return response.data.orderNos;
// //   }

// //   return {};
// // };

// // const CheckoutShipping: React.FC = () => {
// //   const router = useRouter();

// //   const [selectedShipping, setSelectedShipping] =
// //     useState("");

// //   const [address, setAddress] = useState("");
// //   const [city, setCity] = useState("");
// //   const [cityName, setCityName] = useState("");
// //   const [state, setState] = useState("");
// //   const [zip, setZip] = useState("");
// //   const [town, setTown] = useState("");
// //   const [townId, setTownId] = useState("");

// //   const [walletBalance, setWalletBalance] =
// //     useState(0);

// //   const [showModal, setShowModal] =
// //     useState(false);

// //   const [showModal2, setShowModal2] =
// //     useState(false);

// //   const [isSubmitting, setIsSubmitting] =
// //     useState(false);

// //   const [loading, setLoading] =
// //     useState(true);

// //   const [loadingDeliveryFee, setLoadingDeliveryFee] =
// //     useState(false);

// //   const [user, setUser] =
// //     useState<User | null>(null);

// //   const [cartItems, setCartItems] =
// //     useState<CartItem[]>([]);

// //   const [groupedItems, setGroupedItems] =
// //     useState<Record<string, CartItem[]>>({});

// //   const [vendors, setVendors] =
// //     useState<Record<string, any>>({});

// //   const [weight, setWeight] =
// //     useState(0);

// //   const [totalProductPrice, setTotalProductPrice] =
// //     useState<number>(0);

// //   const [deliveryFee, setDeliveryFee] =
// //     useState<number | null>(null);

// //   const [deliveryFee2, setDeliveryFee2] =
// //     useState<number | null>(null);

// //   const [pricingError, setPricingError] =
// //     useState<string | null>(null);

// //   // Prevent stale/duplicate pricing requests (including React Strict Mode)
// //   // from overwriting a newer successful quote or opening a false error modal.
// //   const pricingRequestRef = useRef(0);

// //   /**
// //    * Provider list.
// //    *
// //    * FEZ is now active.
// //    * GIG / DHL remain unchanged.
// //    */
// //   const shippingProviders: ShippingProvider[] = [
// //     {
// //       id: "redstar",
// //       name: "Red Star Logistics",
// //       description: "Red Star delivery",
// //       logo: REDSTAR,
// //       width: 120,
// //       height: 20,
// //       available: true,
// //     },
// //     {
// //       id: "fez",
// //       name: "Fez Logistics",
// //       description:
// //         "Reliable nationwide delivery with live pricing.",
// //       logo:
// //         "https://res.cloudinary.com/dq8f0jdgt/image/upload/v1773458882/64708f8629b92d48d4457146_fez_logo_qwnrhz.svg",
// //       width: 120,
// //       height: 24,
// //       available: true,
// //       externalLogo: true,
// //     },
// //     {
// //       id: "gig",
// //       name: "GIG",
// //       description: "GIG delivery",
// //       logo: GIGLOGO,
// //       width: 70,
// //       height: 20,
// //       available: true,
// //     },
// //     {
// //       id: "dhl",
// //       name: "DHL",
// //       description: "DHL delivery",
// //       logo: DHLLOGO,
// //       width: 100,
// //       height: 20,
// //       available: false,
// //     },
// //     {
// //       id: "pay on delivery",
// //       name: "Pay on Delivery",
// //       description: "Payment on delivery",
// //       logo: PAYONDELIVERYLOGO,
// //       width: 150,
// //       height: 120,
// //       available: true,
// //     },
// //   ];

// //   /**
// //    * Fetch profile.
// //    */
// //   useEffect(() => {
// //     const token =
// //       localStorage.getItem("userToken");

// //     if (!token) {
// //       setLoading(false);
// //       return;
// //     }

// //     setLoading(true);

// //     axios
// //       .get("/users/profile", {
// //         headers: {
// //           Authorization: `Bearer ${token}`,
// //         },
// //       })
// //       .then((res) => {
// //         const u = res.data.user;

// //         setUser(u);

// //         setAddress(
// //           u.addresses?.street || ""
// //         );

// //         setCity(
// //           u.addresses?.city || ""
// //         );

// //         setState(
// //           u.addresses?.state || ""
// //         );

// //         setZip(
// //           u.addresses?.zip || ""
// //         );

// //         setTown(
// //           u.addresses?.town || ""
// //         );

// //         setTownId(
// //           u.addresses?.townId || ""
// //         );

// //         setCityName(
// //           u.addresses?.cityName || ""
// //         );

// //         setWalletBalance(
// //           res.data.wallet?.balance || 0
// //         );
// //       })
// //       .catch((error) => {
// //         console.error(
// //           "Profile fetch error:",
// //           error
// //         );
// //       })
// //       .finally(() => {
// //         setLoading(false);
// //       });
// //   }, [showModal]);

// //   /**
// //    * Fetch cart + vendor data.
// //    */
// //   useEffect(() => {
// //     const token =
// //       localStorage.getItem("userToken");

// //     if (!token || !user) return;

// //     axios
// //       .get("cart", getAuthConfig())
// //       .then(async (res) => {
// //         const items: CartItem[] =
// //           res.data?.cart?.items ?? [];

// //         setCartItems(items);

// //         const totalPrice =
// //           items.reduce(
// //             (sum, item) =>
// //               sum +
// //               (item.productId.price || 0) *
// //                 (item.quantity || 1),
// //             0
// //           );

// //         setTotalProductPrice(totalPrice);

// //         const grouped: Record<
// //           string,
// //           CartItem[]
// //         > = {};

// //         let totalCartWeight = 0;

// //         for (const item of items) {
// //           const businessId =
// //             item?.productId?.businessId ||
// //             "unknown";

// //           if (!grouped[businessId]) {
// //             grouped[businessId] = [];
// //           }

// //           grouped[businessId].push(item);

// //           totalCartWeight +=
// //             (item.productId.weight ||
// //               item.productId.quantityInfo
// //                 ?.weight ||
// //               1) *
// //             item.quantity;
// //         }

// //         setGroupedItems(grouped);
// //         setWeight(totalCartWeight);

// //         const vendorData: Record<
// //           string,
// //           any
// //         > = {};

// //         for (const businessId of Object.keys(
// //           grouped
// //         )) {
// //           try {
// //             const vendorRes =
// //               await axios.get(
// //                 `/business/${businessId}`,
// //                 getAuthConfig()
// //               );

// //             vendorData[businessId] =
// //               vendorRes.data.business;
// //           } catch {
// //             vendorData[businessId] = null;
// //           }
// //         }

// //         setVendors(vendorData);
// //       })
// //       .catch((err) => {
// //         console.error(
// //           "Cart fetch error:",
// //           err
// //         );
// //       });
// //   }, [user]);

// //   /**
// //    * Delivery pricing.
// //    *
// //    * RedStar and GIG remain on their existing integrations.
// //    * FEZ uses the Express API: POST /fez/cost.
// //    *
// //    * The request is cancellable at the React level by using a
// //    * request generation. This is important because changing an
// //    * address/provider can start another calculation before the
// //    * previous provider request finishes.
// //    */
// //   useEffect(() => {
// //     let cancelled = false;
// //     const requestId = ++pricingRequestRef.current;

// //     const getDeliveryFee = async () => {
// //       const supportedProviders = [
// //         "redstar",
// //         "gig",
// //         "fez",
// //       ];

// //       if (
// //         !supportedProviders.includes(
// //           selectedShipping
// //         ) ||
// //         cartItems.length === 0
// //       ) {
// //         if (!cancelled && requestId === pricingRequestRef.current) {
// //           setDeliveryFee(null);
// //           setDeliveryFee2(null);
// //           setPricingError(null);
// //           setLoadingDeliveryFee(false);
// //         }
// //         return;
// //       }

// //       setLoadingDeliveryFee(true);
// //       setPricingError(null);
// //       setDeliveryFee(null);
// //       setDeliveryFee2(null);

// //       const REDSTAR_API_KEY =
// //         process.env.NEXT_PUBLIC_REDSTAR_API_KEY;

// //       const groupedVendors =
// //         groupItemsByBusiness(cartItems);

// //       let totalFee = 0;

// //       try {
// //         let receiverCoords:
// //           | {
// //               Latitude: number;
// //               Longitude: number;
// //             }
// //           | null = null;

// //         if (selectedShipping === "gig") {
// //           const receiverAddressStr =
// //             `${address}, ${city}, ${state}`;

// //           receiverCoords =
// //             await getCoordinates(
// //               receiverAddressStr
// //             );
// //         }

// //         for (const vendor of groupedVendors) {
// //           if (cancelled || requestId !== pricingRequestRef.current) {
// //             return;
// //           }

// //           const vendorRes =
// //             await axios.get(
// //               `/business/${vendor.businessId}`,
// //               getAuthConfig()
// //             );

// //           const v =
// //             vendorRes.data.business;

// //           if (!v) {
// //             throw new Error(
// //               `Business information could not be loaded for ${vendor.businessId}.`
// //             );
// //           }

// //           const totalWeight =
// //             vendor.items.reduce(
// //               (sum, item) =>
// //                 sum +
// //                 (item.productId.quantityInfo
// //                   ?.weight ||
// //                   item.productId.weight ||
// //                   1) *
// //                   item.quantity,
// //               0
// //             );

// //           const vendorTotalValue =
// //             vendor.items.reduce(
// //               (sum, item) =>
// //                 sum +
// //                 (item.productId.price || 0) *
// //                   item.quantity,
// //               0
// //             );

// //           if (selectedShipping === "redstar") {
// //             const feeRes =
// //               await axios.post(
// //                 "/auth/DeliveryFee",
// //                 {
// //                   senderCity:
// //                     v.addresses?.city ||
// //                     "Unknown",

// //                   senderTownID:
// //                     v.addresses?.townId ||
// //                     0,

// //                   recipientCity:
// //                     cityName,

// //                   recipientTownID:
// //                     parseInt(townId) || 0,

// //                   pickupType: 1,
// //                   weight: totalWeight,
// //                 },
// //                 {
// //                   headers: {
// //                     "X-API-KEY":
// //                       REDSTAR_API_KEY,

// //                     "Content-Type":
// //                       "application/json",
// //                   },
// //                 }
// //               );

// //             totalFee +=
// //               Number(
// //                 feeRes.data?.TotalAmount || 0
// //               );
// //           } else if (selectedShipping === "gig") {
// //             const senderAddressStr =
// //               `${v.addresses?.street || ""}, ${
// //                 v.addresses?.city || ""
// //               }, ${v.addresses?.state || ""}`;

// //             const senderCoords =
// //               await getCoordinates(
// //                 senderAddressStr
// //               );

// //             const vehicle =
// //               GIG_WEIGHT_THRESHOLDS.find(
// //                 (vw) =>
// //                   totalWeight <= vw.max
// //               );

// //             const vehicleType =
// //               vehicle
// //                 ? vehicle.type
// //                 : GIG_VEHICLE_TYPES.TRUCK;

// //             const gigPayload = {
// //               SenderStationId: 3,
// //               ReceiverStationId: 3,
// //               VehicleType: vehicleType,

// //               SenderLocation: senderCoords,
// //               ReceiverLocation: receiverCoords,

// //               IsFromAgility: false,

// //               CustomerCode: "ECO038082",
// //               CustomerType: 0,
// //               PickUpOptions: 0,

// //               DeliveryOptionIds: [1, 2],

// //               Value: vendorTotalValue,

// //               ShipmentItems: vendor.items.map(
// //                 (item) => ({
// //                   ItemName: item.productId.name,

// //                   Description:
// //                     item.productId.description ||
// //                     "Vendor item",

// //                   Quantity: item.quantity,

// //                   Weight:
// //                     item.productId.quantityInfo
// //                       ?.weight || 0.1,

// //                   IsVolumetric: false,
// //                   ShipmentType: 1,

// //                   Value:
// //                     item.productId.price || 0,
// //                 })
// //               ),
// //             };

// //             const gigFeeRes =
// //               await axios.post(
// //                 "https://dev-thirdpartynode.theagilitysystems.com/price",
// //                 gigPayload,
// //                 {
// //                   headers: {
// //                     accept: "application/json",

// //                     "access-token":
// //                       process.env
// //                         .NEXT_PUBLIC_GIG_ACCESS_TOKEN ||
// //                       "",

// //                     "content-type":
// //                       "application/json",
// //                   },
// //                 }
// //               );

// //             if (
// //               gigFeeRes.data?.data &&
// //               typeof
// //                 gigFeeRes.data.data.GrandTotal ===
// //                   "number"
// //             ) {
// //               totalFee +=
// //                 gigFeeRes.data.data.GrandTotal;
// //             }
// //           } else if (selectedShipping === "fez") {
// //             const destinationState =
// //               normalizeNigeriaState(state);

// //             const pickUpState =
// //               normalizeNigeriaState(
// //                 v.addresses?.state
// //               );

// //             if (!destinationState) {
// //               throw new Error(
// //                 "A destination state is required for FEZ pricing."
// //               );
// //             }

// //             if (!pickUpState) {
// //               throw new Error(
// //                 `Pickup state is missing for ${
// //                   v.businessName ||
// //                   v.name ||
// //                   vendor.businessId
// //                 }.`
// //               );
// //             }

// //             const fezWeight = Math.max(
// //               1,
// //               Math.ceil(
// //                 Number(totalWeight) || 1
// //               )
// //             );

// //             console.log("FEZ pricing request", {
// //               businessId: vendor.businessId,
// //               destinationState,
// //               pickUpState,
// //               weight: fezWeight,
// //             });

// //             const fezCostRes =
// //               await axios.post(
// //                 "/fez/cost",
// //                 {
// //                   state: destinationState,
// //                   pickUpState,
// //                   weight: fezWeight,
// //                   locker: false,
// //                 },
// //                 getAuthConfig()
// //               );

// //             const rawFezResponse =
// //               fezCostRes.data;

// //             const costItems =
// //               getFezCostItems(
// //                 rawFezResponse
// //               );

// //             console.log("FEZ pricing response", {
// //               businessId: vendor.businessId,
// //               response: rawFezResponse,
// //               costItems,
// //             });

// //             if (costItems.length === 0) {
// //               throw new Error(
// //                 `FEZ returned no delivery cost for ${destinationState}.`
// //               );
// //             }

// //             const destinationMatch =
// //               costItems.find(
// //                 (item) =>
// //                   normalizeNigeriaState(
// //                     item.state
// //                   ) === destinationState
// //               );

// //             const selectedCost =
// //               destinationMatch ||
// //               costItems[0];

// //             const numericCost =
// //               Number(selectedCost?.cost);

// //             if (!Number.isFinite(numericCost)) {
// //               throw new Error(
// //                 `FEZ returned an invalid delivery price for ${destinationState}.`
// //               );
// //             }

// //             totalFee += numericCost;

// //             console.log("FEZ vendor price accepted", {
// //               businessId: vendor.businessId,
// //               numericCost,
// //               runningTotalFee: totalFee,
// //             });
// //           }
// //         }

// //         if (cancelled || requestId !== pricingRequestRef.current) {
// //           return;
// //         }

// //         const percentage = 1.65 / 100;
// //         const baseAmount =
// //           totalFee + totalProductPrice;
// //         const percentageFee =
// //           baseAmount * percentage;

// //         const finalDeliveryFee =
// //           Math.round(
// //             totalFee + percentageFee
// //           );

// //         setDeliveryFee(totalFee);
// //         setDeliveryFee2(finalDeliveryFee);
// //         setPricingError(null);

// //         console.log("Delivery pricing complete", {
// //           provider: selectedShipping,
// //           baseDeliveryFee: totalFee,
// //           finalDeliveryFee,
// //         });
// //       } catch (err: any) {
// //         // Ignore responses/errors from an older request.
// //         if (
// //           cancelled ||
// //           requestId !== pricingRequestRef.current
// //         ) {
// //           return;
// //         }

// //         console.error(
// //           "Delivery Pricing Error:",
// //           err
// //         );

// //         setDeliveryFee(null);
// //         setDeliveryFee2(null);

// //         const message =
// //           err?.response?.data?.message ||
// //           err?.response?.data?.description ||
// //           err?.response?.data?.Message ||
// //           err?.message ||
// //           `Failed to calculate ${selectedShipping.toUpperCase()} delivery fee.`;

// //         /*
// //          * Do NOT open a SweetAlert here.
// //          * Pricing runs automatically and can rerun whenever
// //          * address/cart/provider data changes. An alert from a
// //          * stale or duplicate request is exactly what caused the
// //          * false "failed" modal even when FEZ had already returned
// //          * a price.
// //          *
// //          * The error is displayed inline instead. Checkout itself
// //          * will block until the price is valid.
// //          */
// //         setPricingError(message);
// //       } finally {
// //         if (
// //           !cancelled &&
// //           requestId === pricingRequestRef.current
// //         ) {
// //           setLoadingDeliveryFee(false);
// //         }
// //       }
// //     };

// //     getDeliveryFee();

// //     return () => {
// //       cancelled = true;
// //     };
// //   }, [
// //     selectedShipping,
// //     cartItems,
// //     address,
// //     city,
// //     state,
// //     cityName,
// //     townId,
// //     totalProductPrice,
// //   ]);

// //   const handleSelectRedStar =
// //     () =>
// //       setSelectedShipping(
// //         "redstar"
// //       );

// //   const handleSelectFEZ =
// //     () =>
// //       setSelectedShipping(
// //         "fez"
// //       );

// //   const handleSelectGIG =
// //     () =>
// //       setSelectedShipping(
// //         "gig"
// //       );

// //   const handleSelectDHL =
// //     () =>
// //       setSelectedShipping(
// //         "dhl"
// //       );

// //   const handleSelectCashOnDelivery =
// //     () =>
// //       setSelectedShipping(
// //         "pay on delivery"
// //       );

// //   /**
// //    * FEZ order creation.
// //    *
// //    * Browser -> Express -> FEZ
// //    */
// //   const createFezOrders = async (
// //     groupedVendors: VendorPayload[]
// //   ) => {
// //     const batchId =
// //       `NZ-FEZ-${Date.now()}`;

// //     const preparedOrders =
// //       [];

// //     for (
// //       let index = 0;
// //       index < groupedVendors.length;
// //       index++
// //     ) {
// //       const vendor =
// //         groupedVendors[index];

// //       const vendorData =
// //         vendors[
// //           vendor.businessId
// //         ];

// //       if (
// //         !vendorData ||
// //         !vendorData.addresses
// //       ) {
// //         throw new Error(
// //           `Vendor data is missing for ${vendor.businessId}.`
// //         );
// //       }

// //       const vendorTotalWeight =
// //         vendor.items.reduce(
// //           (sum, item) =>
// //             sum +
// //             (item.productId
// //               .quantityInfo
// //               ?.weight ||
// //               item.productId
// //                 .weight ||
// //               1) *
// //               item.quantity,
// //           0
// //         );

// //       const vendorTotalValue =
// //         vendor.items.reduce(
// //           (sum, item) =>
// //             sum +
// //             (item.productId.price ||
// //               0) *
// //               item.quantity,
// //           0
// //         );

// //       const senderName =
// //         vendorData.userId
// //           ? `${vendorData.userId.firstname || ""} ${
// //               vendorData.userId.lastname || ""
// //             }`.trim()
// //           : vendorData.businessName ||
// //             vendorData.name ||
// //             "Seller";

// //       const senderPhone =
// //         vendorData.userId?.phone ||
// //         vendorData.phone ||
// //         "0000000000";

// //       const senderAddress = [
// //         vendorData.addresses
// //           ?.street,
// //         vendorData.addresses
// //           ?.town,
// //         vendorData.addresses
// //           ?.city,
// //         vendorData.addresses
// //           ?.state,
// //       ]
// //         .filter(Boolean)
// //         .join(", ");

// //       const recipientAddress = [
// //         address,
// //         town,
// //         city,
// //         state,
// //       ]
// //         .filter(Boolean)
// //         .join(", ");

// //       const uniqueID =
// //         `NZ-${Date.now()}-${index}-${vendor.businessId.slice(
// //           -6
// //         )}`;

// //       const itemDescription =
// //         vendor.items
// //           .map(
// //             (item) =>
// //               `${item.productId.name} x ${item.quantity}`
// //           )
// //           .join(", ");

// //       const payload = {
// //         recipientAddress,

// //         recipientState:
// //           normalizeNigeriaState(
// //             state
// //           ),

// //         recipientName:
// //           `${user?.firstname || ""} ${
// //             user?.lastname || ""
// //           }`.trim(),

// //         recipientPhone:
// //           user?.phone ||
// //           "0000000000",

// //         recipientEmail:
// //           user?.email || "",

// //         uniqueID,

// //         BatchID: batchId,

// //         itemDescription,

// //         additionalDetails:
// //           `Town: ${
// //             town || "N/A"
// //           }, City: ${
// //             city || "N/A"
// //           }, Order created from New Zenith Marketplace`,

// //         valueOfItem:
// //           String(
// //             vendorTotalValue
// //           ),

// //         weight: Math.max(
// //           1,
// //           Math.ceil(
// //             Number(
// //               vendorTotalWeight
// //             ) || 1
// //           )
// //         ),

// //         pickUpState:
// //           normalizeNigeriaState(
// //             vendorData.addresses
// //               ?.state
// //           ),

// //         pickUpAddress:
// //           senderAddress,

// //         isItemCod: false,

// //         fragile: false,

// //         thirdparty: true,

// //         senderName,

// //         senderAddress,

// //         senderPhone,
// //       };

// //       preparedOrders.push({
// //         businessId:
// //           vendor.businessId,

// //         vendor,

// //         vendorData,

// //         uniqueID,

// //         payload,
// //       });
// //     }

// //     if (
// //       preparedOrders.length === 0
// //     ) {
// //       throw new Error(
// //         "No FEZ orders were prepared."
// //       );
// //     }

// //     /**
// //      * One request to Express.
// //      */
// //     const fezResult =
// //       await axios.post(
// //         "/fez/order",
// //         preparedOrders.map(
// //           (item) => item.payload
// //         ),
// //         getAuthConfig()
// //       );

// //     const fezResponse: FezOrderResponse =
// //       fezResult.data?.data ||
// //       fezResult.data ||
// //       {};

// //     const orderNumbers =
// //       getFezOrderNumbers(
// //         fezResponse
// //       );

// //     const fezStatus =
// //       String(
// //         fezResponse.status || ""
// //       ).toLowerCase();

// //     if (
// //       fezResponse.success === false ||
// //       fezStatus === "failed"
// //     ) {
// //       throw new Error(
// //         fezResponse.message ||
// //           "FEZ shipment creation failed."
// //       );
// //     }

// //     /**
// //      * FEZ returns order numbers mapped
// //      * against uniqueID.
// //      *
// //      * Save every successful shipment
// //      * into the existing internal order system.
// //      */
// //     let successfulShipments = 0;
// //     const errors: string[] = [];

// //     for (
// //       const prepared of preparedOrders
// //     ) {
// //       const fezOrderNumber =
// //         orderNumbers[
// //           prepared.uniqueID
// //         ];

// //       try {
// //         const internalOrderPayload =
// //           {
// //             businessId:
// //               prepared.businessId,

// //             vendorId:
// //               prepared.vendorData
// //                 .userId?._id ||
// //               prepared.vendorData
// //                 .owner ||
// //               prepared.vendorData._id,

// //             items:
// //               prepared.vendor
// //                 .items,

// //             logisticsPayload:
// //               prepared.payload,

// //             logisticsResponse: {
// //               provider:
// //                 "FEZ",

// //               orderNo:
// //                 fezOrderNumber ||
// //                 null,

// //               batchId,

// //               response:
// //                 fezResponse,
// //             },

// //             paymentReference:
// //               `WALLET-${Date.now()}-${successfulShipments}`,

// //             shippingMethod:
// //               "fez",
// //           };

// //         const dbResult =
// //           await axios.post(
// //             "/orders/create",
// //             internalOrderPayload,
// //             getAuthConfig()
// //           );

// //         if (
// //           dbResult.data?.success
// //         ) {
// //           successfulShipments++;
// //         } else {
// //           errors.push(
// //             `FEZ shipment created for ${
// //               prepared.vendorData.businessName ||
// //               prepared.vendorData.name ||
// //               prepared.businessId
// //             }, but internal order saving failed.`
// //           );
// //         }
// //       } catch (error: any) {
// //         errors.push(
// //           `FEZ shipment created for ${
// //             prepared.vendorData.businessName ||
// //             prepared.vendorData.name ||
// //             prepared.businessId
// //           }, but internal order saving failed. ${
// //             error.response?.data?.message ||
// //             error.message ||
// //             ""
// //           }`
// //         );
// //       }
// //     }

// //     return {
// //       successfulShipments,
// //       errors,
// //       batchId,
// //       orderNumbers,
// //     };
// //   };

// //   /**
// //    * Submit checkout.
// //    */
// //   const handleSubmit = async (
// //     e?: React.FormEvent
// //   ) => {
// //     e?.preventDefault();

// //     if (
// //       !selectedShipping
// //     ) {
// //       return Swal.fire(
// //         "Select Shipping",
// //         "Please select a shipping method.",
// //         "warning"
// //       );
// //     }

// //     if (
// //       selectedShipping ===
// //       "dhl"
// //     ) {
// //       return Swal.fire(
// //         "Coming Soon",
// //         "DHL checkout is not available yet.",
// //         "info"
// //       );
// //     }

// //     if (
// //       ![
// //         "redstar",
// //         "gig",
// //         "fez",
// //         "pay on delivery",
// //       ].includes(
// //         selectedShipping
// //       )
// //     ) {
// //       return Swal.fire(
// //         "Notice",
// //         "This shipping method is not currently available.",
// //         "info"
// //       );
// //     }

// //     const groupedVendors =
// //       groupItemsByBusiness(
// //         cartItems
// //       );

// //     if (
// //       groupedVendors.length === 0
// //     ) {
// //       return Swal.fire(
// //         "Error",
// //         "Your basket is empty.",
// //         "error"
// //       );
// //     }

// //     if (
// //       selectedShipping !==
// //         "pay on delivery" &&
// //       (deliveryFee2 === null ||
// //         loadingDeliveryFee)
// //     ) {
// //       return Swal.fire(
// //         "Delivery Fee",
// //         pricingError ||
// //           "Please wait for the shipping fee to finish calculating.",
// //         "info"
// //       );
// //     }

// //     if (
// //       selectedShipping !==
// //         "pay on delivery" &&
// //       pricingError
// //     ) {
// //       return Swal.fire(
// //         "Delivery Fee Unavailable",
// //         pricingError,
// //         "error"
// //       );
// //     }

// //     setIsSubmitting(true);

// //     Swal.fire({
// //       title:
// //         "Submitting Orders...",
// //       text: `Processing ${groupedVendors.length} shipment(s). Please wait.`,
// //       allowOutsideClick: false,
// //       didOpen: () =>
// //         Swal.showLoading(),
// //     });

// //     /**
// //      * -------------------------------------------------------
// //      * FEZ
// //      * -------------------------------------------------------
// //      */
// //     if (
// //       selectedShipping ===
// //       "fez"
// //     ) {
// //       try {
// //         const result =
// //           await createFezOrders(
// //             groupedVendors
// //           );

// //         Swal.close();

// //         if (
// //           result.successfulShipments >
// //           0
// //         ) {
// //           await Swal.fire(
// //             "Success!",
// //             `${result.successfulShipments} FEZ shipment(s) created successfully.`,
// //             "success"
// //           );

// //           router.push(
// //             "/user/dashboard/transaction"
// //           );

// //           return;
// //         }

// //         await Swal.fire(
// //           "Order Failed",
// //           result.errors.join(
// //             "\n"
// //           ) ||
// //             "No FEZ shipments were created.",
// //           "error"
// //         );
// //       } catch (error: any) {
// //         Swal.close();

// //         await Swal.fire(
// //           "FEZ Order Failed",
// //           error.response?.data
// //             ?.message ||
// //             error.message ||
// //             "Unable to create FEZ shipment.",
// //           "error"
// //         );
// //       } finally {
// //         setIsSubmitting(false);
// //       }

// //       return;
// //     }

// //     /**
// //      * -------------------------------------------------------
// //      * EXISTING REDSTAR / POD FLOW
// //      * -------------------------------------------------------
// //      */
// //     const REDSTAR_API_KEY =
// //       process.env
// //         .NEXT_PUBLIC_REDSTAR_API_KEY;

// //     let successfulShipments = 0;
// //     const errors: string[] = [];

// //     for (
// //       const vendor of groupedVendors
// //     ) {
// //       const vendorData =
// //         vendors[
// //           vendor.businessId
// //         ];

// //       if (
// //         !vendorData ||
// //         !vendorData.addresses
// //       ) {
// //         errors.push(
// //           `Vendor data missing for ID: ${vendor.businessId}`
// //         );
// //         continue;
// //       }

// //       const vendorTotalWeight =
// //         vendor.items.reduce(
// //           (sum, item) =>
// //             sum +
// //             (item.productId
// //               .quantityInfo?.weight ||
// //               item.productId.weight ||
// //               1) *
// //               item.quantity,
// //           0
// //         );

// //       const vendorTotalPieces =
// //         vendor.items.reduce(
// //           (sum, item) =>
// //             sum + item.quantity,
// //           0
// //         );

// //       const shipmentItems =
// //         vendor.items.map(
// //           (item) => ({
// //             id: 0,
// //             status: 0,
// //             createdOn:
// //               new Date().toISOString(),
// //             createdBy:
// //               user?.firstname ||
// //               "User",

// //             shipmentId: 0,

// //             commodity:
// //               item.productId.name,

// //             description:
// //               item.productId
// //                 .description,

// //             countryOfManufacturing:
// //               "Nigeria",

// //             quantity:
// //               item.quantity,

// //             weight:
// //               (item.productId
// //                 .quantityInfo
// //                 ?.weight ||
// //                 item.productId
// //                   .weight ||
// //                 1) *
// //               item.quantity,

// //             unitOfMeasure: 0,

// //             unitOfPrice:
// //               item.productId
// //                 .price || 0,
// //           })
// //         );

// //       const singleRedStarPayload =
// //         {
// //           senderCity:
// //             vendorData.addresses
// //               .city ||
// //             "Unknown",

// //           recipientCity:
// //             cityName,

// //           recipientTownID:
// //             parseInt(townId) ||
// //             0,

// //           recipientName:
// //             `${user?.firstname || ""} ${
// //               user?.lastname || ""
// //             }`,

// //           recipientPhoneNo:
// //             user?.phone ||
// //             "0000000000",

// //           recipientEmail:
// //             user?.email || "",

// //           recipientAddress:
// //             address,

// //           recipientState:
// //             state,

// //           senderTownID:
// //             vendorData.addresses
// //               .townId || 0,

// //           senderName:
// //             `${
// //               vendorData.userId
// //                 ?.firstname || ""
// //             } ${
// //               vendorData.userId
// //                 ?.lastname ||
// //               vendorData.name ||
// //               ""
// //             }`.trim(),

// //           senderAddress:
// //             vendorData.addresses
// //               .street ||
// //             "Unknown",

// //           senderPhone:
// //             vendorData.userId
// //               ?.phone ||
// //             "0000000000",

// //           orderNo:
// //             `ORDER-${Date.now()}-${vendor.businessId.substring(
// //               0,
// //               4
// //             )}`,

// //           packaging: "Box",

// //           boxandCrating:
// //             "Standard",

// //           deliveryType:
// //             "Door to Door",

// //           description:
// //             `Order from ${
// //               vendorData.name ||
// //               vendorData.businessName ||
// //               "Vendor"
// //             }`,

// //           onforwardingLocation:
// //             "",

// //           paymentType:
// //             "Prepaid",

// //           pickupType: 1,

// //           weight:
// //             vendorTotalWeight,

// //           pieces:
// //             vendorTotalPieces,

// //           cashOnDelivery: 0,

// //           shipmentItems,
// //         };

// //       try {
// //         /**
// //          * PAY ON DELIVERY
// //          */
// //         if (
// //           selectedShipping ===
// //           "pay on delivery"
// //         ) {
// //           const internalOrderPayload =
// //             {
// //               businessId:
// //                 vendor.businessId,

// //               vendorId:
// //                 vendorData.userId
// //                   ?._id ||
// //                 vendorData.owner ||
// //                 vendorData._id,

// //               items:
// //                 vendor.items,

// //               paymentReference:
// //                 `WALLET-${Date.now()}`,

// //               shippingMethod:
// //                 "pay on delivery",
// //             };

// //           const dbResult =
// //             await axios.post(
// //               "/orders/create",
// //               internalOrderPayload,
// //               getAuthConfig()
// //             );

// //           if (
// //             dbResult.data
// //               ?.success
// //           ) {
// //             successfulShipments++;
// //           } else {
// //             errors.push(
// //               `Failed to save Pay on Delivery order for ${
// //                 vendorData.name ||
// //                 vendorData.businessName ||
// //                 "Vendor"
// //               }.`
// //             );
// //           }
// //         }

// //         /**
// //          * REDSTAR
// //          */
// //         else if (
// //           selectedShipping ===
// //           "redstar"
// //         ) {
// //           const res =
// //             await axios.post(
// //               "/auth/PickupRequest",
// //               singleRedStarPayload,
// //               {
// //                 headers: {
// //                   "X-API-KEY":
// //                     REDSTAR_API_KEY,

// //                   "Content-Type":
// //                     "application/json",
// //                 },
// //               }
// //             );

// //           if (
// //             res.data
// //               .TransStatus ===
// //             "Successful"
// //           ) {
// //             try {
// //               const internalOrderPayload =
// //                 {
// //                   businessId:
// //                     vendor.businessId,

// //                   vendorId:
// //                     vendorData
// //                       .userId?._id ||
// //                     vendorData
// //                       .owner ||
// //                     vendorData._id,

// //                   items:
// //                     vendor.items,

// //                   logisticsPayload:
// //                     singleRedStarPayload,

// //                   logisticsResponse:
// //                     res.data,

// //                   paymentReference:
// //                     `WALLET-${Date.now()}`,

// //                   shippingMethod:
// //                     "redstar",
// //                 };

// //               const dbResult =
// //                 await axios.post(
// //                   "/orders/create",
// //                   internalOrderPayload,
// //                   getAuthConfig()
// //                 );

// //               if (
// //                 dbResult.data
// //                   ?.success
// //               ) {
// //                 successfulShipments++;
// //               } else {
// //                 errors.push(
// //                   `Shipment created for ${
// //                     vendorData.name ||
// //                     vendorData.businessName ||
// //                     "Vendor"
// //                   }, but failed to save internally.`
// //                 );
// //               }
// //             } catch {
// //               errors.push(
// //                 `Shipment created for ${
// //                   vendorData.name ||
// //                   vendorData.businessName ||
// //                   "Vendor"
// //                 }, but failed to save internally.`
// //               );
// //             }
// //           } else {
// //             errors.push(
// //               res.data
// //                 ?.Message ||
// //                 `RedStar API error for ${
// //                   vendorData.name ||
// //                   vendorData.businessName ||
// //                   "Vendor"
// //                 }.`
// //             );
// //           }
// //         }
// //       } catch (error: any) {
// //         errors.push(
// //           `Failed for ${
// //             vendorData.name ||
// //             vendorData.businessName ||
// //             "Vendor"
// //           }. ${
// //             error.response?.data
// //               ?.Message ||
// //             error.response?.data
// //               ?.message ||
// //             error.message ||
// //             ""
// //           }`
// //         );
// //       }
// //     }

// //     Swal.close();
// //     setIsSubmitting(false);

// //     if (
// //       successfulShipments > 0
// //     ) {
// //       await Swal.fire(
// //         "Success!",
// //         `${successfulShipments} shipment(s) created.`,
// //         "success"
// //       );

// //       router.push(
// //         "/user/dashboard/transaction"
// //       );
// //     } else {
// //       Swal.fire(
// //         "Order Failed",
// //         errors.join("\n") ||
// //           "No shipments created.",
// //         "error"
// //       );
// //     }
// //   };

// //   const totalPayable =
// //     totalProductPrice +
// //     (deliveryFee2 || 0);

// //   const balanceDifference =
// //     walletBalance -
// //     totalPayable;

// //   const hasSufficientBalance =
// //     balanceDifference >=
// //     0;

// //   const shippingReady =
// //     selectedShipping ===
// //     "pay on delivery"
// //       ? true
// //       : [
// //           "redstar",
// //           "gig",
// //           "fez",
// //         ].includes(
// //           selectedShipping
// //         ) &&
// //         deliveryFee2 !== null &&
// //         !loadingDeliveryFee;

// //   const canCheckout =
// //     cartItems.length > 0 &&
// //     !!selectedShipping &&
// //     shippingReady &&
// //     !pricingError &&
// //     !isSubmitting &&
// //     !loadingDeliveryFee;

// //   return (
// //     <>
// //       {showModal && (
// //         <AddressModal
// //           onClose={() =>
// //             setShowModal(false)
// //           }
// //         />
// //       )}

// //       {showModal2 && (
// //         <FundWalletModal
// //           onClose={() =>
// //             setShowModal2(false)
// //           }
// //         />
// //       )}

// //       <CircleLoader
// //         isVisible={loading}
// //       />

// //       <form
// //         className="p-6 md:w-[50vw] md:mx-10 lg:mx-0 xl:mx-10 mb-20"
// //         onSubmit={handleSubmit}
// //       >
// //         <TagHeader
// //           title="Checkout"
// //         />

// //         {/* Checkout Steps */}
// //         <div className="flex justify-around mb-8 mx-auto xl:ml-20 ml-12">
// //           <div className="flex flex-col items-center text-center justify-center mr-auto">
// //             <div className="w-8 h-8 rounded-full text-[#006838] bg-[#C4EDDA] flex items-center justify-center">
// //               <CheckOutlinedIcon />
// //             </div>

// //             <p className="text-sm font-bold py-2">
// //               Your bag
// //             </p>
// //           </div>

// //           <div className="flex flex-col items-center justify-center mr-auto">
// //             <div className="w-8 h-8 rounded-full bg-[#006838] flex items-center justify-center text-white">
// //               2
// //             </div>

// //             <p className="text-sm font-bold py-2">
// //               Shipping
// //             </p>
// //           </div>

// //           <div className="flex flex-col items-center text-gray-400 mr-auto">
// //             <div className="w-8 h-8 rounded-full bg-[#F8F9FE] flex items-center justify-center">
// //               3
// //             </div>

// //             <p className="text-sm font-bold py-2">
// //               Payment
// //             </p>
// //           </div>
// //         </div>

// //         {/* Address */}
// //         <div className="mb-4 border border-gray-300 rounded-lg p-4">
// //           <div className="p-5 rounded-lg flex justify-between">
// //             <div className="flex items-center space-x-3">
// //               <div className="text-gray-400">
// //                 <MyLocationOutlinedIcon />
// //               </div>

// //               <div>
// //                 <h3 className="text-sm font-semibold mb-1">
// //                   Saved Address
// //                 </h3>

// //                 <p className="text-gray-500">
// //                   Address:{" "}
// //                   {address || "N/A"}
// //                 </p>

// //                 <p className="text-gray-500">
// //                   City:{" "}
// //                   {city || "N/A"}
// //                 </p>

// //                 <p className="text-gray-500">
// //                   State:{" "}
// //                   {state || "N/A"}
// //                 </p>
// //               </div>
// //             </div>

// //             <div className="text-[#006838] my-auto">
// //               <CheckOutlinedIcon />
// //             </div>
// //           </div>

// //           <div className="flex justify-center">
// //             <button
// //               className="text-[#006838] mt-2"
// //               onClick={() =>
// //                 setShowModal(true)
// //               }
// //               type="button"
// //             >
// //               + Add Address
// //             </button>
// //           </div>
// //         </div>

// //         {/* Shipping Method */}
// //         <div className="mb-4">
// //           <h3 className="text-lg font-semibold mb-4">
// //             Pick Shipping Option
// //           </h3>

// //           {shippingProviders.map(
// //             (provider) => {
// //               const isSelected =
// //                 selectedShipping ===
// //                 provider.id;

// //               return (
// //                 <div
// //                   key={provider.id}
// //                   className={`p-4 mb-2 rounded-lg border h-20 flex items-center justify-between transition ${
// //                     provider.available
// //                       ? "cursor-pointer"
// //                       : "cursor-not-allowed opacity-50"
// //                   } ${
// //                     isSelected
// //                       ? "border-blue-500 bg-blue-50"
// //                       : "border-gray-300 bg-white"
// //                   }`}
// //                   onClick={() => {
// //                     if (
// //                       !provider.available
// //                     ) {
// //                       return;
// //                     }

// //                     switch (
// //                       provider.id
// //                     ) {
// //                       case "redstar":
// //                         handleSelectRedStar();
// //                         break;

// //                       case "fez":
// //                         handleSelectFEZ();
// //                         break;

// //                       case "gig":
// //                         handleSelectGIG();
// //                         break;

// //                       case "dhl":
// //                         handleSelectDHL();
// //                         break;

// //                       case "pay on delivery":
// //                         handleSelectCashOnDelivery();
// //                         break;

// //                       default:
// //                         setSelectedShipping(
// //                           provider.id
// //                         );
// //                     }
// //                   }}
// //                 >
// //                   {provider.externalLogo ? (
// //                     <img
// //                       src={provider.logo}
// //                       alt={
// //                         provider.name
// //                       }
// //                       width={
// //                         provider.width
// //                       }
// //                       height={
// //                         provider.height
// //                       }
// //                       className="object-contain"
// //                     />
// //                   ) : (
// //                     <Image
// //                       src={provider.logo}
// //                       alt={
// //                         provider.name
// //                       }
// //                       width={
// //                         provider.width
// //                       }
// //                       height={
// //                         provider.height
// //                       }
// //                       className="object-contain"
// //                     />
// //                   )}

// //                   <div className="flex-1 ml-4">
// //                     <p className="font-medium text-gray-800 text-[11px] md:text-[15px]">
// //                       {provider.name}
// //                     </p>

// //                     {provider.id ===
// //                       "fez" && (
// //                       <p className="text-xs text-green-600 mt-1">
// //                         Live delivery pricing
// //                       </p>
// //                     )}

// //                     {!provider.available && (
// //                       <p className="text-xs text-gray-400 mt-1">
// //                         Coming soon
// //                       </p>
// //                     )}
// //                   </div>

// //                   {isSelected && (
// //                     <div className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center">
// //                       <CheckOutlinedIcon
// //                         sx={{
// //                           fontSize:
// //                             14,
// //                         }}
// //                       />
// //                     </div>
// //                   )}
// //                 </div>
// //               );
// //             }
// //           )}
// //         </div>

// //         {/* Price Summary */}
// //         <div className="mb-4 border border-gray-300 rounded-lg p-4 text-center">
// //           {selectedShipping ===
// //           "pay on delivery" ? (
// //             <p className="font-medium text-gray-700">
// //               NB: Shipping Fee will
// //               be completed via
// //               WhatsApp or phone call
// //             </p>
// //           ) : (
// //             <div className="font-medium text-gray-700">
// //               Shipping Fee:{" "}
// //               {loadingDeliveryFee
// //                 ? "Calculating..."
// //                 : deliveryFee2 !==
// //                     null &&
// //                   [
// //                     "redstar",
// //                     "gig",
// //                     "fez",
// //                   ].includes(
// //                     selectedShipping
// //                   )
// //                 ? `₦${deliveryFee2.toLocaleString()}`
// //                 : selectedShipping ===
// //                   ""
// //                 ? "Select a shipping method"
// //                 : "Unable to calculate fee"}
// //             </div>
// //           )}

// //           {selectedShipping ===
// //             "fez" &&
// //             !loadingDeliveryFee &&
// //             deliveryFee !== null && (
// //               <div className="text-xs text-gray-500 mt-1">
// //                 FEZ base delivery:
// //                 {" "}
// //                 ₦
// //                 {deliveryFee.toLocaleString()}
// //                 <span className="mx-1">
// //                   •
// //                 </span>
// //                 platform calculation included
// //               </div>
// //             )}

// //           {pricingError &&
// //             selectedShipping === "fez" &&
// //             !loadingDeliveryFee && (
// //               <div className="mt-2 rounded-md bg-red-50 px-3 py-2 text-xs text-red-600">
// //                 {pricingError}
// //               </div>
// //             )}

// //           <div className="text-gray-600 mt-2">
// //             Product Price: ₦
// //             {totalProductPrice.toLocaleString()}
// //           </div>

// //           <div className="font-bold text-lg text-gray-900 mt-2">
// //             Total Pay: ₦
// //             {totalPayable.toLocaleString()}
// //           </div>
// //         </div>

// //         {/* Wallet Balance */}
// //         <div
// //           className={`p-4 rounded-lg border ${
// //             hasSufficientBalance
// //               ? "border-green-500 bg-green-50"
// //               : "border-red-500 bg-red-50"
// //           }`}
// //         >
// //           <div className="space-y-2">
// //             <div className="flex justify-between text-sm">
// //               <span>
// //                 Account Balance
// //               </span>

// //               <span className="font-semibold">
// //                 ₦
// //                 {walletBalance.toLocaleString()}
// //               </span>
// //             </div>

// //             <div className="flex justify-between text-sm font-medium">
// //               <span>
// //                 {hasSufficientBalance
// //                   ? "Remaining Balance"
// //                   : "Shortfall"}
// //               </span>

// //               <span
// //                 className={
// //                   hasSufficientBalance
// //                     ? "text-green-700"
// //                     : "text-red-700"
// //                 }
// //               >
// //                 ₦
// //                 {Math.abs(
// //                   balanceDifference
// //                 ).toLocaleString()}
// //               </span>
// //             </div>
// //           </div>

// //           <button
// //             type="button"
// //             className={`mt-4 w-full py-2 rounded-md text-white font-medium transition ${
// //               hasSufficientBalance
// //                 ? "bg-[#006838] hover:bg-green-800"
// //                 : "bg-red-600 hover:bg-red-700"
// //             } ${
// //               !canCheckout &&
// //               hasSufficientBalance
// //                 ? "opacity-50 cursor-not-allowed"
// //                 : ""
// //             }`}
// //             onClick={
// //               hasSufficientBalance
// //                 ? () =>
// //                     handleSubmit()
// //                 : () =>
// //                     setShowModal2(
// //                       true
// //                     )
// //             }
// //             disabled={
// //               isSubmitting ||
// //               loadingDeliveryFee ||
// //               (hasSufficientBalance &&
// //                 !canCheckout)
// //             }
// //           >
// //             {hasSufficientBalance
// //               ? isSubmitting
// //                 ? "Processing..."
// //                 : "Checkout"
// //               : "Top Up Balance"}
// //           </button>
// //         </div>
// //       </form>
// //     </>
// //   );
// // };

// // export default CheckoutShipping;