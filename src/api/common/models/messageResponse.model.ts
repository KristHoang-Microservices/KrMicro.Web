export type MessageResponse<TData = {}> = {
  message: string;
  data?: TData;
  isSuccess: boolean;
};
