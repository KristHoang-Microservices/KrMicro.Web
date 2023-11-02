import { Brand, Category, ProductSize } from "../models";
import { Status } from "@/models";

export interface Product {
  id: number;
  name: string;
  brandId: number;
  brand: Brand;
  categoryId: number;
  category: Category;
  importFrom: string;
  releaseYear: string;
  imageUrls: string;
  description: string;
  style: string;
  fragranceDescription: string;
  productSizes: ProductSize[];
  status: Status;

  [index: string]: string | number | Brand | Category | unknown[];
}
