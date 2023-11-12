import { ordersBase } from "@/api/orders/constants/ordersUrl";

const deliveryInformationBase = (path?: string) =>
  ordersBase("/DeliveryInformation" + path ?? "");

export const GET_ALL = (customerId: number) =>
  deliveryInformationBase(`?customerId=${customerId}`);

export const GET_DETAIL = (id: number) => deliveryInformationBase(`/${id}`);

export const CREATE = deliveryInformationBase("");

export const UPDATE = (id: number) => deliveryInformationBase(`/${id}`);
