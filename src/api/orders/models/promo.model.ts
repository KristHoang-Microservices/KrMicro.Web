import { Audit, Tracking } from "@/api/common/models";
import { PromoUnit } from "@/api/orders/models/enum";

export interface Promo extends Audit, Tracking {
  id: number;
  name: string;
  code: string;
  value: number;
  promoUnit: PromoUnit;
  startDate: string;
  endDate: string;
}
