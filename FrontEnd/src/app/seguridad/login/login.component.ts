import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../../edbmaterial.module';
import { CommonModule } from '@angular/common';
import { FlexLayoutServerModule } from '@angular/flex-layout/server';
import {FlexLayoutModule} from '@angular/flex-layout';
import { FormsModule, NgForm } from '@angular/forms'; // Importa FormsModule aquí
import { SeguridadService } from '../seguriad.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  standalone:true,
  imports:[MaterialModule,CommonModule,FlexLayoutServerModule,FlexLayoutModule,FormsModule],
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private seguridadService: SeguridadService) {


  }

  ngOnInit(): void {
  }

  loginUsuario(form: NgForm){
    this.seguridadService.login({
      email: form.value.email,
      password: form.value.password
    });
  }

}
