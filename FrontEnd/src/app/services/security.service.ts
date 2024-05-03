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
export class SecurityService {
  baseUrl = environment.gatewayUrl;

  private user?: User;
  private token: string | any;

  securityChange = new Subject<boolean>();

  constructor(private router: Router, private http: HttpClient) {}

  login(loginData: LoginData) {
    this.http.post<User>(this.baseUrl + 'User/login', loginData).subscribe({
      next: (data) => {
        this.token = data.token;
        this.user = {
          id: data.id,
          name: data.name,
          surname: data.surname,
          email: data.email,
          dni: data.dni,
          phoneNumber: data.phoneNumber,
          birthDate: data.birthDate,
          cp: data.cp,
          city: data.city,
          roleAdmin: data.roleAdmin,
          token: data.token,
          urlImage: data.urlImage,
        };
        this.securityChange.next(true);
        localStorage.setItem('token', data.token);
        this.router.navigate(['dashboard']);
      },
      error: (e) => {
        this.securityChange.next(false);
        console.log(e);
      },
    });
  }

  getLoggedUser(): void {
    const tokenBrowser = localStorage.getItem('token');
    this.token = tokenBrowser;

    this.http
      .post<User>(this.baseUrl + 'User/loggedUser', null)
      .subscribe((data) => {
        this.token = data.token;
        this.user = {
          id: data.id,
          name: data.name,
          surname: data.surname,
          email: data.email,
          dni: data.dni,
          phoneNumber: data.phoneNumber,
          birthDate: data.birthDate,
          cp: data.cp,
          city: data.city,
          roleAdmin: data.roleAdmin,
          token: data.token,
          urlImage: data.urlImage,
        };
        this.securityChange.next(true);
      });
  }

  getToken(): string | any {
    return this.token;
  }

  logout() {
    this.user = undefined;
    this.securityChange.next(false);
    localStorage.removeItem('token');
    this.router.navigate(['/']);
  }

  getUser() {
    return { ...this.user };
  }

  onSesion() {
    return this.token != null;
  }
}
