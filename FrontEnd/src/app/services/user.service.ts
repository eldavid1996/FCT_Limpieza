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

  userSubject = new Subject();
  userPagination: PaginationUser | any;
  userPaginationSubject = new Subject<PaginationUser>();

  baseUrlSecurity = environment.securityUrl;

  constructor(private http: HttpClient) { }

  obtenerUsers(usersPorPagina: number, paginaActual: number, sort: string, sortDirection: string, filterValue: any) {
    const request = {//Objeto que se le envia al server
      pageSize: usersPorPagina,
      page: paginaActual,
      sort,
      sortDirection,
      filterValue
    };
    this.http.post<PaginationUser>(this.baseUrlSecurity+'api/UserService/pagination', request).subscribe((data) => {
      this.userPagination = data;
      this.userPaginationSubject.next(this.userPagination);
    });
  }
  obtenerUsuarioPorId(id: string) {
    return this.http.get<User>(this.baseUrlSecurity + 'api/UserService/' + id);
  }
  obtenerActualListener() {
    return this.userPaginationSubject.asObservable();
  }


  guardarUser(user: User) {
    console.log('Enviando solicitud para guardar usuario:', user);
    this.http.post(this.baseUrlSecurity+'api/UserService', user).subscribe((data) => {
      console.log('Respuesta del servidor:', data);
      this.userSubject.next(user);
    });
  }
  editarUser(user:User){
    console.log('Enviando solicitud para ediatr usuario:', user);
    this.http.put(this.baseUrlSecurity+'api/UserService', user).subscribe((data) => {
      console.log('Respuesta del servidor:', data);
      this.userSubject.next(user);
    });
  }
  borrarUser(userId: string) {
    console.log('Enviando solicitud para borrar usuario con ID:', userId);
    return this.http.delete(this.baseUrlSecurity + 'api/UserService/' + userId);
  }
  editarUserListener() {
    return this.userSubject.asObservable();
  }

  guardarUserListener() {
    return this.userSubject.asObservable();
  }
}
