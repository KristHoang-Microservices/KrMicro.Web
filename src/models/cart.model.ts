import { Product, Size } from "@/api/masterData/models";

export interface CartItem {
  productId: number;
  product?: Product;
  sizeCode: string;
  size?: Size;
  amount: number;
  price: number;
}

export interface Cart {
  items: CartItem[];
}
