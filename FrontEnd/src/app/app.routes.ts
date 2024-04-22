import { LoginComponent } from './components/seguridad/login/login.component';
import { Injectable, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

export const routes: Routes = [
    { path: 'login', component: LoginComponent }
];
