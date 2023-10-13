import { baseApi } from "@/api/common/constants/base.api";
import { ListResponseModel } from "@/api/common/models/listResponse.model";

export const getListDataFetcher = <TData>(apiUrl: string) =>
  baseApi.get<ListResponseModel<TData>>(apiUrl).then((res) => {
    return res.data?.listData ?? [];
  });
