"use client";

import React, { useEffect, useState } from "react";
import { Button, Image } from "@nextui-org/react";
import { useLogin, useSignup } from "@/api/identity/hooks/account";
import { LoginRequest, SignupRequest } from "@/api/identity/requests";
import { useForm } from "react-hook-form";
import { Input } from "@nextui-org/input";
import { Heading } from "@/components/Heading";
import { useRouter } from "next/navigation";
import { localStorageServices } from "@/service";
import { accessTokenLocalStorageKey } from "@/constants";
import { LoginResponse, SignupResponse } from "@/api/identity/responses";
import toast from "react-hot-toast";
import Logo from "@/assets/logo-august.png";
import { Link } from "@nextui-org/link";

const backgroundUrl =
  "https://res.cloudinary.com/dbnqb8z0t/image/upload/f_auto,q_auto/v1/Public/z0ljwl5zgrytx2nwpuao";

export default function LoginPage() {
  const { register, handleSubmit } = useForm<LoginRequest | SignupRequest>();

  const { trigger: loginTrigger, isMutating: isLogging } = useLogin();
  const { trigger: signupTrigger, isMutating: isSigning } = useSignup();
  const router = useRouter();

  const [isLogin, setIsLogin] = useState<boolean>(true);

  useEffect(() => {
    if (localStorageServices.get(accessTokenLocalStorageKey) !== null)
      router.replace("/");
    else {
      history.replaceState(null, "", "/login");
    }
  }, [router]);

  async function submitLogin(data: LoginRequest | SignupRequest) {
    if (!isLogin && (data as SignupRequest).rePassword !== data.password) {
      toast.error("Mật khẩu chưa khớp! Kiểm tra lại", { position: "top-left" });
      return;
    }

    const res: LoginResponse | SignupResponse = isLogin
      ? await loginTrigger(data as LoginRequest)
      : await signupTrigger(data as SignupRequest);

    if (res !== undefined) {
      router.replace("/");
    }
  }

  return (
    <div
      className={
        "w-screen h-screen relative bg-no-repeat bg-cover bg-left flex items-center justify-end p-6"
      }
      style={{
        backgroundImage: `url(${backgroundUrl})`,
      }}
    >
      <div
        className={
          "rounded-md bg-white h-full w-full md:w-[50%] md:max-w-[400px] p-6 flex flex-col justify-center gap-4 items-center"
        }
      >
        <Link href={"/"}>
          <Image src={Logo.src} alt={"August Perfume"} width={125} />
        </Link>
        <div className={"w-full"}>
          <Heading className={"text-center mb-4 text-xl"}>
            {isLogin ? "Đăng nhập" : "Đăng kí"}
          </Heading>
          <form
            onSubmit={handleSubmit(submitLogin)}
            className={"flex flex-col gap-4 items-center"}
          >
            <Input
              {...register("userName")}
              isRequired={true}
              label={"Tài khoản"}
            />

            {!isLogin && (
              <>
                <Input
                  {...register("fullName")}
                  label={"Họ và tên"}
                  isRequired={true}
                />
                <Input
                  {...register("email")}
                  label={"Email"}
                  type={"email"}
                  isRequired={true}
                />
                <Input {...register("phoneNumber")} label={"Số điện thoại"} />
              </>
            )}
            <Input
              {...register("password")}
              isRequired={true}
              type={"password"}
              label={"Mật khẩu"}
            />
            {!isLogin && (
              <Input
                type={"password"}
                {...register("rePassword")}
                isRequired={true}
                label={"Nhập lại mật khẩu"}
              />
            )}

            <Button
              color={"primary"}
              type={"submit"}
              isLoading={isLogging || isSigning}
              className={"w-full md:w-fit"}
            >
              {isLogin ? "Đăng nhập" : "Đăng kí"}
            </Button>
            {isLogin ? (
              <p>
                Chưa có tài khoản ?{" "}
                <b
                  className={"cursor-pointer text-accent"}
                  onClick={() => setIsLogin(false)}
                >
                  Đăng kí ngay
                </b>
              </p>
            ) : (
              <p>
                Đã có tài khoản ?{" "}
                <b
                  className={"cursor-pointer text-accent"}
                  onClick={() => setIsLogin(true)}
                >
                  Đăng nhập ngay
                </b>
              </p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
