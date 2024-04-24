import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { User } from './user.model';
import { UserService } from '../../services/user.service';
import { MaterialModule } from './material.module';
import { PaginationUser } from './paginationUser.model';
import { MatSort, Sort } from '@angular/material/sort';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user-table',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './user-table.component.html',
  styleUrl: './user-table.component.css'
})
export class UserTableComponent implements OnInit {

  @ViewChild(MatSort) ordenamiento?: MatSort | any;
  @ViewChild(MatPaginator) paginacion?: MatPaginator | any;
  private bookSubscription: Subscription | undefined;

  totalLibros = 0;
  usersPorPagina = 2;
  paginaCombo = [1, 2, 5, 10];
  pagina = 1;
  sort = 'id';
  sortDirection = 'asc';
  filterValue: any = null;
  displayedColumns= ["id","name","email","phone","actions"];
  
  dataSource =  new MatTableDataSource<User>();

  constructor(private userService: UserService){}
  ngOnInit(): void {
    this.dataSource.data = this.userService.getUsers();
  }

  // evento paginador
  eventoPaginador(event: PageEvent): void {
    this.usersPorPagina = event.pageSize;
    this.pagina = event.pageIndex + 1;
    //this.booksService.obtenerLibros(this.librosPorPagina, this.pagina, this.sort, this.sortDirection, this.filterValue); //Esto se utiliza para enviar al back el request
    this.userService.getUsers();
  }

  ordenarColumna(event: Sort): void {
    this.sort = event.active;
    this.sortDirection = event.direction;
    //this.booksService.obtenerLibros(this.librosPorPagina, this.pagina, event.active, event.direction, this.filterValue);
    this.userService.getUsers();
  }

  editarEmpleado(empleado: User) {
    console.log(empleado);
  }
  
  eliminarEmpleado(id: number) {
    console.log(id)
  }


  // hacerFiltro(event: any): void {
  //   clearTimeout(this.timeout);
  //   const $this = this;
  //   //Este metodo hace que  el request se envie cuando llevemos un segundo sin escribir y va a buscar titulos
  //   this.timeout = setTimeout( ()  => {

  //     if (event.keyCode != 13) {
  //       const filterValueLocal = {
  //         propiedad: 'titulo',
  //         valor: event.target.value,
  //       };

  //       $this.filterValue = filterValueLocal;
  //       $this.booksService.obtenerLibros($this.librosPorPagina, $this.pagina, $this.sort, $this.sortDirection, filterValueLocal);
  //     }
  //   }, 1000)
  // }

}
