
import { useEffect, useState } from "react";
import { LocalCartItem } from '../types/Product.types'; 

export const useLocalCart = () => {
  const [localCart, setLocalCart] = useState<LocalCartItem[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("localCart");
    if (saved) setLocalCart(JSON.parse(saved));
  }, []);

  const saveCart = (cart: LocalCartItem[]) => {
    localStorage.setItem("localCart", JSON.stringify(cart));
    setLocalCart(cart);
  };
  
  const findItemIndex = (productId: string, size: string) => {
    return localCart.findIndex(
      (item) =>
        item.productId === productId &&
        item.size === size
    );
  };

  const updateItemQuantity = (
    productId: string,
    size: string,
    newQuantity: number
  ) => {
    if (newQuantity < 1) return;

    const index = findItemIndex(productId, size);

    if (index > -1) {
      const updatedCart = localCart.map((item, i) => {
        if (i === index) {
          return { ...item, quantity: newQuantity };
        }
        return item;
      });
      saveCart(updatedCart);
    }
  };

  const removeItem = (productId: string, size: string) => {
    const updatedCart = localCart.filter(
      (item) =>
        !(item.productId === productId)
    );
    console.log("Removing item:", productId, size, "Updated cart:", updatedCart);
    saveCart(updatedCart);
  };

  const addLocalItem = (newItem: LocalCartItem) => {
    const existingItemIndex = findItemIndex(newItem.productId, newItem.size);

    let updatedCart: LocalCartItem[];

    if (existingItemIndex > -1) {
      updatedCart = localCart.map((item, index) => {
        if (index === existingItemIndex) {
          return {
            ...item,
            quantity: item.quantity + (newItem.quantity || 1),
          };
        }
        return item;
      });
    } else {
      updatedCart = [...localCart, newItem];
    }

    saveCart(updatedCart);
  };
  
  return { 
    localCart, 
    addLocalItem, 
    clearLocalCart: () => saveCart([]),
    updateItemQuantity, 
    removeItem 
  };
};