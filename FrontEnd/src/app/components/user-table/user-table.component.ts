import { Component, input, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user.service';
import { MaterialModule } from './material.module';
import { MatSort, Sort } from '@angular/material/sort';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Subscription } from 'rxjs';
import { PaginationUser } from '../../models/paginationUser.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-table',
  standalone: true,
  imports: [MaterialModule ],
  templateUrl: './user-table.component.html',
  styleUrl: './user-table.component.css',
})
export class UserTableComponent implements OnInit {
  @ViewChild(MatSort) ordenamiento?: MatSort | any;
  @ViewChild(MatPaginator) paginacion?: MatPaginator | any;
  private userSubscription: Subscription | undefined;

  totalLibros = 0;
  usersPorPagina = 2;
  paginaCombo = [1, 2, 5, 10, 100];
  pagina = 1;
  sort = 'id';
  sortDirection = 'asc';
  filterValue: any = null;
  displayedColumns = ['id', 'name', 'email', 'phone', 'actions'];
  dataSource = new MatTableDataSource<User>();

  constructor(private userService: UserService,private router: Router) {}
  ngOnInit(): void {
    // this.userService.obtenerUsers(this.usersPorPagina, this.pagina, this.sort, this.sortDirection, this.filterValue);
    // this.userSubscription = this.userService.obtenerActualListener().subscribe((pagination: PaginationUser) => {
    //   this.dataSource = new MatTableDataSource<User>(pagination.data);
    //   this.totalLibros = pagination.totalRows;
    // })
    this.dataSource.data = this.userService.getUsers();
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
    ); //Esto se utiliza para enviar al back el request
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

  editarEmpleado(empleado: User):void {
    console.log(empleado);
  }

  eliminarEmpleado(id: number): void {
    console.log(id);
  }

  hacerFiltro(filter: string): void {
    // Convertimos el filtro a minúsculas para hacer la búsqueda insensible a mayúsculas y minúsculas
    const filtroMinusculas = filter.toLowerCase();

    // Filtramos los usuarios basados en el filtro de nombre, email o teléfono
    // const filteredUsers = this.userService.obtenerUsers()
    // .filter(user =>
    //     user.name.toLowerCase().includes(filtroMinusculas) ||
    //     user.email.toLowerCase().includes(filtroMinusculas) ||
    //     user.phone.toLowerCase().includes(filtroMinusculas)
    // );
    // Actualizamos el dataSource con los usuarios filtrados
    //this.dataSource.data = filteredUsers;
  }
  redirectTo(route:string){
    this.router.navigate([route]);
  }
}
