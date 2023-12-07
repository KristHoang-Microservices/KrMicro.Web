import { useGetPromoDetail } from "@/api/orders/hooks/promo";
import { useEffect } from "react";
import { applyPromo, cartSelector } from "@/store/slices/cartStore.slice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { Card, CardHeader } from "@nextui-org/card";

export function AppliedPromo({ promoCode }: { promoCode: string }) {
  const cart = useAppSelector(cartSelector);
  const dispatch = useAppDispatch();

  const { data: promoDetail, isLoading: fetchingPromo } =
    useGetPromoDetail(promoCode);

  useEffect(() => {
    if (promoDetail !== undefined) {
      dispatch(applyPromo(promoDetail));
    }
  }, [dispatch, promoDetail, cart.promo]);
  return (
    <Card shadow={"sm"} isHoverable={true} fullWidth={true}>
      <CardHeader className={"flex gap-2 justify-between"}>
        <div className={"text-left font-semibold"}>
          <p>🎉 {promoDetail?.name}</p>
          <p className={"text-accent-700 text-sm"}>
            Mã áp dụng: {promoDetail?.code}
          </p>
        </div>
        <p>- {(promoDetail?.value ?? 0).toLocaleString()} VND</p>
      </CardHeader>
    </Card>
  );
}
