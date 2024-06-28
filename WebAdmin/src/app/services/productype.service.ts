import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { ProductType } from '../interfaces/product-type';

@Injectable({
  providedIn: 'root'
})
export class ProductypeService {

  apiUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getProductTypeById(id: string): Observable<ProductType> {
    return this.http.get<ProductType>(`${this.apiUrl}product-type/${id}`);
  }

  addProductType(tag: string): Observable<any> {
    return this.http.post<{ data: any }>(`${this.apiUrl}product-type/add`, { tag }).pipe(
      map((response: { data: any }) => response.data)
    );
  }

  getAllProductTypes(): Observable<any[]> {
    return this.http.get<{ data: any[] }>(`${this.apiUrl}product-type/getAll`).pipe(
      map(response => response.data)
    );
  }

  deleteProductType(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}product-type/${id}`);
  }

  updateProductType(id: string, productType: any): Observable<ProductType> {
    return this.http.put<ProductType>(`${this.apiUrl}product-type/update/${id}`, productType);
  }

}
