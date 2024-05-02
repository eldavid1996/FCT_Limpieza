import { Subject } from 'rxjs';
import { User } from '../models/user.model';
import { PaginationUser } from '../models/paginationUser.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environment/environment';
import { Injectable } from '@angular/core';

@Injectable()
export class UserService {
  baseUrl = environment.baseUrl;
  userSubject = new Subject();

  userPagination: PaginationUser | undefined;
  userPaginationSubject = new Subject<PaginationUser>();

  constructor(private http: HttpClient) {}
  
  obtenerUsuarioPorId(id: string) {
    return this.http.get<User>(this.baseUrl + 'api/userservice/' + id);
  }

  

  obtenerUsers(
    librosPorPagina: number,
    paginaActual: number,
    sort: string,
    sortDirection: string,
    filterValue: any
  ): void {


    const request = {
      pageSize: librosPorPagina,
      page: paginaActual,
      sort,
      sortDirection,
      filterValue,
    };

    this.http
      .post<PaginationUser>(
        this.baseUrl + 'api/UserService/pagination',
        request
      )
      .subscribe((response) => {
        this.userPagination = response;
        this.userPaginationSubject.next(this.userPagination);
      });
  }

  obtenerActualListener() {
    return this.userPaginationSubject.asObservable(); // este es el metodo que devuelve los datos
  }

  guardarUser(user: User) {
    this.http.post(this.baseUrl + 'Libro', user).subscribe((response) => {
      this.userSubject.next(response); //y devuelvo la lista actualizada
    });
  }

  guardarLibroListener() {
    return this.userSubject.asObservable();
  }
}