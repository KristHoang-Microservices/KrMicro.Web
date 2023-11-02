"use client";
import { useAppSelector } from "@/store/hooks";
import { cartSelector } from "@/store/slices/cartStore.slice";
import { Button, Divider } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { CartItem } from "@/models/cart.model";
import { CartItemRender } from "@/components/Cart/CartItem";
import { accentFont } from "@/constants";
import { Input } from "@nextui-org/input";

export default function CartPage() {
  const cart = useAppSelector(cartSelector);
  const router = useRouter();
  return (
    <div className={"px-4 py-2"}>
      <div className={"flex gap-2 items-center justify-between w-full"}>
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
        <Button color={"primary"}>Thanh toán</Button>
      </div>
      <div className={"w-full my-6 px-4 flex flex-col gap-4"}>
        {cart.items.map((item: CartItem, index: number) => (
          <CartItemRender key={`CartItem ${index}`} item={item} index={index} />
        ))}
      </div>
      <Divider />
      <div className={"w-full px-4 flex justify-between mt-6 "}>
        <div className={"flex gap-2"}>
          <Input variant={"bordered"} placeholder={"Mã giảm giá"} />
          <Button color={"default"}>Áp dụng</Button>
        </div>
        <div
          className={
            "flex justify-between gap-2 text-2xl " + accentFont.className
          }
        >
          <p>Tổng cộng :</p>
          <p className={"font-semibold"}>
            {cart.items
              .reduce((val, i) => val + (i.amount ?? 0) * (i.price ?? 0), 0)
              .toLocaleString()}
            đ
          </p>
        </div>
      </div>
    </div>
  );
}
