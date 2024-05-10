import { Component, OnDestroy, OnInit } from '@angular/core';
import { delay, Subject, Subscription } from 'rxjs';
import { SecurityService } from '../../../services/security.service';
import { TaskService } from '../../../services/task.service';
import { Task } from '../../../models/task.model';
import { PaginationFilter } from '../../../models/paginationFilter.model';
import { PaginationList } from '../../../models/Pagination.model';
import { MaterialModule } from '../../../material.module';
import { CommonModule, JsonPipe } from '@angular/common';
import { log } from 'console';

@Component({
  selector: 'app-task-board',
  standalone: true,
  imports: [MaterialModule, CommonModule],
  templateUrl: './task-board.component.html',
  styleUrls: ['./task-board.component.css'],
})
export class TaskBoardComponent implements OnInit, OnDestroy {
  private taskSubject = new Subject();
  private taskSubscription: Subscription | undefined;
  dataSource: Task[] = [];
  userLoggedId: string | undefined;
  

  constructor(
    private taskService: TaskService,
    private securityService: SecurityService
  ) {}

  paginationFilter: PaginationFilter[] = [
    {
      property: 'User.Id',
      value: '',
    },
  ];

  paginationRequest: PaginationList = {
    pageSize: 50,
    page: 1,
    sort: 'Status',
    sortDirection: 'desc',
    filter: this.paginationFilter,
  };

  
  ngOnInit(): void {
    this.userLoggedId = this.securityService.getUserLoggedId();

    if (this.userLoggedId) {
      this.paginationFilter[0].value = this.userLoggedId;
      this.taskService.searchTasks(this.paginationRequest);
      this.taskService.getTasks()?.subscribe(
        (data: any) => {
          this.dataSource = data;
          // Sorting Tasks by status (done or not)
          // this.dataSource.sort((a: Task, b: Task) => {
          //   if (
          //     a.status.toLowerCase() === 'por hacer' &&
          //     b.status.toLowerCase() !== 'por hacer'
          //   ) {
          //     return -1; // a before b
          //   } else if (
          //     a.status.toLowerCase() !== 'por hacer' &&
          //     b.status.toLowerCase() === 'por hacer'
          //   ) {
          //     return 1; // b before a
          //   } else {
          //     return 0; // no changes
          //   }
          // });
        },
        (error: any) => {
          console.error('Error en la solicitud HTTP:', error);
        }
      );
    }
     // Subscribe to task updates
     this.taskSubscription = this.taskService
     .getTasks()
     .subscribe((data: any) => {
       this.dataSource = data.data;
     });
    
    
  }

  

  loadChanges() {
    // Subscribe to task updates
    this.taskSubscription = this.taskService
      .getTasks()
      .subscribe((data: any) => {
        this.dataSource = data.data;

        this.dataSource.sort((a: Task, b: Task) => {
          if (
            a.status.toLowerCase() === 'por hacer' &&
            b.status.toLowerCase() !== 'por hacer'
          ) {
            return -1;
          } else if (
            a.status.toLowerCase() !== 'por hacer' &&
            b.status.toLowerCase() === 'por hacer'
          ) {
            return 1;
          } else {
            return 0;
          }
        });
      });
  }

  ngOnDestroy(): void {
    this.taskSubscription?.unsubscribe();
  }

  changeTaskStatus(task: Task) {
    if (task.status.toLowerCase() == 'pendiente') {
      const tasktemp = {...task};
      tasktemp.status = 'Finalizada';
   
      
      

      // Update de task status to "finished"
      this.taskService.updateTask(task.id, tasktemp).subscribe(()=>{
        this.taskService.searchTasks(this.paginationRequest);
      });
      // We have to write the task on history task collection
      //this.taskService.completeTask(task).subscribe();
    }
    else if (task.status.toLowerCase() == 'finalizada') {
      task.status = 'Pendiente';
      console.log(task);
      // Update de task status to "To do"
      this.taskService.updateTask(task.id, task).subscribe(()=>{
        this.taskService.searchTasks(this.paginationRequest);
      });
      
    }else{
      console.log('Fallo al cambiar el estado de la tarea: ' + task.id);
      
    }
    
  }
  uncompleteTask(task: Task) {
    if (task.status.toLowerCase() == 'finalizada') {
      task.status = 'Por Hacer';
      console.log(task);
      // Update de task status to "To do"
      this.taskService.updateTask(task.id, task).subscribe(()=>{
        this.taskService.searchTasks(this.paginationRequest);
      });
      
    }
  }
}
