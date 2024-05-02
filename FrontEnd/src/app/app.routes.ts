import { Routes } from '@angular/router';
import { UserTableComponent } from './components/user-table/user-table.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { LoginComponent } from './components/seguridad/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { TaskComponent } from './components/task/task.component';

export const routes: Routes = [

    { path: 'empleados' , component:UserTableComponent},
    { path: '', component: LoginComponent }, // Ruta para el componente LoginComponent
    { path: 'dashboard', component: DashboardComponent },
    { path: 'task' , component:TaskComponent},
    { path:'user-profile',component:UserProfileComponent},


];

