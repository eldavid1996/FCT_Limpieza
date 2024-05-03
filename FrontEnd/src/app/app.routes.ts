import { Routes } from '@angular/router';
import { UserTableComponent } from './components/user-table/user-table.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { LoginComponent } from './components/seguridad/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { RoomTableComponent } from './components/room-table/room-table.component';
import { SecurityRouter } from './components/seguridad/security.router';
import { TaskListComponent } from './components/task-list/task-list.component';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [SecurityRouter],
  },
  {
    path: 'empleados',
    component: UserTableComponent,
    canActivate: [SecurityRouter],
  },
  {
    path: 'empleado/:id',
    component: UserProfileComponent,
    canActivate: [SecurityRouter],
  },
  {
    path: 'habitaciones',
    component: RoomTableComponent,
    canActivate: [SecurityRouter],
  },
  {
    path: 'tareas',
    component: TaskListComponent,
    canActivate: [SecurityRouter],
  },
  { path: '**', redirectTo: '' },
];
