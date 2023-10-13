"use client";
import useSWR, { SWRResponse } from "swr";
import { masterDataUrl } from "@/api/masterData/constants";
import { Product } from "@/api/masterData/models/product.model";
import { getListDataFetcher } from "@/api/common/fetchers";

export function useGetAllProduct(): SWRResponse<Product[]> {
  return useSWR(masterDataUrl("/Product"), getListDataFetcher<Product>);
}
