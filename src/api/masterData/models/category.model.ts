import { Audit, Tracking } from "@/api/common/models";

export interface Category extends Tracking, Audit {
  id: number;
  name: string;

  [index: string]: string | number | undefined;
}
