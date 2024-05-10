import { Routes } from '@angular/router';
import { UserTableComponent } from './components/admin/user/user.component';
import { LoginComponent } from './components/security/login/login.component';
import { DashboardComponent } from './components/shared/dashboard/dashboard.component';
import { RoomTableComponent } from './components/admin/room/room.component';
import {
  SecurityRolesRouter,
  SecurityRouter,
} from './components/security/security.router';
import { ProfileComponent } from './components/shared/profile/profile.component';
import { TaskBoardComponent } from './components/user/task-board/task-board.component';
import { TaskTableComponent } from './components/admin/task/task.component';

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
  {
    path: 'tareas2',
    component: TaskBoardComponent,
    canActivate: [SecurityRouter],
  },
  { path: '**', redirectTo: '' },
];
