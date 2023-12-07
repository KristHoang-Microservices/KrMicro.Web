import { Product, Size } from "@/api/masterData/models";
import { Promo } from "@/api/orders/models/promo.model";

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
  total: number;
  promo?: Promo;
}
