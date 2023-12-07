import useSWR, { SWRResponse } from "swr";
import { Customer } from "@/api/identity/models/customer.model";
import { customerUrl } from "@/api/identity/constants";
import { getDefaultFetcher } from "@/api/common/fetchers";
import { localStorageServices } from "@/service";
import { accessTokenLocalStorageKey } from "@/constants";

export function useGetProfile(): SWRResponse<Customer> {
  const accessToken = localStorageServices.get<string>(
    accessTokenLocalStorageKey,
  );
  return useSWR(
    accessToken !== null ? customerUrl.GET_PROFILE : null,
    getDefaultFetcher<Customer>,
    {
      revalidateOnMount: true,
      errorRetryCount: 0,
      onError: () => {
        return null;
      },
    },
  );
}
