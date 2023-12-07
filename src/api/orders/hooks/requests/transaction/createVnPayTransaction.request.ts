import { Order, Transaction } from "@/api/orders/models";

export interface CreateVnPayTransactionRequest {
  phoneNumber: string;
  orderId: Order["id"];
  paymentMethodId: Transaction["paymentMethodId"];
}
