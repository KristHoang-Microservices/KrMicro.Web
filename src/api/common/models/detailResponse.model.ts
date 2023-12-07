export type DetailResponseModel<T> = {
  data: T;
  isSuccess: boolean;
  message?: string;
};
