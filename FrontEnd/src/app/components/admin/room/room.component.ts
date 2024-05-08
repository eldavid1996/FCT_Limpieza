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
import { MaterialModule } from '../../../material.module';
import { MatTableDataSource } from '@angular/material/table';
import { Room } from '../../../models/room.model';
import { PaginationRoom } from '../../../models/paginationRoom.model';
import { RoomService } from '../../../services/room.service';
import { Pagination } from '../../../models/Pagination.model';
import { PaginationFilter } from '../../../models/paginationFilter.model';
import { MatDialog } from '@angular/material/dialog';
import { DeleteRoomModalComponent } from './modals/delete/deleteRoomModal.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { InsertRoomModalComponent } from './modals/insert/insertRoomModal.component';
import { CommonModule } from '@angular/common';
import { UpdateRoomModalComponent } from './modals/update/updateRoomModal.component';

@Component({
  selector: 'app-room-table',
  standalone: true,
  imports: [MaterialModule, CommonModule],
  templateUrl: './room.component.html',
  styleUrl: './room.component.css',
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

  constructor(
    private roomService: RoomService,
    private dialog: MatDialog,
    private snackbar: MatSnackBar
  ) {}

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

  // Open a modal for watch or update room data
  insertRoom(): void {
    const dialogRef = this.dialog.open(InsertRoomModalComponent, {
      width: '400px',
    });
    dialogRef.afterClosed().subscribe(() => {
      this.roomService.searchRooms(this.paginationRequest);
    });
  }

  // Open a modal for watch or update room data
  updateRoom(room: string): void {
    const dialogRef = this.dialog.open(UpdateRoomModalComponent, {
      width: '400px',
      data: { room },
    });
    dialogRef.afterClosed().subscribe(() => {
      this.roomService.searchRooms(this.paginationRequest);
    });
  }

  // Open the modal with a confirmation to delete room
  deleteRoom(roomId: string): void {
    const dialogRef = this.dialog.open(DeleteRoomModalComponent, {
      width: '250px',
      data: { roomId },
    });

    // If modal was closed with a 'confirm' status delete the room
    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'confirm') {
        this.roomService.deleteRoom(roomId).subscribe((response) => {
          // And show a snackbar with the request result
          this.snackbar.open(response, 'Cerrar', { duration: 3000 });
          // Then, get updated list rooms
          this.roomService.searchRooms(this.paginationRequest);
        });
      }
    });
  }
}
