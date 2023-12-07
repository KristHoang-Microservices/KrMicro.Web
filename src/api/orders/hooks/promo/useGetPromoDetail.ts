import { Promo } from "@/api/orders/models/promo.model";
import useSWR from "swr";
import { promoUrl } from "../../constants";
import { getDetailDataFetcher } from "@/api/common/fetchers";

export function useGetPromoDetail(code?: Promo["code"]) {
  return useSWR(
    code === undefined ? null : promoUrl.GET_DETAIL(code),
    getDetailDataFetcher<Promo>,
  );
}
