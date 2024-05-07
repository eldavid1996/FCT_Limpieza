import { User } from '../models/user.model';
import { PaginationUser } from '../models/paginationUser.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environment/environment';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn:'root'
})
export class UserService {
  baseUrl = environment.gatewayUrl;
  userSubject = new Subject();

  userPagination: PaginationUser | undefined;
  userPaginationSubject = new Subject<PaginationUser>();

  constructor(private http: HttpClient) {}

  obtenerUsuarioPorId(id: string) {
    return this.http.get<User>(this.baseUrl + 'User/' + id);
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
      .post<PaginationUser>(this.baseUrl + 'User/pagination', request)
      .subscribe((response) => {
        this.userPagination = response;
        this.userPaginationSubject.next(this.userPagination);
      });
  }

  obtenerActualListener() {
    return this.userPaginationSubject.asObservable(); // este es el metodo que devuelve los datos
  }
  getUserById(id:string){
    return this.http.get<User>(this.baseUrl + 'User/' + id);
  }

  guardarUser(user: User) {
    console.log('Enviando solicitud para guardar usuario:', user);
    this.http.post(this.baseUrl +'User', user).subscribe((data) => {
      console.log('Respuesta del servidor:', data);
      this.userSubject.next(user);
    });
  }
  editarUser(user:User){
    console.log('Enviando solicitud para ediatr usuario:', user);
    this.http.put(this.baseUrl +'User/' + user.id, user).subscribe((data) => {
      console.log('Respuesta del servidor:', data);
      this.userSubject.next(user);
    });
  }
  eliminarUser(userId: string) {
    console.log('Enviando solicitud para borrar usuario con ID:', userId);
    return this.http.delete(this.baseUrl + 'User/' + userId);
  }
  editarUserListener() {
    return this.userSubject.asObservable();
  }
 
  guardarUserListener() {
    return this.userSubject.asObservable();
  }
}
