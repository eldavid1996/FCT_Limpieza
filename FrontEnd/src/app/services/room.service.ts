import { Subject, Observable } from 'rxjs';
import { environment } from '../../environment/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
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
  checkRoomExists(roomNumber: string): Observable<boolean> {
    const url = this.baseUrl+'Room/checkExists/'+roomNumber;
    return this.http.get<boolean>(url);
  }

  getRooms(): Room[] {
    return this.roomList;
  }
  getAllRooms(): Observable<Room[]> {
    return this.http.get<Room[]>(this.baseUrl+'Room'); //Obtenemos todas las habitaciones
  }
  guardarRoom(room: Room) {
    console.log('Enviando solicitud para guardar habitación:', room);
    this.http.post(this.baseUrl + 'Room', room).subscribe(
      (data) => {
        console.log('Respuesta del servidor:', data);
        this.roomSubject.next(room);
      },
      (error) => {
        if (error instanceof HttpErrorResponse && error.status === 400) {
          // Habitación ya existe, manejar el error
          console.error('La habitación ya existe en la base de datos:', error);
          this.roomSubject.error('La habitación ya existe en la base de datos');
        } else {
          // Otro tipo de error, manejar según sea necesario
          console.error('Error al guardar la habitación:', error);
          this.roomSubject.error('Error al guardar la habitación');
        }
      }
    );
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
    console.log('Enviando solicitud para borrar habitacion con id:', roomId);
    return this.http.delete(this.baseUrl + 'Room/' + roomId);
  }
  guardarRoomListener() {
    return this.roomSubject.asObservable();  }

}
