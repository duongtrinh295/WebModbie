import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { RoleCreateRequest } from '../interfaces/role-create-request';
import { Observable } from 'rxjs/internal/Observable';

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
}
