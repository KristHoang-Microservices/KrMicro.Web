"use client";
import { orderUrl } from "@/api/orders/constants";
import { postDefaultFetcher } from "@/api/common/fetchers";
import useSWRMutation from "swr/mutation";
import toast from "react-hot-toast";
import { CheckOrderRequest } from "@/api/orders/hooks/requests/order";
import { AxiosError } from "axios";
import { FetcherResponse } from "swr/_internal";
import { CheckOrderResponse } from "@/api/orders/hooks/response/checkOrder.response";

export function useCheckOrder() {
  return useSWRMutation(
    orderUrl.CHECK,
    postDefaultFetcher<CheckOrderRequest, CheckOrderResponse>,
    {
      onError: (err: AxiosError<CheckOrderResponse>) => {
        toast.error(
          err?.response?.data.message ?? "Đã xảy ra lỗi, xin hãy thử lại sau",
          {
            position: "top-left",
          },
        );
      },
      onSuccess: async (data: FetcherResponse<CheckOrderResponse>) => {
        if (!(await data).isSuccess)
          toast.error(
            (await data).message ?? "Đã xảy ra lỗi, xin hãy thử lại sau",
            {
              position: "top-left",
            },
          );
      },
    },
  );
}
