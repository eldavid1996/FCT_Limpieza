
import { Routes,RouterModule } from '@angular/router';
import { UserTableComponent } from './components/user-table/user-table.component';
import { RootComponent } from './root.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/seguridad/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';


// Definición de las rutas
export const routes: Routes = [

    { path: 'empleados' , component:UserTableComponent},
    { path:'empleado',component:UserProfileComponent},
    { path: 'login', component: LoginComponent }, // Ruta para el componente LoginComponent
    { path: 'dashboard', component: DashboardComponent },

];

@NgModule({
  imports: [RouterModule, CommonModule], // Importa RouterModule.forRoot() para configurar las rutas principales
  exports: [RouterModule],
  providers:[]
})

export class AppRoutingModule {}
