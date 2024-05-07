import {AfterViewInit,Component,OnDestroy,OnInit,ViewChild} from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { Subscription } from 'rxjs';
import { MaterialModule } from '../user-table/material.module';
import { MatTableDataSource } from '@angular/material/table';
import { Room } from '../../models/room.model';
import { Router } from '@angular/router';
import { PaginationRoom } from '../../models/paginationRoom.model';
import { RoomService } from '../../services/room.service';
import { MatDialog } from '@angular/material/dialog';
import { RoomDialogNuevoComponent } from '../modals/room-dialog/add/room-dialog-nuevo.component';
import { RoomDialogDeleteComponent } from '../modals/room-dialog/delete/room-dialog-delete.component';
import { RoomDialogChangeComponent } from '../modals/room-dialog/change/room-dialog-change.component';

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

  constructor(private roomService: RoomService, private router: Router, private dialog: MatDialog) { }


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
  abrirDialog() {
    const dialogRef = this.dialog.open(RoomDialogNuevoComponent, {

    });
    dialogRef.afterClosed().subscribe(() => {
      this.roomService.obtenerRooms(this.roomsPorPagina, this.pagina, this.sort, this.sortDirection, this.filterValue);

    });
  }
  abrirDialogBorrar(room: Room) {
    const dialogRef = this.dialog.open(RoomDialogDeleteComponent, {
      data:{room}

    });
    dialogRef.afterClosed().subscribe(() => {
      this.roomService.obtenerRooms(this.roomsPorPagina, this.pagina, this.sort, this.sortDirection, this.filterValue);
    });
  }

  abrirDialogEditar(room:Room){
    const dialogRef = this.dialog.open(RoomDialogChangeComponent, {
      data:{room}

    });
    dialogRef.afterClosed().subscribe(() => {
      this.roomService.obtenerRooms(this.roomsPorPagina, this.pagina, this.sort, this.sortDirection, this.filterValue);
    });
  }

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
