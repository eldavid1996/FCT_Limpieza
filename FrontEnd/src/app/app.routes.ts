import { Routes } from '@angular/router';
import { UserTableComponent } from './components/user-table/user-table.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { LoginComponent } from './components/seguridad/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

export const routes: Routes = [

    { path: 'empleados' , component:UserTableComponent},
    { path:'empleado/:id',component:UserProfileComponent},
    { path: '', component: LoginComponent }, 
    { path: 'dashboard', component: DashboardComponent },
];

