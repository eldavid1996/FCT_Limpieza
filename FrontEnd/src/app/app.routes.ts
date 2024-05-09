import { Routes } from '@angular/router';
import { UserTableComponent } from './components/admin/user/user.component';
import { LoginComponent } from './components/security/login/login.component';
import { DashboardComponent } from './components/shared/inicio/dashboard.component';
import { RoomTableComponent } from './components/admin/room/room.component';
import {
  SecurityRolesRouter,
  SecurityRouter,
} from './components/security/security.router';
import { TaskTableComponent } from './components/admin/task/task.component';
import { ProfileComponent } from './components/shared/profile/profile.component';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  {
    path: 'inicio',
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
    component: TaskTableComponent,
    canActivate: [SecurityRouter, SecurityRolesRouter],
  },
  { path: '**', redirectTo: '' },
];
