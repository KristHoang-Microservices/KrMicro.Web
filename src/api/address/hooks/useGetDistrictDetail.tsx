import useSWR from "swr";
import { addressUrl } from "../constants";
import { getDefaultFetcher } from "@/api/common/fetchers";
import { District } from "@/api/address/models";
import { GetDetailDistrictRequest } from "@/api/address/requests";

export function useGetDistrictDetail(request: GetDetailDistrictRequest) {
  return useSWR(
    request.code !== -1 ? addressUrl.getDetailDistrict(request.code) : null,
    (url) => getDefaultFetcher<District>(url, { isRequiredToken: false }),
  );
}
