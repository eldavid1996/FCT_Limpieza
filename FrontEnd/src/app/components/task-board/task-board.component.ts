import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Subscription } from 'rxjs';
import { Task } from '../../models/task.model';
import { TaskService } from '../../services/task.service';
import { MaterialModule } from '../user-table/material.module';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task-board',
  standalone:true,
  imports:[MaterialModule, CommonModule],
  templateUrl: './task-board.component.html',
  styleUrls: ['./task-board.component.css']
})
export class TaskBoardComponent implements OnInit, OnDestroy {

  private taskSubscription: Subscription | undefined;
  dataSource: Task[] = [];//lista de datos que contiene las tareas

  constructor(private taskService: TaskService, private dialog: MatDialog) {}

  ngOnDestroy(): void {
    this.taskSubscription?.unsubscribe();
  }

  ngOnInit(): void {
    this.taskSubscription = this.taskService.getTasks()?.subscribe((data: any) => {
      this.dataSource = data;//Se colocan abajo las tareas que ya están finalizadas
      this.dataSource.sort((a, b) => {
        if (a.status === 'por hacer' && b.status !== 'por hacer') {
          return -1; // a va antes que b
        } else if (a.status !== 'por hacer' && b.status === 'por hacer') {
          return 1; // b va antes que a
        } else {
          return 0; // no se cambia el orden
        }
      });
    });
  }

  
}
