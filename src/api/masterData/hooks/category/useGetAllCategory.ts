"use client";
import useSWR, { SWRResponse } from "swr";
import { masterDataUrl } from "@/api/masterData/constants";
import { Category } from "@/api/masterData/models";
import { getListDataFetcher } from "@/api/common/fetchers";

export function useGetAllCategory(): SWRResponse<Category[]> {
  return useSWR(masterDataUrl("/Category"), getListDataFetcher<Category>);
}
