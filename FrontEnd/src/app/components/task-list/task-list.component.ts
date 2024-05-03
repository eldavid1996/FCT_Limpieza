import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MaterialModule } from '../user-table/material.module';
import { TaskService } from '../../services/task.service';
import { Subscription } from 'rxjs';
import { MatSort, Sort } from '@angular/material/sort';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Task } from '../../models/task.model';
import { MatDialog } from '@angular/material/dialog';
import { PaginationTask } from '../../models/paginationTask.model';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css'
})

export class TaskListComponent implements OnInit, OnDestroy, AfterViewInit {
  [x: string]: any;
  @ViewChild(MatSort) ordenamiento?: MatSort | any;
  @ViewChild(MatPaginator) paginacion?: MatPaginator | any;

  private taskSubscription: Subscription | undefined;

  totalTasks = 0;
  tasksPorPagina = 8;
  paginaCombo = [1, 3, 5, 8];
  paginaActual = 1;
  sort = 'priority';
  sortDirection = 'asc';
  filterValue: any = null;
  displayedColumns = ['id','priority', 'observations', 'actions'];
  dataSource = new MatTableDataSource<Task>();

  constructor(private taskService: TaskService, private dialog:MatDialog) {}
  ngOnDestroy(): void {
    this.taskSubscription?.unsubscribe();
  }
  ngOnInit(): void {

    this.taskService.obtenerTask(this.tasksPorPagina, this.paginaActual, this.sort, this.sortDirection, this.filterValue);
   this.taskSubscription = this.taskService.obtenerActualListener().subscribe((pagination: PaginationTask) => {
      this.dataSource.data = pagination.data;
      this.totalTasks = pagination.totalRows;
   });
  }
  ngAfterViewInit(): void {
    this.dataSource.sort = this.ordenamiento;
    this.dataSource.paginator = this.paginacion;
  }



  eventoPaginador(event: PageEvent): void {
    this.tasksPorPagina = event.pageSize;
    this.paginaActual = event.pageIndex + 1;
    // Realizar alguna acción adicional si es necesario
  }

  ordenarColumna(event: Sort): void {
    this.sort = event.active;
    this.sortDirection = event.direction;
    // Realizar alguna acción adicional si es necesario
  }

  editarTarea(task: Task): void {
    // Implementar la lógica para editar un Tarea
  }

  eliminarTarea(id: number): void {
    // Implementar la lógica para eliminar un Tarea
  }

  hacerFiltro(filter: string): void {
    // Implementar la lógica para filtrar los usuarios
  }
}
