import { identityUrl } from "@/api/identity/constants/identityUrl";

const accountIdentityBase = (path: string) => "/Identity" + path;

export const LOGIN = identityUrl(accountIdentityBase("/LoginWeb"));

export const SIGNUP = identityUrl(accountIdentityBase("/Signup"));
