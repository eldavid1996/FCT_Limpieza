import { Component, EventEmitter, Output, OnDestroy, OnInit} from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
import { MaterialModule } from '../user-table/material.module';
import { SeguridadService } from '../../services/seguriad.service';
import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    [MaterialModule,RouterModule, CommonModule],
  ],  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit,OnDestroy {

  @Output() menuToggle = new EventEmitter();
  estadoUsuario?: boolean;
  usuarioSubscription?: Subscription;
  currentTimeAndDate: string|any;

  constructor(private seguridadServicio: SeguridadService, private router: Router) {}

  ngOnInit(): void {
    this.usuarioSubscription = this.seguridadServicio.seguridadCambio.subscribe(status => {
      this.estadoUsuario = status;
    });
    this.getCurrentTimeAndDate();
  }

  onMenuToggleDispatch() {
     this.menuToggle.emit();
   }

  getCurrentTimeAndDate(): string {
    const currentDate = new Date();
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric'
    };
    return currentDate.toLocaleDateString('en-US', options);
  }

  ngOnDestroy() {
    if (this.usuarioSubscription) {
      this.usuarioSubscription.unsubscribe();
    }
   }
   showNavBar(){
    return this.router.url !== '/';

   }

  logOut() {
    this.seguridadServicio.salirSesion();
  }
}
