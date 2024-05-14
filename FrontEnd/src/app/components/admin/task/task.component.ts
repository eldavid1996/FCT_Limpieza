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
import { MoveToHistoryTaskModalComponent } from './modals/moveToHistory/moveToHistoryTaskModal.component';
import { TaskHistoryTableComponent } from './modals/tables/taskHistory/taskHistory.component';
import { DeleteHistoryModalComponent } from './modals/delete/deleteHistoryModal.component';

@Component({
  selector: 'app-task-table',
  standalone: true,
  imports: [MaterialModule, CommonModule, TaskHistoryTableComponent],
  templateUrl: './task.component.html',
  styleUrl: './task.component.css',
})
export class TaskTableComponent implements OnInit, AfterViewInit {
  @ViewChild(MatSort) ordering?: MatSort | any;
  @ViewChild(MatPaginator) pagination?: MatPaginator | any;

  private taskSubscription: Subscription | undefined;

  roomNumbers: string[] = [];

  showActiveTasks: boolean = true;

  searchRadioButtonValue = 'Status';

  dataSource = new MatTableDataSource<Task>();
  totalTasks = 0;
  comboPages = [5, 10, 25, 50];
  displayedColumns = [
    'Status',
    'Priority',
    'User.Name',
    'Room.RoomNumber',
    'Observations',
    'actions',
  ];

  timeout: any = null;

  // Filter for search by column
  paginationFilter: PaginationFilter[] = [
    {
      property: 'Status',
      value: '',
    },
  ];
  // Request for get tasks paginated with the filter (default null)
  paginationRequest: PaginationList = {
    pageSize: 5,
    page: 1,
    sort: 'Status',
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

        // Save all roomNumbers assigned into an array for pass it to the tables
        this.roomNumbers = [];
        pagination.data.forEach((task) => {
          if (task.room && task.room.roomNumber) {
            this.roomNumbers.push(task.room.roomNumber);
          }
        });
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
    if (event.value === 'Room.RoomNumber') {
      updatedPaginationFilter = this.searchByRoom(
        this.paginationFilter[0].value
      );
    }
    if (event.value === 'User.Name') {
      updatedPaginationFilter = this.searchByUser(
        this.paginationFilter[0].value
      );
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
        if (this.searchRadioButtonValue === 'Room.RoomNumber') {
          $this.paginationFilter = this.searchByRoom(event.target.value);
        }
        if (this.searchRadioButtonValue === 'User.Name') {
          $this.paginationFilter = this.searchByUser(event.target.value);
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
      width: '800px',
      data: this.roomNumbers,
    });
    dialogRef
      .afterClosed()
      .pipe(delay(300))
      .subscribe(() => {
        this.taskService.searchTasks(this.paginationRequest);
      });
  }

  // Open a modal for watch or update task data
  updateTask(task: string): void {
    const roomNumbers = this.roomNumbers;

    const dialogRef = this.dialog.open(UpdateTaskModalComponent, {
      data: { task, roomNumbers },
    });
    dialogRef
      .afterClosed()
      .pipe(delay(200))
      .subscribe(() => {
        this.taskService.searchTasks(this.paginationRequest);
      });
  }

  // Open the modal with a confirmation to delete task
  deleteTask(taskId: string, task: Task): void {
    const dialogRef = this.dialog.open(DeleteTaskModalComponent, {
      width: '250px',
      data: { taskId, task, message: '' },
    });

    // If modal was closed with a 'confirm' status delete the task
    dialogRef
      .afterClosed()
      .pipe(delay(200))
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

  // Open the modal with a confirmation to delete task
  deleteHistory(): void {
    const dialogRef = this.dialog.open(DeleteHistoryModalComponent, {});

    // If modal was closed with a 'confirm' status delete the task
    dialogRef
      .afterClosed()
      .pipe(delay(200))
      .subscribe((result) => {
        if (result === 'confirm') {
          this.taskService.deleteAllHistory().subscribe((response) => {
            // And show a snackbar with the request result
            this.snackbar.open(response, 'Cerrar', { duration: 3000 });
            // Then, get updated list tasks
            this.taskService.searchTasksFromHistory(this.paginationRequest);
          });
        }
      });
  }

  moveTaskToHistory(taskId: string, task: Task): void {
    const dialogRef = this.dialog.open(MoveToHistoryTaskModalComponent, {
      width: '250px',
      data: { taskId, task },
    });

    // If modal was closed with a 'confirm' status move the task to the other database
    dialogRef
      .afterClosed()
      .pipe(delay(200))
      .subscribe((result) => {
        if (result === 'confirm') {
          this.taskService.moveTaskToHistory(taskId, task).subscribe({
            next: () => {
              // Show a snackbar with the request result
              this.snackbar.open('Se movió la tarea al histórico.', 'Cerrar', {
                duration: 3000,
              });
              // Then, get updated list tasks
              this.taskService.searchTasks(this.paginationRequest);
            },
            error: () => {
              this.snackbar.open('Ocurrió un error inesperado.', 'Cerrar', {
                duration: 3000,
              });
              this.taskService.searchTasks(this.paginationRequest);
            },
          });
        }
      });
  }

  // Change the table that is showing
  toggleShowActiveTasks(value: boolean) {
    this.showActiveTasks = value;
  }

  // Filters used for dinamyc filter
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
      {
        property: 'Room.Observations',
        value: value,
      },
    ];
    return updatedPaginationFilter;
  }

  private searchByUser(value: string) {
    const updatedPaginationFilter: PaginationFilter[] = [
      {
        property: 'User.Name',
        value: value,
      },
      {
        property: 'User.Surname',
        value: value,
      },
      {
        property: 'User.Email',
        value: value,
      },
      {
        property: 'User.City',
        value: value,
      },
      {
        property: 'User.PhoneNumber',
        value: value,
      },
    ];
    return updatedPaginationFilter;
  }
}
