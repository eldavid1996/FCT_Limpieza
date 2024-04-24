import { Component, EventEmitter, Output, OnDestroy} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../../../edbmaterial.module';
import { CommonModule } from '@angular/common';
import { FlexLayoutServerModule } from '@angular/flex-layout/server';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';
import { SeguridadService } from '../../seguridad/seguriad.service';
import { Subscription } from 'rxjs';
import { unsubscribe } from 'diagnostics_channel';
import { MenuListaComponent } from '../menu-lista/menu-lista.component';


@Component({
  selector: 'root-navbar',
  standalone: true,
  imports: [
    [MenuListaComponent,MaterialModule,CommonModule,FlexLayoutServerModule,FlexLayoutModule,FormsModule,RouterModule],
  ],  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnDestroy {

  @Output() menuToggle = new EventEmitter();
  estadoUsuario?: boolean;
  usuarioSubscription?: Subscription;
  currentTimeAndDate: string|any;

  constructor(private seguridadServicio: SeguridadService) {}

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

  logOut() {
    this.seguridadServicio.salirSesion();
  }
}
