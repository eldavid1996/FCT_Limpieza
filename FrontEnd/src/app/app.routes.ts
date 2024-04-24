import { Routes } from '@angular/router';
import { UserTableComponent } from './components/user-table/user-table.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';

export const routes: Routes = [

    { path: 'empleados' , component:UserTableComponent},
    { path:'empleado',component:UserProfileComponent},
];
