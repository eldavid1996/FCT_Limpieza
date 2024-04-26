import { HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { SeguridadService } from '../../services/seguriad.service';



@Injectable()
export class SeguridadInterceptor implements HttpInterceptor {

  constructor(private seguridadService: SeguridadService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler) {

    const tokenSeguridad = this.seguridadService.obtenerToken();
    const request = req.clone({
      headers: req.headers.set('Authorization', 'Bearer' + tokenSeguridad)
    });
    return next.handle(request);

  }
}
