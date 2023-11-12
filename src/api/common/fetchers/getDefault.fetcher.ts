import { baseApi } from "@/api/common/constants/base.api";
import { localStorageServices } from "@/service";

export const getDefaultFetcher = async <TData>(
  apiUrl: string,
): Promise<TData> => {
  const accessToken = localStorageServices.get("accessToken") ?? undefined;
  const res = await baseApi.get<TData>(apiUrl, {
    headers: {
      Authorization:
        accessToken !== undefined ? `Bearer ${accessToken}` : undefined,
    },
  });
  return res.data;
};
