import useSWR from "swr";
import { getListDataFetcher } from "@/api/common/fetchers";
import { orderUrl } from "../../constants";
import { Order } from "@/api/orders/models";

export function useGetOrder({ request }: { request: { orderId: number } }) {
  return useSWR(
    orderUrl.GET_DETAIL(request?.orderId ?? -1),
    getListDataFetcher<Order>,
    {
      onError: () => {
        if (request.orderId === undefined || request.orderId === null)
          return undefined;
      },
    },
  );
}
