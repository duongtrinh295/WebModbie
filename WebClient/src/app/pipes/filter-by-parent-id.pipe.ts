import { Pipe, PipeTransform } from '@angular/core';
import { Category } from '../services/category.service';

@Pipe({
  name: 'filterByParentId'
})
export class FilterByParentIdPipe implements PipeTransform {
  transform(categories: Category[], parentId: string | null): Category[] {
    return categories.filter(category => category.parent_id === parentId);
  }
}
