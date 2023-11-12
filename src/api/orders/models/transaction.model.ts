import { Audit, Tracking } from "@/api/common/models";
import { PaymentMethod } from "@/api/orders/models/paymentMethod.model";
import { TransactionStatus } from "@/api/orders/models/enum/transactionStatus.enum";

export interface Transaction extends Audit, Tracking {
  id: number;
  customerId: number;
  phoneNumber: string;
  orderId: number;
  paymentMethodId: number;
  paymentMethod: PaymentMethod;
  transactionStatus: TransactionStatus;
}
