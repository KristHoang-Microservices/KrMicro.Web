export interface CreateOrderRequest {
  deliveryInformationId: number;
  orderDetails: {
    productId: number;
    amount: number;
    sizeCode: string;
  }[];
  note?: string;
}
