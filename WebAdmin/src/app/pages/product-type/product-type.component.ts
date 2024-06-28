import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProductypeService } from '../../services/productype.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSelectModule } from '@angular/material/select';
import { AsyncPipe, CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { ImageService } from '../../services/image.service';
import { ProductType } from '../../interfaces/product-type';


@Component({
  selector: 'app-product-type',
  standalone: true,
  imports: [RouterLink,
    MatSelectModule,
    AsyncPipe,
    MatSnackBarModule,
    MatIconModule,
    ReactiveFormsModule,
    CommonModule ,
    MatFormFieldModule ,
    MatInputModule ,
    MatTableModule 
    
  ],
  templateUrl: './product-type.component.html',
  styleUrl: './product-type.component.css'
})
export class ProductTypeComponent implements OnInit {
  productTypeForm: FormGroup;
  productTypes: any[] = [];
  errorMessage = '';
  images: any[] = [];

  constructor(
    private fb: FormBuilder,
    private productTypeService: ProductypeService,
    private snackBar: MatSnackBar,
    private imageService: ImageService,
  ) {
    this.productTypeForm = this.fb.group({
      tag: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadAllProductTypes();
  }

  // loadAllImages(): void {
  //   this.imageService.getAllImages().subscribe({
  //     next: (data: any[]) => {
  //       this.images = data;
  //     },
  //     error: (error: any) => {
  //       console.error('Error fetching images:', error);
  //     }
  //   });
  // }

  loadAllProductTypes(): void {
    this.productTypeService.getAllProductTypes().subscribe({
      next: (data: any[]) => {
        this.productTypes = data;
      },
      error: (error: any) => {
        console.error('Error fetching product types:', error);
      }
    });
  }

  addProductType(): void {
    if (this.productTypeForm.valid) {
      this.productTypeService.addProductType(this.productTypeForm.value.tag).subscribe({
        next: (response) => {
          this.snackBar.open('Product type added successfully', 'OK', { duration: 3000 });
          this.loadAllProductTypes();
        },
        error: (error) => {
          this.errorMessage = error.error.message || 'An error occurred';
        }
      });
    }
  }

  deleteProductType(id: string): void {
    this.productTypeService.deleteProductType(id).subscribe({
      next: () => {
        this.snackBar.open('Product type deleted successfully', 'OK', { duration: 3000 });
        this.loadAllProductTypes(); // Gọi lại hàm loadAllProductTypes để cập nhật danh sách
      },
      error: (error) => {
        this.errorMessage = error.error.message || 'An error occurred';
      }
    });
  }

  trackByProductTypeId(index: number, productType: any): string {
    return productType.id;
  }
  
  editProductType(id: string, productType: ProductType): void {
    this.productTypeService.updateProductType(id, productType).subscribe({
      next: (updatedProductType: ProductType) => {
        this.snackBar.open('Product type updated successfully', 'OK', { duration: 3000 });
        this.loadAllProductTypes(); // Gọi lại hàm loadAllProductTypes để cập nhật danh sách
      },
      error: (error) => {
        this.errorMessage = error.error.message || 'An error occurred';
      }
    });
  }

 
}
