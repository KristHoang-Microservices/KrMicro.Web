"use client";
import useSWR, { SWRResponse } from "swr";
import { productUrl } from "@/api/masterData/constants";
import { Product } from "@/api/masterData/models/product.model";
import { getListDataFetcher } from "@/api/common/fetchers";

interface UseGetProductsByIdsProps {
  ids: number[];
}

export function useGetProductsByIds({
  ids,
}: UseGetProductsByIdsProps): SWRResponse<Product[]> {
  return useSWR(productUrl.GET_BY_IDS(ids), getListDataFetcher<Product>);
}
