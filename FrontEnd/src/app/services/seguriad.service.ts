import { LoginData } from '../components/seguridad/login-data.model';
import { User } from '../models/user.model';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { environment } from '../../environment/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class SeguridadService {
  private token: string | any;
  baseUrl = environment.baseUrl;
  seguridadCambio = new Subject<boolean>();
  private usuario?: User;

  obtenerToken(): string | any {
    return this.token;
  }
  constructor(private router: Router, private http: HttpClient) {}

  login(loginData: LoginData) {
    this.http
      .post<User>(this.baseUrl + 'usuario/login', loginData)
      .subscribe((data) => {
        console.log('login respuesta', data);


        this.usuario = {
          id:'',
          name: data.name,
          surname: data.surname,
          password: data.password,
          email: data.email,
          phoneNumber: data.phoneNumber,
          cp: data.cp,
          city: data.city,
          birthDate: data.birthDate,
          username: data.username


        };
        this.seguridadCambio.next(true);
      });
  }

  salirSesion() {
    this.usuario = undefined;
    this.seguridadCambio.next(false);
    this.router.navigate(['/login']);
  }

  obtenerUsuario() {
    return { ...this.usuario };
  }

  onSesion() {
    return true;
  }
}
