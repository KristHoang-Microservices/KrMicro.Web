import { MessageResponse } from "@/api/common/models";

type FaultProducts = { productId: number; sizeCode: string }[];

export interface CheckOrderResponse extends MessageResponse<FaultProducts> {}
