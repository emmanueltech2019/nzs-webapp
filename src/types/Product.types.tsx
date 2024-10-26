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
export interface ProductT {
  _id: string;
  name: string;
  images: string[]; // Add images as an array of strings
  price: number;
  description: string;
}

export interface CartItemT {
  _id: string;
  productId: ProductT;
  quantity: number;
  price: number;
}

export interface CartT {
  _id: string;
  items: CartItemT[];
}
