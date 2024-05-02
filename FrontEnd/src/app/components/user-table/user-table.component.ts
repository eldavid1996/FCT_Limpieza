import { Component, EventEmitter, input, OnInit, Output, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user.service';
import { MaterialModule } from './material.module';
import { MatSort, Sort } from '@angular/material/sort';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Subscription } from 'rxjs';
import { PaginationUser } from '../../models/paginationUser.model';
import { UserDialogNuevoComponent } from '../modals/user-dialog/add/user-dialog-nuevo.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-user-table',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './user-table.component.html',
  styleUrl: './user-table.component.css',
})
export class UserTableComponent implements OnInit {
  [x: string]: any;
  @ViewChild(MatSort) ordenamiento?: MatSort | any;
  @ViewChild(MatPaginator) paginacion?: MatPaginator | any;

  private userSubscription: Subscription | undefined;

  totalUsers = 0;
  usersPorPagina = 10;
  paginaCombo = [1, 2, 5, 10, 100];
  paginaActual = 1;
  sort = 'name';
  sortDirection = 'asc';
  filterValue: any = null;
  displayedColumns = ['id', 'name', 'email', 'phoneNumber', 'actions'];
  dataSource = new MatTableDataSource<User>();

  constructor(private userService: UserService, private dialog:MatDialog) {}
  ngOnInit(): void {

    this.userService.obtenerUsers(this.usersPorPagina, this.paginaActual, this.sort, this.sortDirection, this.filterValue);
    this.userService.obtenerActualListener().subscribe((pagination: PaginationUser) => {
      this.dataSource = new MatTableDataSource<User>(pagination.data);
      this.totalUsers = pagination.totalRows;
    });
  }

  abrirDialog() {
    const dialogRef = this.dialog.open(UserDialogNuevoComponent, {

    });
    dialogRef.afterClosed().subscribe(() => {
      this.userService.obtenerUsers(this.usersPorPagina, this.paginaActual, this.sort, this.sortDirection, this.filterValue);

    });
  }

  eventoPaginador(event: PageEvent): void {
    this.usersPorPagina = event.pageSize;
    this.paginaActual = event.pageIndex + 1;
    // Realizar alguna acción adicional si es necesario
  }

  ordenarColumna(event: Sort): void {
    this.sort = event.active;
    this.sortDirection = event.direction;
    // Realizar alguna acción adicional si es necesario
  }

  editarEmpleado(empleado: User): void {
    // Implementar la lógica para editar un empleado
  }

  eliminarEmpleado(id: number): void {
    // Implementar la lógica para eliminar un empleado
  }

  hacerFiltro(filter: string): void {
    // Implementar la lógica para filtrar los usuarios
  }
}
