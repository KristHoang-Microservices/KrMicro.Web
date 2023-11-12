import { masterDataUrl } from "@/api/masterData/constants/masterDataUrl";

const brandBase = (path?: string) => "/Brand" + path ?? "";

export const GET_ALL = masterDataUrl(brandBase("/Web"));
export const GET_DETAIL = (brandId: string) =>
  masterDataUrl(brandBase(`/${brandId}`));
