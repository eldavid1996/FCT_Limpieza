import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
import { NavbarComponent } from '../navbar/navbar.component';
import { MaterialModule } from '../user-table/material.module';

@Component({
  selector: 'root-menu-lista',
  standalone: true,
  imports:[NavbarComponent,MaterialModule,CommonModule,FormsModule,RouterModule],  
  templateUrl: './menu-lista.component.html',
  styleUrl: './menu-lista.component.css'
})
export class MenuListaComponent  {
@Output() menuToggle = new EventEmitter;
estadoUsuario?:boolean;
usuarioSubscription?:Subscription;
//constructor(private seguridadService: SeguridadService){


}



