import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { SecurityService } from '../../../services/security.service';
import { TaskService } from '../../../services/task.service';
import { Task } from '../../../models/task.model';
import { PaginationFilter } from '../../../models/paginationFilter.model';
import { PaginationList } from '../../../models/Pagination.model';
import { MaterialModule } from '../../../material.module';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task-board',
  standalone: true,
  imports: [MaterialModule, CommonModule],
  templateUrl: './task-board.component.html',
  styleUrls: ['./task-board.component.css'],
})
export class TaskBoardComponent implements OnInit, OnDestroy {
  private taskSubscription: Subscription | undefined;
  dataSource: Task[] = [];
  userLoggedId: string | undefined;
  

  constructor(
    private taskService: TaskService,
    private securityService: SecurityService
  ) {}

  // Dinamic filter to check more than one property and value
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

  

  

  ngOnDestroy(): void {
    this.taskSubscription?.unsubscribe();
  }
  
  // Method that change the task status
  changeTaskStatus(task: Task) {
    if (task.status.toLowerCase() == 'pendiente') {
      const tasktemp = {...task};
      tasktemp.status = 'Finalizada';
   
      // Update task status to "finished"
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
 
}
