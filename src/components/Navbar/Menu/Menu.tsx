"use client";
import { Dispatch, ReactElement, SetStateAction, useState } from "react";
import {
  Avatar,
  Divider,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
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
import { CiDeliveryTruck, CiSearch, CiUser } from "react-icons/ci";
import { accentFont, accessTokenLocalStorageKey } from "@/constants";
import { Cart } from "@/components/Cart";
import { useGetProfile } from "@/api/identity/hooks/customer";
import { useRouter } from "next/navigation";
import { localStorageServices } from "@/service";

export function Menu(): ReactElement {
  const [isMenuOpen, setIsMenuOpen]: [
    boolean,
    Dispatch<SetStateAction<boolean>>,
  ] = useState(false);

  const { data } = useGetProfile();

  const navigate = useRouter();

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
        <div className={"hidden sm:flex gap-4 relative"}>
          <NavbarItem className={"cursor-pointer text-2xl"}>
            <CiSearch />
          </NavbarItem>
          <NavbarItem className={"cursor-pointer text-2xl"}>
            {data !== undefined ? (
              <Dropdown>
                <DropdownTrigger>
                  <Avatar name={data?.name} className={"w-[24px] h-[24px]"} />
                </DropdownTrigger>
                <DropdownMenu aria-label="Static Actions">
                  <DropdownItem key="profile">{data?.name}</DropdownItem>
                  <DropdownItem key="promo">Khuyến mãi</DropdownItem>
                  <DropdownItem key="point">
                    Điểm thưởng : {data?.point}
                  </DropdownItem>
                  <DropdownItem
                    key="logout"
                    className="text-danger"
                    color="danger"
                    onClick={() => {
                      localStorageServices.remove(accessTokenLocalStorageKey);
                      navigate.replace("/login");
                    }}
                  >
                    Đăng xuất
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            ) : (
              <CiUser onClick={() => navigate.push("/login")} />
            )}
          </NavbarItem>
          <NavbarItem className={"cursor-pointer text-2xl"}>
            <CiDeliveryTruck />
          </NavbarItem>
          <Cart />
        </div>
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
