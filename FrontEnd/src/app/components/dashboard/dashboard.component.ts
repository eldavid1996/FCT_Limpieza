import { Component } from '@angular/core';
import { MaterialModule } from '../../edbmaterial.module';
import { CommonModule } from '@angular/common';
import { FlexLayoutServerModule } from '@angular/flex-layout/server';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from '../navegacion/navbar/navbar.component';
import { MenuListaComponent } from '../navegacion/menu-lista/menu-lista.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports:[MaterialModule,CommonModule,FlexLayoutServerModule,FlexLayoutModule,FormsModule,NavbarComponent,MenuListaComponent,HttpClientModule], // Agrega HttpClientModule aquí
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  constructor(private http: HttpClient) {} // Inyecta HttpClient en el constructor
}
