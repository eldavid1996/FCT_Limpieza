import { Observable, Subject } from "rxjs";
import { User } from "../models/user.model";
import { PaginationUser } from "../models/paginationUser.model";
import { HttpClient, HttpParams } from "@angular/common/http";
import { environment } from "../../environment/environment";
import { Injectable } from "@angular/core";


@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl = environment.baseUrl;
  userSubject = new Subject();
  userPagination: PaginationUser | any;
  userPaginationSubject = new Subject<PaginationUser>();


  constructor(private http: HttpClient) { }

  obtenerUsers(usersPorPagina: number, paginaActual: number, sort: string, sortDirection: string, filterValue: any) {
    const request = {//Objeto que se le envia al server
      pageSize: usersPorPagina,
      page: paginaActual,
      sort,
      sortDirection,
      filterValue
    };
    this.http.post<PaginationUser>('https://localhost:7275/api/UserService/pagination', request).subscribe((data) => {
      this.userPagination = data;
      this.userPaginationSubject.next(this.userPagination);
    });
  }
  obtenerActualListener() {
    return this.userPaginationSubject.asObservable();
  }


  guardarUser(user: User) {
    console.log('Enviando solicitud para guardar usuario:', user);
    this.http.post('https://localhost:7275/api/UserService', user).subscribe((data) => {
      console.log('Respuesta del servidor:', data);
      this.userSubject.next(user);
    });
  }

  guardarUserListener() {
    return this.userSubject.asObservable();
  }
}
