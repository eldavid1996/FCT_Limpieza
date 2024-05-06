import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { Subscription } from 'rxjs';
import { MaterialModule } from '../user-table/material.module';
import { MatTableDataSource } from '@angular/material/table';
import { Room } from '../../models/room.model';
import { Router } from '@angular/router';
import { PaginationRoom } from '../../models/paginationRoom.model';
import { RoomService } from '../../services/room.service';

@Component({
  selector: 'app-room-table',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './room-table.component.html',
  styleUrl: './room-table.component.css',
})
export class RoomTableComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild(MatSort) ordenamiento?: MatSort | any;
  @ViewChild(MatPaginator) paginacion?: MatPaginator | any;
  private roomSubscription: Subscription | undefined;

  timeout: any = null;
  totalRooms = 0;
  roomsPorPagina = 5;
  paginaCombo = [1, 3, 5, 8];
  pagina = 1;
  sort = 'name';
  sortDirection = 'asc';
  filterValue: any = null;
  displayedColumns = ['RoomNumber', 'Floor', 'Type', 'Status', 'actions']; //Cambiar id por dni o ciudad
  dataSource = new MatTableDataSource<Room>();

  constructor(private roomService: RoomService, private router: Router) {}

  
  ngOnDestroy(): void {
    this.roomSubscription?.unsubscribe();
  }
  ngOnInit(): void {
      this.roomService.obtenerRooms(
        this.roomsPorPagina,
        this.pagina,
        this.sort,
        this.sortDirection,
        this.filterValue
      );
      this.roomSubscription = this.roomService
        .obtenerActualListener()
        .subscribe((pagination: PaginationRoom) => {
          this.dataSource = new MatTableDataSource<Room>(pagination.data);
          this.totalRooms = pagination.totalRows;
        });
    }
  

  // hacerFiltro(event: any): void {
  //   clearTimeout(this.timeout);
  //   const $this = this;
  //   //Este metodo hace que  el request se envie cuando llevemos un segundo sin escribir y va a buscar titulos
  //   this.timeout = setTimeout( ()  => {

  //     if (event.keyCode != 13) {
  //       const filterValueLocal = {
  //         propiedad: 'name',
  //         valor: event.target.value,
  //       };

  //       $this.filterValue = filterValueLocal;
  //       $this.roomService.obtenerRooms($this.roomsPorPagina, $this.pagina, $this.sort, $this.sortDirection, filterValueLocal);
  //     }
  //   }, 1000)
  // }
  ngAfterViewInit(): void {
    this.dataSource.sort = this.ordenamiento;
    this.dataSource.paginator = this.paginacion;
  }

  // evento paginador
  eventoPaginador(event: PageEvent): void {
    this.roomsPorPagina = event.pageSize;
    this.pagina = event.pageIndex + 1;
    this.roomService.obtenerRooms(
      this.roomsPorPagina,
      this.pagina,
      this.sort,
      this.sortDirection,
      this.filterValue
    );
  }

  ordenarColumna(event: Sort): void {
    this.sort = event.active;
    this.sortDirection = event.direction;
    this.roomService.obtenerRooms(
      this.roomsPorPagina,
      this.pagina,
      event.active,
      event.direction,
      this.filterValue
    );
  }

  editarRoom(room: Room): void {
    console.log(room);
  }

  eliminarRoom(id: string): void {
    console.log(id);
  }

  redirectTo(route: string) {
    this.router.navigate([route]);
  }
}
