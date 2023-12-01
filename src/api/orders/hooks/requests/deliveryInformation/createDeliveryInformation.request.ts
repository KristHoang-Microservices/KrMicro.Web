import { DeliveryInformation } from "@/api/orders/models";

export interface CreateDeliveryInformationRequest
  extends Pick<
    DeliveryInformation,
    | "name"
    | "customerName"
    | "fullAddress"
    | "phone"
    | "cityId"
    | "districtId"
    | "wardId"
  > {
  customerId?: number;
}
