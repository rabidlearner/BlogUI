import { Component, OnDestroy } from '@angular/core';
import { AddCategoryRequest } from '../models/add-category-request-model';
import { CategoryService } from '../services/category.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add-category',
  standalone: false,
  templateUrl: './add-category.component.html',
  styleUrl: './add-category.component.css'
})
export class AddCategoryComponent implements OnDestroy {

  model: AddCategoryRequest;
  private addCategorySubscription?: Subscription;

  constructor(private categoryService: CategoryService) {
    this.model = {
      name: '',
      urlHandle: ''
    };
  }
  
  onFormSubmit() {
    // console.log(this.model);
    this.addCategorySubscription = this.categoryService.addCategory(this.model).subscribe(
      {
        next: (response) => {
           console.log('This was successful');
        }
        // ,
        // error: (error) => {

        // }
      }
    )
  }

  ngOnDestroy(): void {
    this.addCategorySubscription?.unsubscribe();
  }


}
