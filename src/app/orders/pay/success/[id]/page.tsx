"use client";
import React, { useEffect, useState } from "react";
import ConfettiIcon from "@/assets/svg/confetti.svg";
import { Divider, Image } from "@nextui-org/react";
import { Heading } from "@/components/Heading";
import Confetti from "react-dom-confetti";
import { accentFont, cartLocalStorageKey, confettiConfig } from "@/constants";
import { useGetOrder } from "@/api/orders/hooks/orders";
import { User } from "@nextui-org/user";
import { useGetProductsByIds } from "@/api/masterData/hooks/product/useGetProductsByIds";
import { AppliedPromo } from "@/components/AppliedPromo";
import { useAppDispatch } from "@/store/hooks";
import { localStorageServices } from "@/service";
import { remove } from "@/store/slices/cartStore.slice";

interface PageProps {
  params: {
    id: number;
  };
}
export default function SuccessPaid({ params: { id } }: PageProps) {
  const [pop, setPopConfetti] = useState<boolean>(false);
  const { data: order } = useGetOrder({ request: { orderId: id } });
  const { data: orderedProducts } = useGetProductsByIds({
    ids: order?.orderDetails.map((x) => x.productId) ?? [],
  });

  const dispatch = useAppDispatch();
  useEffect(() => {
    localStorageServices.remove(cartLocalStorageKey);
    dispatch(remove);
  }, [dispatch]);

  useEffect(() => {
    setPopConfetti(true);
  }, [pop]);

  return (
    <div className={"flex flex-col md:flex-row gap-4"}>
      <div
        className={
          "flex flex-col gap-2 w-full h-[60vh] justify-center items-center text-center"
        }
      >
        <Confetti config={confettiConfig} active={pop} />
        <Image src={ConfettiIcon.src} alt={"Success"} width={"100px"} />
        <Heading>Mã đơn hàng của bạn là #{id}</Heading>
        <Heading className={"text-2xl text-accent"}>
          Đơn hàng của bạn đang được chuẩn bị
        </Heading>
        <p>Cảm ơn bạn đã lựa chọn August Perfume</p>
        <p>Xin vui lòng giữ điện thoại để xác nhận đơn hàng</p>
      </div>
      <div className={"rounded-xl bg-white shadow w-full md:w-[40vw]"}>
        <div className={"w-full text-center"}>
          <Heading className={"text-lg my-4"}>Danh sách sản phẩm</Heading>
          <div className={"p-2 w-full "}>
            <div
              className={
                "w-full max-h-[60vh] overflow-y-auto px-2 flex flex-col items-start gap-2 mb-4"
              }
            >
              {order?.orderDetails.map((item) => {
                const product = orderedProducts?.find(
                  (val) => val.id === item.productId,
                );

                return (
                  <div
                    key={`PayItem ${item.productId} ${item.sizeCode}`}
                    className={"flex gap-2 justify-between w-full"}
                  >
                    <User
                      name={product?.name}
                      avatarProps={{
                        radius: "sm",
                        className: "min-w-[75px] h-[75px] border-2",
                        src: product?.imageUrls,
                      }}
                      description={`${product?.brand.name} | ${item.sizeCode}`}
                      classNames={{
                        name:
                          "md:text-md text-sm line-clamp-2 text-start w-[75%] " +
                          accentFont.className,
                        description: "text-sm",
                      }}
                    />
                    <div className={"text-end flex-1"}>
                      <p className={"text-bold"}>x {item.amount}</p>
                      <p className={"text-sm"}>
                        {item.price.toLocaleString()} đ
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
            <Divider />
            <div
              className={
                "col-span-2 rounded-md w-full my-6 flex flex-col gap-2"
              }
            >
              <div className={"flex justify-between gap-2"}>
                <p className={"uppercase"}>Tạm tính</p>
                <p className={"font-semibold " + accentFont.className}>
                  {(order?.total ?? 0).toLocaleString()} đ
                </p>
              </div>
              <div className={"flex justify-between gap-2"}>
                <p className={"uppercase"}>Vận chuyển</p>
                <p
                  className={"font-semibold text-green " + accentFont.className}
                >
                  Miễn phí
                </p>
              </div>
              {order != undefined &&
                order.promo !== undefined &&
                order.promo !== null && (
                  <div className={"flex flex-col items-start gap-1 w-full"}>
                    <p className={"uppercase"}>Giảm giá</p>
                    <AppliedPromo promoCode={order.promo?.code} />
                  </div>
                )}
              <Divider className={"my-4"} />
              <div className={"flex justify-between gap-2"}>
                <p className={"uppercase text-xl"}>Tổng tiền</p>
                <p
                  className={
                    "font-semibold text-green text-2xl " + accentFont.className
                  }
                >
                  {(order?.total ?? 0).toLocaleString()} đ
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
