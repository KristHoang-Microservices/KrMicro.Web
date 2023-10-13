"use client";
import useSWR, { SWRResponse } from "swr";
import { masterDataUrl } from "@/api/masterData/constants";
import { Product } from "@/api/masterData/models/product.model";
import { getDetailDataFetcher } from "@/api/common/fetchers/getDetailData.fetcher";

export interface GetDetailProductRequest {
  id: number;
}

export function useGetDetailProduct({
  id,
}: GetDetailProductRequest): SWRResponse<Product> {
  return useSWR(masterDataUrl("/Product/" + id), getDetailDataFetcher<Product>);
}
