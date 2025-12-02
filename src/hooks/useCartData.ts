import { useState, useEffect } from 'react';
import axios from 'axios';
import { LocalCartItem, DisplayCartItem, ProductT } from '../types/Product.types';

const getToken = (): string => {
  return localStorage.getItem("userToken") || '';
};

const getLocalCart = (): LocalCartItem[] => {
  const cartJson = localStorage.getItem('localCart');
  return cartJson ? JSON.parse(cartJson) : [];
};

export const useCartData = () => {
  const [localCart] = useState<LocalCartItem[]>(getLocalCart());
  const [detailedCart, setDetailedCart] = useState<DisplayCartItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (localCart.length === 0) {
      setDetailedCart([]);
      setIsLoading(false);
      return;
    }

    const fetchDetails = async () => {
      setIsLoading(true);
      setError(null);
      
      const productPromises = localCart.map(item => {
        const id = item.productId;
        
        return axios
          .get<ProductT>("products/single2/" + id, {
            headers: {
              Authorization: `Bearer ${getToken()}`,
            },
          })
          .then(response => response.data)
          .catch(err => {
            console.error(`Error fetching product ${id}:`, err);
            return null; 
          });
      });

      try {
        const productDetailsResults = await Promise.all(productPromises);
          const finalCart: DisplayCartItem[] = localCart
          .map((localItem, index) => {
            const details = productDetailsResults[index];
            
            if (details) {
              return {
                ...localItem,
                ...details,
              } as DisplayCartItem;
            }
            return null;
          })
          .filter((item): item is DisplayCartItem => item !== null);

        setDetailedCart(finalCart);
      } catch (err) {
        setError("Failed to fetch all product details.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchDetails();
  }, [localCart, detailedCart]);

  return { detailedCart, isLoading, error };
};