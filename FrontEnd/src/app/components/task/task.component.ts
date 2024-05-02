import { Component, OnInit, ViewChild } from '@angular/core';
import { MaterialModule } from '../user-table/material.module';
import { TaskService } from '../../services/task.service';
import { Subscription } from 'rxjs';
import { MatSort, Sort } from '@angular/material/sort';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Task } from '../../models/task.model';
import { MatDialog } from '@angular/material/dialog';
import { TaskDialogNuevoComponent } from '../modals/task-dialog/add/task-dialog-nuevo.component';
import { PaginationTask } from '../../models/paginationTask.model';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './task.component.html',
  styleUrl: './task.component.css'
})

export class TaskComponent implements OnInit {
  [x: string]: any;
  @ViewChild(MatSort) ordenamiento?: MatSort | any;
  @ViewChild(MatPaginator) paginacion?: MatPaginator | any;

  private taskSubscription: Subscription | undefined;

  totalTasks = 0;
  tasksPorPagina = 10;
  paginaCombo = [1, 2, 5, 10, 100];
  paginaActual = 1;
  sort = 'priority';
  sortDirection = 'asc';
  filterValue: any = null;
  displayedColumns = ['id','priority','roomNumber', 'observations', 'actions'];
  dataSource = new MatTableDataSource<Task>();
  rooms: any[] = [];

  constructor(private taskService: TaskService, private dialog:MatDialog) {}
  ngOnInit(): void {

    this.taskService.obtenerTask(this.tasksPorPagina, this.paginaActual, this.sort, this.sortDirection, this.filterValue);
    this.taskService.obtenerActualListener().subscribe((pagination: PaginationTask) => {
      this.dataSource.data = pagination.data;
      this.totalTasks = pagination.totalRows;
   });
  }
  getRoomNumber(roomId: string): string {
    // Buscar la habitación correspondiente al roomId en la lista de habitaciones
    const room = this.rooms.find(room => room.id === roomId);
    // Si se encuentra la habitación, devolver su roomNumber; de lo contrario, devolver 'N/A'
    return room ? room.roomNumber : 'N/A';
  }

  abrirDialog() {
    const dialogRef = this.dialog.open(TaskDialogNuevoComponent, {

    });
    dialogRef.afterClosed().subscribe(() => {
      this.taskService.obtenerTask(this.tasksPorPagina, this.paginaActual, this.sort, this.sortDirection, this.filterValue);

    });
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
