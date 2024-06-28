
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment.development';
interface CategoryCreateRequest {
  name: string;
  parent_id: string;
}
@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) {}
  addCategory(category: CategoryCreateRequest): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(`${this.apiUrl}categories/add`, category);
  }
  getAllCategories(): Observable<any[]> {
    return this.http.get<{ data: any[] }>(`${this.apiUrl}categories/getAll`).pipe(
      map(response => response.data)
    );
  }
  getCategoriesWithParent(): Observable<any[]> {
    return this.http.get<{ data: any[] }>(`${this.apiUrl}categories/getAll/category-parent`).pipe(
      map(response => response.data)
    );
  }
  deleteCategory(categoryId: string): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.apiUrl}categories/setNullParentCategory/${categoryId}`);
  }
}
