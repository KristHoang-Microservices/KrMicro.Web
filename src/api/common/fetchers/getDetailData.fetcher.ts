import { baseApi } from "@/api/common/constants/base.api";
import { DetailResponseModel } from "@/api/common/models";
import { localStorageServices } from "@/service";
import { accessTokenLocalStorageKey } from "@/constants";

export const getDetailDataFetcher = async <TData>(apiUrl: string) => {
  const accessToken = localStorageServices.get("accessToken") ?? undefined;

  const res = await baseApi.get<DetailResponseModel<TData>>(apiUrl, {
    headers: {
      Authorization:
        accessToken !== undefined ? `Bearer ${accessToken}` : undefined,
    },
  });

  if (res.status === 401) {
    localStorageServices.remove(accessTokenLocalStorageKey);
  }
  return res.data.data;
};
