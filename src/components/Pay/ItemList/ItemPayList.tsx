"use client";
import { ReactElement } from "react";
import { cartSelector } from "@/store/slices/cartStore.slice";
import { useAppSelector } from "@/store/hooks";
import { Heading } from "@/components/Heading";
import { accentFont } from "@/constants";
import { User } from "@nextui-org/user";

export function ItemPayList(): ReactElement {
  const cart = useAppSelector(cartSelector);
  return (
    <div className={"w-full text-center"}>
      <Heading className={"text-lg"}>Danh sách sản phẩm</Heading>
      <div
        className={
          "p-2 max-h-[80vw] overflow-y-auto w-full flex flex-col items-start gap-2"
        }
      >
        {cart.items.map((item) => (
          <div
            key={`PayItem ${item.productId} ${item.sizeCode}`}
            className={"flex gap-2 justify-between"}
          >
            <User
              name={item.product?.name}
              avatarProps={{
                radius: "sm",
                className: "w-[75px] h-[75px] border-2",
                src: item.product?.imageUrls,
              }}
              description={`${item?.product?.brand.name} | ${item.sizeCode}`}
              classNames={{
                name:
                  "md:text-md text-sm line-clamp-2 text-start w-[75%] " +
                  accentFont.className,
                description: "text-sm",
              }}
            />
            <div className={"text-end flex-1"}>
              <p className={"text-bold"}>x {item.amount}</p>
              <p className={"text-sm"}>{item.price.toLocaleString()} đ</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
