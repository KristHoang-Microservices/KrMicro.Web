"use client";
import { postDefaultFetcher } from "@/api/common/fetchers";
import useSWRMutation from "swr/mutation";
import toast from "react-hot-toast";
import { transactionUrl } from "../../constants";
import { CreateVnPayTransactionRequest } from "@/api/orders/hooks/requests/transaction";
import { CreateVnPayTransactionResponse } from "@/api/orders/hooks/response/createVnPayTransaction.response";

export function useCreateVnPayPayment() {
  return useSWRMutation(
    transactionUrl.CREATE_VNPAY,
    postDefaultFetcher<
      CreateVnPayTransactionRequest,
      CreateVnPayTransactionResponse
    >,
    {
      onError: () => {
        toast.error("Đã xảy ra lỗi, xin hãy thử lại sau", {
          position: "top-left",
        });
      },
    },
  );
}
