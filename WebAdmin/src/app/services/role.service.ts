import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { RoleCreateRequest } from '../interfaces/role-create-request';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

 
  createRole(role: RoleCreateRequest): Observable<{ message: string }> {
    // Ensure the roleCode is set to '111' if it's not provided
    role.roleCode = role.roleCode || '111';
    return this.http.post<{ message: string }>(`${this.apiUrl}role/create`, role);
  }

  getAllRoles(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}role/getAllRoles`);
  }
  
  assignRole = (
    user:string,
    role: string
  ): Observable<{message: string}> =>
    this.http.post<{message: string}>(`${this.apiUrl}user-role/add-role-user`,{
      user,
      role,
    }
  )

  getAllUserRoles(): Observable<any[]> {
    return this.http.get<{ data: any[] }>(`${this.apiUrl}user-role/all`).pipe(
      map((response: { data: any; }) => response.data)
    );
  }
}
