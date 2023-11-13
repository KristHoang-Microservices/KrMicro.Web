import { ReactElement } from "react";
import { CartItem } from "@/models/cart.model";
import { User } from "@nextui-org/user";
import { useGetDetailProduct } from "@/api/masterData/hooks/product/useGetDetailProduct";
import { accentFont } from "@/constants";
import { Button } from "@nextui-org/react";
import { HiMinus, HiPlus } from "react-icons/hi";
import { Input } from "@nextui-org/input";
import { useAppDispatch } from "@/store/hooks";
import { cart } from "@/store/slices/cartStore.slice";

interface CartItemProps {
  item: CartItem;
  index: number;
}

export function CartItemRender({ item, index }: CartItemProps): ReactElement {
  const { data: product } = useGetDetailProduct({ id: item.productId });
  const dispatch = useAppDispatch();

  return (
    <div className={"grid grid-cols-8 gap-2"}>
      <div className={"col-span-4"}>
        <User
          name={product?.name}
          avatarProps={{
            radius: "sm",
            className: "w-[75px] h-[75px] border-2",
            src: product?.imageUrls,
          }}
          description={item.sizeCode}
          classNames={{
            name: "md:text-md text-sm  line-clamp-2 " + accentFont.className,
            description: "text-md",
          }}
        />
      </div>
      <div className={"flex justify-center items-center gap-2 col-span-2"}>
        <div className={"flex flex-row gap-2 items-between"}>
          <Button
            isIconOnly
            variant={"bordered"}
            size={"sm"}
            onClick={() => dispatch(cart.actions.remove(item))}
          >
            <HiMinus />
          </Button>
          <Input
            variant={"underlined"}
            className={"w-[75px] content-center"}
            value={`${item.amount}`}
            type={"number"}
            onChange={(e) => {
              const value = parseInt(e.target.value);

              if (value <= 0 || Number.isNaN(value)) {
                dispatch(
                  cart.actions.update({
                    ...item,
                    amount: 0,
                  }),
                );
                return;
              }

              dispatch(
                cart.actions.update({
                  ...item,
                  amount: value,
                }),
              );
            }}
          />
          <Button
            isIconOnly
            variant={"bordered"}
            size={"sm"}
            onClick={() => dispatch(cart.actions.insert(item))}
          >
            <HiPlus />
          </Button>
        </div>
      </div>
      <div className={"flex items-center justify-center col-span-1"}>
        <p
          className={
            "font-medium text-gray-700 md:text-md text-sm text-center " +
            accentFont.className
          }
        >
          {(item.price ?? 0).toLocaleString()} đ
        </p>
      </div>
      <div className={"flex items-center justify-end col-span-1"}>
        <p
          className={
            "font-semibold md:text-md text-sm text-right " +
            accentFont.className
          }
        >
          {((item.price ?? 0) * (item.amount ?? 0)).toLocaleString()} đ
        </p>
      </div>
    </div>
  );
}
