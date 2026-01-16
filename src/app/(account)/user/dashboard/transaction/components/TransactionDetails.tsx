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
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useParams } from 'next/navigation'; // Use 'next/router' if using Pages Router
import axios from 'axios';
import { Icon } from '@iconify/react';
import placeholder from '@/assets/images/productMockup.png';
import TagHeader from '@/components/header/TagHeader';

export type TransactionDetailsProps = {
  role: 'buyer' | 'seller';
};

const TransactionDetails: React.FC<TransactionDetailsProps> = ({ role }) => {
  const params = useParams();
  const orderId = params.orderId; // Make sure your file is named [orderId]/page.tsx

  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      if (!orderId) return;

      try {
        setLoading(true);
        const res = await axios({
          url: `${process.env.NEXT_PUBLIC_API_URL}/users/orders/${orderId}`, // Use env variable for base URL
          method: 'GET',
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
        });
        setOrder(res.data.data); // Adjust based on your API response structure
      } catch (err: any) {
        setError(err.response?.data?.message || 'Failed to fetch order details');
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [orderId]);

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'successful': return 'bg-green-100 text-green-700';
      case 'pending': return 'bg-yellow-100 text-yellow-700';
      case 'failed': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  if (loading) return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#F8F9FB]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#2F855A]"></div>
        <p className="mt-4 text-gray-500 font-medium">Loading details...</p>
    </div>
  );

  if (error) return (
    <div className="p-6 text-center">
      <p className="text-red-500 font-bold">{error}</p>
      <button onClick={() => window.location.reload()} className="mt-4 text-[#2F855A] underline">Try Again</button>
    </div>
  );

  return (
    <div className="max-w-3xl mx-auto p-4 md:p-6 bg-[#F8F9FB] min-h-screen">
      <TagHeader title='Transaction Details'/>
      
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-bold text-gray-800">
            {order?.createdAt ? new Date(order.createdAt).toLocaleDateString() : 'Order Date'}
        </h1>
        <span className={`px-4 py-1 rounded-full text-xs font-bold uppercase ${getStatusColor(order?.status)}`}>
          {order?.status || 'Pending'}
        </span>
      </div>

      {/* Order Info Card */}
      <div className="bg-white rounded-3xl p-6 shadow-sm mb-6">
        <div className="flex justify-between items-start border-b border-gray-100 pb-4 mb-4">
          <div>
            <p className="text-sm text-gray-400 font-medium">Order Reference</p>
            <p className="text-lg font-bold text-[#2F855A]">#{order?.orderReference || order?._id?.slice(-8)}</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-400 font-medium">Time</p>
            <p className="font-semibold">{order?.createdAt ? new Date(order.createdAt).toLocaleTimeString() : '--:--'}</p>
          </div>
        </div>

        {/* Item List */}
        <div className="space-y-4">
          {order?.items?.map((item: any, index: number) => (
            <div key={index} className="flex items-center space-x-4">
              <div className="w-16 h-16 rounded-xl bg-gray-100 overflow-hidden flex-shrink-0">
                <Image 
                    src={item.productId?.images?.[0] || placeholder} 
                    alt="product" 
                    width={64} 
                    height={64} 
                    className="object-cover w-full h-full" 
                />
              </div>
              <div className="flex-1">
                <p className="font-extrabold text-gray-800">{item.productId?.name || "Product Item"}</p>
                <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
              </div>
              <p className="font-bold text-gray-900">₦{((item.priceAtOrder || item.productId?.price) * item.quantity).toLocaleString()}</p>
            </div>
          ))}
        </div>

        <div className="mt-6 pt-4 border-t border-gray-100 space-y-2">
          <div className="flex justify-between text-gray-500">
            <span>Subtotal</span>
            <span>₦{order?.subTotal?.toLocaleString() || order?.grandTotal?.toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-gray-500">
            <span>Shipping Fee</span>
            <span>₦{order?.shippingFee?.toLocaleString() || '0.00'}</span>
          </div>
          <div className="flex justify-between text-xl font-extrabold text-gray-900 pt-2">
            <span>Total</span>
            <span className="text-[#2F855A]">₦{order?.grandTotal?.toLocaleString()}</span>
          </div>
        </div>
      </div>

      {/* Logistics & Address Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="bg-white rounded-3xl p-5 shadow-sm">
          <div className="flex items-center space-x-2 mb-3 text-[#2F855A]">
            <Icon icon="solar:delivery-bold" className="text-xl" />
            <h3 className="font-bold">Logistics</h3>
          </div>
          <p className="text-sm text-gray-400">Waybill Number</p>
          <p className="font-semibold mb-2 text-gray-700">{order?.logistics?.waybillNumber || 'Not assigned'}</p>
          <p className="text-sm text-gray-400">Delivery Status</p>
          <p className="font-semibold text-gray-700">{order?.deliveryStatus || 'Pending'}</p>
        </div>

        <div className="bg-white rounded-3xl p-5 shadow-sm">
          <div className="flex items-center space-x-2 mb-3 text-[#2F855A]">
            <Icon icon="solar:map-point-bold" className="text-xl" />
            <h3 className="font-bold">Shipping Address</h3>
          </div>
          <p className="text-sm text-gray-700 leading-relaxed">
            {order?.shippingAddress?.addressLine1 || order?.shippingAddress || 'No address provided'}
          </p>
        </div>
      </div>

      {/* Role-Based Action Section */}
      <div className="bg-white rounded-3xl p-6 shadow-sm mb-10">
        <h3 className="font-bold mb-4 text-gray-800">
          {role === 'seller' ? 'Customer Information' : 'Seller Information'}
        </h3>
        <div className="flex items-center space-x-4 mb-6">
          <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center border border-gray-100">
            <Icon icon="solar:user-bold" className="text-2xl text-gray-400" />
          </div>
          <div>
            <p className="font-bold text-gray-800">
                {role === 'seller' ? order?.userId?.fullName : (order?.sellerId?.storeName || 'Merchant')}
            </p>
            <p className="text-sm text-gray-400">
                {role === 'seller' ? order?.userId?.phoneNumber : order?.sellerId?.phoneNumber || '+234 ...'}
            </p>
          </div>
        </div>

        {role === 'seller' ? (
          <button 
            disabled={order?.status === 'successful'}
            className="w-full bg-[#2F855A] disabled:bg-gray-400 text-white py-4 rounded-2xl font-bold flex items-center justify-center space-x-2 shadow-lg shadow-green-100 transition-all hover:bg-[#276e4a]"
          >
            <Icon icon="solar:check-read-bold" className="text-xl" />
            <span>{order?.status === 'successful' ? 'Fulfillment Confirmed' : 'Confirm Fulfillment'}</span>
          </button>
        ) : (
          <button className="w-full border-2 border-[#2F855A] text-[#2F855A] py-4 rounded-2xl font-bold flex items-center justify-center space-x-2 transition-all hover:bg-green-50">
            <Icon icon="solar:chat-round-dots-bold" className="text-xl" />
            <span>Contact Seller</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default TransactionDetails;