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
  quantity: number;
  discount: number;
  type: string;
  createdAt: string;
  completedStatus: boolean;
  // stockSold:number
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

  