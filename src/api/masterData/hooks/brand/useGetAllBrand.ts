"use client";
import useSWR, { SWRResponse } from "swr";
import { masterDataUrl } from "@/api/masterData/constants";
import { Brand } from "@/api/masterData/models";
import { getListDataFetcher } from "@/api/common/fetchers";

export function useGetAllBrand(): SWRResponse<Brand[]> {
  return useSWR(masterDataUrl("/Brand"), getListDataFetcher<Brand>);
}
