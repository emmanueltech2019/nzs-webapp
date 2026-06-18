
export type LocalCartItem = {
  productId: string;
  quantity: number;
  color?: any;
  size: string;
};
export interface ColorOptionT {
  name: string;
  hex: string;
  textColor: string;
}
export interface PopulatedCategoryT {
  _id: string;
  name: string;
  slug: string;
}
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
  category?: string[];
  businessId?: {
    businessName: string;
  };
  size: string[];
  color: ColorOptionT[];
  industry?: PopulatedCategoryT;
  categoryRef?: PopulatedCategoryT;
  subCategory?: PopulatedCategoryT;
  
}
export interface DisplayCartItem extends LocalCartItem {
  _id: string;
  name: string;
  image?: string;
  price: number; 
}
export type CartDrawerProps = {
  isOpen: boolean;
  onClose: () => void;
  cartItems: DisplayCartItem[];
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
    size?: string;
    color?: string;
}
  
export interface CartT {
    _id: string;   
    items: CartItemT[]; 
}

  