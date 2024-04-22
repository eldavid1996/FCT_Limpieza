import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RootComponent } from './root.component'; // Asegúrate de importar RootComponent
import { LoginComponent } from './components/seguridad/login/login.component';

// Definición de las rutas
export const routes: Routes = [
    { path: 'login', component: LoginComponent }, // Ruta para el componente LoginComponent
];

@NgModule({
  imports: [RouterModule, CommonModule], // Importa RouterModule.forRoot() para configurar las rutas principales
  exports: [RouterModule],
  providers:[]
})

export class AppRoutingModule {}
