"use client";
import useSWR, { SWRResponse } from "swr";
import { masterDataUrl } from "@/api/masterData/constants";
import { Product } from "@/api/masterData/models/product.model";
import { baseApi } from "@/api/common/constants/base.api";
import { ListResponseModels } from "@/api/common/models/listResponse.models";

export function useGetAllProduct(): SWRResponse<Product[]> {
  const fetcher = (apiUrl: string) =>
    baseApi
      .get<ListResponseModels<Product>>(apiUrl)
      .then((res) => res.data?.listData ?? []);

  return useSWR(masterDataUrl("/Product"), fetcher);
}
