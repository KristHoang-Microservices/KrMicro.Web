"use client";
import { ReactElement } from "react";
import { Image } from "@nextui-org/react";
import LogoWhite from "@/assets/logo-august-white.png";
import { accentFont, footerList } from "@/constants/";
import { FooterItem } from "@/models/footerItem";
import { Link } from "@nextui-org/link";

export function Footer(): ReactElement {
  return (
    <section
      className={
        "w-full bg-accent mt-8 rounded-top-8 p-6 flex md:flex-row flex-col justify-between items-center"
      }
    >
      <div className={"flex flex-col items-center justify-center mb-8 md:mb-0"}>
        <Image
          src={LogoWhite.src}
          alt={"August Perfume"}
          className={"max-w-[100px]"}
        />
        <span
          className={accentFont.className + " text-md md:text-xl text-white"}
        >
          Capture the essence of elegance
        </span>
      </div>
      <div className={""}>
        <div
          className={
            "flex gap-4 md:gap-8 text-center justify-around font-semibold md:min-w-[350px] min-w-full"
          }
        >
          {footerList.map((item: FooterItem) => (
            <span key={"Footer " + item.label}>
              <Link href={item.url} className={"uppercase text-sm  text-white"}>
                {item.label}
              </Link>
            </span>
          ))}
        </div>
        <hr className={"my-4 border-accent-300"} />
        <div className={"text-blue-200 flex justify-between gap-4"}>
          <span>&#169; Created by KrMicroTeam</span>
          <span>
            <Link href={"/"}>Chính sách</Link>{" "}
          </span>
          <span>
            <Link href={"/"}>Cam kết</Link>{" "}
          </span>
        </div>
      </div>
    </section>
  );
}
