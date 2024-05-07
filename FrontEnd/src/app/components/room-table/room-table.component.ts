import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { Subscription } from 'rxjs';
import { MaterialModule } from '../../material.module';
import { MatTableDataSource } from '@angular/material/table';
import { Room } from '../../models/room.model';
import { PaginationRoom } from '../../models/paginationRoom.model';
import { RoomService } from '../../services/room.service';
import { Pagination } from '../../models/Pagination.model';
import { PaginationFilter } from '../../models/paginationFilter.model';

@Component({
  selector: 'app-room-table',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './room-table.component.html',
  styleUrl: './room-table.component.css',
})
export class RoomTableComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild(MatSort) ordering?: MatSort | any;
  @ViewChild(MatPaginator) pagination?: MatPaginator | any;

  private roomSubscription: Subscription | undefined;

  searchRadioButtonValue = 'RoomNumber';

  dataSource = new MatTableDataSource<Room>();
  totalRooms = 0;
  comboPages = [1, 3, 5, 8];
  displayedColumns = ['RoomNumber', 'Floor', 'Type', 'Status', 'actions'];

  timeout: any = null;

  // Filter for search by column
  paginationFilter: PaginationFilter = {
    property: 'RoomNumber',
    value: '',
  };
  // Request for get rooms paginated with the filter (default null)
  paginationRequest: Pagination = {
    pageSize: 5,
    page: 1,
    sort: 'name',
    sortDirection: 'asc',
    filter: this.paginationFilter,
  };

  constructor(private roomService: RoomService) {}

  ngOnDestroy(): void {
    this.roomSubscription?.unsubscribe();
  }

  ngOnInit(): void {
    this.roomService.searchRooms(this.paginationRequest);
    this.roomSubscription = this.roomService
      .getRooms()
      .subscribe((pagination: PaginationRoom) => {
        this.dataSource = new MatTableDataSource<Room>(pagination.data);
        this.totalRooms = pagination.totalRows;
      });
  }

  // Event from radio buttons for change column filter search
  onRadioButtonChange(event: any) {
    this.searchRadioButtonValue = event.value;

    var updatedPaginationFilter: PaginationFilter = {
      property: this.searchRadioButtonValue,
      value: this.paginationFilter.value,
    };
    this.paginationRequest.filter = updatedPaginationFilter;

    this.roomService.searchRooms(this.paginationRequest);
  }

  // Event from search input for search by column and value
  roomFilter(event: any): void {
    clearTimeout(this.timeout);
    const $this = this;

    this.timeout = setTimeout(() => {
      if (event.keyCode != 13) {
        $this.paginationFilter = {
          property: this.searchRadioButtonValue,
          value: event.target.value,
        };
        this.paginationRequest.filter = $this.paginationFilter;
        $this.roomService.searchRooms(this.paginationRequest);
      }
    }, 500);
  }

  // For pagination and ordering (first charge)
  ngAfterViewInit(): void {
    this.dataSource.sort = this.ordering;
    this.dataSource.paginator = this.pagination;
  }

  // For pagination and ordering (bot options)
  eventPager(event: PageEvent): void {
    this.paginationRequest.pageSize = event.pageSize;
    this.paginationRequest.page = event.pageIndex + 1;
    this.roomService.searchRooms(this.paginationRequest);
  }

  // For pagination and ordering (column options)
  orderColumns(event: Sort): void {
    this.paginationRequest.sort = event.active;
    this.paginationRequest.sortDirection = event.direction;
    this.roomService.searchRooms(this.paginationRequest);
  }

  updateRoom(room: Room): void {
    console.log(room);
  }

  deleteRoom(id: string): void {
    console.log(id);
  }
}
