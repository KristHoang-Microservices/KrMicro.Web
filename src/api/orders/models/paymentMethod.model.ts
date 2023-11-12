import { Audit, Tracking } from "@/api/common/models";

export interface PaymentMethod extends Audit, Tracking {
  id: number;
  name: string;
  description: string;
}
