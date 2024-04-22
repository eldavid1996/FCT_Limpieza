import { LoginData } from "./login-data.model";
import { Usuario } from "./usuario.model";
import { Subject } from "rxjs";
import { Router } from "@angular/router";
import { Injectable } from "@angular/core";
import { environment } from "../environments/environment";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn:'root'
})
export class SeguridadService {

  baseUrl = environment.baseUrl;
  seguridadCambio = new Subject<boolean>();
  private usuario?: Usuario;

  constructor(private router: Router, private http : HttpClient) {}

  login(loginData: LoginData) {
    this.http.post(this.baseUrl + 'usuario/login', loginData).subscribe((data)=>{
      console.log('login respuesta', data)
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
    return this.usuario !== undefined;
  }
}
