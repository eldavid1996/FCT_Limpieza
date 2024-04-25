import { Subject } from "rxjs";
import { User } from "../models/user.model";
import { PaginationUser } from "../models/paginationUser.model";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environment/environment";
import { Injectable } from "@angular/core";

@Injectable()
export class UserService {
  baseUrl = environment.baseUrl;
  private userList: User[] = [
    {
      "id": "1",
      "name": "Luis",
      "surname": "Martínez",
      "password": "contraseña1",  // Ejemplo de contraseña
      "email": "luis.martinez@example.com",
      "dni": "12345678A",
      "phone": "600 123 456",
      "birthDate": new Date("1992-09-01T00:00:00Z"),
      "pc": "28001",
      "city": "Madrid",
      "admin":0,
      "token": "token1"  // Ejemplo de token
    },
    {
      "id": "2",
      "name": "Ana",
      "surname": "González",
      "password": "contraseña2",  // Ejemplo de contraseña
      "email": "ana.gonzalez@example.com",
      "dni": "87654321B",
      "phone": "600 987 654",
      "birthDate": new Date("1998-02-06T00:00:00Z"),
      "pc": "08001",
      "city": "Barcelona",
      "admin":0,
      "token": "token2"  // Ejemplo de token
    },
    {
      "id": "3",
      "name": "Carlos",
      "surname": "Pérez",
      "password": "contraseña3",  // Ejemplo de contraseña
      "email": "carlos.perez@example.com",
      "dni": "56789012C",
      "phone": "600 111 222",
      "birthDate": new Date("1992-02-06T00:00:00Z"),
      "pc": "41001",
      "city": "Sevilla",
      "admin":0,
      "token": "token3"  // Ejemplo de token
    },
    {
      "id": "4",
      "name": "Elena",
      "surname": "Rodríguez",
      "password": "contraseña4",  // Ejemplo de contraseña
      "email": "elena.rodriguez@example.com",
      "dni": "34567890D",
      "phone": "600 333 444",
      "birthDate": new Date("1995-02-06T00:00:00Z"),
      "pc": "46001",
      "city": "Valencia",
      "admin":0,
      "token": "token4"  // Ejemplo de token
    }
    // ... tus usuarios aquí
  ];
  
  

  userSubject = new Subject();

  userPagination: PaginationUser | undefined;
  userPaginationSubject = new Subject<PaginationUser>();

  constructor(private http: HttpClient){}

  obtenerUsers(librosPorPagina: number, paginaActual: number, sort: string, sortDirection: string, filterValue: any):void{
    const request =  {
      pageSize: librosPorPagina,
      page: paginaActual,
      sort,
      sortDirection,
      filterValue
    }

    this.http.post<PaginationUser>(this.baseUrl + 'Libro/pagination', request).subscribe((response)=>{
      this.userPagination = response;
      this.userPaginationSubject.next(this.userPagination);
    });
  }

  obtenerActualListener(){
    return this.userPaginationSubject.asObservable(); // este es el metodo que devuelve los datos
  }

  guardarUser(user: User){
    this.http.post(this.baseUrl + 'Libro' , user ).subscribe((response)=>{
      this.userSubject.next(response);//y devuelvo la lista actualizada
    });
  }

  guardarLibroListener(){
    return this.userSubject.asObservable();
  }

  getUser(id:string){
    const filteredUser = this.userList.filter(user=> user.id === id);
    if(filteredUser.length > 0){
      return filteredUser[0];
    }
    return null;
  }
  getUsers(){
    return this.userList.slice();
  }
}
