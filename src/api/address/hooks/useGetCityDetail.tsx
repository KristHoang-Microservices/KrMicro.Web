import useSWR from "swr";
import { addressUrl } from "../constants";
import { getDefaultFetcher } from "@/api/common/fetchers";
import { City } from "@/api/address/models";
import { GetDetailCityRequest } from "@/api/address/requests";

export function useGetCityDetail(request: GetDetailCityRequest) {
  return useSWR(
    request.code !== -1 ? addressUrl.getDetailCity(request.code) : null,
    (url) => getDefaultFetcher<City>(url, { isRequiredToken: false }),
  );
}
