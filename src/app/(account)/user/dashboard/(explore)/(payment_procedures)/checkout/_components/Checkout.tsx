// "use client";
// import TagHeader from "@/components/header/TagHeader";
// import { useEffect, useState } from "react";
// import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
// import MyLocationOutlinedIcon from "@mui/icons-material/MyLocationOutlined";
// import AddressModal from "./AddressModal";
// import axios from "@/utils/axios";
// import Image from "next/image";

// import DHLLOGO from "@/assets/images/dhl-express-logo-black.png";
// import FEDEXLOGO from "@/assets/images/fedex-logo.png";
// import GIGLOGO from "@/assets/images/gig-logo.png";
// import REDSTAR from "@/assets/images/redstar.png";
// import Swal from "sweetalert2";
// import FundWalletModal from "../../../../wallet/components/FundWalletModal";
// import { useRouter } from "next/navigation";
// import CircleLoader from "@/components/loader/loader";

// interface User {
//   firstname: string;
//   lastname: string;
//   email: string;
//   accountType: "buyer" | "seller";
//   street: string;
//   phone: string;
//   address: {
//     town: string;
//     city: string;
//     state: string;
//     zip: string;
//     street: string;
//   };
// }

// interface Product {
//   _id: string;
//   name: string;
//   weight?: number;
//   price?: number;
//   businessId: string;
//   description: string;
//   quantityInfo: {
//     weight: number;
//   };
//   quantity: number;
// }

// interface GeoLocation {
//   latitude: number;
//   longitude: number;
// }

// interface CartItem {
//   productId: Product;
//   quantity: number;
// }
// interface VendorPayload {
//   businessId: string;
//   items: CartItem[];
// }
// const CheckoutShipping: React.FC = () => {
//   const router = useRouter();

//   const [selectedShipping, setSelectedShipping] = useState("");
//   const [address, setAddress] = useState("");
//   const [city, setCity] = useState("");
//   const [walletBalance, setWalletBalance] = useState(0);

//   const [cityName, setCityName] = useState("");
//   const [state, setState] = useState("");
//   const [zip, setZip] = useState("");
//   const [town, setTown] = useState("");
//   const [townId, setTownId] = useState("");
//   const [shippingMethod, setShippingMethod] = useState("third-party");
//   const [showModal, setShowModal] = useState(false);
//   const [showModal2, setShowModal2] = useState(false);
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const [user, setUser] = useState<User | null>(null);
//   const [totalProductPrice, setTotalProductPrice] = useState<number>(0);
//   const [deliveryFee, setDeliveryFee] = useState<number | null>(null);
//   const [deliveryFee2, setDeliveryFee2] = useState<number | null>(null);

//   const [cartItems, setCartItems] = useState<CartItem[]>([]);
//   const [groupedItems, setGroupedItems] = useState<Record<string, CartItem[]>>(
//     {},
//   );
//   const [mergedRequest, setMergedRequest] = useState<any>(null); // optional combined request
//   const [loadingDeliveryFee, setLoadingDeliveryFee] = useState(false);
//   const [vendors, setVendors] = useState<Record<string, any>>({});
//   const [loading, setLoading] = useState(true);
//   const [weight, setWeight] = useState(0);

//   interface GIGPayload {
//     SenderStationId: number;
//     ReceiverStationId: number;
//     VehicleType: number;
//     SenderLocation: { latitude: number; longitude: number };
//     ReceiverLocation: { latitude: number; longitude: number };
//     CustomerCode: string;
//     CustomerType: number;
//     PickUpOptions: number;
//     ShipmentItems: { description: string; weight: number; quantity: number }[];
//     IsFromAgility: boolean;
//     Value: number;
//     DeliveryOptionIds: number[];
//   }

//   const normalizeStateForFez = (stateStr: string) => {
//     if (!stateStr) return "";
//     const s = stateStr.toUpperCase().trim();
//     if (s.includes("ABUJA") || s === "FCT") return "FCT";
//     if (s.includes("LAGOS")) return "Lagos";
//     if (s.includes("CROSS RIVER")) return "Cross River";
//     if (s.includes("AKWA IBOM")) return "Akwa Ibom";
//     if (s === "KASTINA") return "Katsina";

//     // Capitalize first letter, lowercase the rest for standard states
//     return s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();
//   };

//   // 🟢 Fetch user and address
//   useEffect(() => {
//     if (!localStorage.getItem("userToken")) return;
//     setLoading(true);
//     axios
//       .get("/users/profile", {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("userToken")}`,
//         },
//       })
//       .then((res) => {
//         setLoading(false);
//         const u = res.data.user;
//         setUser(u);
//         setAddress(u.addresses.street);
//         setCity(u.addresses.city);
//         setState(u.addresses.state);
//         setZip(u.addresses.zip);
//         setTown(u.addresses.town);
//         setTownId(u.addresses.townId);
//         setCityName(u.addresses.cityName);
//         setWalletBalance(res.data.wallet.balance || 0);
//       })
//       .catch((error) => {});
//   }, [showModal]);
//   const fetchVendors = async (grouped: Record<string, CartItem[]>) => {
//     const vendorData: Record<string, any> = {};

//     for (const businessId of Object.keys(grouped)) {
//       try {
//         const res = await axios.get(`/business/${businessId}`, {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("userToken")}`,
//           },
//         });
//         vendorData[businessId] = res.data.business; // Store vendor info
//       } catch (err) {
//         vendorData[businessId] = null; // optional fallback
//       }
//     }
//     setVendors(vendorData);
//   };
//   // 🟢 Fetch Cart and Group by businessId
//   useEffect(() => {
//     axios({
//       method: "GET",
//       url: "cart",
//       headers: {
//         Authorization: `Bearer ${localStorage.getItem("userToken")}`,
//       },
//     })
//       .then((res) => {
//         const items = res.data?.cart?.items ?? []; // Ensure it's always an array
//         setCartItems(items);
//         const totalPrice = items.reduce((sum: any, item: any) => {
//           const price = item.productId.price || 0;
//           const qty = item.quantity || 1;
//           return sum + price * qty;
//         }, 0);

//         setTotalProductPrice(totalPrice); // Update the state
//         // ✅ Group items by businessId
//         const grouped: Record<string, CartItem[]> = {};
//         for (const item of items) {
//           const businessId = item?.productId?.businessId || "unknown";
//           if (!grouped[businessId]) grouped[businessId] = [];
//           grouped[businessId].push(item);
//         }

//         setGroupedItems(grouped);
//         fetchVendors(grouped);

//         // ✅ Optional: Merge all groups into one delivery request
//         const merged = Object.keys(grouped).map((businessId) => {
//           const shipmentItems = grouped[businessId].map((i) => ({
//             id: 0,
//             status: 0,
//             createdOn: new Date().toISOString(),
//             createdBy: user?.firstname || "unknown",
//             shipmentId: 0,
//             commodity: i.productId.name,
//             description: i.productId.name,
//             countryOfManufacturing: "Nigeria",
//             quantity: i.quantity,
//             weight: i.productId.weight || 1,
//             unitOfMeasure: 1,
//             unitOfPrice: i.productId.price || 0,
//           }));

//           return {
//             senderCity: city,
//             recipientCity: city,
//             recipientTownID: 0,
//             recipientName: `${user?.firstname} ${user?.lastname}`,
//             recipientPhoneNo: user?.phone,
//             recipientEmail: user?.email,
//             recipientAddress: address,
//             recipientState: state,
//             senderTownID: 0,
//             senderName: user?.firstname,
//             senderAddress: address,
//             senderPhone: "08012345678",
//             orderNo: Math.random().toString(36).substring(2, 10).toUpperCase(),
//             packaging: "Box",
//             boxandCrating: "Standard",
//             deliveryType: "Express",
//             description: "Multiple shipment",
//             onforwardingLocation: "",
//             paymentType: "Prepaid",
//             pickupType: 1,
//             weight: shipmentItems.reduce((sum, i) => sum + i.weight, 0),
//             pieces: shipmentItems.length,
//             cashOnDelivery: 0,
//             shipmentItems,
//           };
//         });
//         setWeight(merged.reduce((sum, m) => sum + m.weight, 0));
//         setMergedRequest({
//           shipments: merged,
//           totalWeight: merged.reduce((sum, m) => sum + m.weight, 0),
//         });
//       })
//       .catch((err) => {});
//   }, [user]);

//   // 🟢 RedStar Pickup
//   const handleSelectRedStar = async () => {
//     setSelectedShipping("redstar");
//   };
//   const handleSelectFex = async () => {
//     setSelectedShipping("fex");
//   };

//   const ALL_VEHICLE_TYPE = {
//     CAR: 0,
//     BIKE: 1,
//     VAN: 2,
//     TRUCK: 3,
//   };

//   // Define thresholds outside the handler to prevent re-creation on every click
//   const WEIGHT_THRESHOLDS = [
//     { max: 10, type: ALL_VEHICLE_TYPE.BIKE },
//     { max: 50, type: ALL_VEHICLE_TYPE.CAR },
//     { max: 500, type: ALL_VEHICLE_TYPE.VAN },
//     { max: Infinity, type: ALL_VEHICLE_TYPE.TRUCK },
//   ];
//   const getCoordinates = async (
//     address: string,
//   ): Promise<GeoLocation | null> => {
//     const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
//     const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`;

//     try {
//       const response = await fetch(url);
//       const data = await response.json();

//       if (data.status === "OK") {
//         const { lat, lng } = data.results[0].geometry.location;
//         const formattedAddress = data.results[0].formatted_address;
//         console.log(
//           `Geocoded Address: ${formattedAddress}, Latitude: ${lat}, Longitude: ${lng}`,
//         );
//         return {
//           latitude: lat,
//           longitude: lng,
//         };
//       } else {
//         throw new Error(`Geocoding failed: ${data.status}`);
//       }
//     } catch (error) {
//       console.error("Error fetching coordinates:", error);
//       return null;
//     }
//   };
//   const handleSelectGIG = async () => {
//     setSelectedShipping("gig");

//     // Logic Constants
//     const CUSTOMER_TYPE = 0;
//     const PICKUP_OPTION = 0;
//     const SHIPMENT_TYPE = 2;
//     const vehicle = WEIGHT_THRESHOLDS.find((v) => (weight || 0) <= v.max);
//     const VEHICLE_TYPE = vehicle ? vehicle.type : ALL_VEHICLE_TYPE.TRUCK;
//     console.log("Selected Vehicle Type:", VEHICLE_TYPE);
//     const senderAddress = `${address}, ${city}, ${state}`;
//     const receiverAddress = senderAddress; // Assuming delivery to same address for demo

//     // Get coordinates for sender and receiver
//     const senderCoords = await getCoordinates(senderAddress);
//     const receiverCoords = await getCoordinates(receiverAddress);

//     const payload: GIGPayload = {
//       VehicleType: VEHICLE_TYPE,
//       CustomerType: CUSTOMER_TYPE,
//       PickUpOptions: PICKUP_OPTION,
//       IsFromAgility: false,

//       // MISSING DATA - You need to pull these from state or forms:
//       SenderStationId: senderStation?.id || 0,
//       ReceiverStationId: receiverStation?.id || 0,
//       SenderLocation: senderCoords,
//       ReceiverLocation: receiverCoords,
//       CustomerCode: userAccountCode,
//       Value: totalDeclaredValue,
//       DeliveryOptionIds: [1], // Example default
//       ShipmentItems: mergedItems,
//     };
//   };
//   //   // Group items by businessId
//   const groupItemsByBusiness = (items: CartItem[]): VendorPayload[] => {
//     const groups: { [key: string]: CartItem[] } = {};
//     for (const item of items) {
//       const businessId = item.productId.businessId;
//       if (!groups[businessId]) groups[businessId] = [];
//       groups[businessId].push(item);
//     }
//     return Object.entries(groups).map(([businessId, items]) => ({
//       businessId,
//       items,
//     }));
//   };
//   //   // Fetch vendor details and calculate delivery fee
//   useEffect(() => {
//     const getDeliveryFee = async () => {
//       if (selectedShipping !== "redstar" || cartItems.length === 0) return;
//       setLoadingDeliveryFee(true);

//       const REDSTAR_API_KEY = process.env.NEXT_PUBLIC_REDSTAR_API_KEY;
//       const groupedVendors = groupItemsByBusiness(cartItems);
//       let totalFee = 0;

//       try {
//         for (const vendor of groupedVendors) {
//           // Fetch vendor details
//           const vendorRes = await axios({
//             method: "GET",
//             url: `/business/${vendor.businessId}`,
//             headers: {
//               Authorization: `Bearer ${localStorage.getItem("userToken")}`,
//             },
//           });
//           const v = vendorRes.data.business;

//           // Calculate total weight and pieces
//           const totalPieces = vendor.items.reduce(
//             (sum, i) => sum + i.quantity,
//             0,
//           );
//           const totalWeight = vendor.items.reduce((sum, item) => {
//             const unitWeight = item.productId.quantityInfo.weight;
//             const itemQuantity = item.quantity;
//             return sum + item.productId.quantityInfo.weight * itemQuantity;
//           }, 0);

//           const payload = {
//             senderCity: v?.address?.city || "Unknown City",
//             recipientCity: city,
//             recipientTownID: 0,
//             recipientName: `${user?.firstname} ${user?.lastname}`,
//             recipientPhoneNo: user?.phone || "0000000000",
//             recipientEmail: user?.email || "",
//             recipientAddress: user?.address?.street || "",
//             recipientState: user?.address?.state || "",
//             senderTownID: 0,
//             senderName: v?.name || "Unknown Vendor",
//             senderAddress: v?.address?.street || "Unknown Street",
//             senderPhone: v?.phone || "0000000000",
//             orderNo: "ORDER-" + Date.now(),
//             packaging: "",
//             boxandCrating: "",
//             deliveryType: "Door to Door",
//             description: "Multiple items shipment",
//             onforwardingLocation: "",
//             paymentType: "Prepaid",
//             pickupType: 1,
//             weight: totalWeight,
//             pieces: totalPieces,
//             cashOnDelivery: 1,
//             shipmentItems: vendor.items.map((item) => ({
//               id: 0,
//               status: 0,
//               createdOn: new Date().toISOString(),
//               createdBy: user?.firstname || "User",
//               shipmentId: 0,
//               commodity: item.productId.name,
//               description: item.productId.description,
//               countryOfManufacturing: "Nigeria",
//               quantity: item.quantity,
//               weight: item.productId.weight || 1,
//               unitOfMeasure: 0,
//               unitOfPrice: item.productId.price,
//             })),
//           };

//           const feeRes = await axios.post(
//             "/auth/DeliveryFee",
//             {
//               senderCity: vendorRes.data.business.addresses.city,
//               senderTownID: vendorRes.data.business.addresses.townId,
//               recipientCity: cityName,
//               recipientTownID: parseInt(townId),
//               pickupType: 1,
//               weight: totalWeight,
//             },
//             {
//               headers: {
//                 "X-API-KEY": REDSTAR_API_KEY,
//                 "Content-Type": "application/json",
//               },
//             },
//           );

//           totalFee += feeRes.data.TotalAmount || 0;
//         }
//         const percentage = 1.65 / 100;

//         const baseAmount = totalFee + totalProductPrice;
//         const percentageFee = baseAmount * percentage;
//         console.log(totalFee, percentageFee);
//         const finalDeliveryFee = Math.round(totalFee + percentageFee);
//         setDeliveryFee(totalFee);
//         setDeliveryFee2(finalDeliveryFee);
//       } catch (err) {
//         Swal.fire("Error", "Failed to calculate RedStar delivery fee", "error");
//       } finally {
//         setLoadingDeliveryFee(false);
//       }
//     };

//     getDeliveryFee();
//   }, [selectedShipping, cartItems]);
//   // 🟢 Debug logs
//   useEffect(() => {}, [groupedItems, mergedRequest]);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (selectedShipping !== "redstar") {
//       return Swal.fire(
//         "Error",
//         "Please select RedStar as the shipping method to continue.",
//         "error",
//       );
//     }

//     const REDSTAR_API_KEY = process.env.NEXT_PUBLIC_REDSTAR_API_KEY;
//     if (!REDSTAR_API_KEY) {
//       return Swal.fire("Error", "RedStar API Key is missing.", "error");
//     }

//     // 1. Get the grouped vendor data
//     const groupedVendors = groupItemsByBusiness(cartItems);

//     if (groupedVendors.length === 0) {
//       return Swal.fire("Error", "Your basket is empty.", "error");
//     }

//     // Show loading modal once for all submissions
//     Swal.fire({
//       title: "Submitting Pickup Requests...",
//       text: `Processing ${groupedVendors.length} shipment(s). Please wait.`,
//       allowOutsideClick: false,
//       didOpen: () => {
//         Swal.showLoading();
//       },
//     });

//     let successfulShipments = 0;
//     const errors: string[] = [];

//     // --- 2. ITERATE AND SUBMIT PER VENDOR ---
//     for (const vendor of groupedVendors) {
//       const vendorData = vendors[vendor.businessId];

//       if (!vendorData || !vendorData.addresses) {
//         const errorMsg = `Vendor data or address not found for businessId: ${vendor.businessId}`;
//         errors.push(errorMsg);
//         continue;
//       }

//       // Calculate total weight and pieces for THIS vendor's items
//       const vendorTotalWeight = vendor.items.reduce((sum, item) => {
//         const unitWeight = item.productId.quantityInfo.weight || 1;
//         const itemQuantity = item.quantity;
//         return sum + unitWeight * itemQuantity; // Sum of (unit weight * quantity)
//       }, 0);
//       const vendorTotalPieces = vendor.items.reduce(
//         (sum, i) => sum + i.quantity,
//         0,
//       );

//       // Create the ShipmentItem list for the current vendor
//       const shipmentItems = vendor.items.map((item) => ({
//         id: 0,
//         status: 0,
//         createdOn: new Date().toISOString(),
//         createdBy: user?.firstname || "User",
//         shipmentId: 0,
//         commodity: item.productId.name,
//         description: item.productId.description,
//         countryOfManufacturing: "Nigeria",
//         quantity: item.quantity,
//         // For line items, weight should be the total weight of this specific commodity
//         weight: (item.productId.quantityInfo.weight || 1) * item.quantity,
//         unitOfMeasure: 0,
//         unitOfPrice: item.productId.price || 0,
//       }));
//       // --- 3. BUILD THE SINGLE SHIPMENT PAYLOAD (Matching your required structure) ---
//       const singleRedStarPayload = {
//         senderCity: vendorData.addresses.city || "Unknown City",
//         recipientCity: cityName,
//         recipientTownID: parseInt(townId) || 0,
//         recipientName: `${user?.firstname} ${user?.lastname}`,
//         recipientPhoneNo: user?.phone || "0000000000",
//         recipientEmail: user?.email || "",
//         recipientAddress: address,
//         recipientState: state,
//         senderTownID: vendorData.addresses.townId || 0,
//         senderName:
//           `${vendorData.userId.firstname} ${vendorData.userId.lastname}` ||
//           "Unknown Vendor",
//         senderAddress: vendorData.addresses.street || "Unknown Street",
//         senderPhone: vendorData.userId.phone || "0000000000",
//         orderNo: `ORDER-${Date.now()}-${vendor.businessId.substring(0, 4)}`, // Unique order number per vendor
//         packaging: "Box",
//         boxandCrating: "Standard",
//         deliveryType: "Door to Door",
//         description: `Order from ${vendorData.name} to ${user?.firstname}`,
//         onforwardingLocation: "",
//         paymentType: "Prepaid",
//         pickupType: 1,
//         weight: vendorTotalWeight, // Total weight of this vendor's items
//         pieces: vendorTotalPieces, // Total pieces/units from this vendor
//         cashOnDelivery: 0,
//         shipmentItems: shipmentItems,
//       };

//       try {
//         // API call for the current vendor
//         const res = await axios.post(
//           "/auth/PickupRequest",
//           singleRedStarPayload,
//           {
//             headers: {
//               "X-API-KEY": REDSTAR_API_KEY,
//               "Content-Type": "application/json",
//             },
//           },
//         );

//         if (res.data.TransStatus == "Successful") {
//           // 🟢 NEW: SAVE TO INTERNAL DATABASE
//           // Now we hit the controller we wrote in the previous step
//           try {
//             const internalOrderPayload = {
//               businessId: vendor.businessId,
//               // Assuming vendorData contains the owner's userId.
//               // If your vendor object puts the owner ID in a different field (like .userId or .owner), change this:
//               vendorId: vendorData.userId || vendorData.owner || vendorData._id,
//               items: vendor.items,
//               logisticsPayload: singleRedStarPayload,
//               logisticsResponse: res.data, // Pass the successful RedStar response
//               paymentReference: `WALLET-${Date.now()}-${Math.random()
//                 .toString(36)
//                 .substring(2, 7)}`,
//             };

//             // USE AWAIT HERE instead of .then()
//             const dbResult = await axios.post(
//               "/orders/create",
//               internalOrderPayload,
//               {
//                 headers: {
//                   Authorization: `Bearer ${localStorage.getItem("userToken")}`,
//                 },
//               },
//             );

//             if (dbResult.data.success) {
//               successfulShipments++;
//             }
//           } catch (internalError) {
//             errors.push(
//               `Shipment created for ${vendorData.name}, but failed to save to history.`,
//             );
//             // You might still count this as a partial success or handle it differently
//           }
//         } else {
//           const apiError =
//             res.data.Message || `API reported error for ${vendorData.name}.`;
//           errors.push(apiError);
//         }
//       } catch (error: any) {
//         const systemError = `Failed to submit pickup request for ${
//           vendorData.name
//         }. Error: ${error.response?.data?.Message || error.message}`;
//         errors.push(systemError);
//       }
//     }

//     // --- 4. FINAL MODAL DISPLAY ---
//     Swal.close();
//     if (successfulShipments > 0) {
//       await Swal.fire(
//         "Success!",
//         `${successfulShipments} shipment(s) created successfully.`,
//         "success",
//       );
//       router.push("/user/dashboard/transaction");
//     } else {
//       Swal.fire(
//         "Order Failed",
//         errors.join("\n") || "No shipments were created.",
//         "error",
//       );
//     }
//     setIsSubmitting(false);
//   };

//   const handleTopUp = (e: React.FormEvent) => {
//     e.preventDefault();
//     setShowModal2(true);
//   };

//   const totalPayable = totalProductPrice + (deliveryFee2 || 0);
//   const balanceDifference = walletBalance - totalPayable;

//   const hasSufficientBalance = balanceDifference >= 0;

//   return (
//     <>
//       {showModal && <AddressModal onClose={() => setShowModal(false)} />}
//       {showModal2 && <FundWalletModal onClose={() => setShowModal2(false)} />}
//       {loading ? <CircleLoader isVisible={loading} /> : ""}
//       <form
//         className="p-6 md:w-[50vw] md:mx-10 lg:mx-0 xl:mx-10 mb-20"
//         onSubmit={handleSubmit}
//       >
//         <TagHeader title="Checkout" />
//         {/* Checkout Steps */}
//         <div className="flex justify-around mb-8 mx-auto xl:ml-20 ml-12">
//           <div className="flex flex-col items-center text-center justify-center mr-auto">
//             <div className="w-8 h-8 rounded-full text-[#006838] bg-[#C4EDDA] flex items-center justify-center">
//               <CheckOutlinedIcon />
//             </div>
//             <p className="text-sm font-bold py-2">Your bag</p>
//           </div>
//           <div className="flex flex-col items-center justify-center mr-auto">
//             <div className="w-8 h-8 rounded-full bg-[#006838] flex items-center justify-center text-white">
//               2
//             </div>
//             <p className="text-sm font-bold py-2">Shipping</p>
//           </div>
//           <div className="flex flex-col items-center text-gray-400 mr-auto">
//             <div className="w-8 h-8 rounded-full bg-[#F8F9FE] flex items-center justify-center">
//               3
//             </div>
//             <p className="text-sm font-bold py-2">Payment</p>
//           </div>
//         </div>

//         {/* Address Section */}
//         <div className="mb-4 border border-gray-300 rounded-lg p-4">
//           <div className=" p-5 rounded-lg">
//             <div className="flex justify-between">
//               <div className="flex item-center space-x-3">
//                 <div className=" my-auto text-gray-400">
//                   <MyLocationOutlinedIcon />
//                 </div>
//                 <div>
//                   <h3 className="text-sm font-semibold mb-1">Saved Address</h3>
//                   <p className="text-gray-500">Address: {address} </p>
//                   <p className="text-gray-500">City: {city} </p>
//                   <p className="text-gray-500">State: {state} </p>
//                   <p className="text-gray-500">Town: {town} </p>
//                 </div>
//               </div>
//               <div className="text-[#006838] my-auto">
//                 <CheckOutlinedIcon />
//               </div>
//             </div>
//           </div>
//           <div className="flex justify-center item-center">
//             <button
//               className="text-[#006838] mt-2"
//               onClick={() => setShowModal(true)}
//               type="button"
//             >
//               + Add Address
//             </button>
//           </div>
//         </div>

//         {/* Shipping Method */}
//         <div className="mb-4 ">
//           <h3 className="text-lg font-semibold mb-4">Pick Shipping Option</h3>
//           <div
//             className={`p-4 mb-2 rounded-lg border  h-20 text-black ${
//               selectedShipping === "redstar"
//                 ? "border bg-blue-50 text-black"
//                 : "border-gray-300"
//             }`}
//             onClick={handleSelectRedStar}
//           >
//             <div className="flex justify-between items-center">
//               <Image src={REDSTAR} alt="" width={120} height={20} />
//               <p>Red Star Logistics</p>
//             </div>
//           </div>
//           <div
//             className={`p-4 mb-2 rounded-lg border  h-20 text-black ${
//               selectedShipping === "fex"
//                 ? "border bg-blue-50 text-black"
//                 : "border-gray-300"
//             }`}
//             onClick={handleSelectFex}
//           >
//             <div className="flex justify-between items-center">
//               <Image
//                 src={
//                   "https://res.cloudinary.com/dq8f0jdgt/image/upload/v1773458882/64708f8629b92d48d4457146_fez_logo_qwnrhz.svg"
//                 }
//                 alt=""
//                 width={120}
//                 height={20}
//               />
//               <p>Fez Logistics</p>
//             </div>
//           </div>
//           <div
//             className={`p-4 mb-2 rounded-lg border ${
//               selectedShipping === "gig"
//                 ? "border bg-blue-50"
//                 : "border-gray-300"
//             }`}
//             onClick={handleSelectGIG}
//           >
//             <div className="flex justify-between items-center">
//               <Image src={GIGLOGO} alt="" width={70} height={20} />
//               <p>GIG</p>
//             </div>
//           </div>
//           <div
//             className={`p-4 mb-2 rounded-lg border ${
//               selectedShipping === "dhl"
//                 ? "border bg-blue-50"
//                 : "border-gray-300"
//             }`}
//             onClick={() => setSelectedShipping("dhl")}
//           >
//             <div className="flex justify-between items-center">
//               <Image src={DHLLOGO} alt="" width={100} height={20} />
//               <p>DHL</p>
//               {/* <p>N 5.00 Max.</p> */}
//             </div>
//             {/* <p className="text-gray-500 text-sm">5 - 8 days</p> */}
//           </div>
//           <div
//             className={`p-4 rounded-lg border ${
//               selectedShipping === "fedex"
//                 ? "border bg-blue-50"
//                 : "border-gray-300"
//             }`}
//             onClick={() => setSelectedShipping("fedex")}
//           >
//             <div className="flex justify-between items-center">
//               <Image src={FEDEXLOGO} alt="" width={150} height={120} />
//               <p>FEDEX</p>
//             </div>
//             {/* <p className="text-gray-500 text-sm">1 - 2 days</p> */}
//           </div>
//           <div className="flex justify-center item-center"></div>
//         </div>
//         {selectedShipping === "redstar" && (
//           <div className="mb-4">
//             <p className="mt-2 font-semibold">
//               Delivery Fee:{" "}
//               {/* {deliveryFee !== null ? `₦${deliveryFee}` : "Select pickup type"} */}
//               <div className="mb-4 border border-gray-300 rounded-lg p-4 text-center align-center">
//                 <div>
//                   Shipping Fee:{" "}
//                   {selectedShipping === "redstar"
//                     ? `${
//                         deliveryFee !== null
//                           ? `₦${deliveryFee2}`
//                           : "calculating..."
//                       }`
//                     : selectedShipping === "gig"
//                       ? ""
//                       : selectedShipping === "dhl"
//                         ? ""
//                         : selectedShipping === "fedex"
//                           ? ""
//                           : "Select a shipping method"}
//                 </div>
//                 <div>Product Price: ₦{totalProductPrice.toLocaleString()}</div>
//                 <div>
//                   Total Pay: ₦
//                   {(
//                     (totalProductPrice || 0) + (deliveryFee2 || 0)
//                   ).toLocaleString()}
//                 </div>
//               </div>
//             </p>
//           </div>
//         )}
//         <div
//           className={`p-4 rounded-lg border ${
//             hasSufficientBalance
//               ? "border-green-500 bg-green-50"
//               : "border-red-500 bg-red-50"
//           }`}
//         >
//           <div className="space-y-2">
//             <div className="flex justify-between text-sm">
//               <span>Total Amount</span>
//               <span className="font-semibold">
//                 ₦{totalPayable.toLocaleString()}
//               </span>
//             </div>

//             <div className="flex justify-between text-sm">
//               <span>Account Balance</span>
//               <span className="font-semibold">
//                 ₦{walletBalance.toLocaleString()}
//               </span>
//             </div>

//             <div className="flex justify-between text-sm font-medium">
//               <span>
//                 {hasSufficientBalance ? "Remaining Balance" : "Shortfall"}
//               </span>
//               <span
//                 className={
//                   hasSufficientBalance ? "text-green-700" : "text-red-700"
//                 }
//               >
//                 ₦{Math.abs(balanceDifference).toLocaleString()}
//               </span>
//             </div>
//           </div>

//           <button
//             className={`mt-4 w-full py-2 rounded-md text-white font-medium  ${
//               hasSufficientBalance
//                 ? "bg-[#006838] hover:bg-[#006838]"
//                 : "bg-red-600 hover:bg-red-700"
//             }`}
//             onClick={hasSufficientBalance ? handleSubmit : handleTopUp}
//           >
//             {hasSufficientBalance
//               ? isSubmitting
//                 ? "Processing..."
//                 : "Checkout"
//               : "Top Up Balance"}
//           </button>
//         </div>
//       </form>
//     </>
//   );
// };

// export default CheckoutShipping;


"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import axios from "@/utils/axios";
import Swal from "sweetalert2";

// Icons & Components
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import MyLocationOutlinedIcon from "@mui/icons-material/MyLocationOutlined";
import TagHeader from "@/components/header/TagHeader";
import CircleLoader from "@/components/loader/loader";
import AddressModal from "./AddressModal";
import FundWalletModal from "../../../../wallet/components/FundWalletModal";

// Assets
import DHLLOGO from "@/assets/images/dhl-express-logo-black.png";
import FEDEXLOGO from "@/assets/images/fedex-logo.png";
import GIGLOGO from "@/assets/images/gig-logo.png";
import REDSTAR from "@/assets/images/redstar.png";

// --- Interfaces ---
interface User {
  firstname: string;
  lastname: string;
  email: string;
  accountType: "buyer" | "seller";
  street: string;
  phone: string;
  address: {
    town: string;
    city: string;
    state: string;
    zip: string;
    street: string;
  };
}

interface Product {
  _id: string;
  name: string;
  weight?: number;
  price?: number;
  businessId: string;
  description: string;
  quantityInfo: { weight: number };
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

interface GIGPayload {
  SenderStationId: number;
  ReceiverStationId: number;
  VehicleType: number;
  SenderLocation: GeoLocation;
  ReceiverLocation: GeoLocation;
  CustomerCode: string;
  CustomerType: number;
  PickUpOptions: number;
  ShipmentItems: { description: string; weight: number; quantity: number }[];
  IsFromAgility: boolean;
  Value: number;
  DeliveryOptionIds: number[];
}

// --- Static Constants ---
const ALL_VEHICLE_TYPE = {
  CAR: 0,
  BIKE: 1,
  VAN: 2,
  TRUCK: 3,
};

const WEIGHT_THRESHOLDS = [
  { max: 10, type: ALL_VEHICLE_TYPE.BIKE },
  { max: 50, type: ALL_VEHICLE_TYPE.CAR },
  { max: 500, type: ALL_VEHICLE_TYPE.VAN },
  { max: Infinity, type: ALL_VEHICLE_TYPE.TRUCK },
];

// --- Helper Functions ---
// const getCoordinates = async (address: string): Promise<GeoLocation | null> => {
//   const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
//   if (!apiKey) {
//     console.error("Google Maps API Key is missing");
//     return null;
//   }

//   const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
//     address
//   )}&key=${apiKey}`;

//   try {
//     const response = await fetch(url);
//     const data = await response.json();

//     if (data.status === "OK" && data.results.length > 0) {
//       const { lat, lng } = data.results[0].geometry.location;
//       return { latitude: lat, longitude: lng };
//     }
//     return null;
//   } catch (error) {
//     console.error("Error fetching coordinates:", error);
//     return null;
//   }
// };

const groupItemsByBusiness = (items: CartItem[]): VendorPayload[] => {
  const groups: { [key: string]: CartItem[] } = {};
  for (const item of items) {
    const businessId = item.productId.businessId;
    if (!groups[businessId]) groups[businessId] = [];
    groups[businessId].push(item);
  }
  return Object.entries(groups).map(([businessId, items]) => ({
    businessId,
    items,
  }));
};

const GIG_VEHICLE_TYPES = { BIKE: 1, VAN: 2, TRUCK: 3 };

const GIG_WEIGHT_THRESHOLDS = [
  { max: 10, type: GIG_VEHICLE_TYPES.BIKE },
  { max: 500, type: GIG_VEHICLE_TYPES.VAN },
  { max: Infinity, type: GIG_VEHICLE_TYPES.TRUCK },
];

const getCoordinates = async (address: string): Promise<{ Latitude: number; Longitude: number } | null> => {
  if (!address) return null;
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    console.log("Geocoding response:", data);

    if (data.status === "OK" && data.results.length > 0) {
      const { lat, lng } = data.results[0].geometry.location;
      return { Latitude: lat, Longitude: lng };
    }
    return null;
  } catch (error) {
    console.error("Geocoding Error:", error);
    return null;
  }
};

// --- Main Component ---
const CheckoutShipping: React.FC = () => {
  const router = useRouter();

  // State
  const [selectedShipping, setSelectedShipping] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [cityName, setCityName] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");
  const [town, setTown] = useState("");
  const [townId, setTownId] = useState("");
  const [walletBalance, setWalletBalance] = useState(0);

  const [showModal, setShowModal] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loadingDeliveryFee, setLoadingDeliveryFee] = useState(false);

  const [user, setUser] = useState<User | null>(null);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [groupedItems, setGroupedItems] = useState<Record<string, CartItem[]>>({});
  const [vendors, setVendors] = useState<Record<string, any>>({});
  const [weight, setWeight] = useState(0);
  const [totalProductPrice, setTotalProductPrice] = useState<number>(0);
  const [deliveryFee, setDeliveryFee] = useState<number | null>(null);
  const [deliveryFee2, setDeliveryFee2] = useState<number | null>(null);

  // Fetch User Profile
  useEffect(() => {
    const token = localStorage.getItem("userToken");
    if (!token) return;
    
    setLoading(true);
    axios
      .get("/users/profile", { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => {
        const u = res.data.user;
        setUser(u);
        setAddress(u.addresses?.street || "");
        setCity(u.addresses?.city || "");
        setState(u.addresses?.state || "");
        setZip(u.addresses?.zip || "");
        setTown(u.addresses?.town || "");
        setTownId(u.addresses?.townId || "");
        setCityName(u.addresses?.cityName || "");
        setWalletBalance(res.data.wallet?.balance || 0);
      })
      .catch((error) => console.error("Profile fetch error:", error))
      .finally(() => setLoading(false));
  }, [showModal]);

  // Fetch Cart & Vendors
  useEffect(() => {
    const token = localStorage.getItem("userToken");
    if (!token || !user) return;

    axios
      .get("cart", { headers: { Authorization: `Bearer ${token}` } })
      .then(async (res) => {
        const items: CartItem[] = res.data?.cart?.items ?? [];
        setCartItems(items);

        const totalPrice = items.reduce((sum, item) => {
          return sum + (item.productId.price || 0) * (item.quantity || 1);
        }, 0);
        setTotalProductPrice(totalPrice);

        // Group items and map weight
        const grouped: Record<string, CartItem[]> = {};
        let totalCartWeight = 0;

        for (const item of items) {
          const businessId = item?.productId?.businessId || "unknown";
          if (!grouped[businessId]) grouped[businessId] = [];
          grouped[businessId].push(item);
          totalCartWeight += (item.productId.weight || 1) * item.quantity;
        }

        setGroupedItems(grouped);
        setWeight(totalCartWeight);

        // Fetch vendor data
        const vendorData: Record<string, any> = {};
        for (const businessId of Object.keys(grouped)) {
          try {
            const vendorRes = await axios.get(`/business/${businessId}`, {
              headers: { Authorization: `Bearer ${token}` },
            });
            vendorData[businessId] = vendorRes.data.business;
          } catch (err) {
            vendorData[businessId] = null;
          }
        }
        setVendors(vendorData);
      })
      .catch((err) => console.error("Cart fetch error:", err));
  }, [user]);

  // Calculate RedStar Delivery Fee
  // useEffect(() => {
  //   const getDeliveryFee = async () => {
  //     if (selectedShipping !== "redstar" || cartItems.length === 0) return;
  //     setLoadingDeliveryFee(true);

  //     const REDSTAR_API_KEY = process.env.NEXT_PUBLIC_REDSTAR_API_KEY;
  //     const groupedVendors = groupItemsByBusiness(cartItems);
  //     let totalFee = 0;

  //     try {
  //       for (const vendor of groupedVendors) {
  //         const vendorData = vendors[vendor.businessId];
  //         if (!vendorData) continue;

  //         const vendorTotalWeight = vendor.items.reduce((sum, item) => {
  //           return sum + (item.productId.quantityInfo?.weight || 1) * item.quantity;
  //         }, 0);

  //         const feeRes = await axios.post(
  //           "/auth/DeliveryFee",
  //           {
  //             senderCity: vendorData.addresses?.city,
  //             senderTownID: vendorData.addresses?.townId,
  //             recipientCity: cityName,
  //             recipientTownID: parseInt(townId) || 0,
  //             pickupType: 1,
  //             weight: vendorTotalWeight,
  //           },
  //           {
  //             headers: {
  //               "X-API-KEY": REDSTAR_API_KEY,
  //               "Content-Type": "application/json",
  //             },
  //           }
  //         );

  //         totalFee += feeRes.data.TotalAmount || 0;
  //       }

  //       const baseAmount = totalFee + totalProductPrice;
  //       const percentageFee = baseAmount * 0.0165;
  //       setDeliveryFee(totalFee);
  //       setDeliveryFee2(Math.round(totalFee + percentageFee));
  //     } catch (err) {
  //       Swal.fire("Error", "Failed to calculate delivery fee", "error");
  //     } finally {
  //       setLoadingDeliveryFee(false);
  //     }
  //   };

  //   if (Object.keys(vendors).length > 0) {
  //     getDeliveryFee();
  //   }
  // }, [selectedShipping, cartItems, vendors]);
// 🟢 Unified Delivery Fee Calculator (RedStar & GIG)
  useEffect(() => {
    const getDeliveryFee = async () => {
      if ((selectedShipping !== "redstar" && selectedShipping !== "gig") || cartItems.length === 0) return;
      
      setLoadingDeliveryFee(true);
      const REDSTAR_API_KEY = process.env.NEXT_PUBLIC_REDSTAR_API_KEY;
      const groupedVendors = groupItemsByBusiness(cartItems);
      let totalFee = 0;

      try {
        // Fetch User (Receiver) Coordinates once if GIG is selected
        let receiverCoords: { Latitude: number; Longitude: number } | null = null;
        if (selectedShipping === "gig") {
          const receiverAddressStr = `${address}, ${city}, ${state}`;
          receiverCoords = await getCoordinates(receiverAddressStr)
        }
        // alert(JSON.stringify(receiverCoords));

        for (const vendor of groupedVendors) {
          // Fetch vendor details
          const vendorRes = await axios.get(`/business/${vendor.businessId}`, {
            headers: { Authorization: `Bearer ${localStorage.getItem("userToken")}` },
          });
          const v = vendorRes.data.business;

          // Aggregates
          const totalPieces = vendor.items.reduce((sum, i) => sum + i.quantity, 0);
          const totalWeight = vendor.items.reduce((sum, item) => sum + ((item.productId.quantityInfo?.weight || 1) * item.quantity), 0);
          const vendorTotalValue = vendor.items.reduce((sum, item) => sum + ((item.productId.price || 0) * item.quantity), 0);

          if (selectedShipping === "redstar") {
            // --- REDSTAR LOGIC ---
            const feeRes = await axios.post(
              "/auth/DeliveryFee",
              {
                senderCity: v.addresses?.city || "Unknown",
                senderTownID: v.addresses?.townId || 0,
                recipientCity: cityName,
                recipientTownID: parseInt(townId) || 0,
                pickupType: 1,
                weight: totalWeight,
              },
              { headers: { "X-API-KEY": REDSTAR_API_KEY, "Content-Type": "application/json" } }
            );
            totalFee += feeRes.data.TotalAmount || 0;

          } else if (selectedShipping === "gig") {
            // --- GIG LOGIC ---
            const senderAddressStr = `${v.addresses?.street || ""}, ${v.addresses?.city || ""}, ${v.addresses?.state || ""}`;
            const senderCoords = await getCoordinates(senderAddressStr)

            const vehicle = GIG_WEIGHT_THRESHOLDS.find((vw) => totalWeight <= vw.max);
            const vehicleType = vehicle ? vehicle.type : GIG_VEHICLE_TYPES.TRUCK;

            const gigPayload = {
              SenderStationId: 3,     // Based on your requirements screenshot
              ReceiverStationId: 3,   // Based on your requirements screenshot
              VehicleType: vehicleType,
              SenderLocation: senderCoords,
              ReceiverLocation: receiverCoords,
              IsFromAgility: false,
              CustomerCode: "ECO038082", // Based on your requirements screenshot
              CustomerType: 0,
              PickUpOptions: 0,
              DeliveryOptionIds: [1,2],
              Value: vendorTotalValue,
              ShipmentItems: vendor.items.map((item) => ({
                ItemName: item.productId.name,
                Description: item.productId.description || "Vendor item",
                Quantity: item.quantity,
                Weight: item.productId.quantityInfo?.weight || 0.1,
                IsVolumetric: false,
                ShipmentType: 1,
                Value: item.productId.price || 0,
              }))
            };

            const gigFeeRes = await axios.post(
              "https://dev-thirdpartynode.theagilitysystems.com/price",
              gigPayload,
              {
                headers: {
                  "accept": "application/json",
                  "access-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiJlMWUwOWRhYy1lNmMyLTQ1ZTMtOGZhZi01YmUzN2FlMDVhZjYiLCJDdXN0b21lclR5cGUiOjAsIkNvbXBhbnlUeXBlIjoxLCJBY3Rpdml0eSI6IkNyZWF0ZS5UaGlyZFBhcnR5LERlbGV0ZS5UaGlyZFBhcnR5LFVwZGF0ZS5UaGlyZFBhcnR5LFZpZXcuVGhpcmRQYXJ0eSxQdWJsaWM6UHVibGljIiwiVXNlckNoYW5uZWxDb2RlIjoiRUNPMDM4MDgyIiwiVXNlclJvbGVzIjpbIlRoaXJkUGFydHkiXSwiRmlyc3ROYW1lIjoiR0lHTCIsIkxhc3ROYW1lIjoiVGVzdCIsImlhdCI6MTc3NDg4MDcxNywiZXhwIjoxNzc2NjA4NzE3fQ.U5qvIkFgQ7by_TGwGw7mTb_f_gEYCYwXGB-NaEYYuTs",
                  "content-type": "application/json"
                }
              }
            );
            console.log("GIG Fee Response:", gigFeeRes.data.data.GrandTotal);
            if (gigFeeRes.data && gigFeeRes.data.data && typeof gigFeeRes.data.data.GrandTotal === "number") {
              setDeliveryFee2(gigFeeRes.data.data.GrandTotal);
              setLoadingDeliveryFee(false);
              // alert(gigFeeRes.data.data.GrandTotal)
              totalFee += gigFeeRes.data.data.GrandTotal;
            }
          }
        }

        // Apply your 1.65% platform markup mapping correctly
        const percentage = 1.65 / 100;
        const baseAmount = totalFee + totalProductPrice;
        const percentageFee = baseAmount * percentage;
        
        setDeliveryFee(totalFee);
        setDeliveryFee2(Math.round(totalFee + percentageFee));

      } catch (err) {
        console.error("Delivery Pricing Error:", err);
        Swal.fire("Pricing Error", `Failed to calculate ${selectedShipping.toUpperCase()} delivery fee. Check console.`, "error");
      } finally {
        setLoadingDeliveryFee(false);
      }
    };

    getDeliveryFee();
  }, [selectedShipping, cartItems, address, city, state]); // Dependencies updated
  // Handle GIG Selection
  // const handleSelectGIG = async () => {
  //   setSelectedShipping("gig");

  //   const vehicle = WEIGHT_THRESHOLDS.find((v) => (weight || 0) <= v.max);
  //   const VEHICLE_TYPE = vehicle ? vehicle.type : ALL_VEHICLE_TYPE.TRUCK;

  //   const senderAddressStr = `${address}, ${city}, ${state}`;
  //   const receiverAddressStr = senderAddressStr; 

  //   // Fetch Coordinates securely
  //   const senderCoords = (await getCoordinates(senderAddressStr)) || { latitude: 0, longitude: 0 };
  //   const receiverCoords = (await getCoordinates(receiverAddressStr)) || { latitude: 0, longitude: 0 };

  //   // Format cart items for GIG expected structure
  //   const gigShipmentItems = cartItems.map((item) => ({
  //     description: item.productId.name,
  //     weight: item.productId.quantityInfo?.weight || 1,
  //     quantity: item.quantity,
  //   }));

  //   const payload: GIGPayload = {
  //     VehicleType: VEHICLE_TYPE,
  //     CustomerType: 0, 
  //     PickUpOptions: 0, 
  //     IsFromAgility: false,
  //     SenderStationId: 0, // TODO: Replace with dynamic GIG Hub ID
  //     ReceiverStationId: 0, // TODO: Replace with dynamic GIG Hub ID
  //     SenderLocation: senderCoords,
  //     ReceiverLocation: receiverCoords,
  //     CustomerCode: user?.email || "GUEST", 
  //     Value: totalProductPrice, 
  //     DeliveryOptionIds: [1],
  //     ShipmentItems: gigShipmentItems,
  //   };

  //   console.log("GIG Payload Generated:", payload);
  //   // TODO: Dispatch payload to your GIG fee calculation endpoint here
  // };
// 🟢 Simple Selection Handlers
  const handleSelectRedStar = () => setSelectedShipping("redstar");
  const handleSelectFEZ = () => setSelectedShipping("fez");
  const handleSelectGIG = () => setSelectedShipping("gig");
  const handleSelectDHL = () => setSelectedShipping("dhl");
  // Submit Logic
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (selectedShipping !== "redstar") {
      return Swal.fire("Notice", "Currently only RedStar checkout is implemented in this flow.", "info");
    }

    const REDSTAR_API_KEY = process.env.NEXT_PUBLIC_REDSTAR_API_KEY;
    const groupedVendors = groupItemsByBusiness(cartItems);

    if (groupedVendors.length === 0) return Swal.fire("Error", "Your basket is empty.", "error");

    setIsSubmitting(true);
    Swal.fire({
      title: "Submitting Pickup Requests...",
      text: `Processing ${groupedVendors.length} shipment(s). Please wait.`,
      allowOutsideClick: false,
      didOpen: () => Swal.showLoading(),
    });

    let successfulShipments = 0;
    const errors: string[] = [];

    for (const vendor of groupedVendors) {
      const vendorData = vendors[vendor.businessId];
      if (!vendorData || !vendorData.addresses) {
        errors.push(`Vendor data missing for ID: ${vendor.businessId}`);
        continue;
      }

      const vendorTotalWeight = vendor.items.reduce(
        (sum, item) => sum + (item.productId.quantityInfo?.weight || 1) * item.quantity,
        0
      );
      const vendorTotalPieces = vendor.items.reduce((sum, i) => sum + i.quantity, 0);

      const shipmentItems = vendor.items.map((item) => ({
        id: 0,
        status: 0,
        createdOn: new Date().toISOString(),
        createdBy: user?.firstname || "User",
        shipmentId: 0,
        commodity: item.productId.name,
        description: item.productId.description,
        countryOfManufacturing: "Nigeria",
        quantity: item.quantity,
        weight: (item.productId.quantityInfo?.weight || 1) * item.quantity,
        unitOfMeasure: 0,
        unitOfPrice: item.productId.price || 0,
      }));

      const singleRedStarPayload = {
        senderCity: vendorData.addresses.city || "Unknown",
        recipientCity: cityName,
        recipientTownID: parseInt(townId) || 0,
        recipientName: `${user?.firstname} ${user?.lastname}`,
        recipientPhoneNo: user?.phone || "0000000000",
        recipientEmail: user?.email || "",
        recipientAddress: address,
        recipientState: state,
        senderTownID: vendorData.addresses.townId || 0,
        senderName: `${vendorData.userId?.firstname || ""} ${vendorData.userId?.lastname || vendorData.name}`,
        senderAddress: vendorData.addresses.street || "Unknown",
        senderPhone: vendorData.userId?.phone || "0000000000",
        orderNo: `ORDER-${Date.now()}-${vendor.businessId.substring(0, 4)}`,
        packaging: "Box",
        boxandCrating: "Standard",
        deliveryType: "Door to Door",
        description: `Order from ${vendorData.name}`,
        onforwardingLocation: "",
        paymentType: "Prepaid",
        pickupType: 1,
        weight: vendorTotalWeight,
        pieces: vendorTotalPieces,
        cashOnDelivery: 0,
        shipmentItems,
      };

      try {
        const res = await axios.post("/auth/PickupRequest", singleRedStarPayload, {
          headers: { "X-API-KEY": REDSTAR_API_KEY, "Content-Type": "application/json" },
        });

        if (res.data.TransStatus === "Successful") {
          try {
            const internalOrderPayload = {
              businessId: vendor.businessId,
              vendorId: vendorData.userId?._id || vendorData.owner || vendorData._id,
              items: vendor.items,
              logisticsPayload: singleRedStarPayload,
              logisticsResponse: res.data,
              paymentReference: `WALLET-${Date.now()}`,
            };

            const dbResult = await axios.post("/orders/create", internalOrderPayload, {
              headers: { Authorization: `Bearer ${localStorage.getItem("userToken")}` },
            });

            if (dbResult.data.success) successfulShipments++;
          } catch (internalError) {
            errors.push(`Shipment created for ${vendorData.name}, but failed to save internally.`);
          }
        } else {
          errors.push(res.data.Message || `API error for ${vendorData.name}.`);
        }
      } catch (error: any) {
        errors.push(`Failed for ${vendorData.name}. Error: ${error.response?.data?.Message || error.message}`);
      }
    }

    Swal.close();
    setIsSubmitting(false);

    if (successfulShipments > 0) {
      await Swal.fire("Success!", `${successfulShipments} shipment(s) created.`, "success");
      router.push("/user/dashboard/transaction");
    } else {
      Swal.fire("Order Failed", errors.join("\n") || "No shipments created.", "error");
    }
  };

  const totalPayable = totalProductPrice + (deliveryFee2 || 0);
  const balanceDifference = walletBalance - totalPayable;
  const hasSufficientBalance = balanceDifference >= 0;

  return (
    <>
      {showModal && <AddressModal onClose={() => setShowModal(false)} />}
      {showModal2 && <FundWalletModal onClose={() => setShowModal2(false)} />}
      <CircleLoader isVisible={loading} />

      <form className="p-6 md:w-[50vw] md:mx-10 lg:mx-0 xl:mx-10 mb-20" onSubmit={handleSubmit}>
        <TagHeader title="Checkout" />

        {/* Checkout Steps */}
        <div className="flex justify-around mb-8 mx-auto xl:ml-20 ml-12">
          <div className="flex flex-col items-center text-center justify-center mr-auto">
            <div className="w-8 h-8 rounded-full text-[#006838] bg-[#C4EDDA] flex items-center justify-center">
              <CheckOutlinedIcon />
            </div>
            <p className="text-sm font-bold py-2">Your bag</p>
          </div>
          <div className="flex flex-col items-center justify-center mr-auto">
            <div className="w-8 h-8 rounded-full bg-[#006838] flex items-center justify-center text-white">2</div>
            <p className="text-sm font-bold py-2">Shipping</p>
          </div>
          <div className="flex flex-col items-center text-gray-400 mr-auto">
            <div className="w-8 h-8 rounded-full bg-[#F8F9FE] flex items-center justify-center">3</div>
            <p className="text-sm font-bold py-2">Payment</p>
          </div>
        </div>

        {/* Address Section */}
        <div className="mb-4 border border-gray-300 rounded-lg p-4">
          <div className="p-5 rounded-lg flex justify-between">
            <div className="flex items-center space-x-3">
              <div className="text-gray-400"><MyLocationOutlinedIcon /></div>
              <div>
                <h3 className="text-sm font-semibold mb-1">Saved Address</h3>
                <p className="text-gray-500">Address: {address}</p>
                <p className="text-gray-500">City: {city}</p>
                <p className="text-gray-500">State: {state}</p>
              </div>
            </div>
            <div className="text-[#006838] my-auto"><CheckOutlinedIcon /></div>
          </div>
          <div className="flex justify-center">
            <button className="text-[#006838] mt-2" onClick={() => setShowModal(true)} type="button">
              + Add Address
            </button>
          </div>
        </div>

        {/* Shipping Method */}
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-4">Pick Shipping Option</h3>
          {[
            { id: "redstar", name: "Red Star Logistics (Recommended)", logo: REDSTAR, w: 120, h: 20 },
            { id: "fez", name: "Fez Logistics (coming soon)", logo: "https://res.cloudinary.com/dq8f0jdgt/image/upload/v1773458882/64708f8629b92d48d4457146_fez_logo_qwnrhz.svg", w: 120, h: 20 },
            { id: "gig", name: "GIG (coming soon)", logo: GIGLOGO, w: 70, h: 20 },
            { id: "dhl", name: "DHL (coming soon)", logo: DHLLOGO, w: 100, h: 20 },
            // { id: "fedex", name: "FEDEX", logo: FEDEXLOGO, w: 150, h: 120 },
          ].map((provider) => (
            <div
              key={provider.id}
              className={`p-4 mb-2 rounded-lg border h-20 flex items-center justify-between cursor-pointer ${
                selectedShipping === provider.id ? "border-blue-500 bg-blue-50" : "border-gray-300"
              }`}
              onClick={() => {
                if (provider.id === "gig") handleSelectGIG();
                if (provider.id === "fez") handleSelectFEZ();
                if (provider.id === "dhl") handleSelectDHL();
                if (provider.id === "redstar") handleSelectRedStar();
                else setSelectedShipping(provider.id);
              }}
            >
              <Image src={provider.logo} alt={provider.name} width={provider.w} height={provider.h} />
              <p className="font-medium text-gray-800 text-[11px] md:text-[15px]">{provider.name}</p>
            </div>
          ))}
        </div>

        {/* Pricing Summary */}
        <div className="mb-4 border border-gray-300 rounded-lg p-4 text-center">
          <div className="font-medium text-gray-700">
            Shipping Fee:{" "}
            {loadingDeliveryFee ? "Calculating..." 
            : deliveryFee2 !== null && selectedShipping === "redstar"||"gig" 
            ? `₦${deliveryFee2?.toLocaleString()}` 
            : "Select a valid shipping method"}
          </div>
          <div className="text-gray-600">Product Price: ₦{totalProductPrice.toLocaleString()}</div>
          <div className="font-bold text-lg text-gray-900 mt-2">
            Total Pay: ₦{totalPayable.toLocaleString()}
          </div>
        </div>

        {/* Wallet Balance Check */}
        <div className={`p-4 rounded-lg border ${hasSufficientBalance ? "border-green-500 bg-green-50" : "border-red-500 bg-red-50"}`}>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Account Balance</span>
              <span className="font-semibold">₦{walletBalance.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-sm font-medium">
              <span>{hasSufficientBalance ? "Remaining Balance" : "Shortfall"}</span>
              <span className={hasSufficientBalance ? "text-green-700" : "text-red-700"}>
                ₦{Math.abs(balanceDifference).toLocaleString()}
              </span>
            </div>
          </div>

          <button
            type="button"
            className={`mt-4 w-full py-2 rounded-md text-white font-medium ${
              hasSufficientBalance ? "bg-[#006838] hover:bg-green-800" : "bg-red-600 hover:bg-red-700"
            }`}
            onClick={hasSufficientBalance ? handleSubmit : () => setShowModal2(true)}
            disabled={isSubmitting || loadingDeliveryFee}
          >
            {hasSufficientBalance ? (isSubmitting ? "Processing..." : "Checkout") : "Top Up Balance"}
          </button>
        </div>
      </form>
    </>
  );
};

export default CheckoutShipping;