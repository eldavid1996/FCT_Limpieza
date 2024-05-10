import { AfterViewInit, Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
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
import { User } from '../../../../../../models/user.model';
import { PaginationFilter } from '../../../../../../models/paginationFilter.model';
import { Pagination } from '../../../../../../models/Pagination.model';

import { UserService } from '../../../../../../services/user.service';
import { PaginationUser } from '../../../../../../models/paginationUser.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-task-user-table',
  standalone: true,
  imports: [MaterialModule, CommonModule, FormsModule],
  templateUrl: './userTable.component.html',
  styleUrl: './userTable.component.css',
})
export class TaskUserTableComponent implements OnInit, AfterViewInit {
  @ViewChild(MatSort) ordering?: MatSort | any;
  @ViewChild(MatPaginator) pagination?: MatPaginator | any;

  selectedId: string = '';
  @Output() selectedIdUserChange = new EventEmitter<string>();

  private userSubscription: Subscription | undefined;

  searchRadioButtonValue = 'Name';

  dataSource = new MatTableDataSource<User>();
  totalUsers = 0;
  comboPages = [1, 3, 5, 8];
  displayedColumns = ['Name', 'Surname', 'Email', 'PhoneNumber', 'City'];

  timeout: any = null;

  // Filter for search by column
  paginationFilter: PaginationFilter = {
    property: 'Name',
    value: '',
  };
  // Request for get users paginated with the filter (default null)
  paginationRequest: Pagination = {
    pageSize: 3,
    page: 1,
    sort: 'Name',
    sortDirection: 'asc',
    filter: this.paginationFilter,
  };

  constructor(
    private userService: UserService,

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
    this.userService.searchUsers(this.paginationRequest);
    this.userSubscription = this.userService
      .getUsers()
      .subscribe((pagination: PaginationUser) => {
        this.dataSource = new MatTableDataSource<User>(pagination.data);
        this.totalUsers = pagination.totalRows;
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

    this.userService.searchUsers(this.paginationRequest);
  }

  // Event from search input for search by column and value
  userFilter(event: any): void {
    clearTimeout(this.timeout);
    const $this = this;

    this.timeout = setTimeout(() => {
      if (event.keyCode != 13) {
        $this.paginationFilter = {
          property: this.searchRadioButtonValue,
          value: event.target.value,
        };
        this.paginationRequest.filter = $this.paginationFilter;
        $this.userService.searchUsers(this.paginationRequest);
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
    this.userService.searchUsers(this.paginationRequest);
  }

  // For pagination and ordering (column options)
  orderColumns(event: Sort): void {
    this.paginationRequest.sort = event.active;
    this.paginationRequest.sortDirection = event.direction;
    this.userService.searchUsers(this.paginationRequest);
  }

  // For set user selected id value
  selectCell(id: string) {
    this.selectedId = id;
    this.selectedIdUserChange.emit(this.selectedId);
  }

  // For manage the selected item color
  highlightRow(event: any) {
    event.currentTarget.classList.add('highlighted-row');
  }

  unhighlightRow(event: any) {
    event.currentTarget.classList.remove('highlighted-row');
  }
}
