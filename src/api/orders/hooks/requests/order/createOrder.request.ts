export interface CreateOrderRequest {
  deliveryInformationId: number;
  paymentMethodId: number;
  orderDetails: {
    productId: number;
    amount: number;
    sizeCode: string;
  }[];
  promoId?: number;
  note?: string;
}
