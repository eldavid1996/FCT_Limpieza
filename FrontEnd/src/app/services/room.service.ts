import { Subject, Observable } from 'rxjs';
import { environment } from '../../environment/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PaginationRoom } from '../models/paginationRoom.model';
import { Room } from '../models/room.model';

@Injectable({
  providedIn: 'root'
})
export class RoomService {
  baseUrl = environment.roomUrl;
  userSubject = new Subject<any>();
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
      .post<PaginationRoom>(this.baseUrl + 'api/RoomService/pagination', request)
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
}
