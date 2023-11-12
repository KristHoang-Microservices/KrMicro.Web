"use client";
import useSWR, { SWRResponse } from "swr";
import { brandUrl } from "@/api/masterData/constants";
import { Brand } from "@/api/masterData/models";
import { getListDataFetcher } from "@/api/common/fetchers";

export function useGetAllBrand(): SWRResponse<Brand[]> {
  return useSWR(brandUrl.GET_ALL, getListDataFetcher<Brand>);
}
