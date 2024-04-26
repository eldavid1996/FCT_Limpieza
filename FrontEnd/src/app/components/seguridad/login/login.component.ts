import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms'; // Importa FormsModule aquí
import { SeguridadService } from '../../../services/seguriad.service';
import { MaterialModule } from '../../user-table/material.module';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  standalone:true,
  imports:[MaterialModule,CommonModule,FormsModule],
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private seguridadService: SeguridadService, private router: Router) {


  }

  ngOnInit(): void {
  }

  loginUsuario(form: NgForm){
    this.seguridadService.login({
      email: form.value.email,
      password: form.value.password
    });
  }

  login(){
    this.seguridadService.onSesion();
    this.router.navigate(['/']);
  }

}
