import useSWR from "swr";
import { addressUrl } from "../constants";
import { getDefaultFetcher } from "@/api/common/fetchers";
import { City } from "@/api/address/models";
import { GetDetailCityRequest } from "@/api/address/requests";

export function useGetCityDetail(request: GetDetailCityRequest) {
  return useSWR(
    addressUrl.getDetailCity(request.code),
    getDefaultFetcher<City>,
  );
}
