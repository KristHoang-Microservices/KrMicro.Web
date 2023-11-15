import { CreateOrderRequest } from "@/api/orders/hooks/requests/order/createOrder.request";

export interface CheckOrderRequest
  extends Pick<CreateOrderRequest, "orderDetails"> {}
