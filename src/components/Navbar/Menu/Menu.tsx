"use client";
import { Dispatch, ReactElement, SetStateAction, useState } from "react";
import {
  Divider,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from "@nextui-org/react";
import Image from "next/image";
import Logo from "@/assets/logo-august.png";
import { menuList, smMenuList } from "@/constants/menuList";
import { MenuModel } from "@/components/Navbar/models";
import { Link } from "@nextui-org/link";
import {
  CiDeliveryTruck,
  CiSearch,
  CiShoppingBasket,
  CiUser,
} from "react-icons/ci";
import { Badge } from "@nextui-org/badge";
import { accentFont } from "@/constants";

export function Menu(): ReactElement {
  const [isMenuOpen, setIsMenuOpen]: [
    boolean,
    Dispatch<SetStateAction<boolean>>,
  ] = useState(false);
  return (
    <Navbar
      onMenuOpenChange={setIsMenuOpen}
      isBordered
      className={"backdrop-blur-[5px]"}
      maxWidth={"full"}
    >
      <NavbarContent justify={"start"} className="hidden sm:flex gap-4">
        {menuList.map((item: MenuModel) => (
          <NavbarItem key={"nav" + item.id}>
            <Link
              color={"foreground"}
              className={accentFont.className + " font-semibold cursor-pointer"}
            >
              {item.label.toUpperCase()}
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>
      <NavbarContent justify={"center"}>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className={"sm:hidden"}
        />
        <NavbarBrand>
          <Link href={"/"}>
            <Image src={Logo} alt={"August Perfume"} height={"52"} />
            <p
              className={
                "font-bold text-xl ml-2 uppercase " + accentFont.className
              }
            >
              August Perfume
            </p>
          </Link>
        </NavbarBrand>
      </NavbarContent>
      <NavbarContent justify={"end"}>
        <div className={"hidden sm:flex gap-4"}>
          <NavbarItem className={"cursor-pointer text-2xl"}>
            <CiSearch />
          </NavbarItem>
          <NavbarItem className={"cursor-pointer text-2xl"}>
            <CiUser />
          </NavbarItem>
          <NavbarItem className={"cursor-pointer text-2xl"}>
            <CiDeliveryTruck />
          </NavbarItem>
        </div>
        <Badge content={""}>
          <NavbarItem className={"cursor-pointer text-2xl"}>
            <CiShoppingBasket />
          </NavbarItem>
        </Badge>
      </NavbarContent>
      <NavbarMenu className={"pt-5"}>
        {menuList.map((item: MenuModel) => (
          <NavbarMenuItem key={"nav" + item.id}>
            <Link
              color={"foreground"}
              className={accentFont.className + " font-semibold cursor-pointer"}
            >
              {item.label.toUpperCase()}
            </Link>
          </NavbarMenuItem>
        ))}
        <Divider />
        {smMenuList.map((item: MenuModel) => (
          <NavbarMenuItem key={"nav" + item.id}>
            <Link
              color={"foreground"}
              className={accentFont.className + " font-semibold cursor-pointer"}
            >
              {item.label.toUpperCase()}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}
