import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { User } from '../../../models/user.model';
import { UserService } from '../../../services/user.service';
import { MatSort, Sort } from '@angular/material/sort';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Subscription } from 'rxjs';
import { PaginationUser } from '../../../models/paginationUser.model';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MaterialModule } from '../../../material.module';
import { UserDialogNuevoComponent } from './modal/add/user-dialog-nuevo.component';
import { UserDialogDeleteComponent } from './modal/delete/user-dialog-delete.component';
import { UserDialogChangeComponent } from './modal/change/user-dialog-change.component';

@Component({
  selector: 'app-user-table',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css',
})
export class UserTableComponent implements OnInit, OnDestroy {
  @ViewChild(MatSort) ordenamiento?: MatSort | any;
  @ViewChild(MatPaginator) paginacion?: MatPaginator | any;
  private userSubscription: Subscription | undefined;

  timeout: any = null;
  totalUsers = 0;
  usersPorPagina = 5;
  paginaCombo = [1, 3, 5, 8];
  pagina = 1;
  sort = 'Name';
  sortDirection = 'asc';
  filterValue: any = null;
  displayedColumns = ['id', 'name', 'email', 'phoneNumber', 'actions']; //Cambiar id por dni o ciudad
  dataSource = new MatTableDataSource<User>();

  constructor(
    private userService: UserService,
    private router: Router,
    private dialog: MatDialog
  ) {}
  ngOnDestroy(): void {
    this.userSubscription?.unsubscribe();
  }
  ngOnInit(): void {
    this.userService.obtenerUsers(
      this.usersPorPagina,
      this.pagina,
      this.sort,
      this.sortDirection,
      this.filterValue
    );
    this.userSubscription = this.userService
      .obtenerActualListener()
      .subscribe((pagination: PaginationUser) => {
        this.dataSource = new MatTableDataSource<User>(pagination.data);
        this.totalUsers = pagination.totalRows;
      });
  }

  hacerFiltro(event: any): void {
    clearTimeout(this.timeout);
    const $this = this;
    //Este metodo hace que  el request se envie cuando llevemos un segundo sin escribir y va a buscar titulos
    this.timeout = setTimeout(() => {
      if (event.keyCode != 13) {
        const filterValueLocal = {
          propiedad: 'name',
          valor: event.target.value,
        };

        $this.filterValue = filterValueLocal;
        $this.userService.obtenerUsers(
          $this.usersPorPagina,
          $this.pagina,
          $this.sort,
          $this.sortDirection,
          filterValueLocal
        );
      }
    }, 1000);
  }
  ngAfterViewInit(): void {
    this.dataSource.sort = this.ordenamiento;
    this.dataSource.paginator = this.paginacion;
  }

  // evento paginador
  eventoPaginador(event: PageEvent): void {
    this.usersPorPagina = event.pageSize;
    this.pagina = event.pageIndex + 1;
    this.userService.obtenerUsers(
      this.usersPorPagina,
      this.pagina,
      this.sort,
      this.sortDirection,
      this.filterValue
    );
  }

  ordenarColumna(event: Sort): void {
    this.sort = event.active;
    this.sortDirection = event.direction;
    this.userService.obtenerUsers(
      this.usersPorPagina,
      this.pagina,
      event.active,
      event.direction,
      this.filterValue
    );
  }
  abrirDialog() {
    const dialogRef = this.dialog.open(UserDialogNuevoComponent, {});
    dialogRef.afterClosed().subscribe(() => {
      this.userService.obtenerUsers(
        this.usersPorPagina,
        this.pagina,
        this.sort,
        this.sortDirection,
        this.filterValue
      );
    });
  }
  abrirDialogBorrar(user: User) {
    const dialogRef = this.dialog.open(UserDialogDeleteComponent, {
      data: { user },
    });
    dialogRef.afterClosed().subscribe(() => {
      this.userService.obtenerUsers(
        this.usersPorPagina,
        this.pagina,
        this.sort,
        this.sortDirection,
        this.filterValue
      );
    });
  }

  abrirDialogEditar(user: User) {
    const dialogRef = this.dialog.open(UserDialogChangeComponent, {
      data: { user },
    });
    dialogRef.afterClosed().subscribe(() => {});
  }

  editarEmpleado(empleado: User): void {
    this.userService.editarUser(empleado.id);
  }

  redirectTo(route: string) {
    this.router.navigate([route]);
  }
}
