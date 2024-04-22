import { Component, EventEmitter, OnDestroy, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../../../edbmaterial.module';
import { CommonModule } from '@angular/common';
import { FlexLayoutServerModule } from '@angular/flex-layout/server';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';
import { SeguridadService } from '../../seguridad/seguriad.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'root-menu-lista',
  standalone: true,
  imports:[MaterialModule,CommonModule,FlexLayoutServerModule,FlexLayoutModule,FormsModule,RouterModule],  templateUrl: './menu-lista.component.html',
  styleUrl: './menu-lista.component.css'
})
export class MenuListaComponent implements OnDestroy {
@Output() menuToggle = new EventEmitter;
estadoUsuario?:boolean;
usuarioSubscription?:Subscription;
constructor(private seguridadService: SeguridadService){


}
ngOnInit(){
  this.usuarioSubscription = this.seguridadService.seguridadCambio.subscribe(status=>{
    this.estadoUsuario = status;
  })
}

onCerrarMenu(){
  this.menuToggle.emit();
}
terminarSesionMenu(){
  this.onCerrarMenu();
  this.seguridadService.salirSesion();
}
ngOnDestroy(){
  this.usuarioSubscription?.unsubscribe;
}

}
