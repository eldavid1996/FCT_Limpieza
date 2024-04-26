import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MaterialModule } from '../user-table/material.module';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports:[MaterialModule,CommonModule,FormsModule,HttpClientModule], // Agrega HttpClientModule aquí
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  constructor(private http: HttpClient) {} // Inyecta HttpClient en el constructor
}
