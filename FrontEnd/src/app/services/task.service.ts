import { Subject, Observable } from 'rxjs';
import { environment } from '../../environment/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PaginationList } from '../models/Pagination.model';
import { PaginationTask } from '../models/paginationTask.model';
import { Task } from '../models/task.model';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  baseUrl = environment.gatewayUrl;

  // Returned pagination model from request
  taskPagination: PaginationTask | undefined;


  // Observable for send the task request data to components
  taskPaginationSubject = new Subject<PaginationTask>();

  constructor(private http: HttpClient) {}

  // Search tasks with filters
  searchTasks(paginationRequest: PaginationList): void {
    this.http
      .post<PaginationTask>(this.baseUrl + 'Task/pagination', paginationRequest)
      .subscribe((response) => {
        this.taskPagination = response;
        this.taskPaginationSubject.next(this.taskPagination);
      });
  }

  // Get an observable with the tasks
  getTasks(): Observable<PaginationTask> {
    return this.taskPaginationSubject.asObservable();
  }

  // Delete task by id
  deleteTask(id: string) {
    return this.http.delete(this.baseUrl + 'Task/' + id, {
      responseType: 'text',
    });
  }

  // Update the selected task
  updateTask(id: string, updatedTask: Task) {
    const body = { ...updatedTask, id };
    return this.http.put(this.baseUrl + 'Task/' + id, body);
  }

  // insert a new task
  insertTask(newTask: Task) {
    return this.http.post<Task>(this.baseUrl + 'Task', newTask);
  }

  // Tasks without pagination object
  getAllTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.baseUrl + 'Task');
  }

  // Saving Task Method
  saveTask(task: Task): Observable<any> {
    return this.http.post(this.baseUrl + 'Task', task);
  }


  // Method to write on History task collection
  completeTask(task: Task){
    return this.http.post(this.baseUrl + 'TaskHistory', task);
  }

  
}
