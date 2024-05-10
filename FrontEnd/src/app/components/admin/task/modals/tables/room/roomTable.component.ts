import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import {
  MatPaginator,
  MatPaginatorIntl,
  PageEvent,
} from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { Subscription } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../../../../../material.module';
import { Room } from '../../../../../../models/room.model';
import { PaginationFilter } from '../../../../../../models/paginationFilter.model';
import { PaginationList } from '../../../../../../models/Pagination.model';
import { RoomService } from '../../../../../../services/room.service';
import { PaginationRoom } from '../../../../../../models/paginationRoom.model';

@Component({
  selector: 'app-task-room-table',
  standalone: true,
  imports: [MaterialModule, CommonModule],
  templateUrl: './roomTable.component.html',
  styleUrl: './roomTable.component.css',
})
export class TaskRoomTableComponent implements OnInit, AfterViewInit {
  @ViewChild(MatSort) ordering?: MatSort | any;
  @ViewChild(MatPaginator) pagination?: MatPaginator | any;

  private roomSubscription: Subscription | undefined;

  selectedId: string = '';
  @Input() selectedIdRoom: string | any;
  @Output() selectedIdRoomChange = new EventEmitter<string>();

  searchRadioButtonValue = 'RoomNumber';

  dataSource = new MatTableDataSource<Room>();
  totalRooms = 0;
  comboPages = [1, 3, 5, 8];
  displayedColumns = ['RoomNumber', 'Floor', 'Type', 'Status'];

  timeout: any = null;

  // Filter for search by column
  paginationFilter: PaginationFilter[] = [
    {
      property: 'RoomNumber',
      value: '',
    },
  ];
  // Request for get rooms paginated with the filter (default null)
  paginationRequest: PaginationList = {
    pageSize: 3,
    page: 1,
    sort: 'name',
    sortDirection: 'asc',
    filter: this.paginationFilter,
  };

  constructor(
    private roomService: RoomService,
    private paginatorIntl: MatPaginatorIntl
  ) {
    // Pagination in spanish
    this.paginatorIntl.itemsPerPageLabel = 'Elementos por página:';
    this.paginatorIntl.getRangeLabel = (
      page: number,
      pageSize: number,
      length: number
    ) => {
      if (length === 0 || pageSize === 0) {
        return `0 de ${length}`;
      }
      length = Math.max(length, 0);
      const startIndex = page * pageSize;
      const endIndex =
        startIndex < length
          ? Math.min(startIndex + pageSize, length)
          : startIndex + pageSize;
      return `${startIndex + 1} - ${endIndex} de ${length}`;
    };
  }

  ngOnInit(): void {
    // Set variable value for color the row
    this.selectedId = this.selectedIdRoom;
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

    var updatedPaginationFilter: PaginationFilter[] = [
      {
        property: this.searchRadioButtonValue,
        value: this.paginationFilter[0].value,
      },
    ];
    this.paginationRequest.filter = updatedPaginationFilter;

    this.roomService.searchRooms(this.paginationRequest);
  }

  // Event from search input for search by column and value
  roomFilter(event: any): void {
    clearTimeout(this.timeout);
    const $this = this;

    this.timeout = setTimeout(() => {
      if (event.keyCode != 13) {
        $this.paginationFilter = [
          {
            property: this.searchRadioButtonValue,
            value: event.target.value,
          },
        ];
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

  // For set user selected id value
  selectCell(id: string) {
    this.selectedId = id;
    this.selectedIdRoomChange.emit(this.selectedId);
  }

  // For manage the selected item color
  highlightRow(event: any) {
    event.currentTarget.classList.add('highlighted-row');
  }

  unhighlightRow(event: any) {
    event.currentTarget.classList.remove('highlighted-row');
  }
}
