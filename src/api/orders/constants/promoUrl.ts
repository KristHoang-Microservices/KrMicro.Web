import { ordersBase } from "@/api/orders/constants/ordersUrl";

const promoBaseUrl = (path?: string) => ordersBase("/Promo" + path ?? "");

export const GET_ALL = promoBaseUrl();

export const GET_DETAIL = (code: string) => promoBaseUrl(`/Code/${code}`);

export const CREATE = promoBaseUrl("");

export const UPDATE = (id: number) => promoBaseUrl(`/${id}`);

export const UPDATE_STATUS = (id: number) =>
  promoBaseUrl(`/${id}/UpdateStatus`);

export const CHECK_PROMO = (code: string) =>
  promoBaseUrl(`/${code}/CheckPromo`);
