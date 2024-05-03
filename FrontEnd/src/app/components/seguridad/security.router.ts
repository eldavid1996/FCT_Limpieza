import { CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { SecurityService } from '../../services/security.service';
import { Observable } from 'rxjs';

// Need user token to navigate in the routes
@Injectable({
  providedIn: 'root',
})
export class SecurityRouter implements CanActivate {
  constructor(
    private securityService: SecurityService,
    private router: Router
  ) {}

  canActivate(): Observable<boolean> | boolean {
    if (this.securityService.onSesion()) {
      return true;
    } else {
      return false;
    }
  }
}
