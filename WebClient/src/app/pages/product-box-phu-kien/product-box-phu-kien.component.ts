import { Component, OnInit } from '@angular/core';

import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { Product } from '../../interfaces/product';

@Component({
  selector: 'app-product-box-phu-kien',
  templateUrl: './product-box-phu-kien.component.html',
  styleUrls: ['./product-box-phu-kien.component.css'],
  standalone: true,
  imports: [CommonModule, RouterModule]
})
export class ProductBoxPhuKienComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService.getProducts().subscribe({
      next: (response) => {
        this.products = response.products;
        this.filteredProducts = this.products.filter(product => product.type.productTypeId === 'e19333ef-11d3-4ca9-a778-41f2cb2cca05');
      },
      error: (error) => {
        console.error('Error fetching products:', error);
      }
    });
  }

  productLink(product: Product): string {
    return `/product/${product.commonProductId}`;
  }
}
