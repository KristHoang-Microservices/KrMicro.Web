export type PagedList<T> = {
  totalPage: number;
  pageSize: number;
  currentPage: number;
  listData: T[];
};
