import { baseApi } from "@/api/common/constants/base.api";
import { localStorageServices } from "@/service";
import { FetcherResponse } from "swr/_internal";
import { AxiosResponse } from "axios";

export const postDefaultFetcher = async <TData, TResponse>(
  apiUrl: string,
  { arg }: { arg: TData },
): Promise<FetcherResponse<TResponse>> => {
  const accessToken = localStorageServices.get("accessToken");
  const res = await baseApi.post<TData, AxiosResponse<TResponse>>(apiUrl, arg, {
    headers: {
      Authorization: accessToken !== null ? `Bearer ${accessToken}` : undefined,
    },
  });

  return res.data;
};
