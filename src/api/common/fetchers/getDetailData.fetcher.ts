import { baseApi } from "@/api/common/constants/base.api";
import { DetailResponseModel } from "@/api/common/models";
import { localStorageServices } from "@/service";

export const getDetailDataFetcher = async <TData>(apiUrl: string) => {
  const accessToken = localStorageServices.get("accessToken") ?? undefined;

  const res = await baseApi.get<DetailResponseModel<TData>>(apiUrl, {
    headers: {
      Authorization:
        accessToken !== undefined ? `Bearer ${accessToken}` : undefined,
    },
  });
  return res.data.data;
};
