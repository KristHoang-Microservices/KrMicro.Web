import { masterDataUrl } from "@/api/masterData/constants/masterDataUrl";

const categoryBase = (path?: string) => "/Category" + path ?? "";

export const GET_ALL = masterDataUrl(categoryBase("/Web"));
export const GET_DETAIL = (categoryId: number) =>
  masterDataUrl(categoryBase(`/${categoryId}`));
