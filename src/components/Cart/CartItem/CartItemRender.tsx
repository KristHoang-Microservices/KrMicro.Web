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
    <div className={"grid grid-cols-7 gap-2 justify-between items-center "}>
      <User
        className={"col-span-3"}
        name={product?.name}
        avatarProps={{
          radius: "sm",
          className: "w-[100px] h-[100px] border-2",
          src: product?.imageUrls,
        }}
        description={item.sizeCode}
        classNames={{
          name: "text-lg " + accentFont.className,
          description: "text-md",
        }}
      />
      <div className={"flex flex-col items-center gap-2 col-span-2"}>
        <p
          className={
            "font-medium text-gray-700 text-xl " + accentFont.className
          }
        >
          {(item.price ?? 0).toLocaleString()}đ
        </p>

        <div className={"flex flex-row gap-2"}>
          <Button
            isIconOnly
            variant={"bordered"}
            onClick={() => dispatch(cart.actions.insert(item))}
          >
            <HiPlus />
          </Button>
          <Input
            variant={"underlined"}
            className={"w-[150px] content-center"}
            value={`${item.amount}`}
            type={"number"}
            onChange={(e) =>
              dispatch(
                cart.actions.update({
                  ...item,
                  amount: parseInt(e.target.value),
                }),
              )
            }
          />
          <Button
            isIconOnly
            variant={"bordered"}
            onClick={() => dispatch(cart.actions.remove(item))}
          >
            <HiMinus />
          </Button>
        </div>
      </div>
      <div className={"col-span-2"}>
        <p
          className={"font-semibold text-xl text-right " + accentFont.className}
        >
          {((item.price ?? 0) * (item.amount ?? 0)).toLocaleString()}đ
        </p>
      </div>
    </div>
  );
}
