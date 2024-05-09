import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import {
  MatPaginator,
  MatPaginatorIntl,
  PageEvent,
} from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { Subscription, delay } from 'rxjs';
import { MaterialModule } from '../../../material.module';
import { MatTableDataSource } from '@angular/material/table';
import { PaginationList } from '../../../models/Pagination.model';
import { PaginationFilter } from '../../../models/paginationFilter.model';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { TaskService } from '../../../services/task.service';
import { PaginationTask } from '../../../models/paginationTask.model';
import { InsertTaskModalComponent } from './modals/insert/insertTaskModal.component';
import { UpdateTaskModalComponent } from './modals/update/updateTaskModal.component';
import { DeleteTaskModalComponent } from './modals/delete/deleteTaskModal.component';
import { Task } from '../../../models/task.model';

@Component({
  selector: 'app-task-table',
  standalone: true,
  imports: [MaterialModule, CommonModule],
  templateUrl: './task.component.html',
  styleUrl: './task.component.css',
})
export class TaskTableComponent implements OnInit, AfterViewInit {
  @ViewChild(MatSort) ordering?: MatSort | any;
  @ViewChild(MatPaginator) pagination?: MatPaginator | any;

  private taskSubscription: Subscription | undefined;

  searchRadioButtonValue = 'Priority';

  dataSource = new MatTableDataSource<Task>();
  totalTasks = 0;
  comboPages = [1, 3, 5, 8];
  displayedColumns = [
    'Priority',
    'Status',
    'User',
    'Room',
    'CreatedDate',
    'actions',
  ];

  timeout: any = null;

  // Filter for search by column
  paginationFilter: PaginationFilter[] = [
    {
      property: 'Priority',
      value: '',
    },
  ];
  // Request for get tasks paginated with the filter (default null)
  paginationRequest: PaginationList = {
    pageSize: 5,
    page: 1,
    sort: 'Priority',
    sortDirection: 'asc',
    filter: this.paginationFilter,
  };

  constructor(
    private taskService: TaskService,
    private dialog: MatDialog,
    private snackbar: MatSnackBar,
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
    this.taskService.searchTasks(this.paginationRequest);
    this.taskSubscription = this.taskService
      .getTasks()
      .subscribe((pagination: PaginationTask) => {
        this.dataSource = new MatTableDataSource<Task>(pagination.data);
        this.totalTasks = pagination.totalRows;
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
    if (event.value === 'Room') {
      updatedPaginationFilter = this.searchByRoom(this.paginationFilter[0].value);
    }
    this.paginationRequest.filter = updatedPaginationFilter;

    this.taskService.searchTasks(this.paginationRequest);
  }

  // Event from search input for search by column and value
  taskFilter(event: any): void {
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
        if (this.searchRadioButtonValue === 'Room') {
          $this.paginationFilter = this.searchByRoom(event.target.value);
        }
        this.paginationRequest.filter = $this.paginationFilter;
        $this.taskService.searchTasks(this.paginationRequest);
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
    this.taskService.searchTasks(this.paginationRequest);
  }

  // For pagination and ordering (column options)
  orderColumns(event: Sort): void {
    this.paginationRequest.sort = event.active;
    this.paginationRequest.sortDirection = event.direction;
    this.taskService.searchTasks(this.paginationRequest);
  }

  // Open a modal for insert a new task
  insertTask(): void {
    const dialogRef = this.dialog.open(InsertTaskModalComponent, {
      width: '400px',
    });
    dialogRef
      .afterClosed()
      .pipe(delay(500))
      .subscribe(() => {
        this.taskService.searchTasks(this.paginationRequest);
      });
  }

  // Open a modal for watch or update task data
  updateTask(task: string): void {
    const dialogRef = this.dialog.open(UpdateTaskModalComponent, {
      width: '400px',
      data: { task },
    });
    dialogRef
      .afterClosed()
      .pipe(delay(500))
      .subscribe(() => {
        this.taskService.searchTasks(this.paginationRequest);
      });
  }

  // Open the modal with a confirmation to delete task
  deleteTask(taskId: string, task: Task): void {
    const dialogRef = this.dialog.open(DeleteTaskModalComponent, {
      width: '250px',
      data: { taskId, task },
    });

    // If modal was closed with a 'confirm' status delete the task
    dialogRef
      .afterClosed()
      .pipe(delay(500))
      .subscribe((result) => {
        if (result === 'confirm') {
          this.taskService.deleteTask(taskId).subscribe((response) => {
            // And show a snackbar with the request result
            this.snackbar.open(response, 'Cerrar', { duration: 3000 });
            // Then, get updated list tasks
            this.taskService.searchTasks(this.paginationRequest);
          });
        }
      });
  }

  private searchByRoom(value: string) {
    const updatedPaginationFilter: PaginationFilter[] = [
      {
        property: 'Room.RoomNumber',
        value: value,
      },
      {
        property: 'Room.Floor',
        value: value,
      },
      {
        property: 'Room.Type',
        value: value,
      },
      {
        property: 'Room.Status',
        value: value,
      },
    ];
    return updatedPaginationFilter;
  }

  private searchByUser(value: string) {
    const updatedPaginationFilter: PaginationFilter[] = [
      {
        property: 'Room.RoomNumber',
        value: value,
      },
      {
        property: 'Room.Floor',
        value: value,
      },
      {
        property: 'Room.Type',
        value: value,
      },
      {
        property: 'Room.Status',
        value: value,
      },
    ];
    return updatedPaginationFilter;
  }
}
