import { masterDataUrl } from "@/api/masterData/constants/masterDataUrl";

const productBase = (path?: string) => "/Product" + path ?? "";

export const GET_ALL = masterDataUrl(productBase("/Web"));
export const GET_DETAIL = (productId: number) =>
  masterDataUrl(productBase(`/${productId}`));
