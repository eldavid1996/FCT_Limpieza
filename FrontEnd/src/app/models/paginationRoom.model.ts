import { Room } from './room.model';

export interface PaginationRoom {
  pageSize: string;
  page: number;
  sort: string;
  sortDirection: string;
  pagesQuantity: string;
  data: Room[];
  filterValue: {};
  totalRows: number;
}
