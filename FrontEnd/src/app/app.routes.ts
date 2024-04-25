import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';

import { RootComponent } from './root.component'; // Asegúrate de importar RootComponent
import { LoginComponent } from './components/seguridad/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { UsersComponent } from './components/users/users.component';
import { RoomsComponent } from './components/rooms/rooms.component';
import { TaskComponent } from './components/task/task.component';

// Definición de las rutas
export const routes: Routes = [
    { path: 'login', component: LoginComponent }, // Ruta para el componente LoginComponent
    { path: 'dashboard', component: DashboardComponent },
    { path: 'task', component: TaskComponent },
    { path: 'rooms', component: RoomsComponent },
    { path: 'users', component: UsersComponent },
    { path: 'calendar', component: CalendarComponent },
];

@NgModule({
  imports: [RouterModule, CommonModule], // Importa RouterModule.forRoot() para configurar las rutas principales
  exports: [RouterModule],
  providers:[]
})

export class AppRoutingModule {}
