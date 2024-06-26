import { Injectable } from '@angular/core';
import { RegisterRequest } from '../interfaces/register-request';
import { Observable } from 'rxjs';
import { AuthResponse } from '../interfaces/auth-response';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiUrl: string = environment.apiUrl;
  private userKey = 'user';

  
  constructor(private http: HttpClient) { }

  
  register(data: RegisterRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}auth/register`, data);
  }


}
