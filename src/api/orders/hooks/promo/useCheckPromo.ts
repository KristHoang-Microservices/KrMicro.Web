import { Promo } from "@/api/orders/models/promo.model";
import useSWR from "swr";
import { promoUrl } from "../../constants";
import { getDefaultFetcher } from "@/api/common/fetchers";
import toast from "react-hot-toast";

export function useCheckPromo(code?: Promo["code"]) {
  return useSWR(
    code === undefined ? null : promoUrl.CHECK_PROMO(code),
    getDefaultFetcher<boolean>,
    {
      onSuccess: (data) => {
        if (!data) {
          toast.error("Mã giảm giá không hợp lệ!", { position: "top-left" });
        }
      },
    },
  );
}
