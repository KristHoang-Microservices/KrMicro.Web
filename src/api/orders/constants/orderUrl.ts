import { ordersBase } from "@/api/orders/constants/ordersUrl";

const orderBase = (path?: string) => ordersBase("/Order" + path ?? "");

// export const GET_ALL = (customerId: number) =>
//   ordersBase(orderBase(`?customerId=${customerId}`));

export const GET_DETAIL = (id: number) => orderBase(`/${id}/Web`);

export const CREATE = orderBase("");
export const CHECK = orderBase("/CheckOrder");

export const UPDATE = (id: number) => orderBase(`/${id}`);
