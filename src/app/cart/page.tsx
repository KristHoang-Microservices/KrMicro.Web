"use client";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { cartSelector, clearPromo } from "@/store/slices/cartStore.slice";
import { Button, Divider } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { Cart, CartItem } from "@/models/cart.model";
import { CartItemRender } from "@/components/Cart/CartItem";
import { accentFont, cartLocalStorageKey } from "@/constants";
import { Input } from "@nextui-org/input";
import { useCheckOrder } from "@/api/orders/hooks/orders";
import { useEffect, useState } from "react";
import { CheckOrderResponse } from "@/api/orders/hooks/response/checkOrder.response";
import { useCheckPromo } from "@/api/orders/hooks/promo";
import { AppliedPromo } from "@/components/AppliedPromo";
import { localStorageServices } from "@/service";
import { PromoUnit } from "@/api/orders/models/enum";

export default function CartPage() {
  const cart = useAppSelector(cartSelector);
  const router = useRouter();
  const dispatch = useAppDispatch();

  const { trigger: checkOrder, isMutating: checking } = useCheckOrder();

  const [checkData, setCheckData] = useState<CheckOrderResponse>();

  useEffect(() => {
    (async () => {
      const res = await checkOrder({
        orderDetails: cart.items.map((item) => ({
          productId: item.productId,
          amount: item.amount,
          sizeCode: item.sizeCode,
        })),
      });
      setCheckData(res);
    })();
  }, [cart.items, checkOrder]);

  const [promoCode, setPromoCode] = useState<string>("");

  const [requestCheckPromo, setRequestCheckPromo] = useState<
    string | undefined
  >(undefined);

  const [requestDetailPromo, setRequestDetailPromo] = useState<
    string | undefined
  >(undefined);

  const { data: checkedPromoCode, isLoading: checkingPromo } =
    useCheckPromo(requestCheckPromo);

  useEffect(() => {
    if (checkedPromoCode) {
      setRequestDetailPromo(promoCode);
    }
  }, [checkedPromoCode, promoCode]);

  useEffect(() => {
    const promoLocal =
      localStorageServices.get<Cart>(cartLocalStorageKey)?.promo;
    if (promoLocal !== undefined) {
      setRequestCheckPromo(promoLocal.code);
    }
  }, [requestCheckPromo]);

  const onClearPromo = () => {
    setPromoCode("");
    setRequestCheckPromo("");
    dispatch(clearPromo());
  };

  return (
    <div className={"px-4 py-2"}>
      <div className={"flex gap-2 items-center w-full"}>
        <div className={"flex flex-col md:flex-row gap-2 items-center"}>
          <Button
            variant={"bordered"}
            className={"rounded-full mr-2"}
            onPress={() => router.back()}
          >
            Trở lại
          </Button>
          <span className={"text-xl font-semibold"}>Giỏ hàng</span>
        </div>
      </div>
      {cart.items.length > 0 ? (
        <div className={"md:grid-cols-6 grid grid-cols-1 gap-4"}>
          <div className={"col-span-4"}>
            <div className={"w-full my-6 px-4 flex flex-col gap-4"}>
              <div className={"grid grid-cols-8 gap-2"}>
                <div
                  className={
                    "col-span-4 text-start uppercase text-sm text-gray-700"
                  }
                >
                  Chi tiết sản phẩm
                </div>
                <div
                  className={
                    "text-center col-span-2 uppercase text-sm text-gray-700"
                  }
                >
                  Số lượng
                </div>
                <div
                  className={
                    "text-center col-span-1 uppercase text-sm text-gray-700"
                  }
                >
                  Đơn giá
                </div>
                <div
                  className={
                    "text-end col-span-1 uppercase text-sm text-gray-700"
                  }
                >
                  Tổng tiền
                </div>
              </div>
              <Divider />
              {cart.items.map((item: CartItem, index: number) => (
                <CartItemRender
                  key={`CartItem ${index}`}
                  item={item}
                  index={index}
                  isLacking={
                    checkData?.data?.find(
                      (val) =>
                        val.productId === parseInt(`${item.productId}`) &&
                        val.sizeCode === item.sizeCode,
                    ) !== undefined
                  }
                />
              ))}
            </div>
          </div>
          <div
            className={
              "col-span-2 rounded-md shadow h-fit p-4 flex-col flex gap-2 border-t-[10px] border-accent-400"
            }
          >
            <div className={"flex justify-between gap-2"}>
              <p className={"uppercase"}>Tạm tính</p>
              <p className={"font-semibold " + accentFont.className}>
                {cart.total?.toLocaleString()} đ
              </p>
            </div>
            <div className={"flex justify-between gap-2"}>
              <p className={"uppercase"}>Vận chuyển</p>
              <p className={"font-semibold text-green " + accentFont.className}>
                Miễn phí
              </p>
            </div>
            <div className={"flex gap-2 items-center relative"}>
              <Input
                placeholder={"Mã giảm giá"}
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                isDisabled={checkedPromoCode}
              />
              {!checkedPromoCode ? (
                <Button
                  onClick={() => {
                    setRequestCheckPromo(promoCode);
                  }}
                  isLoading={checkingPromo}
                  isDisabled={checkedPromoCode}
                  size={"md"}
                >
                  Áp dụng
                </Button>
              ) : (
                <Button
                  onClick={onClearPromo}
                  isLoading={checkingPromo}
                  color={"danger"}
                  size={"md"}
                >
                  Hủy mã
                </Button>
              )}
            </div>
            {checkedPromoCode && requestCheckPromo !== undefined && (
              <AppliedPromo promoCode={requestCheckPromo} />
            )}
            <Divider className={"my-4"} />
            <div className={"flex justify-between gap-2"}>
              <p className={"uppercase text-xl"}>Tổng tiền</p>
              <p
                className={
                  "font-semibold text-green text-2xl " + accentFont.className
                }
              >
                {(
                  cart.total -
                  (cart?.promo
                    ? cart?.promo?.promoUnit === PromoUnit.Raw
                      ? cart?.promo?.value ?? 0
                      : cart.total * (1 - (cart?.promo?.value ?? 0))
                    : 0)
                ).toLocaleString()}{" "}
                đ
              </p>
            </div>
            <Button
              fullWidth={true}
              size={"lg"}
              color={"primary"}
              className={"my-6"}
              isLoading={checking}
              isDisabled={!checkData?.isSuccess}
              onClick={async () => {
                if (checkData?.isSuccess) router.push("/orders/pay");
              }}
            >
              {checking ? "Đang kiểm tra" : "Thanh toán"}
            </Button>
          </div>
        </div>
      ) : (
        <div className={"text-center py-8"}>
          <p>Giỏ hàng đang rỗng nè!</p>
        </div>
      )}
    </div>
  );
}
