"use client";
import React, { useEffect, useState } from "react";
import ConfettiIcon from "@/assets/svg/confetti.svg";
import { Image } from "@nextui-org/react";
import { Heading } from "@/components/Heading";
import Confetti from "react-dom-confetti";
import { confettiConfig } from "@/constants";

export default function SuccessPaid() {
  const [pop, setPopConfetti] = useState<boolean>(false);

  useEffect(() => {
    setPopConfetti(true);
  }, [pop]);

  return (
    <div
      className={
        "flex flex-col gap-2 w-full h-[60vh] justify-center items-center"
      }
    >
      <Confetti config={confettiConfig} active={pop} />
      <Image src={ConfettiIcon.src} alt={"Success"} width={"100px"} />
      <Heading>Mã đơn hàng của bạn là #01</Heading>
      <Heading className={"text-2xl text-accent"}>
        Đơn hàng của bạn đang được chuẩn bị
      </Heading>
      <p>Cảm ơn bạn đã lựa chọn August Perfume</p>
      <p>Xin vui lòng giữ điện thoại để xác nhận đơn hàng</p>
    </div>
  );
}
