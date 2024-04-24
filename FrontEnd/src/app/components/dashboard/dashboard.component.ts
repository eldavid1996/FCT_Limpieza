import { Component } from '@angular/core';
import { MaterialModule } from '../../edbmaterial.module';
import { CommonModule } from '@angular/common';
import { FlexLayoutServerModule } from '@angular/flex-layout/server';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from '../navegacion/navbar/navbar.component';
import { MenuListaComponent } from '../navegacion/menu-lista/menu-lista.component';

@Component({
  selector: 'root-dashboard',
  standalone: true,
  imports:[MaterialModule,CommonModule,FlexLayoutServerModule,FlexLayoutModule,FormsModule,NavbarComponent,MenuListaComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

}
