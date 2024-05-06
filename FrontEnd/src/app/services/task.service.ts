import { Observable, Subject } from "rxjs";
import { Task } from "../models/task.model";
import { PaginationTask } from "../models/paginationTask.model";
import { HttpClient, HttpParams } from "@angular/common/http";
import { environment } from "../../environment/environment";
import { Injectable } from "@angular/core";


@Injectable({
  providedIn: 'root'
})
export class TaskService {
  baseUrl = environment.hotelUrl;
  taskSubject = new Subject();
  taskPagination: PaginationTask | any;
  taskPaginationSubject = new Subject<PaginationTask>();


  constructor(private http: HttpClient) { }

  obtenerTask(tasksPorPagina: number, paginaActual: number, sort: string, sortDirection: string, filterValue: any) {
    const request = {//Objeto que se le envia al server
      pageSize: tasksPorPagina,
      page: paginaActual,
      sort,
      sortDirection,
      filterValue
    };
    this.http.post<PaginationTask>(this.baseUrl + 'api/TaskService/pagination', request).subscribe((data) => {
      this.taskPagination = data;
      this.taskPaginationSubject.next(this.taskPagination);
    });
  }
  obtenerActualListener() {
    return this.taskPaginationSubject.asObservable();
  }


  guardarTask(Task: Task) {
    console.log('Enviando solicitud para guardar tarea:', Task);
    this.http.post(this.baseUrl + 'api/TaskService', Task).subscribe((data) => {
      console.log('Respuesta del servidor:', data);
      this.taskSubject.next(Task);
    });
  }

  guardarTaskListener() {
    return this.taskSubject.asObservable();
  }

  getTasks(){
    
    return this.http.get(this.baseUrl + 'api/taskservice');
  }
}
