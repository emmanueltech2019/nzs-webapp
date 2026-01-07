// import { useState, useEffect } from 'react';
// import axios from 'axios';
// import { LocalCartItem, DisplayCartItem, ProductT } from '../types/Product.types';

// const getToken = (): string => {
//   return localStorage.getItem("userToken") || '';
// };

// const getLocalCart = (): LocalCartItem[] => {
//   const cartJson = localStorage.getItem('localCart');
//   return cartJson ? JSON.parse(cartJson) : [];
// };

// export const useCartData = () => {
//   const [localCart] = useState<LocalCartItem[]>(getLocalCart());
//   const [detailedCart, setDetailedCart] = useState<DisplayCartItem[]>([]);
//   const [isLoading, setIsLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     if (localCart.length === 0) {
//       setDetailedCart([]);
//       setIsLoading(false);
//       return;
//     }

//     const fetchDetails = async () => {
//       setIsLoading(true);
//       setError(null);
      
//       const productPromises = localCart.map(item => {
//         const id = item.productId;
        
//         return axios
//           .get<ProductT>("products/single2/" + id, {
//             headers: {
//               Authorization: `Bearer ${getToken()}`,
//             },
//           })
//           .then(response => response.data)
//           .catch(err => {
//             console.error(`Error fetching product ${id}:`, err);
//             return null; 
//           });
//       });

//       try {
//         const productDetailsResults = await Promise.all(productPromises);
//           const finalCart: DisplayCartItem[] = localCart
//           .map((localItem, index) => {
//             const details = productDetailsResults[index];
            
//             if (details) {
//               return {
//                 ...localItem,
//                 ...details,
//               } as DisplayCartItem;
//             }
//             return null;
//           })
//           .filter((item): item is DisplayCartItem => item !== null);

//         setDetailedCart(finalCart);
//       } catch (err) {
//         setError("Failed to fetch all product details.");
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchDetails();
//   }, [localCart, detailedCart]);

//   return { detailedCart, isLoading, error };
// };
// "use client";
// import { useState, useEffect } from 'react';
// import axios from 'axios';
// import { LocalCartItem, DisplayCartItem, ProductT } from '../types/Product.types';

// export const useCartData = (trigger: number) => {
//   const [localCart, setLocalCart] = useState<LocalCartItem[]>([]);
//   const [detailedCart, setDetailedCart] = useState<DisplayCartItem[]>([]);
//   const [isLoading, setIsLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);

//   // Load cart safely on client ONLY
//   useEffect(() => {
//     if (typeof window === "undefined") return;

//     const cartJson = localStorage.getItem("localCart");
//     const savedCart = cartJson ? JSON.parse(cartJson) : [];

//     setLocalCart(savedCart);
//   }, [trigger]);

//   // Fetch product details
//   useEffect(() => {
//     if (localCart.length === 0) {
//       setDetailedCart([]);
//       setIsLoading(false);
//       return;
//     }

//     const fetchDetails = async () => {
//       setIsLoading(true);
//       setError(null);

//       const token =
//         typeof window !== "undefined"
//           ? localStorage.getItem("userToken")
//           : "";

//       try {
//         const productPromises = localCart.map((item) =>
//           axios
//             .get<ProductT>(`products/single2/${item.productId}`, {
//               headers: { Authorization: `Bearer ${token}` },
//             })
//             .then((res) => res.data)
//             .catch((err) => {
//               console.error(`Error fetching product ${item.productId}`, err);
//               return null;
//             })
//         );

//         const results = await Promise.all(productPromises);

//         const finalCart = localCart
//           .map((localItem, index) => {
//             const details = results[index];
//             return details
//               ? ({ ...localItem, ...details } as DisplayCartItem)
//               : null;
//           })
//           .filter((item): item is DisplayCartItem => item !== null);

//         setDetailedCart(finalCart);
//       } catch (err) {
//         console.error(err);
//         setError("Failed to fetch product details.");
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchDetails();
//   }, [localCart, trigger]); // <— remove detailedCart to stop infinite loop

//   return { detailedCart, isLoading, error };
// };

import { useEffect, useState } from "react";
import { LocalCartItem } from "../types/Product.types";

export const useLocalCart = () => {
  const [localCart, setLocalCart] = useState<LocalCartItem[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("localCart");
    if (saved) setLocalCart(JSON.parse(saved));
  }, []);

  const persistCart = (cart: LocalCartItem[]) => {
    setLocalCart(cart);
    localStorage.setItem("localCart", JSON.stringify(cart));
  };

  const updateItemQuantity = (
    productId: string,
    size: string,
    quantity: number
  ) => {
    const updatedCart = localCart
      .map(item =>
        item.productId === productId && item.size === size
          ? { ...item, quantity }
          : item
      )
      .filter(item => item.quantity > 0); // auto remove if qty <= 0

    persistCart(updatedCart);
  };

  const removeItem = (productId: string, size: string) => {
    const updatedCart = localCart.filter(
      item => !(item.productId === productId && item.size === size)
    );

    persistCart(updatedCart);
  };

  const addLocalItem = (item: LocalCartItem) => {
    const existing = localCart.find(
      i => i.productId === item.productId && i.size === item.size
    );

    if (existing) {
      updateItemQuantity(
        item.productId,
        item.size,
        existing.quantity + item.quantity
      );
    } else {
      persistCart([...localCart, item]);
    }
  };

  return {
    localCart,
    addLocalItem,
    updateItemQuantity,
    removeItem
  };
};
