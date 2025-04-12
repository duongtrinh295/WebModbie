import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { Product } from '../interfaces/product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  apiUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getProducts(): Observable<{ count: number, products: Product[] }> {
    return this.http.get<{ count: number, products: Product[] }>(`${this.apiUrl}common-detail-products/all`);
  }
}
