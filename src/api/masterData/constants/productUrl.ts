import { masterDataUrl } from "@/api/masterData/constants/masterDataUrl";
import qs from "qs";

const productBase = (path?: string) => "/Product" + path ?? "";

export const GET_ALL = masterDataUrl(productBase("/Web"));
export const GET_DETAIL = (productId: number) =>
  masterDataUrl(productBase(`/${productId}`));

export const GET_BY_IDS = (productIds: number[]) =>
  masterDataUrl(productBase("/Ids?" + qs.stringify({ ids: productIds })));

export const GET_BY_CATEGORY_ID = (categoryId: number) =>
  masterDataUrl(productBase(`/Category/${categoryId}`));
