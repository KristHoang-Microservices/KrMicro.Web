import { baseApi } from "@/api/common/constants/base.api";
import { ListResponseModel } from "@/api/common/models/listResponse.model";
import { localStorageServices } from "@/service";
import qs from "qs";
import { accessTokenLocalStorageKey } from "@/constants";

export const getListDataFetcher = async <TData, TQuery = {}>(
  apiUrl: string,
  query?: TQuery,
) => {
  const accessToken = localStorageServices.get("accessToken") ?? undefined;
  const res = await baseApi.get<ListResponseModel<TData>>(apiUrl, {
    headers: {
      Authorization:
        accessToken !== undefined ? `Bearer ${accessToken}` : undefined,
    },
    params: query,
    paramsSerializer: (params) => {
      return qs.stringify(params);
    },
  });

  if (res.status === 401) {
    localStorageServices.remove(accessTokenLocalStorageKey);
  }
  return res.data?.listData ?? [];
};
