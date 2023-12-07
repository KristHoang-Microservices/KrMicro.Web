import { ordersBase } from "@/api/orders/constants/ordersUrl";

const transactionBase = (path?: string) =>
  ordersBase("/Transaction" + path ?? "");

export const CREATE_VNPAY = transactionBase("/VnPay");

export const CHECK_VNPAY = (transactionId: number) =>
  transactionBase("/CheckVnPay/" + transactionId);
