import { Subject, Observable } from 'rxjs';
import { environment } from '../../environment/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PaginationRoom } from '../models/paginationRoom.model';
import { Room } from '../models/room.model';

@Injectable({
  providedIn: 'root',
})
export class RoomService {

  baseUrl = environment.gatewayUrl;
  roomSubject = new Subject<any>();
  roomPagination: PaginationRoom | undefined;
  roomPaginationSubject = new Subject<PaginationRoom>();

  private roomList: Room[] = [];

  constructor(private http: HttpClient) {}

  obtenerRooms(
    roomsPorPagina: number,
    paginaActual: number,
    sort: string,
    sortDirection: string,
    filterValue: any
  ): void {
    const request = {
      pageSize: roomsPorPagina,
      page: paginaActual,
      sort,
      sortDirection,
      filterValue,
    };

    this.http
      .post<PaginationRoom>(this.baseUrl + 'Room/pagination', request)
      .subscribe((response) => {
        this.roomPagination = response;
        this.roomPaginationSubject.next(this.roomPagination);
      });
  }
  obtenerActualListener(): Observable<PaginationRoom> {
    return this.roomPaginationSubject.asObservable();
  }

  getRooms(): Room[] {
    return this.roomList;
  }
  guardarRoom(room: Room) {
    console.log('Enviando solicitud para guardar tarea:', room);
    this.http.post(this.baseUrl + 'Room', room).subscribe((data) => {
      console.log('Respuesta del servidor:', data);
      this.roomSubject.next(room);

    });
  }
  editarRoom(room:Room){
    console.log('Enviando solicitud para ediatr hab:', room);
    this.http.put(this.baseUrl +'Room/' + room.id,room).subscribe((data) => {
      console.log('Respuesta del servidor:', data);
      this.roomSubject.next(room);
    });
  }
  editarRoomListener() {
    return this.roomSubject.asObservable();
  }
  eliminarRoom(roomId: string) {
    console.log('Enviando solicitud para borrar usuario con id:', roomId);
    return this.http.delete(this.baseUrl + 'Room/' + roomId);
  }
  guardarRoomListener() {
    return this.roomSubject.asObservable();  }

}
