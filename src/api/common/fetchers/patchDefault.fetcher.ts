import { baseApi } from "@/api/common/constants/base.api";
import { localStorageServices } from "@/service";
import { FetcherResponse } from "swr/_internal";
import { AxiosResponse } from "axios";
import { accessTokenLocalStorageKey } from "@/constants";

export const patchDefaultFetcher = async <TData, TResponse>(
  apiUrl: string,
  { arg }: { arg: TData },
): Promise<FetcherResponse<TResponse>> => {
  const accessToken = localStorageServices.get("accessToken");
  const res = await baseApi.patch<TData, AxiosResponse<TResponse>>(
    apiUrl,
    arg,
    {
      headers: {
        Authorization:
          accessToken !== null ? `Bearer ${accessToken}` : undefined,
      },
    },
  );

  if (res.status === 401) {
    localStorageServices.remove(accessTokenLocalStorageKey);
  }
  return res.data;
};
