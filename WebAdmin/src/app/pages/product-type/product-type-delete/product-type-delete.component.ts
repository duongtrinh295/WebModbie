import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ProductypeService } from '../../../services/productype.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-product-type-delete',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './product-type-delete.component.html',
  styleUrl: './product-type-delete.component.css'
})
export class ProductTypeDeleteComponent {
  productTypeId!: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productTypeService: ProductypeService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.productTypeId = this.route.snapshot.paramMap.get('id')!;
  }

  deleteProductType(): void {
    this.productTypeService.deleteProductType(this.productTypeId).subscribe({
      next: () => {
        this.snackBar.open('Product type deleted successfully', 'OK', { duration: 3000 });
        this.router.navigate(['/product-type']); // Điều hướng trở lại trang danh sách sau khi xóa thành công
      },
      error: (error) => {
        this.snackBar.open('An error occurred: ' + error.error.message, 'OK', { duration: 3000 });
      }
    });
  }

  cancel(): void {
    this.router.navigate(['/product-type']); // Điều hướng trở lại trang danh sách nếu người dùng hủy bỏ
  }
}
