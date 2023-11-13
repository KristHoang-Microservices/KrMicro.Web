"use client";
import { deliveryInformationUrl } from "@/api/orders/constants";
import { patchDefaultFetcher } from "@/api/common/fetchers";
import useSWRMutation from "swr/mutation";
import toast from "react-hot-toast";
import { CreateDeliveryInformationRequest } from "@/api/orders/hooks/requests/deliveryInformation/createDeliveryInformation.request";
import { DeliveryInformation } from "@/api/orders/models";
import { DetailResponseModel } from "@/api/common/models";
import { useGetAllDeliveryInformation } from "@/api/orders/hooks/deliveryInformation/useGetAllDeliveryInformation";

export function useUpdateDeliveryInformation({
  id,
  customerId,
}: {
  id: number;
  customerId?: number;
}) {
  const { mutate } = useGetAllDeliveryInformation({
    request: { customerId: customerId ?? -1 },
  });

  return useSWRMutation(
    deliveryInformationUrl.UPDATE(id),
    patchDefaultFetcher<
      CreateDeliveryInformationRequest,
      DetailResponseModel<DeliveryInformation>
    >,
    {
      onError: () => {
        toast.error("Đã xảy ra lỗi, xin hãy thử lại sau", {
          position: "top-left",
        });
      },
      onSuccess: () => {
        if (customerId !== undefined) mutate().then();
      },
    },
  );
}
