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

  getAllUsersRole(page: number): Observable<Users[]> {
    return this.http.get<{ data: Users[] }>(`${this.apiUrl}user/all?page=${page}`).pipe(
      map(response => response.data)
    );
  }

}
