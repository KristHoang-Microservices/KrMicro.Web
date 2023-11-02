import { Audit, Tracking } from "@/api/common/models";

export interface Size extends Tracking, Audit {
  id: number;
  sizeCode: string;
}
