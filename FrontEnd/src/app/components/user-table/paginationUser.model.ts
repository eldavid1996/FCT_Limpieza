import { User } from "./user.model";

export interface PaginationUser{
  pageSize: string;
  page:number;
  sort: string;
  sortDirection: string;
  pagesQuantity: string;
  data: User[];
  filterValue: {};
  totalRows: number;
}
