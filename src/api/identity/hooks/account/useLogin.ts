"use client";
import { accountUrl } from "@/api/identity/constants";
import { postDefaultFetcher } from "@/api/common/fetchers";
import { LoginRequest } from "@/api/identity/requests";
import { LoginResponse } from "@/api/identity/responses";
import useSWRMutation from "swr/mutation";
import toast from "react-hot-toast";
import { localStorageServices } from "@/service";
import { FetcherResponse } from "swr/_internal";
import { accessTokenLocalStorageKey } from "@/constants";

export function useLogin() {
  return useSWRMutation(
    accountUrl.LOGIN,
    postDefaultFetcher<LoginRequest, LoginResponse>,
    {
      onError: () => {
        toast.error("Đã xãy ra lỗi, hãy kiểm tra lại tài khoản và mật khẩu", {
          position: "top-left",
        });
      },
      onSuccess: async (data: FetcherResponse<LoginResponse>) => {
        toast.success("Đăng nhập thành công", {
          position: "top-left",
        });
        localStorageServices.set(
          accessTokenLocalStorageKey,
          (await data).accessToken,
        );
      },
    },
  );
}
