import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Users } from '../interfaces/users';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  apiUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getAllUsers(page: number): Observable<Users[]> {
    return this.http.get<{ data: Users[] }>(`${this.apiUrl}user/all?page=${page}`).pipe(
      map(response => response.data)
    );
  }

  
  editUser(user: Users): Observable<Users> {
    return this.http.put<Users>(`${this.apiUrl}user/edit/${user.userId}`, {
      userName: user.userName,
      email: user.email,
      password: user.password
    });
  }

  searchUsers(keyword: string, page: number, size: number = 10): Observable<Users[]> {
    return this.http.get<{ data: Users[] }>(`${this.apiUrl}user/all?page=${page}&size=${size}&keyword=${keyword}`).pipe(
      map(response => response.data)
    );
  }
  getAllUsersRole(page: number): Observable<Users[]> {
    return this.http.get<{ data: Users[] }>(`${this.apiUrl}user/all?page=${page}`).pipe(
      map(response => response.data)
    );
  }

}
