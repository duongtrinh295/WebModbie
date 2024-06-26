import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoginRequest } from '../interfaces/login-request';
import { Observable, catchError, map, of, throwError } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { AuthResponse } from '../interfaces/auth-response';
import { RegisterRequest } from '../interfaces/register-request';
import { UserDetail } from '../interfaces/user-detail';
import { UsersComponent } from '../pages/users/users.component';
import { Users } from '../interfaces/users';



@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiUrl: string = environment.apiUrl;
  private userKey = 'user';

  constructor(private http: HttpClient) { }

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

  logout() {
    localStorage.removeItem(this.userKey);
  }
  
  register(data: RegisterRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}auth/register`, data);
  }

  getDetail = (): Observable<UserDetail> =>
    this.http.get<UserDetail>(`${this.apiUrl}auth/me`);

  // getUserDetail = () => {
  //   const token = this.getToken();
  //   if (!token) return null;
  //   const decodedToken: any = jwtDecode(token);
  //   const userDetail = {
  //     userid: decodedToken.id,
  //     userName: decodedToken.userName,
  //     email: decodedToken.email,
  //     // roles: decodedToken.role || [],
  //   };

  //   return userDetail;
  // };

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
