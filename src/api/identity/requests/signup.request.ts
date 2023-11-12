import { User } from "@/api/identity/models";
import { Customer } from "@/api/identity/models/customer.model";

export interface SignupRequest
  extends Pick<User, "userName" | "fullName" | "email" | "phoneNumber">,
    Pick<Customer, "fullAddress" | "dob"> {
  password: string;
  rePassword: string;
}
