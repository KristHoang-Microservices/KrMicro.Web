import { Audit, Tracking } from "@/api/common/models";
import { OrderStatus } from "@/api/orders/models/enum";
import { OrderDetail } from "@/api/orders/models/orderDetail.model";

export interface Order extends Audit, Tracking {
  id: number;
  orderData: string;
  totalAmount: number;
  orderStatus: OrderStatus;
  deliveryInformationId: number;
  note?: string;
  orderDetails: OrderDetail[];
}
