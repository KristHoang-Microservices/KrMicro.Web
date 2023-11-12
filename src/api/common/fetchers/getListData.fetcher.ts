import { baseApi } from "@/api/common/constants/base.api";
import { ListResponseModel } from "@/api/common/models/listResponse.model";
import { localStorageServices } from "@/service";

export const getListDataFetcher = async <TData>(apiUrl: string) => {
  const accessToken = localStorageServices.get("accessToken") ?? undefined;
  const res = await baseApi.get<ListResponseModel<TData>>(apiUrl, {
    headers: {
      Authorization:
        accessToken !== undefined ? `Bearer ${accessToken}` : undefined,
    },
  });
  return res.data?.listData ?? [];
};
