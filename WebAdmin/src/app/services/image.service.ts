import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  apiUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getAllImages(): Observable<any[]> {
    return this.http.get<{ data: any[] }>(`${this.apiUrl}image/all`).pipe(
      map(response => response.data)
    );
  }
}
