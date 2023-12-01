import useSWR from "swr";
import { addressUrl } from "../constants";
import { getDefaultFetcher } from "@/api/common/fetchers";
import { City } from "@/api/address/models";

export function useGetCityList() {
  return useSWR(addressUrl.getListCity, getDefaultFetcher<City[]>);
}
