import { Audit, Tracking } from "@/api/common/models";
import { Size } from "./";

export interface ProductSize extends Tracking, Audit {
  id: number;

  sizeId: number;
  productId: number;

  stock: number;
  price: number;

  size: Size;
}
