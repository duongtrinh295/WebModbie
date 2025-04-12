import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/product.service';
import { Product } from '../../interfaces/product';

@Component({
  selector: 'app-product-box',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-box.component.html',
  styleUrls: ['./product-box.component.css']
})
export class ProductBoxComponent implements OnInit {
  products: Product[] = [];

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.productService.getProducts().subscribe(
      (data: { count: number, products: Product[] }) => {
        this.products = data.products.filter(product => product.type.productTypeId === '90197e81-57aa-44df-b5cb-c8631d403ff5');
        console.log(this.products);  // Kiểm tra dữ liệu trong console
      },
      error => {
        console.error('Error fetching products:', error);
      }
    );
  }
}
