// export interface ProductT {
//     _id: number;
//     name: string;
//     price: string;
//     description: string;
//     images: string[]
// }

// export interface CartItemT {
//     productId: ProductT[];
//     quantity: number;
//     price: number;
//     _id: string;
//   }
export type LocalCartItem = {
  productId: string;
  quantity: number;
  color: string;
  size: string;
};
export interface ProductT {
  _id: string;
  name: string;
  images: string[]; // Add images as an array of strings
  price: number;
  description: string;
  quantity: number;
  discount: number;
  type: string;
  createdAt: string;
  quantityInfo: quantityInfo;
  completedStatus: boolean;
  totalStock:number;
  stockSold?:number;
  // stockSold:number
}
export type DisplayCartItem = LocalCartItem & ProductT;
export type CartDrawerProps = {
  isOpen: boolean;
  onClose: () => void;
  cartItems: DisplayCartItem[];
  imageUrl?: string;
  // New props for cart management
  updateItemQuantity: (productId: string,  size: string, newQuantity: number) => void;
  removeItem: (productId: string, size: string) => void;
};
export interface quantityInfo {
  quantity: number;
  quantityType: string;
  quantityUnit: string

}
export interface CartItemT {
    productId: ProductT;
    quantity: number;
    price: number;
    _id: string;
  }
  
  export interface CartT {
    _id: string;   
    items: CartItemT[]; 
  }

  