import { Subject, Observable } from 'rxjs';
import { environment } from '../../environment/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PaginationRoom } from '../models/paginationRoom.model';
import { Pagination } from '../models/Pagination.model';

@Injectable({
  providedIn: 'root',
})
export class RoomService {
  baseUrl = environment.gatewayUrl;

  // Returned pagination model from request
  roomPagination: PaginationRoom | undefined;

  // Observable for send the room request data to components
  roomPaginationSubject = new Subject<PaginationRoom>();

  constructor(private http: HttpClient) {}

  // Search rooms with filters
  searchRooms(paginationRequest: Pagination): void {
    this.http
      .post<PaginationRoom>(this.baseUrl + 'Room/pagination', paginationRequest)
      .subscribe((response) => {
        this.roomPagination = response;
        this.roomPaginationSubject.next(this.roomPagination);
      });
  }

  // Get an observable with the rooms
  getRooms(): Observable<PaginationRoom> {
    return this.roomPaginationSubject.asObservable();
  }
}
