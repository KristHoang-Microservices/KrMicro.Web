"use client";
import { getDefaultFetcher } from "@/api/common/fetchers";
import { transactionUrl } from "../../constants";
import useSWR from "swr";
import { Transaction } from "@/api/orders/models";

export function useCheckVnPayTransaction(transactionId?: number) {
  return useSWR(
    transactionId !== undefined
      ? transactionUrl.CHECK_VNPAY(transactionId)
      : null,
    (url) => getDefaultFetcher<Transaction>(url),
    {
      shouldRetryOnError: true,
    },
  );
}
