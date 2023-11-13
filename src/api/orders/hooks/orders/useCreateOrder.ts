"use client";
import { orderUrl } from "@/api/orders/constants";
import { postDefaultFetcher } from "@/api/common/fetchers";
import useSWRMutation from "swr/mutation";
import toast from "react-hot-toast";
import { Order } from "@/api/orders/models";
import { DetailResponseModel } from "@/api/common/models";
import { CreateOrderRequest } from "@/api/orders/hooks/requests/order/createOrder.request";

export function useCreateOrder() {
  return useSWRMutation(
    orderUrl.CREATE,
    postDefaultFetcher<CreateOrderRequest, DetailResponseModel<Order>>,
    {
      onError: () => {
        toast.error("Đã xảy ra lỗi, xin hãy thử lại sau", {
          position: "top-left",
        });
      },
    },
  );
}
