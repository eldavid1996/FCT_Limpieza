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


@Component({
  selector: 'root-navbar',
  standalone: true,
  imports: [
    [MaterialModule,CommonModule,FlexLayoutServerModule,FlexLayoutModule,FormsModule,RouterModule],
  ],  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnDestroy{

  @Output() menuToggle = new EventEmitter;
  estadoUsuario?: boolean;
  usuarioSubscription?:Subscription;

  constructor(private seguridadServicio: SeguridadService) {


   }
  ngOnInit(): void {
    this.usuarioSubscription=this.seguridadServicio.seguridadCambio.subscribe(status =>{
      this.estadoUsuario = status;

    });
  }

  onMenuToggleDispatch() {
    this.menuToggle.emit();
  }

  ngOnDestroy(){
    if (this.usuarioSubscription) {
      this.usuarioSubscription.unsubscribe();
    }
  }
  logOut(){
    this.seguridadServicio.salirSesion();
  }


}
