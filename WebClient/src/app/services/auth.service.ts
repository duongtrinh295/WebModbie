import { Injectable } from '@angular/core';
import { RegisterRequest } from '../interfaces/register-request';
import { Observable, map } from 'rxjs';
import { AuthResponse } from '../interfaces/auth-response';
import { environment } from '../../environments/environment.development';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoginRequest } from '../interfaces/login-request';
import { jwtDecode } from 'jwt-decode';
import { Users } from '../interfaces/users';

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
  login(data: LoginRequest): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(`${this.apiUrl}auth/login`, data)
      .pipe(
        map((response) => {
          if (response) {
            localStorage.setItem(this.userKey, JSON.stringify(response));
          }
          return response;
        })
      );
    }
    getUserInfo(): Observable<Users> {
      const token = this.getToken();
      if (!token) {
        throw new Error('No token found');
      }
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });
      return this.http.get<Users>(`${this.apiUrl}auth/me`, { headers });
    }
  
    isLoggedIn = (): boolean => {
      const token = this.getToken();
      if (!token) return false;
      return true;
    };
  
    private isTokenExpired() {
      const token = this.getToken();
      if (!token) return true;
      const decoded = jwtDecode(token);
      const isTokenExpired = Date.now() >= decoded['exp']! * 1000;
      // if (isTokenExpired) this.logout();
      return true;
    }
  
    getToken = (): string | null => {
      const user = localStorage.getItem(this.userKey);
      if (!user) return null;
      const userDetail: AuthResponse = JSON.parse(user);
      return userDetail.token;
    };
  
  }
