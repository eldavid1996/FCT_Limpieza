import { Component } from '@angular/core';

import { FormsModule } from '@angular/forms'; // Importa FormsModule aquí
import { MaterialModule } from './edbmaterial.module';
import { AppRoutingModule } from './app.routes';
import { RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { LoginComponent } from './components/seguridad/login/login.component';
import { FlexLayoutServerModule } from '@angular/flex-layout/server';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientModule } from '@angular/common/http';
import { NavbarComponent } from './components/navegacion/navbar/navbar.component';
import { MenuListaComponent } from './components/navegacion/menu-lista/menu-lista.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MaterialModule, FlexLayoutServerModule, FlexLayoutModule,
    AppRoutingModule,
    RouterLink,
    FormsModule, RootComponent,
    LoginComponent,
    NavbarComponent,
    RouterModule,
    HttpClientModule,
    MenuListaComponent],
  templateUrl: './root.component.html',
  styleUrl: './root.component.css',
})
export class RootComponent {
  abrirMenu = false;
  title: any;
  ngOnInit: any;
}
