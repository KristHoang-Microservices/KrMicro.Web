import useSWR, { SWRResponse } from "swr";
import { Customer } from "@/api/identity/models/customer.model";
import { customerUrl } from "@/api/identity/constants";
import { getDefaultFetcher } from "@/api/common/fetchers";

export function useGetProfile(): SWRResponse<Customer> {
  return useSWR(customerUrl.GET_PROFILE, getDefaultFetcher<Customer>, {
    revalidateOnMount: true,
    onError: () => {
      return null;
    },
  });
}
