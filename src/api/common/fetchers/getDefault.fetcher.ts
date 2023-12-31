import { baseApi } from "@/api/common/constants/base.api";
import { localStorageServices } from "@/service";
import { accessTokenLocalStorageKey } from "@/constants";

export const getDefaultFetcher = async <TData>(
  apiUrl: string,
  config?: {
    isRequiredToken?: boolean;
  },
): Promise<TData> => {
  let accessToken = undefined;

  if (config?.isRequiredToken !== false) {
    accessToken =
      localStorageServices.get(accessTokenLocalStorageKey) ?? undefined;
  }
  const res = await baseApi.get<TData>(apiUrl, {
    headers: {
      Authorization:
        accessToken !== undefined ? `Bearer ${accessToken}` : undefined,
    },
  });

  if (res.status === 401) {
    localStorageServices.remove(accessTokenLocalStorageKey);
  }

  return res.data;
};
