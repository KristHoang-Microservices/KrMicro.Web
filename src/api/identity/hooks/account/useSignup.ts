"use client";
import { accountUrl } from "@/api/identity/constants";
import { postDefaultFetcher } from "@/api/common/fetchers";
import { SignupRequest } from "@/api/identity/requests";
import { SignupResponse } from "@/api/identity/responses";
import useSWRMutation from "swr/mutation";
import toast from "react-hot-toast";
import { FetcherResponse } from "swr/_internal";
import { localStorageServices } from "@/service";
import { accessTokenLocalStorageKey } from "@/constants";

export function useSignup() {
  return useSWRMutation(
    accountUrl.SIGNUP,
    postDefaultFetcher<SignupRequest, SignupResponse>,
    {
      onError: () => {
        toast.error("Đã xãy ra lỗi, hãy kiểm tra lại", {
          position: "top-left",
        });
      },
      onSuccess: async (data: FetcherResponse<SignupResponse>) => {
        toast.success("Đăng kí thành công", {
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
