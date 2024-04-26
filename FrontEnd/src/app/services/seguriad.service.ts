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

        this.token = data.token;
        this.usuario = {
          id: data.id,
          name: data.name,
          surname: data.surname,
          password: '',
          email: data.email,
          dni: data.dni,
          phone: data.phone,
          birthDate: data.birthDate,
          pc: data.pc,
          city: data.city,
          admin: data.admin,
          token: data.token,
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
