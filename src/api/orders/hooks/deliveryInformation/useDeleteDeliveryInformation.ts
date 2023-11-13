"use client";
import { deliveryInformationUrl } from "@/api/orders/constants";
import { postDefaultFetcher } from "@/api/common/fetchers";
import useSWRMutation from "swr/mutation";
import toast from "react-hot-toast";
import { MessageResponse } from "@/api/common/models";
import { useGetAllDeliveryInformation } from "@/api/orders/hooks/deliveryInformation";
import { DeleteDeliveryInformationRequest } from "@/api/orders/hooks/requests/deliveryInformation";

export function useDeleteDeliveryInformation({
  customerId,
  deliveryInformationId,
}: {
  customerId?: number;
  deliveryInformationId: number;
}) {
  const { mutate } = useGetAllDeliveryInformation({
    request: { customerId: customerId ?? -1 },
  });

  return useSWRMutation(
    deliveryInformationUrl.UPDATE_STATUS(deliveryInformationId),
    postDefaultFetcher<DeleteDeliveryInformationRequest, MessageResponse>,
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
