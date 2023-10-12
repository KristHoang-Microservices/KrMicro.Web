import { Brand } from "@/api/masterData/models/brand.model";

export interface Product {
  id: number;
  name: string;
  price: number;
  brand: Brand;
  brandId: number;
  categoryId: number;
  imageUrls: string;
}
