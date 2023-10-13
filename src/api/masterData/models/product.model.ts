import { Brand } from "@/api/masterData/models/brand.model";
import { Category } from "@/api/masterData/models/category.model";

export interface Product {
  id: number;
  name: string;
  price: number;

  brandId: number;
  brand: Brand;
  categoryId: number;
  category: Category;

  importFrom: string;
  releaseYear: number;

  imageUrls: string;
  description: string;
  style: string;
  fragranceDescription: string;

  stock: number;
}
