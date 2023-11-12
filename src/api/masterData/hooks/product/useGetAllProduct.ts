"use client";
import useSWR, { SWRResponse } from "swr";
import { productUrl } from "@/api/masterData/constants";
import { Product } from "@/api/masterData/models/product.model";
import { getListDataFetcher } from "@/api/common/fetchers";

export function useGetAllProduct(): SWRResponse<Product[]> {
  return useSWR(productUrl.GET_ALL, getListDataFetcher<Product>);
}
