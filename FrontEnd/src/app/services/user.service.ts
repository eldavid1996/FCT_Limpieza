import { Subject, Observable } from 'rxjs';
import { environment } from '../../environment/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pagination } from '../models/Pagination.model';
import { PaginationUser } from '../models/paginationUser.model';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  baseUrl = environment.gatewayUrl;

  // Returned pagination model from request
  userPagination: PaginationUser | undefined;

  // Observable for send the user request data to components
  userPaginationSubject = new Subject<PaginationUser>();

  constructor(private http: HttpClient) {}

  // Search users with filters
  searchUsers(paginationRequest: Pagination): void {
    this.http
      .post<PaginationUser>(this.baseUrl + 'User/pagination', paginationRequest)
      .subscribe((response) => {
        this.userPagination = response;
        this.userPaginationSubject.next(this.userPagination);
      });
  }

  // Get an observable with the users
  getUsersListener(): Observable<PaginationUser> {
    return this.userPaginationSubject.asObservable();
  }

  // Delete user by id
  deleteUser(id: string) {
    return this.http.delete(this.baseUrl + 'User/' + id, {
      responseType: 'text',
    });
  }

  obtenerUsuarioPorId(id: string) {
    return this.http.get<User>(this.baseUrl + 'User/' + id);
  }

  // Update the selected user
  updateUser(id: string, updatedUser: User) {
    const body = { ...updatedUser, id };
    return this.http.put(this.baseUrl + 'User/' + id, body);
  }

  // insert a new user
  insertUser(newUser: User) {
    return this.http.post<User>(this.baseUrl + 'User', newUser);
  }

  getUsers(){
    return this.http.get(this.baseUrl + 'User');
  }
 
}
