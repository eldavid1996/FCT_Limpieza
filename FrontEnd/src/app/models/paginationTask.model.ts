import { Task } from "./task.model";

export interface PaginationTask{
  pageSize: string;
  page:number;
  sort: string;
  sortDirection: string;
  pagesQuantity: string;
  data: Task[];
  filterValue: {};
  totalRows: number;
}
