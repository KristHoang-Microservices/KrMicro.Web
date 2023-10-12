"use client";
import useSWR, { SWRResponse } from "swr";
import { masterDataUrl } from "@/api/masterData/constants";
import { baseApi } from "@/api/common/constants/base.api";
import { ListResponseModels } from "@/api/common/models/listResponse.models";
import { Brand } from "@/api/masterData/models";

export function useGetAllBrand(): SWRResponse<Brand[]> {
  const fetcher = (apiUrl: string) =>
    baseApi
      .get<ListResponseModels<Brand>>(apiUrl)
      .then((res) => res.data?.listData ?? []);

  return useSWR(masterDataUrl("/Brand"), fetcher);
}
