import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { UserTableComponent } from './components/user-table/user-table.component';
import { RootComponent } from './root.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'empleados' , component:UserTableComponent},
    {path:'',component:RootComponent}
];
