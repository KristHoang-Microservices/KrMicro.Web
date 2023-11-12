export interface User {
  id: string;
  userName: string;
  normalizedUserName: string;
  email: string;
  normalizedEmail: string;
  emailConfirmed: boolean;
  passwordHash: string;
  securityStamp: string;
  concurrencyStamp: string;
  phoneNumber: string;
  phoneNumberConfirmed: boolean;
  twoFactorEnabled: boolean;
  lockoutEnd: string;
  lockoutEnabled: boolean;
  accessFailedCount: number;
  fullName: string;
  customer: {
    id: number;
    userId: string;
    userInformation: string;
    point: number;
    fullAddress: string;
    dob: string;
  };
}
