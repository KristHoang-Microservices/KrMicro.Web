"use client";
import { ReactElement } from "react";
import { Menu } from "@/components/Navbar/Menu";
import { accentFont } from "@/constants";

export function Navigation(): ReactElement {
  return (
    <>
      <div className={"bg-accent"}>
        <p className={"text-center text-white " + accentFont.className}>
          Capture the essence of elegance
        </p>
      </div>
      <Menu />
    </>
  );
}
