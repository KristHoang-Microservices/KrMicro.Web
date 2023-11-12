"use client";
import { ReactElement } from "react";
import { useAppSelector } from "@/store/hooks";
import { cartSelector } from "@/store/slices/cartStore.slice";

export default function OrderPage(): ReactElement {
  const cart = useAppSelector(cartSelector);
  return <div>Danh sách đơn hàng của tôi</div>;
}
