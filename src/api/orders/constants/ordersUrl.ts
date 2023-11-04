export const ordersUrl: (path: string) => string = (path: string): string => {
  return "https://krmicro-masterdata.azurewebsites.net/api" + path;
  // return "https://localhost:7127/api" + path;
};
