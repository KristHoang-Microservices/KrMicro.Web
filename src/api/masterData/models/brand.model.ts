import { Audit, Tracking } from "@/api/common/models";

export interface Brand extends Audit, Tracking {
  id: number;
  name: string;
  description?: string;
  imageUrl?: string;

  [index: string]: string | number | undefined;
}
