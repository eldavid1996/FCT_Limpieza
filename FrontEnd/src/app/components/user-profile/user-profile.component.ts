import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../user-table/material.module';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [CommonModule,MaterialModule],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent implements OnInit {
  userData: User | any;

  constructor(private userService : UserService){}

  ngOnInit(): void {
  }





}
