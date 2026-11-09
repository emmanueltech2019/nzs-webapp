// import React from 'react';
// import Image from 'next/image';
// import { Icon } from '@iconify/react';
// import placeholder from '@/assets/images/productMockup.png';
// import TagHeader from '@/components/header/TagHeader';

// export type TransactionDetailsProps = {
//   order: any; 
//   role: 'buyer' | 'seller';
// };

// const TransactionDetails: React.FC<TransactionDetailsProps> = ({ order, role }) => {
//   const getStatusColor = (status: string) => {
//     switch (status.toLowerCase()) {
//       case 'successful': return 'bg-green-100 text-green-700';
//       case 'pending': return 'bg-yellow-100 text-yellow-700';
//       default: return 'bg-gray-100 text-gray-700';
//     }
//   };

//   return (
//     <div className="max-w-3xl mx-auto p-4 md:p-6 bg-[#F8F9FB] min-h-screen">
//         <TagHeader title='Transaction Details'/>
//       {/* Header */}
//       <div className="flex items-center justify-between mb-6">
//         <h1 className="text-xl font-bold text-gray-800">{new Date().toLocaleDateString()}
            
//         </h1>
//         <span className={`px-4 py-1 rounded-full text-xs font-bold uppercase ${getStatusColor(order?.status || 'Pending')}`}>
//           {order?.status || 'Pending'}
//         </span>
//       </div>

//       {/* Order Info Card */}
//       <div className="bg-white rounded-3xl p-6 shadow-sm mb-6">
//         <div className="flex justify-between items-start border-b border-gray-100 pb-4 mb-4">
//           <div>
//             <p className="text-sm text-gray-400 font-medium">Order Reference</p>
//             <p className="text-lg font-bold text-[#2F855A]">#{order?.orderReference}</p>
//           </div>
//           <div className="text-right">
//             <p className="text-sm text-gray-400 font-medium">Date</p>
//             <p className="font-semibold">{new Date().toLocaleDateString()}</p>
//           </div>
//         </div>

//         {/* Item List */}
//         <div className="space-y-4">
//           {order?.items?.map((item: any, index: number) => (
//             <div key={index} className="flex items-center space-x-4">
//               <div className="w-16 h-16 rounded-xl bg-gray-100 overflow-hidden flex-shrink-0">
//                 <Image src={placeholder} alt="product" className="object-cover w-full h-full" />
//               </div>
//               <div className="flex-1">
//                 <p className="font-extrabold text-gray-800">{item.productId?.name || "Product Item"}</p>
//                 <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
//               </div>
//               <p className="font-bold text-gray-900">₦{(item.productId?.price * item.quantity).toLocaleString()}</p>
//             </div>
//           ))}
//         </div>

//         <div className="mt-6 pt-4 border-t border-gray-100 space-y-2">
//           <div className="flex justify-between text-gray-500">
//             <span>Subtotal</span>
//             <span>₦{order?.grandTotal?.toLocaleString()}</span>
//           </div>
//           <div className="flex justify-between text-gray-500">
//             <span>Shipping Fee</span>
//             <span>₦0.00</span>
//           </div>
//           <div className="flex justify-between text-xl font-extrabold text-gray-900 pt-2">
//             <span>Total</span>
//             <span className="text-[#2F855A]">₦{order?.grandTotal?.toLocaleString()}</span>
//           </div>
//         </div>
//       </div>

//       {/* Logistics & Address Section */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
//         <div className="bg-white rounded-3xl p-5 shadow-sm">
//           <div className="flex items-center space-x-2 mb-3 text-[#2F855A]">
//             <Icon icon="solar:delivery-bold" className="text-xl" />
//             <h3 className="font-bold">Logistics</h3>
//           </div>
//           <p className="text-sm text-gray-400">Waybill Number</p>
//           <p className="font-semibold mb-2">{order?.logistics?.waybillNumber || 'Processing...'}</p>
//           <p className="text-sm text-gray-400">Delivery Status</p>
//           <p className="font-semibold">In Transit</p>
//         </div>

//         <div className="bg-white rounded-3xl p-5 shadow-sm">
//           <div className="flex items-center space-x-2 mb-3 text-[#2F855A]">
//             <Icon icon="solar:map-point-bold" className="text-xl" />
//             <h3 className="font-bold">Shipping Address</h3>
//           </div>
//           <p className="text-sm text-gray-700 leading-relaxed">
//             {order?.shippingAddress || 'No address provided'}
//           </p>
//         </div>
//       </div>

//       {/* Role-Based Action Section */}
//       <div className="bg-white rounded-3xl p-6 shadow-sm">
//         <h3 className="font-bold mb-4 text-gray-800">
//           {role === 'seller' ? 'Customer Information' : 'Seller Information'}
//         </h3>
//         <div className="flex items-center space-x-4 mb-6">
//           <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
//             <Icon icon="solar:user-bold" className="text-2xl text-gray-500" />
//           </div>
//           <div>
//             <p className="font-bold">{role === 'seller' ? 'Buyer Name' : 'Store Name'}</p>
//             <p className="text-sm text-gray-400">Contact: {order?.contact || '+234 000 000'}</p>
//           </div>
//         </div>

//         {role === 'seller' ? (
//           <button className="w-full bg-[#2F855A] text-white py-4 rounded-2xl font-bold flex items-center justify-center space-x-2 shadow-lg shadow-green-100">
//             <Icon icon="solar:check-read-bold" className="text-xl" />
//             <span>Confirm Fulfillment</span>
//           </button>
//         ) : (
//           <button className="w-full border-2 border-[#2F855A] text-[#2F855A] py-4 rounded-2xl font-bold flex items-center justify-center space-x-2">
//             <Icon icon="solar:chat-round-dots-bold" className="text-xl" />
//             <span>Contact Seller</span>
//           </button>
//         )}
//       </div>
//     </div>
//   );
// };

// export default TransactionDetails;
// "use client";
// import React, { useEffect, useState } from 'react';
// import Image from 'next/image';
// import { useParams } from 'next/navigation'; // Use 'next/router' if using Pages Router
// import axios from 'axios';
// import { Icon } from '@iconify/react';
// import placeholder from '@/assets/images/productMockup.png';
// import TagHeader from '@/components/header/TagHeader';

// export type TransactionDetailsProps = {
//   role: 'buyer' | 'seller';
//   order?: any;
// };

// const TransactionDetails: React.FC<TransactionDetailsProps> = ({ role }) => {
//   const params = useParams();
//   const orderId = params.orderId; // Make sure your file is named [orderId]/page.tsx

//   const [order, setOrder] = useState<any>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchOrderDetails = async () => {
//       if (!orderId) return;

//       try {
//         setLoading(true);
//         const res = await axios({
//           url: `${process.env.NEXT_PUBLIC_API_URL}/users/orders/${orderId}`, // Use env variable for base URL
//           method: 'GET',
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("userToken")}`,
//           },
//         });
//         setOrder(res.data.data); // Adjust based on your API response structure
//       } catch (err: any) {
//         setError(err.response?.data?.message || 'Failed to fetch order details');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchOrderDetails();
//   }, [orderId]);

//   const getStatusColor = (status: string) => {
//     switch (status?.toLowerCase()) {
//       case 'successful': return 'bg-green-100 text-green-700';
//       case 'pending': return 'bg-yellow-100 text-yellow-700';
//       case 'failed': return 'bg-red-100 text-red-700';
//       default: return 'bg-gray-100 text-gray-700';
//     }
//   };

//   if (loading) return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-[#F8F9FB]">
//         <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#2F855A]"></div>
//         <p className="mt-4 text-gray-500 font-medium">Loading details...</p>
//     </div>
//   );

//   if (error) return (
//     <div className="p-6 text-center">
//       <p className="text-red-500 font-bold">{error}</p>
//       <button onClick={() => window.location.reload()} className="mt-4 text-[#2F855A] underline">Try Again</button>
//     </div>
//   );

//   return (
//     <div className="max-w-3xl mx-auto p-4 md:p-6 bg-[#F8F9FB] min-h-screen">
//       <TagHeader title='Transaction Details'/>
      
//       {/* Header */}
//       <div className="flex items-center justify-between mb-6">
//         <h1 className="text-xl font-bold text-gray-800">
//             {order?.createdAt ? new Date(order.createdAt).toLocaleDateString() : 'Order Date'}
//         </h1>
//         <span className={`px-4 py-1 rounded-full text-xs font-bold uppercase ${getStatusColor(order?.status)}`}>
//           {order?.status || 'Pending'}
//         </span>
//       </div>

//       {/* Order Info Card */}
//       <div className="bg-white rounded-3xl p-6 shadow-sm mb-6">
//         <div className="flex justify-between items-start border-b border-gray-100 pb-4 mb-4">
//           <div>
//             <p className="text-sm text-gray-400 font-medium">Order Reference</p>
//             <p className="text-lg font-bold text-[#2F855A]">#{order?.orderReference || order?._id?.slice(-8)}</p>
//           </div>
//           <div className="text-right">
//             <p className="text-sm text-gray-400 font-medium">Time</p>
//             <p className="font-semibold">{order?.createdAt ? new Date(order.createdAt).toLocaleTimeString() : '--:--'}</p>
//           </div>
//         </div>

//         {/* Item List */}
//         <div className="space-y-4">
//           {order?.items?.map((item: any, index: number) => (
//             <div key={index} className="flex items-center space-x-4">
//               <div className="w-16 h-16 rounded-xl bg-gray-100 overflow-hidden flex-shrink-0">
//                 <Image 
//                     src={item.productId?.images?.[0] || placeholder} 
//                     alt="product" 
//                     width={64} 
//                     height={64} 
//                     className="object-cover w-full h-full" 
//                 />
//               </div>
//               <div className="flex-1">
//                 <p className="font-extrabold text-gray-800">{item.productId?.name || "Product Item"}</p>
//                 <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
//               </div>
//               <p className="font-bold text-gray-900">₦{((item.priceAtOrder || item.productId?.price) * item.quantity).toLocaleString()}</p>
//             </div>
//           ))}
//         </div>

//         <div className="mt-6 pt-4 border-t border-gray-100 space-y-2">
//           <div className="flex justify-between text-gray-500">
//             <span>Subtotal</span>
//             <span>₦{order?.subTotal?.toLocaleString() || order?.grandTotal?.toLocaleString()}</span>
//           </div>
//           <div className="flex justify-between text-gray-500">
//             <span>Shipping Fee</span>
//             <span>₦{order?.shippingFee?.toLocaleString() || '0.00'}</span>
//           </div>
//           <div className="flex justify-between text-xl font-extrabold text-gray-900 pt-2">
//             <span>Total</span>
//             <span className="text-[#2F855A]">₦{order?.grandTotal?.toLocaleString()}</span>
//           </div>
//         </div>
//       </div>

//       {/* Logistics & Address Section */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
//         <div className="bg-white rounded-3xl p-5 shadow-sm">
//           <div className="flex items-center space-x-2 mb-3 text-[#2F855A]">
//             <Icon icon="solar:delivery-bold" className="text-xl" />
//             <h3 className="font-bold">Logistics</h3>
//           </div>
//           <p className="text-sm text-gray-400">Waybill Number</p>
//           <p className="font-semibold mb-2 text-gray-700">{order?.logistics?.waybillNumber || 'Not assigned'}</p>
//           <p className="text-sm text-gray-400">Delivery Status</p>
//           <p className="font-semibold text-gray-700">{order?.deliveryStatus || 'Pending'}</p>
//         </div>

//         <div className="bg-white rounded-3xl p-5 shadow-sm">
//           <div className="flex items-center space-x-2 mb-3 text-[#2F855A]">
//             <Icon icon="solar:map-point-bold" className="text-xl" />
//             <h3 className="font-bold">Shipping Address</h3>
//           </div>
//           <p className="text-sm text-gray-700 leading-relaxed">
//             {order?.shippingAddress?.addressLine1 || order?.shippingAddress || 'No address provided'}
//           </p>
//         </div>
//       </div>

//       {/* Role-Based Action Section */}
//       <div className="bg-white rounded-3xl p-6 shadow-sm mb-10">
//         <h3 className="font-bold mb-4 text-gray-800">
//           {role === 'seller' ? 'Customer Information' : 'Seller Information'}
//         </h3>
//         <div className="flex items-center space-x-4 mb-6">
//           <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center border border-gray-100">
//             <Icon icon="solar:user-bold" className="text-2xl text-gray-400" />
//           </div>
//           <div>
//             <p className="font-bold text-gray-800">
//                 {role === 'seller' ? order?.userId?.fullName : (order?.sellerId?.storeName || 'Merchant')}
//             </p>
//             <p className="text-sm text-gray-400">
//                 {role === 'seller' ? order?.userId?.phoneNumber : order?.sellerId?.phoneNumber || '+234 ...'}
//             </p>
//           </div>
//         </div>

//         {role === 'seller' ? (
//           <button 
//             disabled={order?.status === 'successful'}
//             className="w-full bg-[#2F855A] disabled:bg-gray-400 text-white py-4 rounded-2xl font-bold flex items-center justify-center space-x-2 shadow-lg shadow-green-100 transition-all hover:bg-[#276e4a]"
//           >
//             <Icon icon="solar:check-read-bold" className="text-xl" />
//             <span>{order?.status === 'successful' ? 'Fulfillment Confirmed' : 'Confirm Fulfillment'}</span>
//           </button>
//         ) : (
//           <button className="w-full border-2 border-[#2F855A] text-[#2F855A] py-4 rounded-2xl font-bold flex items-center justify-center space-x-2 transition-all hover:bg-green-50">
//             <Icon icon="solar:chat-round-dots-bold" className="text-xl" />
//             <span>Contact Seller</span>
//           </button>
//         )}
//       </div>
//     </div>
//   );
// };

// export default TransactionDetails;
// "use client";

// import React, {
//   useCallback,
//   useEffect,
//   useMemo,
//   useState,
// } from "react";

// import Image from "next/image";
// import { useParams, useRouter, useSearchParams } from "next/navigation";

// import { Icon } from "@iconify/react";

// import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
// import RefreshRoundedIcon from "@mui/icons-material/RefreshRounded";
// import ReceiptLongRoundedIcon from "@mui/icons-material/ReceiptLongRounded";
// import LocalShippingRoundedIcon from "@mui/icons-material/LocalShippingRounded";
// import LocationOnRoundedIcon from "@mui/icons-material/LocationOnRounded";
// import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
// import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
// import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded";

// import TagHeader from "@/components/header/TagHeader";
// import axios from "@/utils/axios";

// import placeholder from "@/assets/images/productMockup.png";

// export type TransactionRole =
//   | "buyer"
//   | "seller";

// interface TransactionItem {
//   _id?: string;

//   productId?: {
//     _id?: string;
//     name?: string;
//     price?: number;
//     images?: string[];
//   };

//   name?: string;
//   image?: string;
//   quantity?: number;
//   priceAtOrder?: number;
// }

// interface Order {
//   _id: string;

//   orderReference?: string;
//   paymentReference?: string;

//   status?: string;
//   deliveryStatus?: string;

//   createdAt?: string;

//   subTotal?: number;
//   shippingFee?: number;
//   grandTotal?: number;
//   totalAmount?: number;

//   items?: TransactionItem[];

//   shippingAddress?:
//     | string
//     | {
//         addressLine1?: string;
//         addressLine2?: string;
//         city?: string;
//         state?: string;
//         country?: string;
//       };

//   logistics?: {
//     waybillNumber?: string;
//   };

//   userId?: {
//     fullName?: string;
//     firstname?: string;
//     lastname?: string;
//     phoneNumber?: string;
//     email?: string;
//   };

//   sellerId?: {
//     storeName?: string;
//     businessName?: string;
//     phoneNumber?: string;
//     email?: string;
//   };
// }

// type TransactionDetailsProps = {
//   role: TransactionRole;
// };

// /* -------------------------------------------------------------------------- */
// /*                              HELPERS                                       */
// /* -------------------------------------------------------------------------- */

// const formatCurrency = (value: unknown) => {
//   const amount = Number(value);

//   if (!Number.isFinite(amount)) {
//     return "₦0.00";
//   }

//   return new Intl.NumberFormat("en-NG", {
//     style: "currency",
//     currency: "NGN",
//     maximumFractionDigits: 2,
//   }).format(amount);
// };

// const formatDate = (date?: string) => {
//   if (!date) return "Date unavailable";

//   const parsed = new Date(date);

//   if (Number.isNaN(parsed.getTime())) {
//     return "Date unavailable";
//   }

//   return new Intl.DateTimeFormat("en-NG", {
//     day: "numeric",
//     month: "long",
//     year: "numeric",
//   }).format(parsed);
// };

// const formatTime = (date?: string) => {
//   if (!date) return "--:--";

//   const parsed = new Date(date);

//   if (Number.isNaN(parsed.getTime())) {
//     return "--:--";
//   }

//   return new Intl.DateTimeFormat("en-NG", {
//     hour: "numeric",
//     minute: "2-digit",
//   }).format(parsed);
// };

// const getStatusConfig = (status?: string) => {
//   const normalized = String(status || "")
//     .toLowerCase()
//     .trim();

//   if (
//     ["completed", "successful", "success", "succeeded"].includes(
//       normalized
//     )
//   ) {
//     return {
//       label: "Completed",
//       container:
//         "bg-emerald-50 text-emerald-700 ring-emerald-100",
//       icon: (
//         <CheckCircleRoundedIcon
//           sx={{ fontSize: 15 }}
//         />
//       ),
//     };
//   }

//   if (
//     ["pending", "processing", "in_progress"].includes(
//       normalized
//     )
//   ) {
//     return {
//       label: "Pending",
//       container:
//         "bg-amber-50 text-amber-700 ring-amber-100",
//       icon: (
//         <AccessTimeRoundedIcon
//           sx={{ fontSize: 15 }}
//         />
//       ),
//     };
//   }

//   return {
//     label: "Failed",
//     container: "bg-red-50 text-red-700 ring-red-100",
//     icon: (
//       <Icon
//         icon="mdi:close-circle-outline"
//         className="text-[15px]"
//       />
//     ),
//   };
// };

// const getProductImage = (
//   item: TransactionItem
// ) => {
//   if (
//     item.productId?.images &&
//     item.productId.images.length > 0
//   ) {
//     return item.productId.images[0];
//   }

//   return item.image || placeholder;
// };

// const getShippingAddress = (
//   address: Order["shippingAddress"]
// ) => {
//   if (!address) {
//     return "No address provided";
//   }

//   if (typeof address === "string") {
//     return address;
//   }

//   return [
//     address.addressLine1,
//     address.addressLine2,
//     address.city,
//     address.state,
//     address.country,
//   ]
//     .filter(Boolean)
//     .join(", ");
// };

// /* -------------------------------------------------------------------------- */
// /*                           SKELETON                                         */
// /* -------------------------------------------------------------------------- */

// const DetailsSkeleton = () => {
//   return (
//     <div className="space-y-4">
//       <div className="h-24 animate-pulse rounded-3xl bg-gray-100" />

//       <div className="rounded-3xl bg-white p-6">
//         <div className="h-5 w-40 animate-pulse rounded bg-gray-100" />

//         <div className="mt-5 space-y-4">
//           {Array.from({ length: 3 }).map(
//             (_, index) => (
//               <div
//                 key={index}
//                 className="h-16 animate-pulse rounded-2xl bg-gray-100"
//               />
//             )
//           )}
//         </div>
//       </div>

//       <div className="h-44 animate-pulse rounded-3xl bg-gray-100" />
//     </div>
//   );
// };

// /* -------------------------------------------------------------------------- */
// /*                            COMPONENT                                       */
// /* -------------------------------------------------------------------------- */

// const TransactionDetails = ({
//   role,
// }: TransactionDetailsProps) => {
//   const router = useRouter();
//   const params = useParams();
//   const searchParams = useSearchParams();

//   /**
//    * Supports both:
//    *
//    * /details?id=123
//    *
//    * and:
//    *
//    * /details/123
//    */
//   const orderId = useMemo(() => {
//     const queryId = searchParams.get("id");

//     const routeId = Array.isArray(
//       params?.orderId
//     )
//       ? params.orderId[0]
//       : params?.orderId;

//     return queryId || routeId || null;
//   }, [searchParams, params]);

//   const [order, setOrder] =
//     useState<Order | null>(null);

//   const [loading, setLoading] =
//     useState(true);

//   const [refreshing, setRefreshing] =
//     useState(false);

//   const [error, setError] =
//     useState("");

//   /* ---------------------------------------------------------------------- */
//   /*                              FETCH                                     */
//   /* ---------------------------------------------------------------------- */

//   const fetchOrderDetails = useCallback(
//     async (refresh = false) => {
//       if (!orderId) {
//         setLoading(false);
//         setError(
//           "This transaction could not be identified."
//         );
//         return;
//       }

//       const token =
//         localStorage.getItem("userToken");

//       if (!token) {
//         router.replace("/auth/login");
//         return;
//       }

//       try {
//         if (refresh) {
//           setRefreshing(true);
//         } else {
//           setLoading(true);
//         }

//         setError("");

//         const response =
//           await axios.get(
//             `/orders/${encodeURIComponent(
//               orderId
//             )}`,
//             {
//               headers: {
//                 Authorization: `Bearer ${token}`,
//               },
//             }
//           );
//           console.log("Transaction details response:", response);

//         const data =
//           response?.data?.data ||
//           response?.data?.order ||
//           response?.data;

//         setOrder(data as Order);
//       } catch (error: any) {
//         console.error(
//           "Failed to fetch transaction:",
//           error
//         );

//         const status =
//           error?.response?.status;

//         if (status === 401) {
//           localStorage.removeItem(
//             "userToken"
//           );

//           router.replace("/auth/login");
//           return;
//         }

//         setError(
//           error?.response?.data?.message ||
//             "Failed to load transaction details."
//         );
//       } finally {
//         setLoading(false);
//         setRefreshing(false);
//       }
//     },
//     [orderId, router]
//   );

//   useEffect(() => {
//     fetchOrderDetails();
//   }, [fetchOrderDetails]);

//   /* ---------------------------------------------------------------------- */
//   /*                            DERIVED                                      */
//   /* ---------------------------------------------------------------------- */

//   const statusConfig = useMemo(
//     () => getStatusConfig(order?.status),
//     [order?.status]
//   );

//   const subtotal = Number(
//     order?.subTotal ??
//       order?.items?.reduce(
//         (sum, item) =>
//           sum +
//           Number(
//             item.priceAtOrder ??
//               item.productId?.price ??
//               0
//           ) *
//             Number(item.quantity ?? 0),
//         0
//       ) ??
//       0
//   );

//   const shippingFee = Number(
//     order?.shippingFee ?? 0
//   );

//   const total = Number(
//     order?.grandTotal ??
//       order?.totalAmount ??
//       subtotal + shippingFee
//   );

//   const personName =
//     role === "seller"
//       ? order?.userId?.fullName ||
//         [
//           order?.userId?.firstname,
//           order?.userId?.lastname,
//         ]
//           .filter(Boolean)
//           .join(" ") ||
//         "Customer"
//       : order?.sellerId?.storeName ||
//         order?.sellerId?.businessName ||
//         "Merchant";

//   const personPhone =
//     role === "seller"
//       ? order?.userId?.phoneNumber
//       : order?.sellerId?.phoneNumber;

//   const personLabel =
//     role === "seller"
//       ? "Customer Information"
//       : "Seller Information";

//   /* ---------------------------------------------------------------------- */
//   /*                               LOADING                                  */
//   /* ---------------------------------------------------------------------- */

//   if (loading) {
//     return (
//       <main className="min-h-screen bg-[#f7f9f8] px-4 py-5 md:px-6 md:py-8">
//         <div className="mx-auto w-full max-w-3xl">
//           <TagHeader title="Transaction Details" />
//           <div className="mt-5">
//             <DetailsSkeleton />
//           </div>
//         </div>
//       </main>
//     );
//   }

//   /* ---------------------------------------------------------------------- */
//   /*                                ERROR                                   */
//   /* ---------------------------------------------------------------------- */

//   if (error || !order) {
//     return (
//       <main className="min-h-screen bg-[#f7f9f8] px-4 py-5 md:px-6 md:py-8">
//         <div className="mx-auto w-full max-w-3xl">
//           <TagHeader title="Transaction Details" />

//           <div className="mt-5 rounded-3xl border border-gray-200 bg-white px-6 py-20 text-center">
//             <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-red-50 text-red-500">
//               <ReceiptLongRoundedIcon sx={{ fontSize: 30 }} />
//             </div>

//             <h1 className="mt-5 text-xl font-black text-gray-900">
//               Transaction unavailable
//             </h1>

//             <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-gray-500">
//               {error ||
//                 "We couldn't find this transaction."}
//             </p>

//             <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
//               <button
//                 type="button"
//                 onClick={() =>
//                   fetchOrderDetails(true)
//                 }
//                 className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#006838] px-5 py-3 text-sm font-semibold text-white"
//               >
//                 <RefreshRoundedIcon
//                   sx={{ fontSize: 18 }}
//                 />
//                 Try again
//               </button>

//               <button
//                 type="button"
//                 onClick={() => router.back()}
//                 className="rounded-xl border border-gray-200 bg-white px-5 py-3 text-sm font-semibold text-gray-600"
//               >
//                 Go back
//               </button>
//             </div>
//           </div>
//         </div>
//       </main>
//     );
//   }

//   /* ---------------------------------------------------------------------- */
//   /*                                UI                                      */
//   /* ---------------------------------------------------------------------- */

//   return (
//     <main className="min-h-screen bg-[#f7f9f8] px-4 py-5 md:px-6 md:py-8">
//       <div className="mx-auto w-full max-w-3xl">
//         <TagHeader title="Transaction Details" />

//         {/* Top bar */}

//         <div className="mt-5 flex items-center justify-between gap-4">
//           <button
//             type="button"
//             onClick={() => router.back()}
//             className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-semibold text-gray-600 transition hover:bg-gray-50"
//           >
//             <ArrowBackRoundedIcon
//               sx={{ fontSize: 18 }}
//             />
//             Back
//           </button>

//           <button
//             type="button"
//             onClick={() =>
//               fetchOrderDetails(true)
//             }
//             disabled={refreshing}
//             aria-label="Refresh transaction"
//             className="flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-500 transition hover:text-[#006838] disabled:opacity-50"
//           >
//             <RefreshRoundedIcon
//               className={
//                 refreshing
//                   ? "animate-spin"
//                   : ""
//               }
//             />
//           </button>
//         </div>

//         {/* ---------------------------------------------------------------- */}
//         {/* HERO                                                             */}
//         {/* ---------------------------------------------------------------- */}

//         <section className="mt-4 overflow-hidden rounded-3xl bg-gradient-to-br from-[#063c25] via-[#006838] to-[#074c2d] p-5 shadow-[0_15px_50px_rgba(0,104,56,0.12)] sm:p-6">
//           <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
//             <div>
//               <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-white/50">
//                 Transaction
//               </p>

//               <h1 className="mt-2 break-all text-xl font-black text-white sm:text-2xl">
//                 #
//                 {order.orderReference ||
//                   order._id.slice(-10)}
//               </h1>

//               <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-white/60">
//                 <span>
//                   {formatDate(
//                     order.createdAt
//                   )}
//                 </span>

//                 <span className="h-1 w-1 rounded-full bg-white/25" />

//                 <span>
//                   {formatTime(
//                     order.createdAt
//                   )}
//                 </span>
//               </div>
//             </div>

//             <span
//               className={`inline-flex w-fit items-center gap-1.5 rounded-full px-3 py-2 text-xs font-bold uppercase tracking-wide ring-1 ${statusConfig.container}`}
//             >
//               {statusConfig.icon}
//               {statusConfig.label}
//             </span>
//           </div>
//         </section>

//         {/* ---------------------------------------------------------------- */}
//         {/* ITEMS                                                            */}
//         {/* ---------------------------------------------------------------- */}

//         <section className="mt-4 rounded-3xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
//           <div className="mb-5 flex items-center justify-between">
//             <div>
//               <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#006838]">
//                 Order items
//               </p>

//               <h2 className="mt-1 text-lg font-black text-gray-900">
//                 {order.items?.length || 0}{" "}
//                 {order.items?.length === 1
//                   ? "item"
//                   : "items"}
//               </h2>
//             </div>
//           </div>

//           <div className="space-y-3">
//             {order.items?.length ? (
//               order.items.map(
//                 (item, index) => {
//                   const unitPrice = Number(
//                     item.priceAtOrder ??
//                       item.productId?.price ??
//                       0
//                   );

//                   const quantity = Number(
//                     item.quantity ?? 0
//                   );

//                   const lineTotal =
//                     unitPrice * quantity;

//                   const productName =
//                     item.productId?.name ||
//                     item.name ||
//                     "Product Item";

//                   return (
//                     <div
//                       key={
//                         item._id ||
//                         `${productName}-${index}`
//                       }
//                       className="flex items-center gap-3 rounded-2xl bg-gray-50 p-3"
//                     >
//                       <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-white">
//                         <Image
//                           src={getProductImage(item)}
//                           alt={productName}
//                           fill
//                           sizes="64px"
//                           className="object-cover"
//                         />
//                       </div>

//                       <div className="min-w-0 flex-1">
//                         <p className="line-clamp-2 text-sm font-bold text-gray-900">
//                           {productName}
//                         </p>

//                         <p className="mt-1 text-xs text-gray-500">
//                           Qty: {quantity}
//                         </p>
//                       </div>

//                       <div className="shrink-0 text-right">
//                         <p className="text-sm font-black text-gray-900">
//                           {formatCurrency(
//                             lineTotal
//                           )}
//                         </p>

//                         <p className="mt-1 text-[10px] text-gray-400">
//                           {formatCurrency(
//                             unitPrice
//                           )}{" "}
//                           each
//                         </p>
//                       </div>
//                     </div>
//                   );
//                 }
//               )
//             ) : (
//               <p className="rounded-2xl bg-gray-50 px-4 py-8 text-center text-sm text-gray-500">
//                 No order items were returned.
//               </p>
//             )}
//           </div>

//           {/* Totals */}

//           <div className="mt-6 border-t border-gray-100 pt-5">
//             <div className="space-y-3">
//               <div className="flex justify-between gap-4 text-sm text-gray-500">
//                 <span>Subtotal</span>
//                 <span className="font-semibold text-gray-700">
//                   {formatCurrency(
//                     subtotal
//                   )}
//                 </span>
//               </div>

//               <div className="flex justify-between gap-4 text-sm text-gray-500">
//                 <span>Shipping fee</span>
//                 <span className="font-semibold text-gray-700">
//                   {formatCurrency(
//                     shippingFee
//                   )}
//                 </span>
//               </div>

//               <div className="flex justify-between gap-4 border-t border-gray-100 pt-3">
//                 <span className="text-base font-black text-gray-900">
//                   Total
//                 </span>

//                 <span className="text-xl font-black text-[#006838]">
//                   {formatCurrency(total)}
//                 </span>
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* ---------------------------------------------------------------- */}
//         {/* DELIVERY + ADDRESS                                              */}
//         {/* ---------------------------------------------------------------- */}

//         <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
//           <section className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm">
//             <div className="flex items-center gap-3">
//               <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#006838]/10 text-[#006838]">
//                 <LocalShippingRoundedIcon
//                   sx={{ fontSize: 20 }}
//                 />
//               </div>

//               <div>
//                 <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
//                   Logistics
//                 </p>

//                 <h2 className="text-sm font-bold text-gray-900">
//                   Delivery
//                 </h2>
//               </div>
//             </div>

//             <div className="mt-5 space-y-4">
//               <div>
//                 <p className="text-[11px] font-medium text-gray-400">
//                   Waybill Number
//                 </p>

//                 <p className="mt-1 break-all text-sm font-bold text-gray-800">
//                   {order.logistics
//                     ?.waybillNumber ||
//                     "Not assigned"}
//                 </p>
//               </div>

//               <div>
//                 <p className="text-[11px] font-medium text-gray-400">
//                   Delivery Status
//                 </p>

//                 <p className="mt-1 text-sm font-bold capitalize text-gray-800">
//                   {order.deliveryStatus ||
//                     "Pending"}
//                 </p>
//               </div>
//             </div>
//           </section>

//           <section className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm">
//             <div className="flex items-center gap-3">
//               <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#006838]/10 text-[#006838]">
//                 <LocationOnRoundedIcon
//                   sx={{ fontSize: 20 }}
//                 />
//               </div>

//               <div>
//                 <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
//                   Destination
//                 </p>

//                 <h2 className="text-sm font-bold text-gray-900">
//                   Shipping Address
//                 </h2>
//               </div>
//             </div>

//             <p className="mt-5 text-sm leading-6 text-gray-600">
//               {getShippingAddress(
//                 order.shippingAddress
//               )}
//             </p>
//           </section>
//         </div>

//         {/* ---------------------------------------------------------------- */}
//         {/* PERSON                                                           */}
//         {/* ---------------------------------------------------------------- */}

//         <section className="mt-4 mb-10 rounded-3xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
//           <div className="flex items-center gap-3">
//             <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#006838]/10 text-[#006838]">
//               <PersonRoundedIcon />
//             </div>

//             <div>
//               <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
//                 {role === "seller"
//                   ? "Customer"
//                   : "Merchant"}
//               </p>

//               <h2 className="text-base font-black text-gray-900">
//                 {personLabel}
//               </h2>
//             </div>
//           </div>

//           <div className="mt-5 rounded-2xl bg-gray-50 p-4">
//             <p className="text-sm font-bold text-gray-900">
//               {personName}
//             </p>

//             {personPhone && (
//               <p className="mt-1 text-sm text-gray-500">
//                 {personPhone}
//               </p>
//             )}
//           </div>

//           {/* Preserve role-specific behavior */}

//           {role === "seller" ? (
//             <button
//               type="button"
//               disabled={
//                 statusConfig.label ===
//                 "Completed"
//               }
//               className="mt-5 flex w-full items-center justify-center gap-2 rounded-2xl bg-[#006838] py-4 text-sm font-bold text-white shadow-lg shadow-green-100 transition hover:bg-[#00542d] disabled:cursor-not-allowed disabled:bg-gray-300 disabled:shadow-none"
//             >
//               <CheckCircleRoundedIcon
//                 sx={{ fontSize: 19 }}
//               />

//               {statusConfig.label ===
//               "Completed"
//                 ? "Fulfillment Confirmed"
//                 : "Confirm Fulfillment"}
//             </button>
//           ) : (
//             <button
//               type="button"
//               className="mt-5 flex w-full items-center justify-center gap-2 rounded-2xl border-2 border-[#006838] py-4 text-sm font-bold text-[#006838] transition hover:bg-[#006838]/5"
//             >
//               <Icon
//                 icon="solar:chat-round-dots-bold"
//                 className="text-xl"
//               />

//               Contact Seller
//             </button>
//           )}
//         </section>
//       </div>
//     </main>
//   );
// };

// export default TransactionDetails;
// "use client";

// import React, {
//   useCallback,
//   useEffect,
//   useMemo,
//   useState,
// } from "react";

// import Image from "next/image";
// import { useParams, useRouter, useSearchParams } from "next/navigation";

// import { Icon } from "@iconify/react";

// import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
// import RefreshRoundedIcon from "@mui/icons-material/RefreshRounded";
// import ReceiptLongRoundedIcon from "@mui/icons-material/ReceiptLongRounded";
// import LocalShippingRoundedIcon from "@mui/icons-material/LocalShippingRounded";
// import LocationOnRoundedIcon from "@mui/icons-material/LocationOnRounded";
// import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
// import BusinessRoundedIcon from "@mui/icons-material/BusinessRounded";
// import AccountBalanceRoundedIcon from "@mui/icons-material/AccountBalanceRounded";
// import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
// import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded";
// import ContentCopyRoundedIcon from "@mui/icons-material/ContentCopyRounded";
// import PhoneRoundedIcon from "@mui/icons-material/PhoneRounded";
// import MailOutlineRoundedIcon from "@mui/icons-material/MailOutlineRounded";
// import PaymentsRoundedIcon from "@mui/icons-material/PaymentsRounded";
// import Inventory2RoundedIcon from "@mui/icons-material/Inventory2Rounded";

// import TagHeader from "@/components/header/TagHeader";
// import axios from "@/utils/axios";

// import placeholder from "@/assets/images/productMockup.png";

// /* -------------------------------------------------------------------------- */
// /*                                    TYPES                                   */
// /* -------------------------------------------------------------------------- */

// export type TransactionRole = "buyer" | "seller";

// interface ShippingAddress {
//   recipientName?: string;
//   recipientPhone?: string;
//   recipientEmail?: string;
//   address?: string;
//   city?: string;
//   state?: string;
//   townID?: number;
// }

// interface Logistics {
//   waybillNumber?: string;
//   status?: string;
//   deliveryFee?: number;
//   vatAmount?: number;
//   isPickup?: boolean;
// }

// interface UserAddress {
//   street?: string;
//   city?: string;
//   state?: string;
//   zip?: string;
//   town?: string;
//   townId?: string | number;
//   cityName?: string;
// }

// interface OrderUser {
//   _id?: string;
//   firstname?: string;
//   lastname?: string;
//   email?: string;
//   phone?: string;
//   addresses?: UserAddress;
// }

// interface Business {
//   _id?: string;
//   businessName?: string;

//   addresses?: {
//     street?: string;
//     city?: string;
//     state?: string;
//     zip?: string;
//     town?: string;
//     country?: string;
//   };

//   paymentInfo?: {
//     accountName?: string;
//     accountNumber?: string;
//     accountType?: string;
//     bankName?: string;
//   };
// }

// interface Vendor {
//   _id?: string;
//   firstname?: string;
//   lastname?: string;
//   email?: string;
//   phone?: string;
// }

// interface Product {
//   _id?: string;
//   name?: string;
//   price?: number;
//   images?: string[];
// }

// interface OrderItem {
//   _id?: string;
//   productId?: Product;
//   quantity?: number;
//   price?: number;
//   weight?: number;
// }

// interface Order {
//   _id: string;

//   shippingAddress?: ShippingAddress;

//   logistics?: Logistics;

//   userId?: OrderUser;

//   businessId?: Business;

//   vendorId?: Vendor;

//   orderReference?: string;
//   items?: OrderItem[];

//   subTotal?: number;
//   shippingTotal?: number;
//   grandTotal?: number;

//   status?: string;
//   paymentReference?: string;
//   paymentStatus?: string;
//   vendorSettlementStatus?: string;

//   createdAt?: string;
//   updatedAt?: string;
// }

// /* -------------------------------------------------------------------------- */
// /*                              HELPER FUNCTIONS                              */
// /* -------------------------------------------------------------------------- */

// const formatCurrency = (value: unknown) => {
//   const amount = Number(value);

//   if (!Number.isFinite(amount)) {
//     return "₦0.00";
//   }

//   return new Intl.NumberFormat("en-NG", {
//     style: "currency",
//     currency: "NGN",
//     maximumFractionDigits: 2,
//   }).format(amount);
// };

// const formatDate = (date?: string) => {
//   if (!date) return "Date unavailable";

//   const value = new Date(date);

//   if (Number.isNaN(value.getTime())) {
//     return "Date unavailable";
//   }

//   return new Intl.DateTimeFormat("en-NG", {
//     day: "numeric",
//     month: "long",
//     year: "numeric",
//   }).format(value);
// };

// const formatTime = (date?: string) => {
//   if (!date) return "--:--";

//   const value = new Date(date);

//   if (Number.isNaN(value.getTime())) {
//     return "--:--";
//   }

//   return new Intl.DateTimeFormat("en-NG", {
//     hour: "numeric",
//     minute: "2-digit",
//   }).format(value);
// };

// const normalizeStatus = (value?: string) =>
//   String(value || "")
//     .toLowerCase()
//     .trim()
//     .replace(/[\s-]+/g, "_");

// const getStatusConfig = (status?: string) => {
//   const normalized = normalizeStatus(status);

//   if (
//     ["completed", "successful", "success", "succeeded"].includes(
//       normalized
//     )
//   ) {
//     return {
//       label: "Completed",
//       className:
//         "bg-emerald-50 text-emerald-700 ring-emerald-100",
//       icon: (
//         <CheckCircleRoundedIcon sx={{ fontSize: 15 }} />
//       ),
//     };
//   }

//   if (
//     ["pending", "processing", "in_progress"].includes(
//       normalized
//     )
//   ) {
//     return {
//       label: "Pending",
//       className:
//         "bg-amber-50 text-amber-700 ring-amber-100",
//       icon: (
//         <AccessTimeRoundedIcon sx={{ fontSize: 15 }} />
//       ),
//     };
//   }

//   if (
//     ["failed", "cancelled", "canceled", "rejected"].includes(
//       normalized
//     )
//   ) {
//     return {
//       label: "Failed",
//       className: "bg-red-50 text-red-700 ring-red-100",
//       icon: (
//         <Icon
//           icon="mdi:close-circle-outline"
//           className="text-[15px]"
//         />
//       ),
//     };
//   }

//   return {
//     label: status || "Unknown",
//     className:
//       "bg-gray-100 text-gray-700 ring-gray-200",
//     icon: (
//       <Icon
//         icon="mdi:information-outline"
//         className="text-[15px]"
//       />
//     ),
//   };
// };

// const getProductImage = (
//   item: OrderItem
// ) => {
//   const image = item.productId?.images?.[0];

//   return image || placeholder;
// };

// const getPersonName = (
//   person?: OrderUser | Vendor
// ) => {
//   if (!person) {
//     return "Not available";
//   }

//   const first =
//     "firstname" in person
//       ? person.firstname || ""
//       : "";

//   const last =
//     "lastname" in person
//       ? person.lastname || ""
//       : "";

//   const fullName = `${first} ${last}`.trim();

//   return fullName || "Not available";
// };

// const isValidAddressValue = (
//   value?: string
// ) => {
//   if (!value) return false;

//   return (
//     value.trim() !== "" &&
//     value.trim().toLowerCase() !== "n/a"
//   );
// };

// const buildShippingAddress = (
//   address?: ShippingAddress
// ) => {
//   if (!address) {
//     return [];
//   }

//   return [
//     address.address,
//     address.city,
//     address.state,
//   ].filter(isValidAddressValue) as string[];
// };

// const buildCustomerAddress = (
//   address?: UserAddress
// ) => {
//   if (!address) {
//     return [];
//   }

//   return [
//     address.street,
//     address.town,
//     address.cityName || address.city,
//     address.state,
//     address.zip,
//   ].filter(isValidAddressValue) as string[];
// };

// const maskAccountNumber = (
//   accountNumber?: string
// ) => {
//   if (!accountNumber) {
//     return "Not available";
//   }

//   if (accountNumber.length <= 4) {
//     return accountNumber;
//   }

//   return `•••• ${accountNumber.slice(-4)}`;
// };

// /* -------------------------------------------------------------------------- */
// /*                              STATUS TIMELINE                               */
// /* -------------------------------------------------------------------------- */

// const StatusTimeline = ({
//   order,
// }: {
//   order: Order;
// }) => {
//   const orderStatus = normalizeStatus(
//     order.status
//   );

//   const paymentStatus = normalizeStatus(
//     order.paymentStatus
//   );

//   const logisticsStatus = normalizeStatus(
//     order.logistics?.status
//   );

//   const orderPlaced = Boolean(
//     order.createdAt
//   );

//   const paymentComplete = [
//     "paid",
//     "completed",
//     "successful",
//     "success",
//   ].includes(paymentStatus);

//   const processingComplete =
//     ["completed", "successful", "success"].includes(
//       orderStatus
//     ) ||
//     logisticsStatus.includes("processing") ||
//     logisticsStatus.includes("completed");

//   const orderComplete = [
//     "completed",
//     "successful",
//     "success",
//   ].includes(orderStatus);

//   const steps = [
//     {
//       title: "Order placed",
//       description: order.createdAt
//         ? formatDate(order.createdAt)
//         : "Order received",
//       completed: orderPlaced,
//     },
//     {
//       title: "Payment",
//       description:
//         order.paymentStatus || "Payment pending",
//       completed: paymentComplete,
//     },
//     {
//       title: "Processing",
//       description:
//         order.logistics?.status ||
//         "Awaiting processing",
//       completed: processingComplete,
//     },
//     {
//       title: "Completed",
//       description: orderComplete
//         ? "Order completed"
//         : "Awaiting completion",
//       completed: orderComplete,
//     },
//   ];

//   return (
//     <div className="space-y-0">
//       {steps.map((step, index) => {
//         const last =
//           index === steps.length - 1;

//         return (
//           <div
//             key={step.title}
//             className="relative flex gap-4"
//           >
//             {/* Line */}
//             {!last && (
//               <span
//                 className={`absolute left-[15px] top-9 h-[calc(100%-18px)] w-px ${
//                   step.completed
//                     ? "bg-[#006838]"
//                     : "bg-gray-200"
//                 }`}
//               />
//             )}

//             {/* Icon */}
//             <div
//               className={`relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${
//                 step.completed
//                   ? "bg-[#006838] text-white"
//                   : "bg-gray-100 text-gray-400"
//               }`}
//             >
//               {step.completed ? (
//                 <CheckCircleRoundedIcon
//                   sx={{ fontSize: 17 }}
//                 />
//               ) : (
//                 <span className="h-2.5 w-2.5 rounded-full bg-current" />
//               )}
//             </div>

//             {/* Content */}
//             <div className="pb-6">
//               <p
//                 className={`text-sm font-bold ${
//                   step.completed
//                     ? "text-gray-900"
//                     : "text-gray-500"
//                 }`}
//               >
//                 {step.title}
//               </p>

//               <p className="mt-1 text-xs leading-5 text-gray-400">
//                 {step.description}
//               </p>
//             </div>
//           </div>
//         );
//       })}
//     </div>
//   );
// };

// /* -------------------------------------------------------------------------- */
// /*                               SKELETON                                     */
// /* -------------------------------------------------------------------------- */

// const TransactionDetailsSkeleton = () => {
//   return (
//     <div className="space-y-4">
//       <div className="h-48 animate-pulse rounded-3xl bg-gray-100" />

//       <div className="rounded-3xl bg-white p-6">
//         <div className="h-5 w-40 animate-pulse rounded bg-gray-100" />

//         <div className="mt-6 space-y-3">
//           {[1, 2, 3].map((item) => (
//             <div
//               key={item}
//               className="h-20 animate-pulse rounded-2xl bg-gray-100"
//             />
//           ))}
//         </div>
//       </div>

//       <div className="h-48 animate-pulse rounded-3xl bg-gray-100" />
//     </div>
//   );
// };

// /* -------------------------------------------------------------------------- */
// /*                         INFORMATION CARD                                   */
// /* -------------------------------------------------------------------------- */

// const InfoCard = ({
//   icon,
//   title,
//   children,
// }: {
//   icon: React.ReactNode;
//   title: string;
//   children: React.ReactNode;
// }) => {
//   return (
//     <section className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
//       <div className="flex items-center gap-3">
//         <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#006838]/10 text-[#006838]">
//           {icon}
//         </div>

//         <div>
//           <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-gray-400">
//             Transaction
//           </p>

//           <h2 className="text-sm font-black text-gray-900">
//             {title}
//           </h2>
//         </div>
//       </div>

//       <div className="mt-5">
//         {children}
//       </div>
//     </section>
//   );
// };

// /* -------------------------------------------------------------------------- */
// /*                          TRANSACTION DETAILS                               */
// /* -------------------------------------------------------------------------- */

// const TransactionDetails = ({
//   role,
// }: {
//   role: TransactionRole;
// }) => {
//   const router = useRouter();
//   const params = useParams();
//   const searchParams = useSearchParams();

//   /*
//    * Supports both:
//    *
//    * /transaction/details?id=ABC
//    *
//    * and:
//    *
//    * /transaction/details/ABC
//    */
//   const orderId = useMemo(() => {
//     const queryId =
//       searchParams.get("id");

//     const routeId = Array.isArray(
//       params?.orderId
//     )
//       ? params.orderId[0]
//       : params?.orderId;

//     return queryId || routeId || null;
//   }, [params, searchParams]);

//   const [order, setOrder] =
//     useState<Order | null>(null);

//   const [loading, setLoading] =
//     useState(true);

//   const [refreshing, setRefreshing] =
//     useState(false);

//   const [error, setError] =
//     useState("");

//   const [copied, setCopied] =
//     useState("");

//   /* ---------------------------------------------------------------------- */
//   /*                           FETCH ORDER                                  */
//   /* ---------------------------------------------------------------------- */

//   const fetchOrder = useCallback(
//     async (refresh = false) => {
//       if (!orderId) {
//         setLoading(false);
//         setError(
//           "This transaction could not be identified."
//         );
//         return;
//       }

//       const token =
//         localStorage.getItem("userToken");

//       if (!token) {
//         router.replace("/auth/login");
//         return;
//       }

//       try {
//         if (refresh) {
//           setRefreshing(true);
//         } else {
//           setLoading(true);
//         }

//         setError("");

//         const response = await axios.get(
//           `/orders/${encodeURIComponent(
//             String(orderId)
//           )}`,
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );

//         const fetchedOrder =
//           response?.data?.order;
//           console.log("Fetched order:", fetchedOrder);

//         if (!fetchedOrder) {
//           throw new Error(
//             "Order was not returned by the API."
//           );
//         }

//         setOrder(fetchedOrder);
//       } catch (error: any) {
//         console.error(
//           "Failed to fetch order details:",
//           error
//         );

//         const status =
//           error?.response?.status;

//         if (status === 401) {
//           localStorage.removeItem(
//             "userToken"
//           );

//           router.replace("/auth/login");
//           return;
//         }

//         setError(
//           error?.response?.data?.message ||
//             error?.message ||
//             "Failed to load transaction details."
//         );
//       } finally {
//         setLoading(false);
//         setRefreshing(false);
//       }
//     },
//     [orderId, router]
//   );

//   useEffect(() => {
//     fetchOrder();
//   }, [fetchOrder]);

//   /* ---------------------------------------------------------------------- */
//   /*                            COPY                                         */
//   /* ---------------------------------------------------------------------- */

//   const copyValue = async (
//     value: string,
//     key: string
//   ) => {
//     try {
//       await navigator.clipboard.writeText(
//         value
//       );

//       setCopied(key);

//       window.setTimeout(() => {
//         setCopied("");
//       }, 1500);
//     } catch (error) {
//       console.error(
//         "Failed to copy:",
//         error
//       );
//     }
//   };

//   /* ---------------------------------------------------------------------- */
//   /*                              DERIVED                                    */
//   /* ---------------------------------------------------------------------- */

//   const status = useMemo(
//     () =>
//       getStatusConfig(order?.status),
//     [order?.status]
//   );

//   const paymentStatus = useMemo(
//     () =>
//       getStatusConfig(
//         order?.paymentStatus
//       ),
//     [order?.paymentStatus]
//   );

//   const subtotal = Number(
//     order?.subTotal || 0
//   );

//   const shippingTotal = Number(
//     order?.shippingTotal || 0
//   );

//   const logisticsDeliveryFee = Number(
//     order?.logistics?.deliveryFee || 0
//   );

//   const vatAmount = Number(
//     order?.logistics?.vatAmount || 0
//   );

//   const grandTotal = Number(
//     order?.grandTotal || 0
//   );

//   const businessAddress =
//     order?.businessId?.addresses;

//   const businessAddressText = [
//     businessAddress?.street,
//     businessAddress?.town,
//     businessAddress?.city,
//     businessAddress?.state,
//     businessAddress?.country,
//   ]
//     .filter(isValidAddressValue)
//     .join(", ");

//   const shippingAddressParts =
//     buildShippingAddress(
//       order?.shippingAddress
//     );

//   const customerFallbackAddress =
//     buildCustomerAddress(
//       order?.userId?.addresses
//     );

//   const shippingIsUnavailable =
//     shippingAddressParts.length === 0;

//   const vendorName =
//     getPersonName(order?.vendorId);

//   const customerName =
//     getPersonName(order?.userId);

//   /* ---------------------------------------------------------------------- */
//   /*                              LOADING                                   */
//   /* ---------------------------------------------------------------------- */

//   if (loading) {
//     return (
//       <main className="min-h-screen bg-[#f7f9f8] px-4 py-5 md:px-6 md:py-8">
//         <div className="mx-auto w-full max-w-4xl">
//           <TagHeader title="Transaction Details" />

//           <div className="mt-5">
//             <TransactionDetailsSkeleton />
//           </div>
//         </div>
//       </main>
//     );
//   }

//   /* ---------------------------------------------------------------------- */
//   /*                               ERROR                                    */
//   /* ---------------------------------------------------------------------- */

//   if (error || !order) {
//     return (
//       <main className="min-h-screen bg-[#f7f9f8] px-4 py-5 md:px-6 md:py-8">
//         <div className="mx-auto w-full max-w-4xl">
//           <TagHeader title="Transaction Details" />

//           <div className="mt-5 rounded-3xl border border-gray-200 bg-white px-6 py-20 text-center shadow-sm">
//             <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-red-50 text-red-500">
//               <ReceiptLongRoundedIcon
//                 sx={{ fontSize: 30 }}
//               />
//             </div>

//             <h1 className="mt-5 text-xl font-black text-gray-900">
//               Transaction unavailable
//             </h1>

//             <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-gray-500">
//               {error ||
//                 "We couldn't find this transaction."}
//             </p>

//             <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
//               <button
//                 type="button"
//                 onClick={() =>
//                   fetchOrder(true)
//                 }
//                 className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#006838] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#00542d]"
//               >
//                 <RefreshRoundedIcon
//                   sx={{ fontSize: 18 }}
//                 />
//                 Try again
//               </button>

//               <button
//                 type="button"
//                 onClick={() =>
//                   router.back()
//                 }
//                 className="rounded-xl border border-gray-200 bg-white px-5 py-3 text-sm font-semibold text-gray-600 transition hover:bg-gray-50"
//               >
//                 Go back
//               </button>
//             </div>
//           </div>
//         </div>
//       </main>
//     );
//   }

//   /* ---------------------------------------------------------------------- */
//   /*                                UI                                      */
//   /* ---------------------------------------------------------------------- */

//   return (
//     <main className="min-h-screen bg-[#f7f9f8] px-4 py-5 md:px-6 md:py-8">
//       <div className="mx-auto w-full max-w-4xl">
//         <TagHeader title="Transaction Details" />

//         {/* ---------------------------------------------------------------- */}
//         {/* TOP ACTIONS                                                      */}
//         {/* ---------------------------------------------------------------- */}

//         <div className="mt-5 flex items-center justify-between gap-3">
//           <button
//             type="button"
//             onClick={() => router.back()}
//             className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-semibold text-gray-600 transition hover:bg-gray-50"
//           >
//             <ArrowBackRoundedIcon
//               sx={{ fontSize: 18 }}
//             />
//             Back
//           </button>

//           <button
//             type="button"
//             onClick={() => fetchOrder(true)}
//             disabled={refreshing}
//             className="flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-500 transition hover:text-[#006838] disabled:opacity-50"
//             aria-label="Refresh transaction"
//           >
//             <RefreshRoundedIcon
//               className={
//                 refreshing
//                   ? "animate-spin"
//                   : ""
//               }
//             />
//           </button>
//         </div>

//         {/* ---------------------------------------------------------------- */}
//         {/* ORDER HERO                                                       */}
//         {/* ---------------------------------------------------------------- */}

//         <section className="relative mt-4 overflow-hidden rounded-[30px] bg-gradient-to-br from-[#063c25] via-[#006838] to-[#074c2d] p-5 shadow-[0_20px_60px_rgba(0,104,56,0.14)] sm:p-7">
//           <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/10 blur-3xl" />

//           <div className="pointer-events-none absolute -bottom-20 left-1/3 h-64 w-64 rounded-full bg-[#74f5aa]/10 blur-3xl" />

//           <div className="relative">
//             <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
//               <div>
//                 <div className="flex items-center gap-2 text-white/55">
//                   <ReceiptLongRoundedIcon
//                     sx={{ fontSize: 17 }}
//                   />

//                   <span className="text-[10px] font-bold uppercase tracking-[0.18em]">
//                     Order
//                   </span>
//                 </div>

//                 <h1 className="mt-2 break-all text-xl font-black text-white sm:text-3xl">
//                   #
//                   {order.orderReference ||
//                     order._id.slice(-10)}
//                 </h1>

//                 <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-white/55">
//                   <span>
//                     {formatDate(
//                       order.createdAt
//                     )}
//                   </span>

//                   <span className="h-1 w-1 rounded-full bg-white/25" />

//                   <span>
//                     {formatTime(
//                       order.createdAt
//                     )}
//                   </span>
//                 </div>
//               </div>

//               <div className="flex flex-wrap items-center gap-2">
//                 <span
//                   className={`inline-flex items-center gap-1.5 rounded-full px-3 py-2 text-xs font-bold uppercase tracking-wide ring-1 ${status.className}`}
//                 >
//                   {status.icon}
//                   {status.label}
//                 </span>

//                 <span
//                   className={`inline-flex items-center gap-1.5 rounded-full px-3 py-2 text-xs font-bold capitalize ring-1 ${paymentStatus.className}`}
//                 >
//                   <PaymentsRoundedIcon
//                     sx={{ fontSize: 14 }}
//                   />
//                   Payment:{" "}
//                   {order.paymentStatus ||
//                     "pending"}
//                 </span>
//               </div>
//             </div>

//             {/* Key summary */}

//             <div className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-4">
//               <div className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur">
//                 <p className="text-[10px] uppercase tracking-wider text-white/45">
//                   Total
//                 </p>

//                 <p className="mt-1 text-lg font-black text-white sm:text-xl">
//                   {formatCurrency(
//                     grandTotal
//                   )}
//                 </p>
//               </div>

//               <div className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur">
//                 <p className="text-[10px] uppercase tracking-wider text-white/45">
//                   Items
//                 </p>

//                 <p className="mt-1 text-lg font-black text-white sm:text-xl">
//                   {order.items?.length || 0}
//                 </p>
//               </div>

//               <div className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur">
//                 <p className="text-[10px] uppercase tracking-wider text-white/45">
//                   Shipping
//                 </p>

//                 <p className="mt-1 text-lg font-black text-white sm:text-xl">
//                   {formatCurrency(
//                     shippingTotal
//                   )}
//                 </p>
//               </div>

//               <div className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur">
//                 <p className="text-[10px] uppercase tracking-wider text-white/45">
//                   Payment
//                 </p>

//                 <p className="mt-1 truncate text-sm font-bold capitalize text-white sm:text-base">
//                   {order.paymentStatus ||
//                     "Pending"}
//                 </p>
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* ---------------------------------------------------------------- */}
//         {/* MAIN GRID                                                        */}
//         {/* ---------------------------------------------------------------- */}

//         <div className="mt-4 grid grid-cols-1 gap-4 xl:grid-cols-[1fr_320px]">
//           <div className="min-w-0 space-y-4">
//             {/* ------------------------------------------------------------ */}
//             {/* ORDER ITEMS                                                   */}
//             {/* ------------------------------------------------------------ */}

//             <section className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
//               <div className="flex items-center justify-between gap-4">
//                 <div>
//                   <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#006838]">
//                     Purchase
//                   </p>

//                   <h2 className="mt-1 text-xl font-black text-gray-900">
//                     Order items
//                   </h2>
//                 </div>

//                 <span className="rounded-full bg-gray-100 px-3 py-1.5 text-xs font-semibold text-gray-500">
//                   {order.items?.length || 0}{" "}
//                   {order.items?.length === 1
//                     ? "item"
//                     : "items"}
//                 </span>
//               </div>

//               <div className="mt-5 space-y-3">
//                 {order.items?.length ? (
//                   order.items.map(
//                     (item, index) => {
//                       const quantity =
//                         Number(
//                           item.quantity || 0
//                         );

//                       const price =
//                         Number(
//                           item.price ??
//                             item.productId
//                               ?.price ??
//                             0
//                         );

//                       const lineTotal =
//                         price * quantity;

//                       const productName =
//                         item.productId?.name ||
//                         "Product item";

//                       return (
//                         <div
//                           key={
//                             item._id ||
//                             `${productName}-${index}`
//                           }
//                           className="flex gap-3 rounded-2xl border border-gray-100 bg-gray-50/80 p-3 sm:gap-4 sm:p-4"
//                         >
//                           <div className="relative h-[76px] w-[76px] shrink-0 overflow-hidden rounded-2xl bg-white">
//                             <Image
//                               src={getProductImage(
//                                 item
//                               )}
//                               alt={
//                                 productName
//                               }
//                               fill
//                               sizes="76px"
//                               className="object-cover"
//                             />
//                           </div>

//                           <div className="min-w-0 flex-1">
//                             <h3 className="line-clamp-2 text-sm font-bold text-gray-900 sm:text-base">
//                               {productName}
//                             </h3>

//                             <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-gray-500">
//                               <span>
//                                 Qty:{" "}
//                                 {quantity}
//                               </span>

//                               <span className="h-1 w-1 rounded-full bg-gray-300" />

//                               <span>
//                                 {formatCurrency(
//                                   price
//                                 )}{" "}
//                                 each
//                               </span>
//                             </div>
//                           </div>

//                           <div className="shrink-0 self-center text-right">
//                             <p className="text-sm font-black text-gray-900 sm:text-base">
//                               {formatCurrency(
//                                 lineTotal
//                               )}
//                             </p>
//                           </div>
//                         </div>
//                       );
//                     }
//                   )
//                 ) : (
//                   <div className="rounded-2xl bg-gray-50 px-4 py-10 text-center">
//                     <Inventory2RoundedIcon
//                       sx={{
//                         fontSize: 30,
//                         color: "#9ca3af",
//                       }}
//                     />

//                     <p className="mt-3 text-sm font-medium text-gray-500">
//                       No order items were returned.
//                     </p>
//                   </div>
//                 )}
//               </div>

//               {/* Pricing */}

//               <div className="mt-6 border-t border-gray-100 pt-5">
//                 <div className="ml-auto max-w-md space-y-3">
//                   <div className="flex justify-between gap-4 text-sm text-gray-500">
//                     <span>Subtotal</span>
//                     <span className="font-semibold text-gray-700">
//                       {formatCurrency(
//                         subtotal
//                       )}
//                     </span>
//                   </div>

//                   <div className="flex justify-between gap-4 text-sm text-gray-500">
//                     <span>Shipping</span>

//                     <span className="font-semibold text-gray-700">
//                       {formatCurrency(
//                         shippingTotal
//                       )}
//                     </span>
//                   </div>

//                   {logisticsDeliveryFee > 0 && (
//                     <div className="flex justify-between gap-4 text-sm text-gray-500">
//                       <span>Delivery fee</span>

//                       <span className="font-semibold text-gray-700">
//                         {formatCurrency(
//                           logisticsDeliveryFee
//                         )}
//                       </span>
//                     </div>
//                   )}

//                   {vatAmount > 0 && (
//                     <div className="flex justify-between gap-4 text-sm text-gray-500">
//                       <span>VAT</span>

//                       <span className="font-semibold text-gray-700">
//                         {formatCurrency(
//                           vatAmount
//                         )}
//                       </span>
//                     </div>
//                   )}

//                   <div className="flex justify-between gap-4 border-t border-gray-100 pt-3">
//                     <span className="font-black text-gray-900">
//                       Grand total
//                     </span>

//                     <span className="text-xl font-black text-[#006838]">
//                       {formatCurrency(
//                         grandTotal
//                       )}
//                     </span>
//                   </div>
//                 </div>
//               </div>
//             </section>

//             {/* ------------------------------------------------------------ */}
//             {/* SHIPPING                                                      */}
//             {/* ------------------------------------------------------------ */}

//             <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
//               <InfoCard
//                 title="Shipping destination"
//                 icon={
//                   <LocationOnRoundedIcon
//                     sx={{ fontSize: 20 }}
//                   />
//                 }
//               >
//                 {shippingIsUnavailable ? (
//                   <div className="rounded-2xl bg-amber-50 p-4">
//                     <p className="text-sm font-bold text-amber-800">
//                       Custom Shipping address unavailable
//                     </p>

//                     <p className="mt-1 text-xs leading-5 text-amber-700">
//                       This order currently contains
//                       N/A shipping information.
//                     </p>

//                     {customerFallbackAddress.length >
//                       0 && (
//                       <div className="mt-4 border-t border-amber-200 pt-4">
//                         <p className="text-[10px] font-bold uppercase tracking-wider text-amber-600">
//                           Customer address 
//                         </p>

//                         <p className="mt-1 text-xs leading-5 text-amber-700">
//                           {customerFallbackAddress.join(
//                             ", "
//                           )}
//                         </p>
//                       </div>
//                     )}
//                   </div>
//                 ) : (
//                   <div>
//                     <p className="text-sm font-bold text-gray-900">
//                       {order.shippingAddress
//                         ?.recipientName !==
//                         "N/A"
//                         ? order.shippingAddress
//                             ?.recipientName
//                         : "Recipient"}
//                     </p>

//                     <p className="mt-3 text-sm leading-6 text-gray-600">
//                       {shippingAddressParts.join(
//                         ", "
//                       )}
//                     </p>

//                     {isValidAddressValue(
//                       order.shippingAddress
//                         ?.recipientPhone
//                     ) && (
//                       <div className="mt-4 flex items-center gap-2 text-xs text-gray-500">
//                         <PhoneRoundedIcon
//                           sx={{ fontSize: 15 }}
//                         />

//                         {
//                           order
//                             .shippingAddress
//                             ?.recipientPhone
//                         }
//                       </div>
//                     )}

//                     {isValidAddressValue(
//                       order.shippingAddress
//                         ?.recipientEmail
//                     ) && (
//                       <div className="mt-2 flex items-center gap-2 text-xs text-gray-500">
//                         <MailOutlineRoundedIcon
//                           sx={{ fontSize: 15 }}
//                         />

//                         {
//                           order
//                             .shippingAddress
//                             ?.recipientEmail
//                         }
//                       </div>
//                     )}
//                   </div>
//                 )}
//               </InfoCard>

//               {/* Logistics */}

//               <InfoCard
//                 title="Delivery & logistics"
//                 icon={
//                   <LocalShippingRoundedIcon
//                     sx={{ fontSize: 20 }}
//                   />
//                 }
//               >
//                 <div className="space-y-4">
//                   <div>
//                     <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
//                       Waybill
//                     </p>

//                     <p className="mt-1 break-all text-sm font-bold text-gray-900">
//                       {order.logistics
//                         ?.waybillNumber ||
//                         "Not assigned"}
//                     </p>
//                   </div>

//                   <div>
//                     <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
//                       Logistics status
//                     </p>

//                     <span className="mt-1 inline-flex rounded-full bg-amber-50 px-2.5 py-1.5 text-xs font-bold text-amber-700">
//                       {order.logistics
//                         ?.status ||
//                         "Pending"}
//                     </span>
//                   </div>

//                   <div className="flex flex-wrap gap-2">
//                     <span className="rounded-full bg-gray-100 px-2.5 py-1.5 text-xs font-semibold text-gray-600">
//                       {order.logistics?.isPickup
//                         ? "Pickup"
//                         : "Delivery"}
//                     </span>

//                     <span className="rounded-full bg-gray-100 px-2.5 py-1.5 text-xs font-semibold text-gray-600">
//                       Delivery:{" "}
//                       {formatCurrency(
//                         logisticsDeliveryFee
//                       )}
//                     </span>
//                   </div>
//                 </div>
//               </InfoCard>
//             </div>

//             {/* ------------------------------------------------------------ */}
//             {/* PAYMENT                                                       */}
//             {/* ------------------------------------------------------------ */}

//             <InfoCard
//               title="Payment information"
//               icon={
//                 <PaymentsRoundedIcon
//                   sx={{ fontSize: 20 }}
//                 />
//               }
//             >
//               <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
//                 <div className="rounded-2xl bg-gray-50 p-4">
//                   <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
//                     Payment reference
//                   </p>

//                   <div className="mt-2 flex items-center gap-2">
//                     <p className="min-w-0 flex-1 break-all text-sm font-bold text-gray-900">
//                       {order.paymentReference ||
//                         "Not available"}
//                     </p>

//                     {order.paymentReference && (
//                       <button
//                         type="button"
//                         onClick={() =>
//                           copyValue(
//                             order.paymentReference!,
//                             "payment"
//                           )
//                         }
//                         className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white text-gray-400 shadow-sm transition hover:text-[#006838]"
//                         aria-label="Copy payment reference"
//                       >
//                         {copied ===
//                         "payment" ? (
//                           <CheckCircleRoundedIcon
//                             sx={{ fontSize: 16 }}
//                           />
//                         ) : (
//                           <ContentCopyRoundedIcon
//                             sx={{ fontSize: 15 }}
//                           />
//                         )}
//                       </button>
//                     )}
//                   </div>
//                 </div>

//                 {/* <div className="rounded-2xl bg-gray-50 p-4">
//                   <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
//                     Payment status
//                   </p>

//                   <span
//                     className={`mt-2 inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold capitalize ring-1 ${paymentStatus.className}`}
//                   >
//                     {paymentStatus.icon}
//                     {order.paymentStatus ||
//                       "Pending"}
//                   </span>
//                 </div> */}
//               </div>
//             </InfoCard>
//           </div>

//           {/* ============================================================ */}
//           {/* RIGHT DETAIL RAIL                                             */}
//           {/* ============================================================ */}

//           <aside className="space-y-4">
//             {/* ---------------------------------------------------------- */}
//             {/* STATUS TIMELINE                                             */}
//             {/* ---------------------------------------------------------- */}

//             <section className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm">
//               <div className="flex items-center gap-3">
//                 <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#006838]/10 text-[#006838]">
//                   <ReceiptLongRoundedIcon
//                     sx={{ fontSize: 19 }}
//                   />
//                 </div>

//                 <div>
//                   <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-gray-400">
//                     Progress
//                   </p>

//                   <h2 className="text-sm font-black text-gray-900">
//                     Order timeline
//                   </h2>
//                 </div>
//               </div>

//               <div className="mt-6">
//                 <StatusTimeline order={order} />
//               </div>
//             </section>

//             {/* ---------------------------------------------------------- */}
//             {/* CUSTOMER / VENDOR                                           */}
//             {/* ---------------------------------------------------------- */}

//             <section className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm">
//               <div className="flex items-center gap-3">
//                 <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#006838]/10 text-[#006838]">
//                   <PersonRoundedIcon
//                     sx={{ fontSize: 19 }}
//                   />
//                 </div>

//                 <div>
//                   <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-gray-400">
//                     {role === "seller"
//                       ? "Customer"
//                       : "Seller"}
//                   </p>

//                   <h2 className="text-sm font-black text-gray-900">
//                     {role === "seller"
//                       ? customerName
//                       : vendorName}
//                   </h2>
//                 </div>
//               </div>

//               <div className="mt-5 rounded-2xl bg-gray-50 p-4">
//                 {role === "seller" ? (
//                   <>
//                     <p className="text-sm font-bold text-gray-900">
//                       {customerName}
//                     </p>

//                     {order.userId?.email && (
//                       <p className="mt-2 flex items-center gap-2 text-xs text-gray-500">
//                         <MailOutlineRoundedIcon
//                           sx={{ fontSize: 14 }}
//                         />

//                         {order.userId.email}
//                       </p>
//                     )}

//                     {order.userId?.phone && (
//                       <p className="mt-2 flex items-center gap-2 text-xs text-gray-500">
//                         <PhoneRoundedIcon
//                           sx={{ fontSize: 14 }}
//                         />

//                         {order.userId.phone}
//                       </p>
//                     )}
//                   </>
//                 ) : (
//                   <>
//                     <p className="text-sm font-bold text-gray-900">
//                       {vendorName}
//                     </p>

//                     {order.vendorId?.email && (
//                       <p className="mt-2 flex items-center gap-2 text-xs text-gray-500">
//                         <MailOutlineRoundedIcon
//                           sx={{ fontSize: 14 }}
//                         />

//                         {order.vendorId.email}
//                       </p>
//                     )}

//                     {order.vendorId?.phone && (
//                       <p className="mt-2 flex items-center gap-2 text-xs text-gray-500">
//                         <PhoneRoundedIcon
//                           sx={{ fontSize: 14 }}
//                         />

//                         {order.vendorId.phone}
//                       </p>
//                     )}
//                   </>
//                 )}
//               </div>
//             </section>

//             {/* ---------------------------------------------------------- */}
//             {/* BUSINESS                                                     */}
//             {/* ---------------------------------------------------------- */}

//             {/* <section className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm">
//               <div className="flex items-center gap-3">
//                 <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#006838]/10 text-[#006838]">
//                   <BusinessRoundedIcon
//                     sx={{ fontSize: 19 }}
//                   />
//                 </div>

//                 <div className="min-w-0">
//                   <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-gray-400">
//                     Merchant
//                   </p>

//                   <h2 className="truncate text-sm font-black text-gray-900">
//                     {order.businessId
//                       ?.businessName ||
//                       "Business"}
//                   </h2>
//                 </div>
//               </div>

//               {businessAddressText && (
//                 <p className="mt-5 text-xs leading-5 text-gray-500">
//                   {businessAddressText}
//                 </p>
//               )}

//               {order.businessId
//                 ?.paymentInfo && (
//                 <div className="mt-4 rounded-2xl bg-gray-50 p-4">
//                   <div className="flex items-center gap-2">
//                     <AccountBalanceRoundedIcon
//                       sx={{
//                         fontSize: 16,
//                         color: "#006838",
//                       }}
//                     />

//                     <p className="text-xs font-bold text-gray-700">
//                       Settlement account
//                     </p>
//                   </div>

//                   <p className="mt-3 text-sm font-semibold text-gray-800">
//                     {
//                       order.businessId
//                         .paymentInfo
//                         .accountName
//                     }
//                   </p>

//                   <p className="mt-1 text-xs text-gray-500">
//                     {
//                       order.businessId
//                         .paymentInfo
//                         .bankName
//                     }{" "}
//                     ·{" "}
//                     {maskAccountNumber(
//                       order.businessId
//                         .paymentInfo
//                         .accountNumber
//                     )}
//                   </p>

//                   <span className="mt-3 inline-flex rounded-full bg-gray-200 px-2.5 py-1 text-[10px] font-bold uppercase text-gray-600">
//                     Settlement:{" "}
//                     {
//                       order.vendorSettlementStatus
//                     }
//                   </span>
//                 </div>
//               )}
//             </section> */}

//             {/* ---------------------------------------------------------- */}
//             {/* SHIPPING/PAYMENT SUMMARY                                    */}
//             {/* ---------------------------------------------------------- */}

//             <section className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm">
//               <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-gray-400">
//                 Reference
//               </p>

//               <div className="mt-3 space-y-3">
//                 <div>
//                   <p className="text-[10px] text-gray-400">
//                     Order ID
//                   </p>

//                   <div className="mt-1 flex items-center gap-2">
//                     <p className="min-w-0 flex-1 break-all text-xs font-semibold text-gray-700">
//                       {order._id}
//                     </p>

//                     <button
//                       type="button"
//                       onClick={() =>
//                         copyValue(
//                           order._id,
//                           "order"
//                         )
//                       }
//                       className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gray-50 text-gray-400 transition hover:text-[#006838]"
//                       aria-label="Copy order ID"
//                     >
//                       {copied === "order" ? (
//                         <CheckCircleRoundedIcon
//                           sx={{ fontSize: 16 }}
//                         />
//                       ) : (
//                         <ContentCopyRoundedIcon
//                           sx={{ fontSize: 15 }}
//                         />
//                       )}
//                     </button>
//                   </div>
//                 </div>

//                 <div className="border-t border-gray-100 pt-3">
//                   <p className="text-[10px] text-gray-400">
//                     Last updated
//                   </p>

//                   <p className="mt-1 text-xs font-semibold text-gray-700">
//                     {formatDate(
//                       order.updatedAt
//                     )}
//                   </p>
//                 </div>
//               </div>
//             </section>
//           </aside>
//         </div>

//         {/* ---------------------------------------------------------------- */}
//         {/* BUYER/SELLER INFORMATION                                         */}
//         {/* ---------------------------------------------------------------- */}

//         <section className="mt-4 mb-10 rounded-3xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
//           <div className="flex items-center gap-3">
//             <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#006838]/10 text-[#006838]">
//               <Icon
//                 icon="mdi:information-outline"
//                 className="text-xl"
//               />
//             </div>

//             <div>
//               <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-gray-400">
//                 Order information
//               </p>

//               <h2 className="text-sm font-black text-gray-900">
//                 Payment & fulfillment notes
//               </h2>
//             </div>
//           </div>

//           <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-3">
//             <div className="rounded-2xl bg-gray-50 p-4">
//               <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
//                 Order status
//               </p>

//               <p className="mt-2 text-sm font-bold capitalize text-gray-800">
//                 {order.status ||
//                   "Pending"}
//               </p>
//             </div>

//             <div className="rounded-2xl bg-gray-50 p-4">
//               <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
//                 Logistics
//               </p>

//               <p className="mt-2 text-sm font-bold text-gray-800">
//                 {order.logistics?.status ||
//                   "Awaiting processing"}
//               </p>
//             </div>

//             <div className="rounded-2xl bg-gray-50 p-4">
//               <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
//                 Settlement
//               </p>

//               <p className="mt-2 text-sm font-bold capitalize text-gray-800">
//                 {order.vendorSettlementStatus ||
//                   "Not available"}
//               </p>
//             </div>
//           </div>

//           {order.logistics?.waybillNumber?.includes(
//             "Pay on Delivery"
//           ) && (
//             <div className="mt-4 rounded-2xl border border-amber-200 bg-amber-50 p-4">
//               <div className="flex items-start gap-3">
//                 <Icon
//                   icon="mdi:cash-clock"
//                   className="mt-0.5 text-xl text-amber-600"
//                 />

//                 <div>
//                   <p className="text-sm font-bold text-amber-900">
//                     Pay on delivery
//                   </p>

//                   <p className="mt-1 text-xs leading-5 text-amber-700">
//                     This order&apos;s logistics record
//                     indicates payment is expected on
//                     delivery.
//                   </p>
//                 </div>
//               </div>
//             </div>
//           )}
//         </section>
//       </div>
//     </main>
//   );
// };

// export default TransactionDetails;
"use client";

import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import Image from "next/image";
import { useParams, useRouter, useSearchParams } from "next/navigation";

import { Icon } from "@iconify/react";

import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import RefreshRoundedIcon from "@mui/icons-material/RefreshRounded";
import ReceiptLongRoundedIcon from "@mui/icons-material/ReceiptLongRounded";
import LocalShippingRoundedIcon from "@mui/icons-material/LocalShippingRounded";
import LocationOnRoundedIcon from "@mui/icons-material/LocationOnRounded";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import BusinessRoundedIcon from "@mui/icons-material/BusinessRounded";
import AccountBalanceRoundedIcon from "@mui/icons-material/AccountBalanceRounded";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded";
import ContentCopyRoundedIcon from "@mui/icons-material/ContentCopyRounded";
import PhoneRoundedIcon from "@mui/icons-material/PhoneRounded";
import MailOutlineRoundedIcon from "@mui/icons-material/MailOutlineRounded";
import PaymentsRoundedIcon from "@mui/icons-material/PaymentsRounded";
import Inventory2RoundedIcon from "@mui/icons-material/Inventory2Rounded";

import TagHeader from "@/components/header/TagHeader";
import axios from "@/utils/axios";

import placeholder from "@/assets/images/productMockup.png";

/* -------------------------------------------------------------------------- */
/*                                    TYPES                                   */
/* -------------------------------------------------------------------------- */

type UserRole = "buyer" | "seller";

interface ShippingAddress {
  recipientName?: string;
  recipientPhone?: string;
  recipientEmail?: string;
  address?: string;
  city?: string;
  state?: string;
  townID?: number;
}

interface Logistics {
  waybillNumber?: string;
  status?: string;
  deliveryFee?: number;
  vatAmount?: number;
  isPickup?: boolean;
}

interface UserAddress {
  street?: string;
  city?: string;
  state?: string;
  zip?: string;
  town?: string;
  townId?: string | number;
  cityName?: string;
}

interface OrderUser {
  _id?: string;
  firstname?: string;
  lastname?: string;
  email?: string;
  phone?: string;
  role?: UserRole;
  addresses?: UserAddress;
  accountType?: "buyer" | "seller";
}

interface Business {
  _id?: string;
  businessName?: string;

  addresses?: {
    street?: string;
    city?: string;
    state?: string;
    zip?: string;
    town?: string;
    country?: string;
  };

  paymentInfo?: {
    accountName?: string;
    accountNumber?: string;
    accountType?: string;
    bankName?: string;
  };
}

interface Vendor {
  _id?: string;
  firstname?: string;
  lastname?: string;
  email?: string;
  phone?: string;
}

interface Product {
  _id?: string;
  name?: string;
  price?: number;
  images?: string[];
}

interface OrderItem {
  _id?: string;
  productId?: Product;
  quantity?: number;
  price?: number;
  weight?: number;
}

interface Order {
  _id: string;

  shippingAddress?: ShippingAddress;
  logistics?: Logistics;

  /*
   * IMPORTANT:
   * The user's role MUST come from this object.
   */
  userId?: OrderUser;

  businessId?: Business;
  vendorId?: Vendor;

  orderReference?: string;

  items?: OrderItem[];

  subTotal?: number;
  shippingTotal?: number;
  grandTotal?: number;

  status?: string;
  paymentReference?: string;
  paymentStatus?: string;
  vendorSettlementStatus?: string;

  createdAt?: string;
  updatedAt?: string;
}

/* -------------------------------------------------------------------------- */
/*                              HELPERS                                       */
/* -------------------------------------------------------------------------- */

const formatCurrency = (value: unknown) => {
  const amount = Number(value);

  if (!Number.isFinite(amount)) {
    return "₦0.00";
  }

  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 2,
  }).format(amount);
};

const formatDate = (date?: string) => {
  if (!date) return "Date unavailable";

  const value = new Date(date);

  if (Number.isNaN(value.getTime())) {
    return "Date unavailable";
  }

  return new Intl.DateTimeFormat("en-NG", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(value);
};

const formatTime = (date?: string) => {
  if (!date) return "--:--";

  const value = new Date(date);

  if (Number.isNaN(value.getTime())) {
    return "--:--";
  }

  return new Intl.DateTimeFormat("en-NG", {
    hour: "numeric",
    minute: "2-digit",
  }).format(value);
};

const normalizeStatus = (value?: string) =>
  String(value || "")
    .toLowerCase()
    .trim()
    .replace(/[\s-]+/g, "_");

const getStatusConfig = (status?: string) => {
  const normalized = normalizeStatus(status);

  if (
    ["completed", "successful", "success", "succeeded"].includes(
      normalized
    )
  ) {
    return {
      label: "Completed",
      className:
        "bg-emerald-50 text-emerald-700 ring-emerald-100",
      icon: (
        <CheckCircleRoundedIcon sx={{ fontSize: 15 }} />
      ),
    };
  }

  if (
    ["pending", "processing", "in_progress"].includes(
      normalized
    )
  ) {
    return {
      label: "Pending",
      className:
        "bg-amber-50 text-amber-700 ring-amber-100",
      icon: (
        <AccessTimeRoundedIcon sx={{ fontSize: 15 }} />
      ),
    };
  }

  if (
    ["failed", "cancelled", "canceled", "rejected"].includes(
      normalized
    )
  ) {
    return {
      label: "Failed",
      className: "bg-red-50 text-red-700 ring-red-100",
      icon: (
        <Icon
          icon="mdi:close-circle-outline"
          className="text-[15px]"
        />
      ),
    };
  }

  return {
    label: status || "Unknown",
    className:
      "bg-gray-100 text-gray-700 ring-gray-200",
    icon: (
      <Icon
        icon="mdi:information-outline"
        className="text-[15px]"
      />
    ),
  };
};

const getPersonName = (
  person?: OrderUser | Vendor
) => {
  if (!person) return "Not available";

  const first =
    "firstname" in person
      ? person.firstname || ""
      : "";

  const last =
    "lastname" in person
      ? person.lastname || ""
      : "";

  const fullName = `${first} ${last}`.trim();

  return fullName || "Not available";
};

const getProductImage = (
  item: OrderItem
) => {
  return item.productId?.images?.[0] || placeholder;
};

const isValidValue = (
  value?: string
) => {
  if (!value) return false;

  return (
    value.trim() !== "" &&
    value.trim().toLowerCase() !== "n/a"
  );
};

const getShippingAddress = (
  address?: ShippingAddress
) => {
  if (!address) return [];

  return [
    address.address,
    address.city,
    address.state,
  ].filter(isValidValue);
};

const getCustomerAddress = (
  address?: UserAddress
) => {
  if (!address) return [];

  return [
    address.street,
    address.town,
    address.cityName || address.city,
    address.state,
    address.zip,
  ].filter(isValidValue);
};

const maskAccountNumber = (
  accountNumber?: string
) => {
  if (!accountNumber) {
    return "Not available";
  }

  if (accountNumber.length <= 4) {
    return accountNumber;
  }

  return `•••• ${accountNumber.slice(-4)}`;
};

/* -------------------------------------------------------------------------- */
/*                             ROLE LOADING                                   */
/* -------------------------------------------------------------------------- */

const RoleLoadingState = () => {
  return (
    <div className="min-h-screen bg-[#f7f9f8] px-4 py-5 md:px-6 md:py-8">
      <div className="mx-auto w-full max-w-4xl">
        <TagHeader title="Transaction Details" />

        <div className="mt-5 overflow-hidden rounded-3xl bg-white shadow-sm">
          <div className="h-48 animate-pulse bg-gray-100" />

          <div className="space-y-5 p-6">
            <div className="h-5 w-40 animate-pulse rounded bg-gray-100" />
            <div className="h-4 w-full animate-pulse rounded bg-gray-100" />
            <div className="h-4 w-2/3 animate-pulse rounded bg-gray-100" />

            <div className="grid grid-cols-2 gap-3">
              <div className="h-20 animate-pulse rounded-2xl bg-gray-100" />
              <div className="h-20 animate-pulse rounded-2xl bg-gray-100" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/*                        ROLE RESOLUTION ERROR                               */
/* -------------------------------------------------------------------------- */

const RoleResolutionError = ({
  onRetry,
}: {
  onRetry: () => void;
}) => {
  return (
    <main className="min-h-screen bg-[#f7f9f8] px-4 py-5 md:px-6 md:py-8">
      <div className="mx-auto w-full max-w-4xl">
        <TagHeader title="Transaction Details" />

        <div className="mt-5 rounded-3xl border border-amber-200 bg-white px-6 py-20 text-center shadow-sm">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-50 text-amber-600">
            <Icon
              icon="mdi:account-alert-outline"
              className="text-3xl"
            />
          </div>

          <h1 className="mt-5 text-xl font-black text-gray-900">
            Account role unavailable
          </h1>

          <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-gray-500">
            We received the transaction, but the
            account role was not included in the
            response. Role-specific information has
            been hidden for your protection.
          </p>

          <button
            type="button"
            onClick={onRetry}
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#006838] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#00542d]"
          >
            <RefreshRoundedIcon
              sx={{ fontSize: 18 }}
            />
            Try again
          </button>
        </div>
      </div>
    </main>
  );
};

/* -------------------------------------------------------------------------- */
/*                              TIMELINE                                      */
/* -------------------------------------------------------------------------- */

const StatusTimeline = ({
  order,
}: {
  order: Order;
}) => {
  const orderStatus = normalizeStatus(
    order.status
  );

  const paymentStatus = normalizeStatus(
    order.paymentStatus
  );

  const logisticsStatus = normalizeStatus(
    order.logistics?.status
  );

  const paymentComplete = [
    "paid",
    "completed",
    "successful",
    "success",
  ].includes(paymentStatus);

  const processingComplete =
    ["completed", "successful", "success"].includes(
      orderStatus
    ) ||
    logisticsStatus.includes("processing") ||
    logisticsStatus.includes("completed");

  const orderComplete = [
    "completed",
    "successful",
    "success",
  ].includes(orderStatus);

  const steps = [
    {
      title: "Order placed",
      description: order.createdAt
        ? formatDate(order.createdAt)
        : "Order received",
      completed: Boolean(order.createdAt),
    },
    {
      title: "Payment",
      description:
        order.paymentStatus || "Payment pending",
      completed: paymentComplete,
    },
    {
      title: "Processing",
      description:
        order.logistics?.status ||
        "Awaiting processing",
      completed: processingComplete,
    },
    {
      title: "Completed",
      description: orderComplete
        ? "Order completed"
        : "Awaiting completion",
      completed: orderComplete,
    },
  ];

  return (
    <div className="space-y-0">
      {steps.map((step, index) => {
        const isLast =
          index === steps.length - 1;

        return (
          <div
            key={step.title}
            className="relative flex gap-4"
          >
            {!isLast && (
              <span
                className={`absolute left-[15px] top-9 h-[calc(100%-18px)] w-px ${
                  step.completed
                    ? "bg-[#006838]"
                    : "bg-gray-200"
                }`}
              />
            )}

            <div
              className={`relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${
                step.completed
                  ? "bg-[#006838] text-white"
                  : "bg-gray-100 text-gray-400"
              }`}
            >
              {step.completed ? (
                <CheckCircleRoundedIcon
                  sx={{ fontSize: 17 }}
                />
              ) : (
                <span className="h-2.5 w-2.5 rounded-full bg-current" />
              )}
            </div>

            <div className="pb-6">
              <p
                className={`text-sm font-bold ${
                  step.completed
                    ? "text-gray-900"
                    : "text-gray-500"
                }`}
              >
                {step.title}
              </p>

              <p className="mt-1 text-xs leading-5 text-gray-400">
                {step.description}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/*                            INFORMATION CARD                                */
/* -------------------------------------------------------------------------- */

const InfoCard = ({
  icon,
  title,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}) => {
  return (
    <section className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#006838]/10 text-[#006838]">
          {icon}
        </div>

        <h2 className="text-sm font-black text-gray-900">
          {title}
        </h2>
      </div>

      <div className="mt-5">
        {children}
      </div>
    </section>
  );
};

/* -------------------------------------------------------------------------- */
/*                         TRANSACTION DETAILS                                */
/* -------------------------------------------------------------------------- */

const TransactionDetails = () => {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();

  const orderId = useMemo(() => {
    const queryId =
      searchParams.get("id");

    const routeId = Array.isArray(
      params?.orderId
    )
      ? params.orderId[0]
      : params?.orderId;

    return queryId || routeId || null;
  }, [params, searchParams]);

  const [order, setOrder] =
    useState<Order | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [refreshing, setRefreshing] =
    useState(false);

  const [error, setError] =
    useState("");

  const [copied, setCopied] =
    useState("");

  /* ---------------------------------------------------------------------- */
  /*                              FETCH                                      */
  /* ---------------------------------------------------------------------- */

  const fetchOrder = useCallback(
    async (refresh = false) => {
      if (!orderId) {
        setLoading(false);
        setError(
          "This transaction could not be identified."
        );
        return;
      }

      const token =
        localStorage.getItem("userToken");

      if (!token) {
        router.replace("/auth/login");
        return;
      }

      try {
        if (refresh) {
          setRefreshing(true);
        } else {
          setLoading(true);
        }

        setError("");

        const response = await axios.get(
          `/orders/${encodeURIComponent(
            String(orderId)
          )}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        /*
         * IMPORTANT:
         *
         * API:
         *
         * {
         *   success: true,
         *   order: {...}
         * }
         */
        const fetchedOrder =
          response?.data?.order;

        if (!fetchedOrder) {
          throw new Error(
            "Order was not returned by the API."
          );
        }

        setOrder(fetchedOrder);
      } catch (error: any) {
        console.error(
          "Failed to fetch transaction:",
          error
        );

        const status =
          error?.response?.status;

        if (status === 401) {
          localStorage.removeItem(
            "userToken"
          );

          router.replace("/auth/login");
          return;
        }

        setError(
          error?.response?.data?.message ||
            error?.message ||
            "Failed to load transaction details."
        );
      } finally {
        setLoading(false);
        setRefreshing(false);
      }
    },
    [orderId, router]
  );

  useEffect(() => {
    fetchOrder();
  }, [fetchOrder]);

  /* ---------------------------------------------------------------------- */
  /*                          ROLE RESOLUTION                                */
  /* ---------------------------------------------------------------------- */

  /*
   * THIS is now the source of truth.
   *
   * No prop.
   * No default "buyer".
   * No default "seller".
   * No localStorage role.
   */
  const userRole = order?.userId?.accountType 
  console.log("User order:", order);

  const roleLoaded =
    userRole === "buyer" ||
    userRole === "seller";

  const isBuyer =
    roleLoaded && userRole === "buyer";

  const isSeller =
    roleLoaded && userRole === "seller";

  /* ---------------------------------------------------------------------- */
  /*                               COPY                                      */
  /* ---------------------------------------------------------------------- */

  const copyValue = async (
    value: string,
    key: string
  ) => {
    try {
      await navigator.clipboard.writeText(
        value
      );

      setCopied(key);

      window.setTimeout(() => {
        setCopied("");
      }, 1500);
    } catch (error) {
      console.error(
        "Failed to copy:",
        error
      );
    }
  };

  /* ---------------------------------------------------------------------- */
  /*                            DERIVED DATA                                  */
  /* ---------------------------------------------------------------------- */

  const status = useMemo(
    () =>
      getStatusConfig(order?.status),
    [order?.status]
  );

  const paymentStatus = useMemo(
    () =>
      getStatusConfig(
        order?.paymentStatus
      ),
    [order?.paymentStatus]
  );

  const subtotal =
    Number(order?.subTotal) || 0;

  const shippingTotal =
    Number(order?.shippingTotal) || 0;

  const deliveryFee =
    Number(
      order?.logistics?.deliveryFee
    ) || 0;

  const vatAmount =
    Number(
      order?.logistics?.vatAmount
    ) || 0;

  const grandTotal =
    Number(order?.grandTotal) || 0;

  const shippingAddress = getShippingAddress(
    order?.shippingAddress
  );

  const fallbackCustomerAddress =
    getCustomerAddress(
      order?.userId?.addresses
    );

  const customerName =
    getPersonName(order?.userId);

  const vendorName =
    getPersonName(order?.vendorId);

  const businessAddress =
    order?.businessId?.addresses;

  const businessAddressText = [
    businessAddress?.street,
    businessAddress?.town,
    businessAddress?.city,
    businessAddress?.state,
    businessAddress?.country,
  ]
    .filter(isValidValue)
    .join(", ");

  /* ---------------------------------------------------------------------- */
  /*                              LOADING                                    */
  /* ---------------------------------------------------------------------- */

  if (loading) {
    return <RoleLoadingState />;
  }

  /* ---------------------------------------------------------------------- */
  /*                               ERROR                                    */
  /* ---------------------------------------------------------------------- */

  if (error || !order) {
    return (
      <main className="min-h-screen bg-[#f7f9f8] px-4 py-5 md:px-6 md:py-8">
        <div className="mx-auto w-full max-w-4xl">
          <TagHeader title="Transaction Details" />

          <div className="mt-5 rounded-3xl border border-gray-200 bg-white px-6 py-20 text-center shadow-sm">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-red-50 text-red-500">
              <ReceiptLongRoundedIcon
                sx={{ fontSize: 30 }}
              />
            </div>

            <h1 className="mt-5 text-xl font-black text-gray-900">
              Transaction unavailable
            </h1>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-gray-500">
              {error ||
                "We couldn't find this transaction."}
            </p>

            <button
              type="button"
              onClick={() =>
                fetchOrder(true)
              }
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#006838] px-5 py-3 text-sm font-semibold text-white"
            >
              <RefreshRoundedIcon
                sx={{ fontSize: 18 }}
              />
              Try again
            </button>
          </div>
        </div>
      </main>
    );
  }

  /* ---------------------------------------------------------------------- */
  /*                      ROLE NOT AVAILABLE                                */
  /* ---------------------------------------------------------------------- */

  /*
   * This is VERY important.
   *
   * The page does not expose buyer or seller private
   * sections when userId.role is missing/invalid.
   */
  if (!roleLoaded) {
    return (
      <RoleResolutionError
        onRetry={() =>
          fetchOrder(true)
        }
      />
    );
  }

  /* ---------------------------------------------------------------------- */
  /*                                UI                                      */
  /* ---------------------------------------------------------------------- */

  return (
    <main className="min-h-screen bg-[#f7f9f8] px-4 py-5 md:px-6 md:py-8">
      <div className="mx-auto w-full max-w-4xl">
        <TagHeader title="Transaction Details" />

        {/* ================================================================ */}
        {/* TOP ACTIONS                                                      */}
        {/* ================================================================ */}

        <div className="mt-5 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => router.back()}
            className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-semibold text-gray-600 transition hover:bg-gray-50"
          >
            <ArrowBackRoundedIcon
              sx={{ fontSize: 18 }}
            />
            Back
          </button>

          <button
            type="button"
            onClick={() => fetchOrder(true)}
            disabled={refreshing}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-500 transition hover:text-[#006838] disabled:opacity-50"
            aria-label="Refresh transaction"
          >
            <RefreshRoundedIcon
              className={
                refreshing
                  ? "animate-spin"
                  : ""
              }
            />
          </button>
        </div>

        {/* ================================================================ */}
        {/* HEADER                                                           */}
        {/* ================================================================ */}

        <section className="relative mt-4 overflow-hidden rounded-[30px] bg-gradient-to-br from-[#063c25] via-[#006838] to-[#074c2d] p-5 shadow-[0_20px_60px_rgba(0,104,56,0.14)] sm:p-7">
          <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/10 blur-3xl" />

          <div className="relative">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <div className="flex items-center gap-2 text-white/55">
                  <ReceiptLongRoundedIcon
                    sx={{ fontSize: 17 }}
                  />

                  <span className="text-[10px] font-bold uppercase tracking-[0.18em]">
                    {isSeller
                      ? "Seller order"
                      : "Your order"}
                  </span>
                </div>

                <h1 className="mt-2 break-all text-xl font-black text-white sm:text-3xl">
                  #
                  {order.orderReference ||
                    order._id.slice(-10)}
                </h1>

                <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-white/55">
                  <span>
                    {formatDate(
                      order.createdAt
                    )}
                  </span>

                  <span className="h-1 w-1 rounded-full bg-white/25" />

                  <span>
                    {formatTime(
                      order.createdAt
                    )}
                  </span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                <span
                  className={`inline-flex items-center gap-1.5 rounded-full px-3 py-2 text-xs font-bold uppercase tracking-wide ring-1 ${status.className}`}
                >
                  {status.icon}
                  {status.label}
                </span>

                <span
                  className={`inline-flex items-center gap-1.5 rounded-full px-3 py-2 text-xs font-bold capitalize ring-1 ${paymentStatus.className}`}
                >
                  <PaymentsRoundedIcon
                    sx={{ fontSize: 14 }}
                  />
                  {order.paymentStatus ||
                    "pending"}
                </span>
              </div>
            </div>

            <div className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-4">
              <div className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur">
                <p className="text-[10px] uppercase tracking-wider text-white/45">
                  Total
                </p>

                <p className="mt-1 text-lg font-black text-white">
                  {formatCurrency(
                    grandTotal
                  )}
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur">
                <p className="text-[10px] uppercase tracking-wider text-white/45">
                  Items
                </p>

                <p className="mt-1 text-lg font-black text-white">
                  {order.items?.length || 0}
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur">
                <p className="text-[10px] uppercase tracking-wider text-white/45">
                  Shipping
                </p>

                <p className="mt-1 text-lg font-black text-white">
                  {formatCurrency(
                    shippingTotal
                  )}
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur">
                <p className="text-[10px] uppercase tracking-wider text-white/45">
                  Role
                </p>

                <p className="mt-1 text-lg font-black capitalize text-white">
                  {userRole}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ================================================================ */}
        {/* CONTENT                                                          */}
        {/* ================================================================ */}

        <div className="mt-4 grid grid-cols-1 gap-4 xl:grid-cols-[1fr_320px]">
          <div className="min-w-0 space-y-4">
            {/* ------------------------------------------------------------ */}
            {/* ITEMS                                                         */}
            {/* ------------------------------------------------------------ */}

            <section className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#006838]">
                    Purchase
                  </p>

                  <h2 className="mt-1 text-xl font-black text-gray-900">
                    Order items
                  </h2>
                </div>

                <span className="rounded-full bg-gray-100 px-3 py-1.5 text-xs font-semibold text-gray-500">
                  {order.items?.length || 0}{" "}
                  {order.items?.length === 1
                    ? "item"
                    : "items"}
                </span>
              </div>

              <div className="mt-5 space-y-3">
                {order.items?.map(
                  (item, index) => {
                    const quantity =
                      Number(
                        item.quantity || 0
                      );

                    const unitPrice =
                      Number(
                        item.price ??
                          item.productId
                            ?.price ??
                          0
                      );

                    const lineTotal =
                      quantity * unitPrice;

                    const name =
                      item.productId?.name ||
                      "Product item";

                    return (
                      <div
                        key={
                          item._id ||
                          `${name}-${index}`
                        }
                        className="flex gap-3 rounded-2xl border border-gray-100 bg-gray-50 p-3 sm:gap-4 sm:p-4"
                      >
                        <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-white">
                          <Image
                            src={getProductImage(
                              item
                            )}
                            alt={name}
                            fill
                            sizes="64px"
                            className="object-cover"
                          />
                        </div>

                        <div className="min-w-0 flex-1">
                          <p className="line-clamp-2 text-sm font-bold text-gray-900">
                            {name}
                          </p>

                          <p className="mt-1 text-xs text-gray-500">
                            Quantity:{" "}
                            {quantity}
                          </p>

                          <p className="mt-1 text-xs text-gray-400">
                            {formatCurrency(
                              unitPrice
                            )}{" "}
                            each
                          </p>
                        </div>

                        <p className="shrink-0 self-center text-sm font-black text-gray-900">
                          {formatCurrency(
                            lineTotal
                          )}
                        </p>
                      </div>
                    );
                  }
                )}
              </div>

              {/* Totals */}

              <div className="mt-6 border-t border-gray-100 pt-5">
                <div className="ml-auto max-w-md space-y-3">
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>Subtotal</span>
                    <span className="font-semibold text-gray-700">
                      {formatCurrency(
                        subtotal
                      )}
                    </span>
                  </div>

                  <div className="flex justify-between text-sm text-gray-500">
                    <span>Shipping</span>
                    <span className="font-semibold text-gray-700">
                      {formatCurrency(
                        shippingTotal
                      )}
                    </span>
                  </div>

                  {deliveryFee > 0 && (
                    <div className="flex justify-between text-sm text-gray-500">
                      <span>Delivery fee</span>
                      <span className="font-semibold text-gray-700">
                        {formatCurrency(
                          deliveryFee
                        )}
                      </span>
                    </div>
                  )}

                  {vatAmount > 0 && (
                    <div className="flex justify-between text-sm text-gray-500">
                      <span>VAT</span>
                      <span className="font-semibold text-gray-700">
                        {formatCurrency(
                          vatAmount
                        )}
                      </span>
                    </div>
                  )}

                  <div className="flex justify-between border-t border-gray-100 pt-3">
                    <span className="font-black text-gray-900">
                      Grand total
                    </span>

                    <span className="text-xl font-black text-[#006838]">
                      {formatCurrency(
                        grandTotal
                      )}
                    </span>
                  </div>
                </div>
              </div>
            </section>

            {/* ------------------------------------------------------------ */}
            {/* SHIPPING                                                       */}
            {/* ------------------------------------------------------------ */}

            <InfoCard
              title="Shipping & delivery"
              icon={
                <LocalShippingRoundedIcon
                  sx={{ fontSize: 20 }}
                />
              }
            >
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="rounded-2xl bg-gray-50 p-4">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                    Destination
                  </p>

                  {shippingAddress.length > 0 ? (
                    <>
                      <p className="mt-2 text-sm font-bold text-gray-900">
                        {
                          order
                            .shippingAddress
                            ?.recipientName
                        }
                      </p>

                      <p className="mt-2 text-sm leading-6 text-gray-600">
                        {shippingAddress.join(
                          ", "
                        )}
                      </p>
                    </>
                  ) : (
                    <>
                      <p className="mt-2 text-sm font-bold text-amber-700">
                        Shipping address unavailable
                      </p>

                      <p className="mt-1 text-xs leading-5 text-gray-500">
                        This order contains N/A
                        shipping information.
                      </p>
                    </>
                  )}
                </div>

                <div className="rounded-2xl bg-gray-50 p-4">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                    Delivery
                  </p>

                  <p className="mt-2 text-sm font-bold text-gray-900">
                    {order.logistics
                      ?.status ||
                      "Awaiting processing"}
                  </p>

                  <div className="mt-3 flex flex-wrap gap-2">
                    <span className="rounded-full bg-white px-2.5 py-1.5 text-xs font-semibold text-gray-600">
                      {order.logistics
                        ?.isPickup
                        ? "Pickup"
                        : "Delivery"}
                    </span>

                    <span className="rounded-full bg-white px-2.5 py-1.5 text-xs font-semibold text-gray-600">
                      Waybill:{" "}
                      {order.logistics
                        ?.waybillNumber ||
                        "Pending"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Buyer can see delivery contact.
                  Seller can also see it because it belongs to fulfillment. */}

              <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {isValidValue(
                  order.shippingAddress
                    ?.recipientPhone
                ) && (
                  <div className="rounded-2xl bg-gray-50 p-4">
                    <div className="flex items-center gap-2 text-gray-400">
                      <PhoneRoundedIcon
                        sx={{ fontSize: 16 }}
                      />
                      <span className="text-[10px] font-bold uppercase tracking-wider">
                        Recipient phone
                      </span>
                    </div>

                    <p className="mt-2 text-sm font-bold text-gray-800">
                      {
                        order
                          .shippingAddress
                          ?.recipientPhone
                      }
                    </p>
                  </div>
                )}

                {isValidValue(
                  order.shippingAddress
                    ?.recipientEmail
                ) && (
                  <div className="rounded-2xl bg-gray-50 p-4">
                    <div className="flex items-center gap-2 text-gray-400">
                      <MailOutlineRoundedIcon
                        sx={{ fontSize: 16 }}
                      />
                      <span className="text-[10px] font-bold uppercase tracking-wider">
                        Recipient email
                      </span>
                    </div>

                    <p className="mt-2 break-all text-sm font-bold text-gray-800">
                      {
                        order
                          .shippingAddress
                          ?.recipientEmail
                      }
                    </p>
                  </div>
                )}
              </div>
            </InfoCard>

            {/* ------------------------------------------------------------ */}
            {/* PAYMENT                                                       */}
            {/* ------------------------------------------------------------ */}

            <InfoCard
              title="Payment information"
              icon={
                <PaymentsRoundedIcon
                  sx={{ fontSize: 20 }}
                />
              }
            >
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="rounded-2xl bg-gray-50 p-4">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                    Payment reference
                  </p>

                  <div className="mt-2 flex items-center gap-2">
                    <p className="min-w-0 flex-1 break-all text-sm font-bold text-gray-900">
                      {order.paymentReference ||
                        "Not available"}
                    </p>

                    {order.paymentReference && (
                      <button
                        type="button"
                        onClick={() =>
                          copyValue(
                            order.paymentReference!,
                            "payment"
                          )
                        }
                        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white text-gray-400 shadow-sm hover:text-[#006838]"
                      >
                        {copied ===
                        "payment" ? (
                          <CheckCircleRoundedIcon
                            sx={{ fontSize: 16 }}
                          />
                        ) : (
                          <ContentCopyRoundedIcon
                            sx={{ fontSize: 15 }}
                          />
                        )}
                      </button>
                    )}
                  </div>
                </div>

                <div className="rounded-2xl bg-gray-50 p-4">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                    Payment status
                  </p>

                  <span
                    className={`mt-2 inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold capitalize ring-1 ${paymentStatus.className}`}
                  >
                    {paymentStatus.icon}
                    {order.paymentStatus ||
                      "Pending"}
                  </span>
                </div>
              </div>

              {order.logistics?.waybillNumber?.includes(
                "Pay on Delivery"
              ) && (
                <div className="mt-4 rounded-2xl border border-amber-200 bg-amber-50 p-4">
                  <div className="flex items-start gap-3">
                    <Icon
                      icon="mdi:cash-clock"
                      className="mt-0.5 text-xl text-amber-600"
                    />

                    <div>
                      <p className="text-sm font-bold text-amber-900">
                        Pay on delivery
                      </p>

                      <p className="mt-1 text-xs leading-5 text-amber-700">
                        This order is marked for
                        payment on delivery.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </InfoCard>
          </div>

          {/* ============================================================ */}
          {/* RIGHT RAIL — ROLE CONTROLLED                                   */}
          {/* ============================================================ */}

          <aside className="space-y-4">
            {/* ---------------------------------------------------------- */}
            {/* TIMELINE — BOTH ROLES                                       */}
            {/* ---------------------------------------------------------- */}

            <section className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#006838]/10 text-[#006838]">
                  <ReceiptLongRoundedIcon
                    sx={{ fontSize: 19 }}
                  />
                </div>

                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-gray-400">
                    Progress
                  </p>

                  <h2 className="text-sm font-black text-gray-900">
                    Order timeline
                  </h2>
                </div>
              </div>

              <div className="mt-6">
                <StatusTimeline order={order} />
              </div>
            </section>

            {/* ---------------------------------------------------------- */}
            {/* BUYER ONLY: SELLER                                          */}
            {/* ---------------------------------------------------------- */}

            {isBuyer && (
              <>
                <section className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#006838]/10 text-[#006838]">
                      <BusinessRoundedIcon
                        sx={{ fontSize: 19 }}
                      />
                    </div>

                    <div className="min-w-0">
                      <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-gray-400">
                        Seller
                      </p>

                      <h2 className="truncate text-sm font-black text-gray-900">
                        {order.businessId
                          ?.businessName ||
                          "Merchant"}
                      </h2>
                    </div>
                  </div>

                  {vendorName !==
                    "Not available" && (
                    <div className="mt-5 rounded-2xl bg-gray-50 p-4">
                      <p className="text-sm font-bold text-gray-900">
                        {vendorName}
                      </p>

                      {/* {order.vendorId
                        ?.phone && (
                        <p className="mt-2 flex items-center gap-2 text-xs text-gray-500">
                          <PhoneRoundedIcon
                            sx={{ fontSize: 14 }}
                          />
                          {order.vendorId.phone}
                        </p>
                      )} */}

                      {/* {order.vendorId
                        ?.email && (
                        <p className="mt-2 flex items-center gap-2 break-all text-xs text-gray-500">
                          <MailOutlineRoundedIcon
                            sx={{ fontSize: 14 }}
                          />
                          {order.vendorId.email}
                        </p>
                      )} */}
                    </div>
                  )}
                </section>

                <section className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm">
                  <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-gray-400">
                    Seller
                  </p>

                  <button
                    type="button"
                    className="mt-4 flex w-full items-center justify-center gap-2 rounded-2xl border-2 border-[#006838] py-3.5 text-sm font-bold text-[#006838] transition hover:bg-[#006838]/5"
                  >
                    <Icon
                      icon="solar:chat-round-dots-bold"
                      className="text-xl"
                    />

                    Contact Seller
                  </button>
                </section>
              </>
            )}

            {/* ---------------------------------------------------------- */}
            {/* SELLER ONLY: CUSTOMER                                       */}
            {/* ---------------------------------------------------------- */}

            {isSeller && (
              <>
                <section className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#006838]/10 text-[#006838]">
                      <PersonRoundedIcon
                        sx={{ fontSize: 19 }}
                      />
                    </div>

                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-gray-400">
                        Customer
                      </p>

                      <h2 className="text-sm font-black text-gray-900">
                        {customerName}
                      </h2>
                    </div>
                  </div>

                  <div className="mt-5 rounded-2xl bg-gray-50 p-4">
                    {order.userId?.email && (
                      <p className="flex items-center gap-2 break-all text-xs text-gray-500">
                        <MailOutlineRoundedIcon
                          sx={{ fontSize: 14 }}
                        />
                        {order.userId.email}
                      </p>
                    )}

                    {order.userId?.phone && (
                      <p className="mt-2 flex items-center gap-2 text-xs text-gray-500">
                        <PhoneRoundedIcon
                          sx={{ fontSize: 14 }}
                        />
                        {order.userId.phone}
                      </p>
                    )}

                    {fallbackCustomerAddress.length >
                      0 && (
                      <div className="mt-3 border-t border-gray-200 pt-3">
                        <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                          Account address
                        </p>

                        <p className="mt-1 text-xs leading-5 text-gray-500">
                          {fallbackCustomerAddress.join(
                            ", "
                          )}
                        </p>
                      </div>
                    )}
                  </div>
                </section>

                <section className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#006838]/10 text-[#006838]">
                      <BusinessRoundedIcon
                        sx={{ fontSize: 19 }}
                      />
                    </div>

                    <div className="min-w-0">
                      <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-gray-400">
                        Business
                      </p>

                      <h2 className="truncate text-sm font-black text-gray-900">
                        {order.businessId
                          ?.businessName ||
                          "Business"}
                      </h2>
                    </div>
                  </div>

                  {businessAddressText && (
                    <p className="mt-4 text-xs leading-5 text-gray-500">
                      {businessAddressText}
                    </p>
                  )}
                </section>

                {/* IMPORTANT:
                    Seller-only information.
                    A buyer must NEVER see this. */}

                {order.businessId
                  ?.paymentInfo && (
                  <section className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#006838]/10 text-[#006838]">
                        <AccountBalanceRoundedIcon
                          sx={{ fontSize: 19 }}
                        />
                      </div>

                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-gray-400">
                          Seller only
                        </p>

                        <h2 className="text-sm font-black text-gray-900">
                          Settlement account
                        </h2>
                      </div>
                    </div>

                    <div className="mt-5 rounded-2xl bg-gray-50 p-4">
                      <p className="text-sm font-bold text-gray-900">
                        {
                          order.businessId
                            .paymentInfo
                            .accountName
                        }
                      </p>

                      <p className="mt-2 text-xs text-gray-500">
                        {
                          order.businessId
                            .paymentInfo
                            .bankName
                        }{" "}
                        ·{" "}
                        {maskAccountNumber(
                          order.businessId
                            .paymentInfo
                            .accountNumber
                        )}
                      </p>

                      <span className="mt-3 inline-flex rounded-full bg-gray-200 px-2.5 py-1 text-[10px] font-bold uppercase text-gray-600">
                        Settlement:{" "}
                        {
                          order.vendorSettlementStatus
                        }
                      </span>
                    </div>
                  </section>
                )}

                <button
                  type="button"
                  disabled={
                    status.label ===
                    "Completed"
                  }
                  className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[#006838] py-4 text-sm font-bold text-white shadow-lg shadow-green-100 transition hover:bg-[#00542d] disabled:cursor-not-allowed disabled:bg-gray-300 disabled:shadow-none"
                >
                  <CheckCircleRoundedIcon
                    sx={{ fontSize: 19 }}
                  />

                  {status.label ===
                  "Completed"
                    ? "Fulfillment Confirmed"
                    : "Confirm Fulfillment"}
                </button>
              </>
            )}

            {/* ---------------------------------------------------------- */}
            {/* REFERENCE — BOTH ROLES                                      */}
            {/* ---------------------------------------------------------- */}

            <section className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm">
              <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-gray-400">
                Reference
              </p>

              <div className="mt-4">
                <p className="text-[10px] text-gray-400">
                  Order ID
                </p>

                <div className="mt-1 flex items-center gap-2">
                  <p className="min-w-0 flex-1 break-all text-xs font-semibold text-gray-700">
                    {order._id}
                  </p>

                  <button
                    type="button"
                    onClick={() =>
                      copyValue(
                        order._id,
                        "order"
                      )
                    }
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gray-50 text-gray-400 transition hover:text-[#006838]"
                    aria-label="Copy order ID"
                  >
                    {copied === "order" ? (
                      <CheckCircleRoundedIcon
                        sx={{ fontSize: 16 }}
                      />
                    ) : (
                      <ContentCopyRoundedIcon
                        sx={{ fontSize: 15 }}
                      />
                    )}
                  </button>
                </div>
              </div>
            </section>
          </aside>
        </div>
      </div>
    </main>
  );
};

export default TransactionDetails;