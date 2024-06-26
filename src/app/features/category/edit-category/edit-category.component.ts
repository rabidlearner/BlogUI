import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CategoryService } from '../services/category.service';
import { Category } from '../models/category.model';
import { UpdateCategoryRequest } from '../models/update-category-request-model';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrl: './edit-category.component.css'
})
export class EditCategoryComponent implements OnInit,OnDestroy{
  
  paramsSubscription?: Subscription;
  editCategorySubscription?: Subscription;

  id: string | null = null;
  category?: Category;

  constructor(private route: ActivatedRoute,private categoryService: CategoryService,private router: Router) {
  }
  
  ngOnInit(): void {
    this.paramsSubscription = this.route.paramMap.subscribe({
      next: (params) => {
        this.id = params.get('id');

        if (this.id) {
          //get data from API for this category id
          this.categoryService.getCategoryById(this.id).subscribe({
            next: (response)=>{
              this.category = response;
            }
          });
        }
      }
    });
  }

  onFormSubmit(): void {
      const UpdateCategoryRequest: UpdateCategoryRequest = {
        name: this.category?.name ?? '',
        urlHandle: this.category?.urlHandle ?? ''
      };

      //pass this obj to service
      if(this.id){
        this.editCategorySubscription = this.categoryService.updateCategory(this.id,UpdateCategoryRequest).subscribe({
          next: (response) => {
            this.router.navigateByUrl('/admin/categories');
          }
        });
      }
    }

    onDelete(): void {
      if(this.id){
      this.categoryService.deleteCategory(this.id).subscribe({
        next: (response) => {
          this.router.navigateByUrl('/admin/categories');
        }
      })
      }
    }

  ngOnDestroy(): void {
    this.paramsSubscription?.unsubscribe();
    this.editCategorySubscription?.unsubscribe();
  }

}
