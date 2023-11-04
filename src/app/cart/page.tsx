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
                {cart.total.toLocaleString()} đ
              </p>
            </div>
            <div className={"flex justify-between gap-2"}>
              <p className={"uppercase"}>Vận chuyển</p>
              <p className={"font-semibold text-green " + accentFont.className}>
                Miễn phí
              </p>
            </div>
            <div className={"flex justify-between gap-2"}>
              <p className={"uppercase"}>VAT 8%</p>
              <p className={"font-semibold text-green " + accentFont.className}>
                {(cart.total * 0.08).toLocaleString()} đ
              </p>
            </div>
            <div className={"flex gap-2"}>
              <Input placeholder={"Mã giảm giá"} />
              <Button>Áp dụng</Button>
            </div>
            <Divider className={"my-4"} />
            <div className={"flex justify-between gap-2"}>
              <p className={"uppercase text-xl"}>Tổng tiền</p>
              <p
                className={
                  "font-semibold text-green text-2xl " + accentFont.className
                }
              >
                {(cart.total * 0.08 + cart.total).toLocaleString()} đ
              </p>
            </div>
            <Button
              fullWidth={true}
              size={"lg"}
              color={"primary"}
              className={"my-6"}
            >
              Thanh toán
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