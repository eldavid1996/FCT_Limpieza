import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Observable, Subscription } from 'rxjs';
import { PaginationTask } from '../../models/paginationTask.model';
import { Task } from '../../models/task.model';
import { TaskService } from '../../services/task.service';
import { MaterialModule } from '../user-table/material.module';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task-board',
  standalone:true,
  imports:[MaterialModule, CommonModule],
  templateUrl: './task-board.component.html',
  styleUrls: ['./task-board.component.css']
})
export class TaskBoardComponent implements OnInit, OnDestroy {

  @ViewChild(MatSort) ordenamiento?: MatSort | any;
  @ViewChild(MatPaginator) paginacion?: MatPaginator | any;

  private taskSubscription: Subscription | undefined;


  dataSource: Task[] = [];

  constructor(private taskService: TaskService, private dialog: MatDialog) {}

  ngOnDestroy(): void {}

  ngOnInit(): void {
    //this.taskSubscription = this.taskService.getTasks().subscribe((data: any) => {
      //this.dataSource = data;
    //});
  }


  editarTarea(task: Task): void {
    // Implementar la lógica para editar una tarea
  }

  eliminarTarea(id: number): void {
    // Implementar la lógica para eliminar una tarea
  }

  hacerFiltro(filter: string): void {
    // Implementar la lógica para filtrar las tareas
  }
}
