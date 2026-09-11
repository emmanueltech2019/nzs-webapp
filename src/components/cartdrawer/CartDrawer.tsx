// "use client";
// import React from "react";
// import { CartDrawerProps, DisplayCartItem } from '../../types/Product.types'; 
// import "./cartDrawer.css";
// import { useLocalCart } from "@/hooks/useLocalCart";
// import Link from "next/link";

// export default function CartDrawer({ 
//     isOpen, 
//     onClose, 
//     cartItems, 
//     // updateItemQuantity, 
//     // removeItem
// }: CartDrawerProps) {
//     const { localCart, updateItemQuantity, removeItem } = useLocalCart();

//     console.log("CartDrawer cartItems:", cartItems);
//   const cartTotal: number = cartItems.reduce((total, item) => {
//     return total + (item.price * item.quantity);
//   }, 0);

//   // const formatCurrency = (amount: number) => {
//   //   return `₦${amount.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`; 
//   // };
//   const formatCurrency = (amount: number = 0) => {
//   return `₦${amount.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`; 
// };

//   const handleIncrease = (item: DisplayCartItem) => {
//     updateItemQuantity(item.productId, item.size, item.quantity + 1);
//     window.location.reload()
//   };

//   const handleDecrease = (item: DisplayCartItem) => {
//     updateItemQuantity(item.productId, item.size, item.quantity - 1);
//     window.location.reload()
//   };
//   const handleRemove = (item: DisplayCartItem) => {
//     removeItem(item.productId, item.size);
//     window.location.reload()
//   };

//   return (
//     <>
//       <div
//         className={`cart-overlay ${isOpen ? "show" : ""}`}
//         onClick={onClose}
//       ></div>

//       <div className={`cart-drawer ${isOpen ? "open" : ""}`}>
        
//         <div className="cart-header">
//           <h2>Your basket ({cartItems.length} {cartItems.length === 1 ? 'item' : 'items'})</h2>
//           <button className="close-btn" onClick={onClose}>×</button>
//         </div>

//         <div className="cart-body">
//           {cartItems.length === 0 ? (
//             <p className="empty-cart">Your basket is empty</p>
//           ) : (
//             cartItems.map((item: DisplayCartItem) => (
//               <div key={item._id} className="cart-item">

//                 <div className="item-details">
//                   <p className="item-name">{item.name}</p>
                  
//                   <div className="item-meta">
//                     <span className="item-size">Size: {item.size}</span>
//                     {item.color&&<span className={`text-[${item.color}]`}>Color: {item.color}</span>}
                    
//                   </div>
                  
//                   <div className="item-controls">
//                     <div className="quantity-changer">
//                       <button 
//                         onClick={() => handleDecrease(item)} 
//                         disabled={item.quantity <= 1}
//                         className="qty-btn"
//                       >
//                         -
//                       </button>
//                       <span className="item-qty-display">{item.quantity}</span>
//                       <button 
//                         onClick={() => handleIncrease(item)} 
//                         className="qty-btn"
//                       >
//                         +
//                       </button>
//                     </div>
//                     <button 
//                       onClick={() => handleRemove(item)} 
//                       className="remove-btn"
//                     >
//                       Remove
//                     </button>
//                   </div>

//                   <p className="item-price">{formatCurrency(item.price * item.quantity)}</p>
//                   <p className="item-unit-price">{formatCurrency(item.price)} each</p>

//                 </div>
//               </div>
//             ))
//           )}
//         </div>

//         <div className="cart-footer">
//           <div className="cart-total-line">
//             <span>Subtotal:</span>
//             <span className="cart-total-price">{formatCurrency(cartTotal)}</span>
//           </div>
//           <Link  href={'/auth/login'} >
//           <button className="checkout-btn" disabled={cartItems.length === 0}>
//             Proceed to Checkout
//           </button>
//           </Link>
//         </div>
//       </div>
//     </>
//   );
// }
"use client";
import React from "react";
import { CartDrawerProps, DisplayCartItem } from '../../types/Product.types'; 
import "./cartDrawer.css";
import { useLocalCart } from "@/hooks/useLocalCart";
import Link from "next/link";

export default function CartDrawer({ 
    isOpen, 
    onClose, 
    cartItems, 
}: CartDrawerProps) {
  const { updateItemQuantity, removeItem } = useLocalCart();

  const cartTotal: number = cartItems.reduce((total, item) => {
    return total + (item.price * item.quantity);
  }, 0);

  const formatCurrency = (amount: number = 0) => {
    return `₦${amount.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`; 
  };

  const handleIncrease = (item: DisplayCartItem) => {
    updateItemQuantity(item.productId, item.size, item.quantity + 1);
  };

  const handleDecrease = (item: DisplayCartItem) => {
    if (item.quantity > 1) {
      updateItemQuantity(item.productId, item.size, item.quantity - 1);
    }
  };

  const handleRemove = (item: DisplayCartItem) => {
    removeItem(item.productId, item.size);
  };

  return (
    <>
      <div
        className={`cart-overlay ${isOpen ? "show" : ""}`}
        onClick={onClose}
      ></div>

      <div className={`cart-drawer ${isOpen ? "open" : ""}`}>
        
        <div className="cart-header">
          <h2>Your basket ({cartItems.length} {cartItems.length === 1 ? 'item' : 'items'})</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>

        <div className="cart-body">
          {cartItems.length === 0 ? (
            <p className="empty-cart">Your basket is empty</p>
          ) : (
            cartItems.map((item: DisplayCartItem) => (
              <div key={item._id} className="cart-item">

                <div className="item-details">
                  <p className="item-name">{item.name}</p>
                  
                  <div className="item-meta flex gap-2">
                    <span className="item-size">Size: {item.size}</span>
                    {item.color && (
                      <span style={{ color: item.color }}>Color: {item.color}</span>
                    )}
                  </div>
                  
                  <div className="item-controls">
                    <div className="quantity-changer">
                      <button 
                        onClick={() => handleDecrease(item)} 
                        disabled={item.quantity <= 1}
                        className="qty-btn disabled:opacity-50"
                      >
                        -
                      </button>
                      <span className="item-qty-display">{item.quantity}</span>
                      <button 
                        onClick={() => handleIncrease(item)} 
                        className="qty-btn"
                      >
                        +
                      </button>
                    </div>
                    <button 
                      onClick={() => handleRemove(item)} 
                      className="remove-btn text-red-500"
                    >
                      Remove
                    </button>
                  </div>

                  <p className="item-price">{formatCurrency(item.price * item.quantity)}</p>
                  <p className="item-unit-price text-sm text-gray-500">{formatCurrency(item.price)} each</p>

                </div>
              </div>
            ))
          )}
        </div>

        <div className="cart-footer">
          <div className="cart-total-line flex justify-between font-bold pb-4">
            <span>Subtotal:</span>
            <span className="cart-total-price">{formatCurrency(cartTotal)}</span>
          </div>
          
          {/* Prevent navigation if cart is empty */}
          {cartItems.length > 0 ? (
            <Link href="/auth/login" className="w-full">
              <button className="checkout-btn w-full">
                Proceed to Checkout
              </button>
            </Link>
          ) : (
            <button className="checkout-btn w-full opacity-50 cursor-not-allowed" disabled>
              Proceed to Checkout
            </button>
          )}
        </div>
      </div>
    </>
  );
}