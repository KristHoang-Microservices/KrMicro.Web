import { AnyObject, number, object, ObjectSchema, string } from "yup";
import { CreateDeliveryInformationRequest } from "@/api/orders/hooks/requests/deliveryInformation/createDeliveryInformation.request";

export const createDeliveryInformationSchema: ObjectSchema<
  CreateDeliveryInformationRequest,
  AnyObject,
  any,
  ""
> = object({
  name: string().default(""),
  customerId: number().optional(),
  customerName: string().required("Thiếu họ và tên"),
  fullAddress: string().required("Thiếu địa chỉ"),
  districtId: number().required("Thiếu quận huyện"),
  cityId: number().required("Thiếu thành phố"),
  wardId: number().required("Thiếu phường"),
  phone: string()
    .matches(/^(09|08|07|03|05|01)[0-9]{8}$/, "Số điện thoại không hợp lệ")
    .required("Thiếu số điện thoại"),
}).required();
