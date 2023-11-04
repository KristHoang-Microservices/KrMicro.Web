import { baseApi } from "@/api/common/constants/base.api";
import { DetailResponse } from "@/api/common/models";

export const getDetailDataFetcher = <TData>(apiUrl: string) =>
  baseApi.get<DetailResponse<TData>>(apiUrl).then((res) => {
    return res.data.data;
  });
