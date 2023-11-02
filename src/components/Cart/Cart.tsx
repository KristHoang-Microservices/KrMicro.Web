"use client";
import { NavbarItem } from "@nextui-org/react";
import { CiShoppingBasket } from "react-icons/ci";
import { Badge } from "@nextui-org/badge";
import { useAppSelector } from "@/store/hooks";
import { cartSelector } from "@/store/slices/cartStore.slice";
import React from "react";
import { Link } from "@nextui-org/link";

export function Cart() {
  const cart = useAppSelector(cartSelector);

  return (
    <>
      <Link href={"/cart"} className={"relative"}>
        <Badge content={`${cart.items.length}` ?? ""}>
          <NavbarItem className={"cursor-pointer text-2xl"}>
            <CiShoppingBasket />
          </NavbarItem>
        </Badge>
      </Link>
    </>
  );
}
