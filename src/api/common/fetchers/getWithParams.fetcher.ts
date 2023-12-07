import { baseApi } from "@/api/common/constants/base.api";
import { localStorageServices } from "@/service";
import { accessTokenLocalStorageKey } from "@/constants";
import qs from "qs";

export const getParamsFetcher = async <TData>(
  apiUrl: string,
  params?: unknown,
): Promise<TData> => {
  const accessToken =
    localStorageServices.get(accessTokenLocalStorageKey) ?? undefined;
  const res = await baseApi.get<TData>(apiUrl, {
    headers: {
      Authorization:
        accessToken !== undefined ? `Bearer ${accessToken}` : undefined,
    },
    params,
    paramsSerializer: (p) => qs.stringify(p),
  });

  if (res.status === 401) {
    localStorageServices.remove(accessTokenLocalStorageKey);
  }

  return res.data;
};
