import { Routes } from '@angular/router';
import { UserTableComponent } from './components/user-table/user-table.component';
import { LoginComponent } from './components/security/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { RoomTableComponent } from './components/room-table/room-table.component';
import {
  SecurityRolesRouter,
  SecurityRouter,
} from './components/security/security.router';
import { TaskListComponent } from './components/task-list/task-list.component';
import { ProfileComponent } from './components/profile/profile.component';

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
    canActivate: [SecurityRouter, SecurityRolesRouter],
  },
  {
    path: 'perfil',
    component: ProfileComponent,
    canActivate: [SecurityRouter],
  },
  {
    path: 'habitaciones',
    component: RoomTableComponent,
    canActivate: [SecurityRouter, SecurityRolesRouter],
  },
  {
    path: 'tareas',
    component: TaskListComponent,
    canActivate: [SecurityRouter, SecurityRolesRouter],
  },
  { path: '**', redirectTo: '' },
];
