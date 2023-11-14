import { identityUrl } from "@/api/identity/constants/identityUrl";

const customerIdentityBase = (path: string) => "/Customers" + path;

export const GET_PROFILE = identityUrl(customerIdentityBase("/CurrentProfile"));

export const UPDATE = (userId: string) =>
  identityUrl(customerIdentityBase(`/${userId}`));
