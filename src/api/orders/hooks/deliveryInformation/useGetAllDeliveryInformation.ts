import useSWR from "swr";
import { getListDataFetcher } from "@/api/common/fetchers";
import { deliveryInformationUrl } from "../../constants";
import { DeliveryInformation } from "@/api/orders/models";
import { GetAllDeliveryInformationRequest } from "@/api/orders/hooks/requests/deliveryInformation/getAllDeliveryInformation.request";

export function useGetAllDeliveryInformation({
  request,
}: {
  request: GetAllDeliveryInformationRequest;
}) {
  return useSWR(
    deliveryInformationUrl.GET_ALL(request?.customerId ?? -1),
    getListDataFetcher<DeliveryInformation>,
    {
      onError: () => {
        if (request.customerId === undefined || request.customerId === null)
          return undefined;
      },
    },
  );
}
