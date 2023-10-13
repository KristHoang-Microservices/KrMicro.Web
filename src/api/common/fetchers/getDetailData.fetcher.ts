import { baseApi } from "@/api/common/constants/base.api";
import { DetailResponseModel } from "@/api/common/models";

export const getDetailDataFetcher = <TData>(apiUrl: string) =>
  baseApi.get<DetailResponseModel<TData>>(apiUrl).then((res) => {
    return res.data.data;
  });
