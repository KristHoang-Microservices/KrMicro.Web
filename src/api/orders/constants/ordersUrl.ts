export const ordersBase: (path: string) => string = (path: string): string => {
  return "https://krmicro-orders.azurewebsites.net/api" + path;
  // return "https://localhost:7127/api" + path;
};
